(function () {
  'use strict';

  // ---- Edit these. An empty value hides that button. ----
  var CONTACT = {
    email: 'ston.the.guy@gmail.com',     // never printed on the page, only used for the button
    discordId: '756467725441957950',
    discordName: 'ston_mmv1',
    facebook: 'https://www.facebook.com/hamim.talukder.soton',
    linkedin: 'https://www.linkedin.com/in/hamim-talukder',
    github: 'https://github.com/HamimTalukder',
    repo: 'https://github.com/HamimTalukder/GrabClip-Windows'
  };
  var BKASH = '01815732717';              // empty hides the bKash box
  // -------------------------------------------------------

  function all(sel, from) { return Array.prototype.slice.call((from || document).querySelectorAll(sel)); }

  // Latest version and installer name, from our own /api/release (it reads GitHub)
  var verEls = all('[data-version]');
  var fileEls = all('[data-file]');
  if (verEls.length || fileEls.length) {
    fetch('/api/release')
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j || !j.version) return;
        verEls.forEach(function (e) { e.textContent = j.version; });
        fileEls.forEach(function (e) { e.textContent = e.getAttribute('data-file').replace('{file}', j.file); });
      })
      .catch(function () {});
  }

  // Tabs (How it works)
  all('[data-tabs]').forEach(function (box) {
    var tabs = all('[role=tab]', box);
    var panels = all('[role=tabpanel]', box);
    var bar = box.querySelector('.steps-line i');
    function show(i, focus) {
      tabs.forEach(function (t, k) {
        t.setAttribute('aria-selected', String(k === i));
        t.tabIndex = k === i ? 0 : -1;
        panels[k].hidden = k !== i;
      });
      if (bar) bar.style.width = ((i + 1) / tabs.length * 100) + '%';
      if (focus) tabs[i].focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { show(i); });
      t.addEventListener('keydown', function (e) {
        var d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (d) { e.preventDefault(); show((i + d + tabs.length) % tabs.length, true); }
      });
    });
  });

  // Search + category filter (Help Center and FAQ)
  all('[data-filter]').forEach(function (box) {
    var input = box.querySelector('[data-q]');
    var buttons = all('[data-set]', box);
    var items = all('[data-item]', box);
    var groups = all('[data-group]', box);
    var empty = box.querySelector('[data-empty]');
    var cat = 'all';
    function run() {
      var q = input ? input.value.trim().toLowerCase() : '';
      var shown = 0;
      items.forEach(function (el) {
        var inCat = cat === 'all' || el.getAttribute('data-cat') === cat;
        var text = (el.textContent + ' ' + (el.getAttribute('data-k') || '')).toLowerCase();
        el.hidden = !(inCat && (!q || text.indexOf(q) !== -1));
        if (!el.hidden) shown++;
      });
      groups.forEach(function (g) { g.hidden = !g.querySelector('[data-item]:not([hidden])'); });
      if (empty) empty.hidden = shown > 0;
    }
    if (input) input.addEventListener('input', run);
    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        cat = b.getAttribute('data-set');
        buttons.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        run();
      });
    });
  });

  // A link like /help/#cookies opens that article
  function openFromHash() {
    var el = location.hash.length > 1 && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (el && el.tagName === 'DETAILS') {
      el.hidden = false;
      el.open = true;
      el.scrollIntoView();
    }
  }
  openFromHash();
  window.addEventListener('hashchange', openFromHash);

  // Copy buttons
  function copyText(btn, text) {
    function done() {
      btn.setAttribute('data-done', '');
      setTimeout(function () { btn.removeAttribute('data-done'); }, 1600);
    }
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () {});
  }
  all('[data-copy], [data-copy-from], [data-bkash-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var from = btn.getAttribute('data-copy-from');
      var node = from && document.querySelector(from);
      copyText(btn, node ? node.textContent : btn.getAttribute('data-copy'));
    });
  });

  // Contact buttons. The e-mail address is never printed on the page.
  var links = {
    email: CONTACT.email && 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(CONTACT.email) + '&su=' + encodeURIComponent('GrabClip'),
    discord: CONTACT.discordId && 'https://discord.com/users/' + encodeURIComponent(CONTACT.discordId),
    facebook: CONTACT.facebook,
    linkedin: CONTACT.linkedin,
    github: CONTACT.github,
    repo: CONTACT.repo
  };
  all('[data-contact]').forEach(function (a) {
    var url = links[a.getAttribute('data-contact')];
    if (url) { a.href = url; a.target = '_blank'; a.rel = 'noopener'; } else { a.hidden = true; }
  });
  all('[data-discord-name]').forEach(function (e) { e.textContent = CONTACT.discordName; });

  // bKash box
  var box = document.querySelector('[data-bkash-box]');
  if (box) {
    if (BKASH) {
      all('[data-bkash]', box).forEach(function (e) { e.textContent = BKASH; });
      all('[data-bkash-copy]', box).forEach(function (e) { e.setAttribute('data-copy', BKASH); });
      box.hidden = false;
    }
  }

  all('[data-year]').forEach(function (e) { e.textContent = new Date().getFullYear(); });
})();
