REFLEX website
=========================

[Production website](https://reflexcameras.co.uk/)

Editing the website
-------------------

- Homepage: [index.html](index.html)
- Guides: [guides/](guides/)
- Motion analysis service: [RMA.md](RMA.md)
- Camera specifications: [_data/cameras.yml](_data/cameras.yml)
- Shared layout: [_layouts/site.html](_layouts/site.html)
- Navigation: [_includes/site-header.html](_includes/site-header.html)
- Reusable guide content: [_includes/content/](_includes/content/)
- Styling and media: [assets/](assets/)
- Cookie policy: [privacy.md](privacy.md)

Images are consolidated in [assets/images/](assets/images/), including manual
illustrations and the analysis service's existing media. There is no root `img/`
folder. Compatibility redirects live in [redirects/](redirects/) and use explicit
permalinks to preserve old URLs. CSS named `concept-three`, `concept-four`
and `concept-five` still styles the current website and must be retained.
Older support pages and their dependencies remain available at their existing URLs.

Do not edit or remove `2024-repo/` as part of website changes. Production builds
must include it. See [release checks](scripts/RELEASE.md).

Local development
-----------------

Run the preview script from this directory:

```sh
./scripts/preview.sh
```

Wait for “Server running”, then open <http://127.0.0.1:4001/>. The local config skips the downloadable package
repositories during preview; the normal GitHub Pages build still publishes them.

If this checkout is stored in iCloud Drive, choose **Download Now** for the
project folder in Finder before serving. Jekyll needs local copies of the images,
videos, JavaScript, and CSS so it can copy them into `_site`.
