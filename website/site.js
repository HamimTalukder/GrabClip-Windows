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
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Latest release: read from GitHub in the visitor's browser (no server needed) ----
  var RELEASES_URL = CONTACT.repo + '/releases/latest';
  var release = null;
  var releaseReq = null;

  function loadRelease() {
    if (releaseReq) return releaseReq;
    releaseReq = new Promise(function (resolve) {
      try {
        var c = JSON.parse(localStorage.getItem('gc-release'));
        if (c && c.url && Date.now() - c.t < 1800000) { release = c; resolve(c); return; }
      } catch (e) {}
      fetch('https://api.github.com/repos/' + CONTACT.repo.replace('https://github.com/', '') + '/releases/latest',
        { headers: { Accept: 'application/vnd.github+json' } })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (j) {
          var a = j && (j.assets || []).filter(function (x) { return /-setup\.exe$/i.test(x.name); })[0];
          if (!a) { resolve(null); return; }
          release = { t: Date.now(), version: String(j.tag_name).replace(/^v/i, ''), file: a.name, url: a.browser_download_url };
          try { localStorage.setItem('gc-release', JSON.stringify(release)); } catch (e) {}
          resolve(release);
        })
        .catch(function () { resolve(null); });
    });
    return releaseReq;
  }

  // Small message at the bottom of the screen
  var toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 4500);
  }

  // Download buttons start the installer download right here, no new tab
  function startDownload(rel) {
    var ok = rel && /^https:\/\/github\.com\//.test(rel.url);
    toast(ok ? 'Your download is starting...' : 'Opening GitHub Releases...');
    window.location.assign(ok ? rel.url : RELEASES_URL);
  }
  all('[data-download]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (e.button || e.ctrlKey || e.metaKey || e.shiftKey) return;   // "open in new tab" stays a normal link
      if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: 'download-click', title: 'Download click', event: true });
      e.preventDefault();
      if (release) startDownload(release); else loadRelease().then(startDownload);
    });
  });

  // Show the live version and installer name
  loadRelease().then(function (rel) {
    if (!rel) return;
    all('[data-version]').forEach(function (e) { e.textContent = rel.version; });
    all('[data-file]').forEach(function (e) { e.textContent = e.getAttribute('data-file').replace('{file}', rel.file); });
  });

  // ---- Tabs (How it works) ----
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

  // ---- Search + category filter (Help Center and FAQ) ----
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

  // ---- Copy buttons ----
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

  // ---- Contact buttons. The e-mail address is never printed on the page. ----
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

  // ---- bKash box ----
  var box = document.querySelector('[data-bkash-box]');
  if (box && BKASH) {
    all('[data-bkash]', box).forEach(function (e) { e.textContent = BKASH; });
    all('[data-bkash-copy]', box).forEach(function (e) { e.setAttribute('data-copy', BKASH); });
    box.hidden = false;
  }

  all('[data-year]').forEach(function (e) { e.textContent = new Date().getFullYear(); });

  // ---- Draggable chips: pick one up and it lifts and glows, let go and it springs back ----
  all('[data-drag]').forEach(function (el) {
    var id = null, x0 = 0, y0 = 0, lastX = 0, tilt = 0, calm;
    el.addEventListener('pointerdown', function (e) {
      if (e.button) return;
      id = e.pointerId; x0 = e.clientX; y0 = e.clientY; lastX = e.clientX; tilt = 0;
      el.setPointerCapture(id);
      el.classList.add('is-drag');
    });
    el.addEventListener('pointermove', function (e) {
      if (e.pointerId !== id) return;
      tilt = tilt * 0.7 + Math.max(-16, Math.min(16, (e.clientX - lastX) * 1.4)) * 0.3;
      lastX = e.clientX;
      el.style.setProperty('--dx', (e.clientX - x0) + 'px');
      el.style.setProperty('--dy', (e.clientY - y0) + 'px');
      el.style.setProperty('--rot', tilt.toFixed(1) + 'deg');
      clearTimeout(calm);
      calm = setTimeout(function () { el.style.setProperty('--rot', '0deg'); tilt = 0; }, 90);
    });
    function drop(e) {
      if (e.pointerId !== id) return;
      id = null;
      clearTimeout(calm);
      el.classList.remove('is-drag');
      el.style.setProperty('--dx', '0px');
      el.style.setProperty('--dy', '0px');
      el.style.setProperty('--rot', '0deg');
    }
    el.addEventListener('pointerup', drop);
    el.addEventListener('pointercancel', drop);
  });

  // ---- Light that follows the pointer on chips, buttons and cards ----
  var FX = '.chip,.tags span,.filter button,.cat-nav a,.link-btn,.btn,.copy,.pill-nav a,.src,.tile,.bn,.art,.step-art,.privacy,.dl-card,.latest,.made';
  document.addEventListener('pointermove', function (e) {
    var t = e.target.closest && e.target.closest(FX);
    if (!t) return;
    var r = t.getBoundingClientRect();
    t.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    t.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }, { passive: true });

  // ---- Site stats (About page): numbers, a 30 day chart and country lists from stats.json ----
  function svgEl(name, attrs) {
    var e = document.createElementNS('http://www.w3.org/2000/svg', name);
    Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    return e;
  }
  function dayLabel(d) {
    return new Date(d + 'T00:00:00Z').toLocaleDateString('en', { month: 'short', day: 'numeric', timeZone: 'UTC' });
  }
  function drawChart(holder, days) {
    var W = holder.clientWidth || 720, H = 210, top = 12, base = H - 28, n = days.length, step = W / n;
    var max = Math.max.apply(null, days.map(function (d) { return Math.max(d.v, d.dl); }).concat(4));
    var y = function (v) { return base - (v / max) * (base - top); };
    var svg = svgEl('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': 'Visits and download clicks for the last 30 days' });
    [0, 0.5, 1].forEach(function (f) {
      var gy = y(max * f);
      svg.appendChild(svgEl('line', { class: 'st-grid', x1: 0, x2: W, y1: gy, y2: gy }));
      var t = svgEl('text', { class: 'st-t', x: 0, y: gy - 5 });
      t.textContent = Math.round(max * f);
      svg.appendChild(t);
    });
    var pts = [];
    days.forEach(function (d, i) {
      var g = svgEl('g', { class: 'st-col' });
      var x = i * step, h = Math.max(base - y(d.v), 3);
      var tip = svgEl('title'); tip.textContent = dayLabel(d.d) + ': ' + d.v + ' visits, ' + d.dl + ' download clicks';
      g.appendChild(tip);
      g.appendChild(svgEl('rect', { class: 'st-hit', x: x, y: 0, width: step, height: base }));
      var bar = svgEl('rect', { class: 'st-bar' + (d.v ? '' : ' z'), x: x + step * 0.18, width: step * 0.64, y: base - h, height: h, rx: 3 });
      bar.style.setProperty('--i', i);
      g.appendChild(bar);
      svg.appendChild(g);
      pts.push([x + step / 2, y(d.dl), d.dl]);
    });
    if (pts.some(function (p) { return p[2] > 0; })) {
      svg.appendChild(svgEl('path', { class: 'st-line', pathLength: 1, d: pts.map(function (p, i) { return (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' ') }));
      pts.forEach(function (p) { if (p[2] > 0) svg.appendChild(svgEl('circle', { class: 'st-dot', cx: p[0].toFixed(1), cy: p[1].toFixed(1), r: 4 })); });
    }
    [0, Math.floor((n - 1) / 2), n - 1].forEach(function (i, k) {
      var t = svgEl('text', { class: 'st-t', x: i * step + (k === 0 ? 0 : k === 1 ? step / 2 : step), y: H - 6, 'text-anchor': k === 0 ? 'start' : k === 1 ? 'middle' : 'end' });
      t.textContent = dayLabel(days[i].d);
      svg.appendChild(t);
    });
    holder.textContent = '';
    holder.appendChild(svg);
  }
  function drawList(ol, rows) {
    var names = window.Intl && Intl.DisplayNames ? new Intl.DisplayNames(['en'], { type: 'region' }) : null;
    ol.textContent = '';
    if (!rows || !rows.length) {
      var li = document.createElement('li');
      li.className = 'st-none';
      li.textContent = 'Nothing yet. Countries show up as people arrive.';
      ol.appendChild(li);
      return;
    }
    var top = rows[0].n;
    rows.forEach(function (r) {
      var name = r.name;
      try { name = (names && r.c && names.of(r.c)) || r.name || r.c; } catch (e) {}
      var li = document.createElement('li');
      var cn = document.createElement('span'); cn.className = 'cn'; cn.textContent = name;
      var tr = document.createElement('span'); tr.className = 'tr';
      var bar = document.createElement('i'); bar.style.setProperty('--w', Math.max(r.n / top * 100, 3) + '%'); tr.appendChild(bar);
      var num = document.createElement('b'); num.textContent = r.n.toLocaleString('en-US');
      li.appendChild(cn); li.appendChild(tr); li.appendChild(num);
      ol.appendChild(li);
    });
  }
  all('[data-stats]').forEach(function (box) {
    fetch('/stats.json', { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : null; }).then(function (d) {
      if (!d) return;
      var days = d.days && d.days.length ? d.days : [];
      if (!days.length) {
        for (var i = 29; i >= 0; i--) days.push({ d: new Date(Date.now() - i * 864e5).toISOString().slice(0, 10), v: 0, dl: 0 });
      }
      all('[data-n]', box).forEach(function (e) {
        var v = d[e.getAttribute('data-n')] || 0;
        e.setAttribute('data-count', v);
        e.textContent = v.toLocaleString('en-US');
      });
      box.hidden = false;
      var holder = box.querySelector('[data-chart]'), drawnAt = 0;
      function paint() { drawnAt = holder.clientWidth; drawChart(holder, days); }
      paint();
      window.addEventListener('resize', function () { if (Math.abs(holder.clientWidth - drawnAt) > 40) paint(); });
      all('[data-list]', box).forEach(function (ol) { drawList(ol, d[ol.getAttribute('data-list')]); });
      var note = document.querySelector('[data-stats-note]');
      if (note) {
        note.textContent = d.updated
          ? 'Updated ' + new Date(d.updated).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' }) + '.'
          : 'Counting has just started.';
      }
    }).catch(function () {});
  });

  // ---- Reveal on scroll, and numbers that count up ----
  function countUp(el) {
    var end = parseInt(el.getAttribute('data-count'), 10), t0 = null;
    function step(t) {
      if (t0 === null) t0 = t;
      var p = Math.min((t - t0) / 1100, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString('en-US');
      if (p < 1) requestAnimationFrame(step);
    }
    el.textContent = '0';
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window && !reduced) {
    document.documentElement.classList.add('js');
    all('[data-stagger]').forEach(function (p) {
      Array.prototype.forEach.call(p.children, function (c, i) { c.classList.add('rv'); c.style.setProperty('--i', i % 4); });
    });
    all('.tags').forEach(function (p) {
      all('span', p).forEach(function (c, i) { c.classList.add('rv'); c.style.setProperty('--i', i); });
    });
    var io = new IntersectionObserver(function (list) {
      list.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        en.target.classList.add('in');
        if (en.target.hasAttribute('data-count')) countUp(en.target);
      });
    }, { threshold: 0.12 });
    all('.rv, [data-count]').forEach(function (el) { io.observe(el); });
  }
})();
