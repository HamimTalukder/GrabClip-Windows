(function () {
  'use strict';

  // ---- Edit these. An empty contact hides its button. ----
  var REPO = 'HamimTalukder/GrabClip-Windows';
  var VERSION = '1.0.1';                // shown until GitHub answers
  var CONTACT = {
    email: '',                          // your Gmail address
    discordId: '',                      // your numeric Discord user id
    facebook: 'https://www.facebook.com/hamim.talukder.soton',
    linkedin: 'https://www.linkedin.com/in/hamim-talukder',
    github: 'https://github.com/HamimTalukder'
  };
  var BKASH = '01815732717';            // empty hides the bKash box
  // ---------------------------------------------------------

  var root = document.documentElement;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function all(sel, from) { return Array.prototype.slice.call((from || document).querySelectorAll(sel)); }

  // Language switch: one click morphs the whole page
  function setLang(l) {
    root.setAttribute('data-lang', l);
    root.lang = l;
    all('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-set') === l)); });
  }
  all('.lang button').forEach(function (b) {
    b.addEventListener('click', function () {
      var l = b.getAttribute('data-set');
      if (l === root.getAttribute('data-lang')) return;
      try { localStorage.setItem('grabclip.lang', l); } catch (e) {}
      if (document.startViewTransition && !reduce) document.startViewTransition(function () { setLang(l); });
      else setLang(l);
    });
  });
  setLang(root.getAttribute('data-lang') || 'en');

  // Tabs (settings tour)
  all('[data-tabs]').forEach(function (box) {
    var tabs = all('[role=tab]', box);
    var panels = all('[role=tabpanel]', box);
    function show(i, focus) {
      tabs.forEach(function (t, k) {
        var on = k === i;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        panels[k].hidden = !on;
      });
      if (focus) tabs[i].focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { show(i); });
      t.addEventListener('keydown', function (e) {
        var d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (d) { e.preventDefault(); show((i + d + tabs.length) % tabs.length, true); }
      });
    });
    show(Number(box.getAttribute("data-start")) || 0);
  });

  // A screenshot that is not uploaded yet is hidden, never shown as a broken box
  all('.shot').forEach(function (fig) {
    var img = fig.querySelector('img');
    if (!img) return;
    function miss() { fig.classList.add('missing'); }
    img.addEventListener('error', miss);
    if (img.complete && img.naturalWidth === 0) miss();
  });

  // Latest version and a direct download link (the Download buttons work without this too)
  var dl = all('[data-download]');
  function apply(v, url) {
    all('[data-version]').forEach(function (e) { e.textContent = v; });
    if (url) dl.forEach(function (a) { a.href = url; });
  }
  if (dl.length || document.querySelector('[data-version]')) {
    apply(VERSION);
    var cached = null;
    try { cached = JSON.parse(localStorage.getItem('grabclip.rel') || 'null'); } catch (e) {}
    if (cached && Date.now() - cached.t < 3600000) {
      apply(cached.v, cached.url);
    } else if (window.fetch) {
      fetch('https://api.github.com/repos/' + REPO + '/releases/latest', { headers: { Accept: 'application/vnd.github+json' } })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (j) {
          if (!j || !j.tag_name) return;
          var v = String(j.tag_name).replace(/^v/, '');
          var a = (j.assets || []).filter(function (x) { return /setup\.exe$/i.test(x.name); })[0] ||
                  (j.assets || []).filter(function (x) { return /\.exe$/i.test(x.name); })[0];
          var url = a ? a.browser_download_url : '';
          apply(v, url);
          try { localStorage.setItem('grabclip.rel', JSON.stringify({ t: Date.now(), v: v, url: url })); } catch (e) {}
        })
        .catch(function () {});
    }
  }

  // Contact buttons: the address is never printed on the page
  var links = {
    email: CONTACT.email && 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(CONTACT.email) + '&su=' + encodeURIComponent('GrabClip'),
    discord: CONTACT.discordId && 'https://discord.com/users/' + encodeURIComponent(CONTACT.discordId),
    facebook: CONTACT.facebook,
    linkedin: CONTACT.linkedin,
    github: CONTACT.github
  };
  all('[data-contact]').forEach(function (a) {
    var url = links[a.getAttribute('data-contact')];
    if (url) { a.href = url; a.target = '_blank'; a.rel = 'noopener'; } else { a.hidden = true; }
  });

  // Support page: bKash number and copy button
  var box = document.querySelector('[data-bkash-box]');
  if (box) {
    if (!BKASH) {
      box.hidden = true;
    } else {
      all('[data-bkash]', box).forEach(function (e) { e.textContent = BKASH; });
      var copy = box.querySelector('.copy');
      copy.addEventListener('click', function () {
        function done() {
          copy.setAttribute('data-done', '');
          setTimeout(function () { copy.removeAttribute('data-done'); }, 1600);
        }
        if (navigator.clipboard) navigator.clipboard.writeText(BKASH).then(done, function () {});
      });
    }
  }
})();
