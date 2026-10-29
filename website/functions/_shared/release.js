// Finds the newest GrabClip release WITHOUT GitHub's API (the API limits shared addresses).
// github.com/<repo>/releases/latest redirects to /releases/tag/<tag>, and the installer is
// named GrabClip_<version>_x64-setup.exe (see the README).

const REPO = 'HamimTalukder/GrabClip-Windows';
export const RELEASES_PAGE = `https://github.com/${REPO}/releases/latest`;

const ask = (url, method) => fetch(url, {
  method,
  redirect: 'manual',
  headers: { 'User-Agent': 'grabclip-site' },
  cf: { cacheTtlByStatus: { '200-299': 300, '300-399': 300, '400-599': 0 } },
});

export async function latestRelease() {
  const res = await ask(RELEASES_PAGE, 'GET');
  const found = /\/releases\/tag\/([^/?#]+)$/.exec(res.headers.get('location') || '');
  if (!found) return null;

  const tag = decodeURIComponent(found[1]);
  if (!/^v?\d+(\.\d+){1,3}$/.test(tag)) return null;

  const version = tag.replace(/^v/, '');
  const file = `GrabClip_${version}_x64-setup.exe`;
  const url = `https://github.com/${REPO}/releases/download/${tag}/${file}`;

  // The installer must really be there (GitHub answers 302 to its storage).
  const head = await ask(url, 'HEAD');
  if (head.status < 300 || head.status >= 400) return null;

  return { tag, version, file, url, page: `https://github.com/${REPO}/releases/tag/${tag}` };
}
