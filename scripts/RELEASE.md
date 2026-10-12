# Concept 6 production migration

The root Jekyll site now serves Concept 6 at `/`, with five guides at `/guides/`.
The archived concept project has been removed from this branch. Edit the root
homepage, guides, shared includes and assets directly.
Existing support pages remain at their original URLs. The `/concept-6/` pages
redirect to the corresponding production pages, preserving query strings and fragments.

## Verify before publishing

For a fast local website preview, run `sh scripts/preview.sh` and open
`http://127.0.0.1:4001/`. This uses the local configuration and writes to
`.preview-site`, leaving the full production build untouched. Fleet downloads are
excluded from this preview. Use `ruby scripts/verify-site.rb .preview-site` to
check its links.

Build using `_config.yml` only. `_config.local.yml` excludes the fleet repository
and must never be used to generate a deployment artifact.

```sh
bundle exec jekyll build --config _config.yml
ruby scripts/verify-fleet.rb
ruby scripts/verify-site.rb
```

The fleet check compares the source and output against the pre-migration SHA256
manifest and verifies indexed packages and the compressed index. Do not regenerate
the baseline to hide an unexpected change. Intentional package updates require a
separate review and baseline update.

## Deployment checks

Before merging, confirm the hosting branch and production build settings in the
hosting service. Preserve CNAME, DNS, HTTPS, hostname redirects and `/2024-repo/`.
The repository pinning file references `www.reflexcameras.co.uk`; preserve access
through both that hostname and `reflexcameras.co.uk`.

After deployment, retrieve `2024-repo/Packages`, `2024-repo/Packages.gz`,
`2024-repo/reflex-all.txt` and indexed package downloads through the actual URLs
used by the fleet. Verify hashes and run an isolated APT index refresh with the
fleet's source configuration. A website preview alone does not validate live APT access.

Keep the previous deployed commit/artifact for rollback. Do not publish until the
new files are committed: creating branches alone does not preserve untracked files.

Cookie checks: use a fresh browser context, reject and confirm no analytics or
reCAPTCHA requests, reopen settings and accept, then verify the enquiry widget.
Check remembered consent, the privacy page, and guide pages without a contact form.
Do not submit an enquiry or complete a payment during validation.
