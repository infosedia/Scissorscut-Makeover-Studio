(function () {
  'use strict';

  /* ---------- Settings (edit here) ---------- */
  var WHATSAPP_NUMBER = '919815254494';
  var DEFAULT_MESSAGE = 'Hello Scissorscut Makeover Studio, I would like to enquire about your services and book an appointment. Please share the available timings.';

  /* ---------- WhatsApp links ---------- */
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    var svc = a.getAttribute('data-svc');
    var msg = svc
      ? 'Hello Scissorscut Makeover Studio, I would like to enquire about ' + svc + ' and book an appointment. Please share the available timings.'
      : DEFAULT_MESSAGE;
    a.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
    a.target = '_blank';
    a.rel = 'noopener';
  });

  /* ---------- Sticky header ---------- */
  var header = document.querySelector('.site-header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  function setMenu(open) {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  burger.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* ---------- Reveal on scroll ---------- */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Gallery filter ---------- */
  var chips = document.querySelectorAll('.chip');
  var tiles = Array.prototype.slice.call(document.querySelectorAll('.g-item'));
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      var f = chip.getAttribute('data-filter');
      tiles.forEach(function (t) {
        t.classList.toggle('hide', f !== 'all' && t.getAttribute('data-cat') !== f);
      });
    });
  });

  /* ---------- Lightbox ---------- */
  var lb = document.getElementById('lightbox');
  var stage = document.getElementById('lbStage');
  var cap = document.getElementById('lbCap');
  var current = 0;
  var lastFocus = null;

  function visibleTiles() { return tiles.filter(function (t) { return !t.classList.contains('hide'); }); }

  function show(i) {
    var list = visibleTiles();
    if (!list.length) return;
    current = (i + list.length) % list.length;
    var tile = list[current];
    var fig = tile.querySelector('.ph').cloneNode(true);
    fig.style.aspectRatio = '4/3';
    fig.style.height = 'auto';
    var img = fig.querySelector('img');
    if (img) img.removeAttribute('loading');
    stage.innerHTML = '';
    stage.appendChild(fig);
    cap.textContent = tile.getAttribute('data-cap') || '';
  }
  function open(tile) {
    lastFocus = document.activeElement;
    var list = visibleTiles();
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    show(list.indexOf(tile));
    document.getElementById('lbClose').focus();
  }
  function close() {
    lb.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  tiles.forEach(function (t) { t.addEventListener('click', function () { open(t); }); });
  document.getElementById('lbClose').addEventListener('click', close);
  document.getElementById('lbPrev').addEventListener('click', function () { show(current - 1); });
  document.getElementById('lbNext').addEventListener('click', function () { show(current + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
})();
