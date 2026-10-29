// /api/release tells the pages which version is the newest. Empty object if GitHub cannot be reached.
import { latestRelease } from '../_shared/release.js';

export async function onRequest() {
  let body = {};
  try {
    const { tag, version, file, page } = (await latestRelease()) || {};
    if (version) body = { tag, version, file, page };
  } catch (e) {}
  return new Response(JSON.stringify(body), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' },
  });
}
