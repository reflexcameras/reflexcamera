#!/bin/bash
# Regenerate the apt index files for this repo after adding/changing a .deb in pool/.
# Usage: bash update-repo.sh   (works from any directory)
# Writes Packages, Packages.gz and Release. Commit and push all three.
set -euo pipefail
cd "$(dirname "$0")"
trap 'rm -f Packages.new Packages.gz.new Release.new' EXIT

dpkg-scanpackages --multiversion pool /dev/null > Packages.new
[ -s Packages.new ] || { echo "ERROR: dpkg-scanpackages produced no output" >&2; exit 1; }
gzip -9 -n -c Packages.new > Packages.gz.new

size() { wc -c < "$1" | tr -d ' '; }
{
  echo "Date: $(LC_ALL=C date -u '+%a, %d %b %Y %H:%M:%S UTC')"
  echo "MD5Sum:"
  echo " $(md5 -q Packages.new) $(size Packages.new) Packages"
  echo " $(md5 -q Packages.gz.new) $(size Packages.gz.new) Packages.gz"
  echo "SHA256:"
  echo " $(shasum -a 256 Packages.new | cut -d' ' -f1) $(size Packages.new) Packages"
  echo " $(shasum -a 256 Packages.gz.new | cut -d' ' -f1) $(size Packages.gz.new) Packages.gz"
} > Release.new

mv -f Packages.new Packages
mv -f Packages.gz.new Packages.gz
mv -f Release.new Release

echo "Wrote $(grep -c '^Package:' Packages) packages."
cat Release
