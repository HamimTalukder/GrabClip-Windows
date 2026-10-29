// /download/latest sends the browser straight to the newest installer on GitHub.
// If anything goes wrong it opens the GitHub releases page instead.
import { latestRelease, RELEASES_PAGE } from '../_shared/release.js';

export async function onRequest() {
  let target = RELEASES_PAGE;
  try {
    const release = await latestRelease();
    if (release) target = release.url;
  } catch (e) {}
  return new Response(null, { status: 302, headers: { Location: target, 'Cache-Control': 'no-store' } });
}
