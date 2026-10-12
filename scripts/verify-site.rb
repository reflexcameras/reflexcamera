require 'nokogiri'
require 'uri'
root = File.expand_path(ARGV.fetch(0, '_site'), File.expand_path('..', __dir__))
pages = ['index.html', 'privacy/index.html', 'video-motion-analysis-service/index.html'] + Dir.glob(File.join(root, 'guides/**/index.html')).map { |p| p.delete_prefix(root + '/') }
errors = []
pages.each do |page|
  document = Nokogiri::HTML(File.read(File.join(root, page)))
  document.css('[href], [src], [poster], [data-deferred-src]').each do |node|
    %w[href src poster data-deferred-src].each do |attr|
      url = node[attr]
      next unless url && !url.empty? && !url.match?(/\A(?:[a-z]+:|\/\/)/i)
      path, fragment = url.split('#', 2)
      path = URI::DEFAULT_PARSER.unescape(path.split('?').first.to_s)
      target = path.empty? ? File.join(root, page) : File.expand_path(path.delete_prefix('/'), path.start_with?('/') ? root : File.dirname(File.join(root, page)))
      target = File.join(target, 'index.html') if File.directory?(target)
      unless File.file?(target)
        errors << "#{page}: missing #{url}"
        next
      end
      if fragment && !fragment.empty? && target.end_with?('.html')
        linked = Nokogiri::HTML(File.read(target))
        errors << "#{page}: missing anchor #{url}" unless linked.xpath('//*[@id or @name]').any? { |n| n['id'] == fragment || n['name'] == fragment }
      end
    end
  end
end
abort errors.uniq.join("\n") unless errors.empty?
puts "PASS: local links, anchors and assets on #{pages.length} production pages."
