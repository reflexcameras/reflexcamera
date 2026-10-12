require 'json'
require 'digest'
require 'zlib'

root = File.expand_path('..', __dir__)
output = File.expand_path(ARGV.fetch(0, '_site'), root)
baseline = JSON.parse(File.read(File.join(__dir__, 'fleet-baseline.json')))
baseline.each do |path, checksum|
  [root, output].each do |directory|
    file = File.join(directory, path)
    abort "Missing or changed fleet file: #{file}" unless File.file?(file) && Digest::SHA256.file(file).hexdigest == checksum
  end
end
index = File.read(File.join(output, '2024-repo/Packages'))
abort 'Compressed index differs' unless Zlib::GzipReader.open(File.join(output, '2024-repo/Packages.gz'), &:read) == index
index.split(/\n\s*\n/).each do |entry|
  filename = entry[/^Filename: (.+)$/, 1]
  next unless filename
  file = File.join(output, '2024-repo', filename)
  abort "Missing package: #{filename}" unless File.file?(file)
  checksum = entry[/^SHA256: (.+)$/, 1]
  abort "Package checksum mismatch: #{filename}" if checksum && Digest::SHA256.file(file).hexdigest != checksum
end
abort 'CNAME changed in build' unless File.read(File.join(root, 'CNAME')) == File.read(File.join(output, 'CNAME'))
puts "PASS: #{baseline.length} fleet files unchanged in source and production output; package index, compressed index and package checksums verified."
