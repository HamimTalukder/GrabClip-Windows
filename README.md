<div align="center">

<img src="https://raw.githubusercontent.com/HamimTalukder/GrabClip-Windows/main/assets/logo-full.svg" alt="GrabClip" width="260">

**Download videos, reels, playlists and whole courses to your PC.**
Simple, offline-friendly Windows desktop app. No terminal, no Python, no setup.

[**⬇️ Download the latest version**](https://github.com/HamimTalukder/GrabClip-Windows/releases/latest)

![Platform](https://img.shields.io/badge/Platform-Windows%2010%20%2F%2011-1f6feb?style=flat-square)
![Version](https://img.shields.io/github/v/release/HamimTalukder/GrabClip-Windows?style=flat-square&color=A4DCC5)
![Downloads](https://img.shields.io/github/downloads/HamimTalukder/GrabClip-Windows/total?style=flat-square&color=A4DCC5)

</div>

---

## What it does

Paste a link, press **Analyze**, pick quality, press **Download**. GrabClip runs the download engine for you (yt-dlp, ffmpeg and aria2c are bundled inside the app), shows live progress, and keeps your downloads organized in a built-in Library with a player.

Works with **YouTube, Facebook, Instagram, TikTok** and many other sites.

---

## Features

### Downloading
- **Analyze first:** see the thumbnail, title, duration and an estimated file size before you download.
- **Video + Audio, Video only, or Audio only.**
- **Quality:** Best, 4K, 1440p, 1080p, 720p, 480p, 360p, 144p.
- **Audio formats:** Best, MP3, AAC, OPUS, FLAC.
- **Video format:** WEBM (original file, no conversion) or MP4.
- **Extras:** embed subtitles (English + Bangla), embed thumbnail and metadata.
- **Fast download:** multi-connection mode for higher speed.
- **Download only a part:** grab just a time range (for example 12:30 to 15:10) of a long video.
- **Download as a course:** paste a playlist link, GrabClip saves every lesson in its own course folder with numbered file names.
- **Many links at once:** paste up to 50 links (one per line), or drag a link onto the window.
- **Live progress:** percent, speed, ETA and real file size.

### Queue and control
- **One-by-one queue:** add as many downloads as you like, they start automatically.
- **Pause, resume, cancel.** Half-downloaded files are kept, so downloading again continues where it stopped.
- **Saved queue:** close the app and your waiting downloads come back next time.
- **Night scheduler:** start the queue at a set time, optionally limit speed, then do nothing, sleep or shut down the PC when finished.
- **Study mode:** one click to cap the speed (500 KB/s, 1 MB/s, 2 MB/s) so your internet stays usable.
- **Automatic network retry:** if the connection drops, GrabClip waits and retries by itself.
- **Disk space guard:** pauses a download before it fails halfway if the folder is too full.
- **Clipboard suggestion:** copy a link anywhere and GrabClip offers to add it (can be turned off).
- **Duplicate warning:** tells you if you already downloaded that video.
- **Data counter:** see how much you downloaded this month.

### Library and player
- **History and Library pages** with search, sort, filters, bulk select and a preview panel.
- **Course view:** lessons grouped under a course folder with watched marks and progress.
- **Check for new lessons:** one click finds and adds only the new videos of a course.
- **Built-in player:** resumes where you stopped, playback speed (1x to 2x), time-stamped notes, and *Play next lesson*.
- **Search inside videos:** search words spoken in videos that have subtitles and jump straight to that second.
- **Send to phone:** scan a QR code and watch or save the file on your phone over the same Wi-Fi.
- **Make smaller copy (480p)** and **Extract audio (MP3)** from any finished video.

### App
- **Windows notification** when downloads finish, and a **tray icon** so it keeps running when you close the window.
- **Update yt-dlp** button: fixes most "this site stopped working" problems without a new app version.
- **Check for updates** button for new GrabClip versions.
- **Cookies import** for private or login-only videos, with a health check per site.
- **Choose your output folder** (default: your Downloads).
- Calm dark UI, works fully offline (fonts and icons are bundled).

---

## Install

**Requirements:** Windows 10 or 11 (64-bit). Nothing else to install.

1. Go to the [**Releases page**](https://github.com/HamimTalukder/GrabClip-Windows/releases/latest).
2. Download `GrabClip_x.y.z_x64-setup.exe` (under **Assets**).
3. Double-click the file and follow the installer. It installs for your user only, **no admin permission needed**.
4. Open **GrabClip** from the Start menu.

### Windows shows a blue "Windows protected your PC" warning?
The installer is not code-signed (signing costs money), so SmartScreen warns about every new app. Click **More info → Run anyway**. You can also compare the SHA-256 shown in the release notes with your file:

```powershell
Get-FileHash .\GrabClip_1.0.0_x64-setup.exe -Algorithm SHA256
```

Some antivirus programs may flag the installer because yt-dlp and ffmpeg are inside. This is a false positive.

### Update
Run the new installer over the old one. Your settings, history and library are kept. Or use **Settings → Check for updates**.

### Uninstall
**Settings → Apps → GrabClip → Uninstall.** Your downloaded videos are never touched.

---

## Quick start

1. Click **Add download** and choose the source tab.
2. Paste the link and press **Analyze link** (or Enter).
3. Choose content, quality and format, then **Next**.
4. Pick extras (subtitles, thumbnail, fast, part only), then **Download**.

The download appears in the list with live progress. Finished files go to **Library**.

---

## Private and login-only videos (cookies)

Facebook, Instagram and some YouTube videos need you to be logged in. GrabClip uses a `cookies.txt` file from your own browser:

1. Install **Get cookies.txt LOCALLY** ([Chrome / Edge / Brave](https://chromewebstore.google.com/detail/get-cookiestxt-locally/cclelndahbckbenkjhflpdbgdldlbecc), [Firefox](https://addons.mozilla.org/en-US/firefox/addon/get-cookies-txt-locally/)).
2. Log into the site in your browser, open the extension and **Export**.
3. In GrabClip open **Settings → Cookies → Import** and pick the file.

Your cookies stay on your PC (in the GrabClip data folder) and are never uploaded. You can **Remove** them any time.

> ⚠️ `cookies.txt` is your logged-in session. **Never share it** and never post it in an issue or screenshot.

---

## Tips and troubleshooting

| Problem | Fix |
|---|---|
| A site stopped working | **Settings → Download engine → Update yt-dlp** |
| "Sign in" / bot-check error | Export fresh cookies and import them again (**Update cookies**) |
| Download cannot be saved | Choose a normal folder, not inside OneDrive and not a "Controlled folder access" location |
| MP4 does not play in an old player | Some sites use VP9 / AV1 video. Try VLC or the built-in player |
| Send to phone does not open | Phone and PC must be on the same Wi-Fi. Allow GrabClip in the Windows Firewall prompt |
| Built-in player shows nothing | Only MP4 (H.264), WebM and similar play there. Use **Show in folder** for other files |
| Speed is low | Try **Fast download** in step 3 of Add download |

Your data lives in `%APPDATA%\GrabClip` (settings, history, saved queue, cookies).

---

## Good to know

- **Windows only** for now.
- **No DRM content.** GrabClip cannot download protected streams, and it cannot download torrents.
- **No accounts, no tracking.** The app only contacts the sites you download from and GitHub (to check for new versions).
- Videos with subtitles can be searched; older downloads or videos without captions cannot.

---

## Responsible use

GrabClip is a personal-use tool for content you have the right to save, such as your own paid class recordings. It does not host or share any video. Please respect copyright and the terms of the sites you use.

---

## Credits

GrabClip is built with [Tauri](https://tauri.app/) and powered by open-source tools: [yt-dlp](https://github.com/yt-dlp/yt-dlp), [FFmpeg](https://ffmpeg.org/) and [aria2](https://aria2.github.io/). See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Author

Built by **Hamim Talukder Soton**

- 📘 Facebook: [hamim.talukder.soton](https://www.facebook.com/hamim.talukder.soton)
- 💼 LinkedIn: [hamim-talukder](https://www.linkedin.com/in/hamim-talukder)
- 🌐 Web command generator: [GrabClip (web)](https://hamimtalukder.github.io/GrabClip/)

## License

Free for personal use. All rights reserved by the author.
