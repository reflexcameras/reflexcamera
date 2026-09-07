REFLEX website
=========================

[Website hosted here](https://tennisparty.github.io/reflexcamera/)

Local development
-----------------

The bundle is locked to the same `github-pages` gem used by GitHub Pages. Gems
are installed inside this project so they do not change other Ruby projects:

```sh
bundle config set --local path vendor/bundle
bundle install
bundle exec jekyll serve --config _config.yml,_config.local.yml
```

Open <http://127.0.0.1:4000/>. The local config skips the downloadable package
repositories during preview; the normal GitHub Pages build still publishes them.

If this checkout is stored in iCloud Drive, choose **Download Now** for the
project folder in Finder before serving. Jekyll needs local copies of the images,
videos, JavaScript, and CSS so it can copy them into `_site`.
