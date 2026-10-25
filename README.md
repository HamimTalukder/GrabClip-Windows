<p align="center">
  <img src="assets/logo-full.svg" alt="GrabClip" width="180">
</p>

<p align="center">
  Download videos, reels, playlists and whole courses to your PC. Simple, offline-friendly, Windows desktop app.
</p>

<p align="center">
  <a href="https://github.com/HamimTalukder/GrabClip-Windows/releases/latest"><b>⬇ Download the latest version</b></a>
</p>

---

## What it does

- Paste a link (YouTube, Facebook, Instagram, TikTok and many more sites), press **Analyze**, choose quality, download.
- Video, audio only (MP3), clips (grab only a time range), subtitles.
- **Course mode:** a playlist becomes a folder with numbered lessons, watched marks and a "check for new lessons" button.
- Many links at once (one per line, or Ctrl+V), a queue that is saved when you close the app, automatic retry on bad internet.
- **Night scheduler:** start the queue later, then sleep or shut down the PC.
- **Study mode:** keeps the speed low so your internet stays free for classes.
- Built-in player with resume, notes and playback speed. Search inside subtitles across your library.
- Send a finished file to your phone with a QR code (same Wi-Fi).
- Smaller copy / extract audio from a finished file.
- Size estimate and disk-space guard before a download starts.
- Windows notifications. Closing the window keeps GrabClip in the system tray (right-click the tray icon: Add download, Pause / Resume all, Open downloads folder, Quit).

## Install

1. Open **[Releases](https://github.com/HamimTalukder/GrabClip-Windows/releases/latest)** and download `GrabClip_x.y.z_x64-setup.exe`.
2. Run it. It installs for your user only (no admin password needed).
3. Start **GrabClip** from the Start menu.

**Requirements:** Windows 10 or 11 (64-bit). WebView2 is already included in Windows 10/11.

### "Windows protected your PC" warning

The installer is not code-signed yet (signing certificates cost money), so Windows SmartScreen may show a blue warning the first time.
Click **More info → Run anyway**. Every release page lists the file's SHA-256 so you can check you got the real file:

```powershell
Get-FileHash .\GrabClip_x.y.z_x64-setup.exe -Algorithm SHA256
```

Some antivirus programs may also complain because GrabClip ships with download tools (yt-dlp, ffmpeg). If your antivirus blocks it, add an exception for the GrabClip install folder.

## Updating

Open **Settings → About GrabClip → Check for updates**. If a new version is out, press **Download**, get the new installer from [Releases](https://github.com/HamimTalukder/GrabClip-Windows/releases/latest) and run it over the old version. Your settings, history and library are kept.

If a site stops working, first try **Settings → Update yt-dlp** inside the app. Most site problems are fixed by that button alone.

## Your data and privacy

- Everything stays on your PC. No account, no tracking, no ads.
- If you need to log in to a site (private groups, age-limited videos), you can import your own `cookies.txt` in Settings. It is stored only in `%APPDATA%\GrabClip` and never leaves your PC.

## Support

GrabClip is free. If it helps you, you can support it from **Settings → Support the developer** (Buy me a coffee / PayPal for everyone, bKash / Nagad in Bangladesh).

## Responsible use

GrabClip is for downloading content you have the right to save (your own, free to download, or for personal offline study). Respect copyright and the terms of the websites you use. You are responsible for what you download.

## Report a problem

Open an [issue](https://github.com/HamimTalukder/GrabClip-Windows/issues) and include: GrabClip version (shown in the installer file name), what you did, the link type (YouTube / Facebook / ...), and the error message you saw. Please never post your `cookies.txt`.

## Credits

GrabClip is built with [Tauri](https://tauri.app) and uses [yt-dlp](https://github.com/yt-dlp/yt-dlp), [FFmpeg](https://ffmpeg.org) and [aria2](https://aria2.github.io). See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

© Hamim Talukder. Free for personal use.
