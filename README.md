<p align="center">
  <a href="https://github.com/HamimTalukder/GrabClip-Windows/releases/latest">
    <img alt="GrabClip" src="https://raw.githubusercontent.com/HamimTalukder/GrabClip-Windows/main/assets/logo-full.svg" width="240">
  </a>
</p>

<p align="center">
  <b>Download videos, reels, playlists and whole courses to your PC.<br>A simple, offline-friendly Windows desktop app.</b>
</p>

<p align="center">
  Paste a link, pick a quality, press Download. No terminal, no Python, no setup:
  the download engine is built in. Then watch your files in the built-in Library and player,
  search inside videos, or send them to your phone with a QR code.
</p>

<p align="center">
  <img alt="Platform: Windows 10 and 11" src="https://img.shields.io/badge/platform-Windows%2010%20%2F%2011-0078d4?style=flat-square">
  <img alt="Latest version" src="https://img.shields.io/github/v/release/HamimTalukder/GrabClip-Windows?style=flat-square&color=A4DCC5">
  <img alt="Downloads" src="https://img.shields.io/github/downloads/HamimTalukder/GrabClip-Windows/total?style=flat-square&color=A4DCC5">
  <img alt="License: free for personal use" src="https://img.shields.io/badge/license-free%20for%20personal%20use-555?style=flat-square">
  <img alt="Built with Tauri and Rust" src="https://img.shields.io/badge/built%20with-Tauri%20%C2%B7%20Rust-b7410e?style=flat-square">
</p>

<p align="center">
  <a href="https://github.com/HamimTalukder/GrabClip-Windows/releases/latest"><img alt="Download GrabClip for Windows" src="https://img.shields.io/badge/Download%20for%20Windows-A4DCC5?style=for-the-badge&logo=windows&logoColor=0E1513&labelColor=182320" height="40"></a>
</p>

<p align="center">
  <a href="#features">Features</a> ·
  <a href="#install">Install</a> ·
  <a href="#quick-start">Quick start</a> ·
  <a href="#private-and-login-only-videos-cookies">Cookies</a> ·
  <a href="#troubleshooting">Troubleshooting</a> ·
  <a href="#faq">FAQ</a> ·
  <a href="#license-and-credits">License</a>
</p>

<p align="center">
  <img alt="GrabClip downloads list with live progress and the speed gauge" src="docs/screenshots/downloads.png" width="900">
</p>

## Features

### Download

- **Analyze first:** thumbnail, title, site, duration and estimated size before you download.
- **Sources:** YouTube, Facebook, Instagram, TikTok and many other sites.
- **Video + Audio, Video only, Audio only.**
- **Quality:** Best, 4K, 1440p, 1080p, 720p, 480p, 360p, 144p.
- **Audio:** Best, MP3, AAC, OPUS, FLAC.
- **Video format:** WEBM (original file, no conversion) or MP4.
- **Extras:** embedded subtitles (English + Bangla), embedded thumbnail and metadata.
- **Fast download:** multi-connection mode for higher speed.
- **Download only a part:** grab a time range, for example 12:30 to 15:10.
- **Download as a course:** a playlist link becomes a course folder with numbered lessons.
- **Many links at once:** paste up to 50 links, or drag a link onto the window.

<p align="center">
  <img alt="Add download: course folder, quality and format" src="docs/screenshots/add-download.png" width="560"><br>
  <sub>Add download: a whole course, with quality and format</sub>
</p>

### Queue and control

- **One-by-one queue** that starts the next download by itself.
- **Pause, resume, cancel.** Partial files are kept, so a download continues where it stopped.
- **Saved queue:** waiting downloads come back after you restart the app.
- **Night scheduler:** start the queue at a set time, limit speed, then do nothing, sleep or shut down.
- **Study mode:** cap the speed (500 KB/s, 1 MB/s, 2 MB/s) so your internet stays usable.
- **Automatic network retry** when the connection drops.
- **Disk space guard:** pauses before a download fails halfway.
- **Link suggestion** from your clipboard, **duplicate warning**, and a **monthly data counter**.

<p align="center">
  <img alt="Night scheduler: start time, when finished, speed limit" src="docs/screenshots/scheduler.png" width="440"><br>
  <sub>Night scheduler: run the queue later, then sleep or shut down</sub>
</p>

### Library and player

- **Downloads, Queue, History and Library** pages with search, sort, filters and bulk actions.
- **Courses:** lessons grouped in folders with watched marks; **Check for new lessons** adds only what is new.
- **Built-in player:** resumes where you stopped, speed 1x to 2x, time-stamped notes, play next lesson.
- **Search inside videos:** find spoken words in videos that have subtitles and jump to that second.
- **Send to phone:** scan a QR code over the same Wi-Fi.
- **Make smaller copy (480p)** and **Extract audio (MP3)** from finished videos.

<p align="center">
  <img alt="Library with a course folder and the preview panel" src="docs/screenshots/library.png" width="900"><br>
  <sub>Library: course folders, watched progress and quick actions</sub>
</p>

<table>
  <tr>
    <td width="50%" valign="top" align="center"><img alt="Built-in player with speed and notes" src="docs/screenshots/player.png" width="440"><br><sub>Built-in player: resume, speed and notes</sub></td>
    <td width="50%" valign="top" align="center"><img alt="Send to phone with a QR code" src="docs/screenshots/send-to-phone.png" width="440"><br><sub>Send to phone: scan the QR code on the same Wi-Fi</sub></td>
  </tr>
</table>

### App

- **Automatic updates:** GrabClip checks GitHub for a new version and shows its release notes. You choose **Skip**, **Download and install** or **Download from GitHub**. Updates are digitally signed, so only genuine GrabClip files can be installed.
- **Update yt-dlp** button: fixes most "this site stopped working" problems without a new app version.
- **Guided cookies setup** in Bangla or English, with a health check per site.
- **Settings in tabs:** General, Cookies, Updates, Help and About.
- **Send a report** (email, GitHub issue, Discord or Facebook) and **Support the developer** in Settings → Help.
- Windows notifications and a tray icon, so downloads keep running when you close the window.
- Calm dark interface, works fully offline (fonts and icons are bundled).

<p align="center">
  <img alt="Settings with the Cookies tab: status and per-site health" src="docs/screenshots/settings.png" width="760"><br>
  <sub>Settings: General, Cookies, Updates, Help and About</sub>
</p>

## Install

**Requirements:** Windows 10 or 11, 64-bit. Nothing else to install.

| Build | File | Notes |
|---|---|---|
| Windows x64 | `GrabClip_<version>_x64-setup.exe` | Installs for your user only, no admin permission needed |

1. Open the [latest release](https://github.com/HamimTalukder/GrabClip-Windows/releases/latest).
2. Download the `.exe` under **Assets** (you do not need the `.sig` and `latest.json` files, the app uses them for updates).
3. Run it and finish the installer, then open **GrabClip** from the Start menu.

**Windows shows a blue "Windows protected your PC" screen?** The installer is not code-signed with a Windows certificate yet (it costs money), so SmartScreen warns about every new app. Click **More info → Run anyway**. To verify your download, compare its SHA-256 with the one shown next to the file on the release page:

```powershell
Get-FileHash .\GrabClip_1.0.1_x64-setup.exe -Algorithm SHA256
```

Some antivirus programs flag the installer because yt-dlp and ffmpeg are inside. This is a false positive.

**Update:** when a new version is out, GrabClip shows a window with the release notes. Choose **Download and install**: the app downloads the installer, checks its signature, installs it and restarts itself. Your settings, history and library are kept. Install waits while a download is running or a night schedule is set. You can also check by hand in **Settings → Updates → Check for updates**, or run the new installer over the old one. All versions are on the [Releases page](https://github.com/HamimTalukder/GrabClip-Windows/releases) and in the [changelog](CHANGELOG.md).

**Uninstall:** Settings → Apps → GrabClip. Your downloaded videos are never touched.

## Quick start

1. Click **Add download** and choose the source tab.
2. Paste the link and press **Analyze link** (or Enter).
3. Choose content, quality and format, then **Next**.
4. Pick extras (subtitles, thumbnail, fast, part only), then **Download**.

The download appears in the list with live progress. Finished files go to **Library**.

## Private and login-only videos (cookies)

Facebook private groups, Instagram and some YouTube videos need you to be logged in. GrabClip uses a `cookies.txt` file from your own browser, and it guides you step by step, in Bangla or English. The guide opens by itself the first time, and any time later from **Settings → Cookies → How to get cookies.txt**. A red dot on Settings reminds you while no cookies are imported.

1. Log into the site in your browser.
2. Install the free extension **Get cookies.txt LOCALLY** for [Chrome / Edge / Brave](https://chromewebstore.google.com/detail/get-cookiestxt-locally/cclelndahbckbenkjhflpdbgdldlbecc) or [Firefox](https://addons.mozilla.org/en-US/firefox/addon/get-cookies-txt-locally/).
3. Open the extension on that site and **Export**.
4. In GrabClip open **Settings → Cookies → Import** and pick the file.

Cookies stay on your PC and are never uploaded. **Remove** deletes them any time.

<p align="center">
  <img alt="The step-by-step cookies guide" src="docs/screenshots/cookies-guide.png" width="560"><br>
  <sub>The built-in cookies guide, in Bangla or English</sub>
</p>

> [!WARNING]
> `cookies.txt` is your logged-in session. **Never share it**, and never post it in an issue or a screenshot.

## Troubleshooting

| Problem | Fix |
|---|---|
| A site stopped working | **Settings → Updates → Update yt-dlp** |
| "Sign in" or bot-check error | Export fresh cookies and import them again (**Settings → Cookies → Replace**) |
| File cannot be saved | Use a normal folder, not inside OneDrive and not a "Controlled folder access" location |
| MP4 does not play in an old player | Some sites use VP9 / AV1 video. Try VLC or the built-in player |
| Send to phone does not open | Phone and PC must be on the same Wi-Fi. Allow GrabClip in the Windows Firewall prompt |
| Built-in player shows nothing | It plays MP4 (H.264), WebM and similar. Use **Show in folder** for other files |
| Low speed | Turn on **Fast download** in step 3 of Add download |

**Where your data lives:** `%APPDATA%\GrabClip` (settings, history, saved queue, cookies). Still stuck? Use **Settings → Help → Send a report**, or [open an issue](https://github.com/HamimTalukder/GrabClip-Windows/issues/new/choose) and describe what happened. Do not attach your cookies.

## FAQ

**Is it free?** Yes, free for personal use. See the [license](LICENSE.txt).

**Does it upload my links or files?** No. There are no accounts and no tracking. The app only talks to the sites you download from, and to GitHub when it checks for updates.

**How can I support GrabClip?** **Settings → Help → Support the developer**. A star on this repository or sharing the app with a friend also helps a lot.

**Mac or Linux?** Windows only for now.

**Can it download DRM-protected videos or torrents?** No.

**Why are ffmpeg and aria2 in the install folder?** They are the open-source tools GrabClip uses for merging, converting and fast downloads. See [third-party notices](THIRD_PARTY_NOTICES.md).

## Roadmap

New versions and fixes are published on the [Releases page](https://github.com/HamimTalukder/GrabClip-Windows/releases) and described in the [changelog](CHANGELOG.md). Ideas and bugs are welcome in [Issues](https://github.com/HamimTalukder/GrabClip-Windows/issues). Postponed for now: a browser button that sends a link straight to the app.

## Responsible use

GrabClip is a personal-use tool for content you have the right to save, such as your own paid class recordings. It does not host or share any video. Please respect copyright and the terms of the sites you use.

## License and credits

GrabClip is **free for personal use**; see [LICENSE.txt](LICENSE.txt). The source code is not public. The bundled open-source tools keep their own licenses, listed in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

Built with [Tauri](https://tauri.app/) and powered by [yt-dlp](https://github.com/yt-dlp/yt-dlp), [FFmpeg](https://ffmpeg.org/) and [aria2](https://aria2.github.io/).

## Author

Built by **Hamim Talukder Soton**.

[Facebook](https://www.facebook.com/hamim.talukder.soton) · [LinkedIn](https://www.linkedin.com/in/hamim-talukder) · [GrabClip web command generator](https://hamimtalukder.github.io/GrabClip/)

<p align="center">
  <sub>Made with curiosity by <a href="https://github.com/HamimTalukder">Hamim Talukder Soton</a>.</sub>
</p>
