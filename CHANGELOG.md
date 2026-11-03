# Changelog

All notable changes to GrabClip for Windows are listed here, newest first.

## 1.0.3 - 2026-11-03

### New
- **Only real qualities:** after you paste a link, only the video qualities that really exist are shown (Video + Audio and Video only). The real downloaded quality shows in the list and preview.
- **Best is the default** for video and audio. Other qualities and formats can still be chosen.
- **Faster Analyze:** the link is checked when you paste it, and the result is reused when the download starts.
- **Copy diagnostics** (Settings → Help): copies the app, yt-dlp, FFmpeg and Windows versions and the last error in one click.
- **Smarter error help** for private videos (import cookies) and for failures that continue with cookies (check Updates or send a report).
- **Website button** in Settings → About.
- **New installer look** with the GrabClip logo.

## 1.0.2 - 2026-11-01

### New
- **Rename:** new Rename option in the 3-dot menu of Downloads, Queue, History and Library. A finished file is renamed on your PC too.
- **Clear app data:** Settings → General can now clear history, queue, cookies, notes and settings (and restart GrabClip). Your downloaded videos are never touched.
- **Smart source tab:** paste a link and GrabClip picks YouTube, Facebook, Instagram, TikTok or Other by itself.
- **Facebook titles:** Facebook videos are now named after the post text instead of "Video".
- **New Analyze animation:** a small loading animation while a link is analyzed.

### Fixed
- Vertical videos (Facebook reels, YouTube Shorts) failed with "Requested format is not available". They download now.

## 1.0.1 - 2026-10-25

### Downloading
- Add download in three steps: link, format, extras.
- Analyze link: thumbnail, title, site, duration and estimated size before downloading.
- Sources: YouTube, Facebook, Instagram, TikTok and other sites.
- Video + Audio, Video only, Audio only.
- Quality: Best, 4K, 1440p, 1080p, 720p, 480p, 360p, 144p.
- Audio formats: Best, MP3, AAC, OPUS, FLAC.
- Video format: WEBM (original) or MP4.
- Subtitles (EN / BN), thumbnail + metadata, Fast download.
- Download only a part (time range).
- Download as a course (playlist to numbered lessons in a course folder).
- Many links at once, Ctrl+V and drag-and-drop of links.
- Live progress with percent, speed, ETA and size.

### Queue and control
- One-by-one queue, pause, resume and cancel (partial files kept for resuming).
- Saved queue that returns after restart.
- Night scheduler with speed limit and sleep / shut down when finished.
- Study mode speed limit.
- Automatic retry when the network drops.
- Disk space guard.
- Clipboard link suggestion and duplicate warning.
- Monthly data counter.

### Library and player
- Downloads, Queue, History and Library pages with search, sort, filter and bulk actions.
- Course view with watched marks and progress, and Check for new lessons.
- Built-in player with resume, playback speed, notes and Play next lesson.
- Search inside videos using subtitles.
- Send to phone with a QR code.
- Make smaller copy (480p) and Extract audio (MP3).

### App
- Automatic, signed updates: release notes with Skip, Download and install, or Download from GitHub.
- Update yt-dlp button.
- Guided cookies setup in Bangla or English, with a health check per site.
- Settings in tabs: General, Cookies, Updates, Help and About.
- Send a report and Support the developer (Settings → Help).
- Windows notifications and tray icon.
- Only one GrabClip window opens at a time.
- Custom output folder.
- Dark Graphite + Sage theme, fully offline-friendly.
- Per-user installer, no admin permission needed.
