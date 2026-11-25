# 2024-repo change log, 25 Nov 2026

Added two packages to `2024-repo` so Pi 3A+ builds can pin the same versions the CM fleet runs
(reference camera REFLEX0100). Kept in `scripts/`, which `_config.yml` excludes, so it is not published.

## Added

| Package | Version | Pool path | SHA256 | Source |
|---|---|---|---|---|
| ffmpeg | `8:5.1.6-0+deb12u1+rpt1` (arm64) | `pool/main/f/ffmpeg/ffmpeg_5.1.6-0+deb12u1+rpt1_arm64.deb` | `4f2540b7aa39cbc6725890a5487be2abb5dcb289fcfc52a914ab9ae2f1490603` | `https://archive.raspberrypi.com/debian/pool/main/f/ffmpeg/` |
| log2ram | `1.7.2` (all) | `pool/main/l/log2ram/log2ram_1.7.2_all.deb` (new folder) | `368c28816b75c639be94c628531e79ccb771fee1fe37de0f8aa870b184e4a630` | `http://packages.azlux.fr/debian/pool/main/l/log2ram/` |

Both files are mode 644.

## Steps

1. **Read-only checks on the cameras.** Nothing was installed or changed on REFLEX0100 or nimble-grape.
   - REFLEX0100 (CM) has ffmpeg `8:5.1.6-0+deb12u1+rpt1` and log2ram `1.7.2`. The ffmpeg libraries are at `+rpt1` too.
   - nimble-grape (Pi 3A+) has ffmpeg `8:5.1.4-0+rpt1+deb12u1` and log2ram `1.6.1`.
   - Both cameras are arm64 on Debian 12 (bookworm).
   - REFLEX0100 pins `origin "www.reflexcameras.co.uk"` at priority 1001 (`/etc/apt/preferences.d/reflex-camera-pins`).
2. **Downloaded the two `.deb` files** to a temporary folder on the Mac.
3. **Verified them against REFLEX0100.**
   - ffmpeg: I unpacked it and compared every file's MD5 with REFLEX0100's `/var/lib/dpkg/info/ffmpeg.md5sums`. All 33 files are identical.
   - log2ram: its SHA256 matches the azlux signed index on REFLEX0100. Its 2 files are identical to REFLEX0100's `log2ram.md5sums`.
4. **Checked compatibility with the Pi 3A+.** I compared every Depends and Pre-Depends entry with nimble-grape's installed packages:
   - the nine ffmpeg-family packages and log2ram as installed on REFLEX0100: 111 entries, all met;
   - the repo's own `+rpt3` libraries with this ffmpeg: 111 entries, all met.
5. **Copied the files into the pool:**
   - `ffmpeg_5.1.6-0+deb12u1+rpt1_arm64.deb` into the existing `pool/main/f/ffmpeg/` folder;
   - `log2ram_1.7.2_all.deb` into a new `pool/main/l/log2ram/` folder.
6. **Re-indexed** with `bash 2024-repo/update-repo.sh` (`dpkg-scanpackages --multiversion`).
   - It wrote 305 entries (303 before). The "missing from override file" warning is normal for this repo.
   - Compared with the old `Packages`: 2 entries added (`ffmpeg`, `log2ram`), none removed, none changed.
7. **Verified the new index.**
   - `Packages.gz` decompresses to `Packages`.
   - Both hashes in `Release` match.
   - Every `Filename:` entry exists in the pool.

## New index

`Release` is dated Wed, 25 Nov 2026 20:25:07 UTC.

| File | Size (bytes) | SHA256 |
|---|---|---|
| `Packages` | 332495 | `19ea73c416ebf20224509cee63bbc27e54086032c1d76b43a28dd7706ea24249` |
| `Packages.gz` | 101682 | `56fe873648028825a29fc6281a67857c237650e504a9a42626704872e7c2adf3` |

## Files changed in this site repo (not committed)

- `2024-repo/Packages`, `2024-repo/Packages.gz` and `2024-repo/Release` (modified).
- `2024-repo/pool/main/f/ffmpeg/ffmpeg_5.1.6-0+deb12u1+rpt1_arm64.deb` (new).
- `2024-repo/pool/main/l/log2ram/log2ram_1.7.2_all.deb` (new).
- `scripts/apt-repo-log-2026-11-25.md` (this log).

## Effect on the CM fleet

- ffmpeg: apt on a CM camera now chooses `+rpt1`, which is what the fleet already has installed. Before, it would have upgraded to the Raspberry Pi archive's `8:5.1.9-0+deb12u1+rpt1`.
- log2ram: apt chooses `1.7.2`, which is also already installed.
- Nothing installed on a CM camera changes.
- I first downloaded ffmpeg `+rpt3` to match the repo's libraries. I didn't add it, because it would have changed the CM fleet's ffmpeg version.

## Not changed: libraries at a different version from the fleet

The repo already had the eight ffmpeg libraries at `8:5.1.6-0+deb12u1+rpt3`:
`libavcodec59`, `libavdevice59`, `libavfilter8`, `libavformat59`, `libavutil57`, `libpostproc56`, `libswresample4`, `libswscale6`.

REFLEX0100 has `+rpt1` installed, but apt there already chooses `+rpt3` from this repo. So a CM or Pi 3A+ camera that runs an upgrade, or installs these packages, gets `+rpt3` libraries with the `+rpt1` ffmpeg program. That works, because ffmpeg only needs the libraries at `>= 7:5.0`/`7:5.1`, but the libraries won't be the fleet's installed version. These files were left as they were for the owner to decide.
