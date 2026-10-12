#!/usr/bin/env sh
set -eu
cd "$(dirname "$0")/.."
REFLEX_PORT="${1:-4001}"
RUBY_BIN="${REFLEX_RUBY:-}"
is_modern_ruby() {
  [ -x "$1" ] || return 1
  RUBY_MAJOR="$("$1" -e 'print RUBY_VERSION.split(".").first' 2>/dev/null || true)"
  [ -n "$RUBY_MAJOR" ] && [ "$RUBY_MAJOR" -ge 3 ]
}
if ! is_modern_ruby "$RUBY_BIN"; then
  RUBY_BIN="$(command -v ruby 2>/dev/null || true)"
  if ! is_modern_ruby "$RUBY_BIN"; then
    for RUBY_CANDIDATE in "$HOME"/.rubies/ruby-*/bin/ruby; do
      if is_modern_ruby "$RUBY_CANDIDATE"; then RUBY_BIN="$RUBY_CANDIDATE"; fi
    done
  fi
fi
if ! is_modern_ruby "$RUBY_BIN"; then
  echo "Set REFLEX_RUBY to a Ruby 3 executable."
  exit 1
fi
# Terminal environments may point GEM_HOME at the slow project vendor bundle.
# Prefer the standalone gems installed for the selected Ruby.
RUBY_VERSION="$("$RUBY_BIN" --disable-gems -e 'print RUBY_VERSION')"
RUBY_DEFAULT_GEMS="$(env -u GEM_HOME -u GEM_PATH -u RUBYOPT -u RUBYLIB "$RUBY_BIN" -e 'print Gem.default_dir')"
for GEM_CANDIDATE in "$HOME/.gem/ruby/$RUBY_VERSION" "$(env -u GEM_HOME -u GEM_PATH -u RUBYOPT -u RUBYLIB "$RUBY_BIN" -e 'print Gem.user_dir')"; do
  if [ -x "$GEM_CANDIDATE/bin/jekyll" ]; then
    export GEM_HOME="$GEM_CANDIDATE" GEM_PATH="$GEM_CANDIDATE:$RUBY_DEFAULT_GEMS"
    unset RUBYOPT RUBYLIB BUNDLE_GEMFILE BUNDLE_BIN_PATH
    break
  fi
done
GEM_BIN="$("$RUBY_BIN" -e 'print Gem.bindir')"
if [ ! -x "$GEM_BIN/jekyll" ]; then
  echo "No standalone Jekyll installation found for $RUBY_BIN."
  exit 1
fi
export JEKYLL_NO_BUNDLER_REQUIRE=true
echo "Building website preview; the link will work when Jekyll reports Server running."
echo "Fleet downloads are excluded from this local preview."
"$RUBY_BIN" "$GEM_BIN/jekyll" build --config _config.yml,_config.local.yml,scripts/render-check.yml --destination .preview-site
# Serve media directly instead of reading every binary file during each build.
for MEDIA_DIR in assets css; do
  if [ ! -e ".preview-site/$MEDIA_DIR" ]; then
    ln -s "../$MEDIA_DIR" ".preview-site/$MEDIA_DIR"
  fi
done
exec "$RUBY_BIN" "$GEM_BIN/jekyll" serve --config _config.yml,_config.local.yml,scripts/render-check.yml --destination .preview-site --skip-initial-build --host 127.0.0.1 --port "$REFLEX_PORT"
