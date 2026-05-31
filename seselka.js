/* Seselka Home - interaction layer (v3, vanilla, no build step)
   products render + cart/toast · IntersectionObserver nav + reveals
   order form mailto · date-gated Bayram popup · mobile menu · process steps
*/
(function () {
  'use strict';

  var $  = function (s, p) { return (p || document).querySelector(s); };
  var $$ = function (s, p) { return Array.prototype.slice.call((p || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------- PRODUCTS */
  var products = [
    {
      id: 'asili-sepet', name: 'Asılı Sepet', sub: 'Duvar · Sepet', price: 1480,
      desc: 'Elde örülmüş, kuru çiçekleriyle; duvarda ya da kapı arkasında zarif bir köşe.',
      img: 'assets/products/asili-sepet.webp', meta: ['Ø ~28 cm', 'Doğal', 'El yapımı'],
      badge: 'YENİ', featured: 1
    },
    {
      id: 'yuvarlak-sepet', name: 'Yuvarlak Sepet', sub: 'Sepet · Tepsi', price: 1180,
      desc: 'Yuvarlak, sık örgülü hasır sepet. Ekmekten meyveye, masada gündelik bir güzellik.',
      img: 'assets/products/yuvarlak-sepet.webp', meta: ['Ø ~30 cm', 'Doğal ton', 'Stokta'],
      badge: '', featured: 2
    },
    {
      id: 'horoz-sepet', name: 'Bayram Horozu', sub: 'Dekoratif · Bayram', price: 1680,
      desc: 'Horoz formunda örme sepet; bayrama özel, ikramlık şekerleriyle küçük bir sürpriz.',
      img: 'assets/products/horoz-sepet.webp', meta: ['~25 cm', 'Doğal', 'Az sayıda'],
      badge: 'AZ', featured: 3
    },
    {
      id: 'ozel', name: 'Özel Sipariş', sub: 'Ölçüye Özel', price: null,
      desc: 'Aklınızdaki ölçü, kullanım ya da renk için bize yazın. Atölye sırasına alınır, üretim 4-6 hafta sürer.',
      img: null, meta: ['Konuşalım', 'Ölçüye özel', '4-6 hafta'], badge: '', featured: 4, custom: true
    }
  ];

  function fmtPrice(n) {
    if (n == null) return '';
    return '₺ ' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function metaLine(p) { return p.meta.join(' · '); }
  function idxHtml(n, p) {
    return '<span class="shop__no">' + n + (p.badge ? ' · ' + p.badge : '') + '</span>';
  }
  function buyHtml(p) {
    return '<div class="shop__buy">' +
      (p.price != null ? '<span class="shop__price">' + fmtPrice(p.price) + '</span>' : '') +
      '<button class="shop__add" type="button" data-add="' + p.id + '">Sepete ekle <span class="arr"></span></button>' +
    '</div>';
  }
  function featureHtml(p, n) {
    return '<article class="shop__feature reveal" data-id="' + p.id + '">' +
      '<div class="shop__feature-img"><img src="' + p.img + '" alt="' + p.name + '" loading="lazy"></div>' +
      '<div class="shop__feature-txt">' + idxHtml(n, p) +
        '<h3 class="shop__name shop__name--lg">' + p.name + '</h3>' +
        '<p class="shop__desc">' + p.desc + '</p>' + buyHtml(p) +
        '<span class="shop__meta">' + metaLine(p) + '</span>' +
      '</div>' +
    '</article>';
  }
  function itemHtml(p, n, late) {
    return '<article class="shop__item reveal' + (late ? ' d1' : '') + '" data-id="' + p.id + '">' +
      '<div class="shop__item-img"><img src="' + p.img + '" alt="' + p.name + '" loading="lazy"></div>' +
      idxHtml(n, p) +
      '<h4 class="shop__name">' + p.name + '</h4>' +
      '<p class="shop__desc">' + p.desc + '</p>' + buyHtml(p) +
      '<span class="shop__meta">' + metaLine(p) + '</span>' +
    '</article>';
  }
  function customHtml(p, n) {
    return '<article class="shop__custom reveal" data-id="' + p.id + '">' +
      '<img class="shop__custom-mark" src="assets/wax-seal.webp" alt="" loading="lazy">' +
      '<div class="shop__custom-txt">' + idxHtml(n, p) +
        '<h3 class="shop__name">Aklınızdaki parça <span class="mark">için</span></h3>' +
        '<p class="shop__desc">' + p.desc + '</p>' +
        '<a class="shop__add" href="#siparis" data-jump="' + p.name + '">Sipariş ver <span class="arr"></span></a>' +
      '</div>' +
    '</article>';
  }
  function renderProducts() {
    var grid = $('#grid');
    if (!grid) return;
    var normal = products.filter(function (p) { return !p.custom; });
    var custom = products.filter(function (p) { return p.custom; })[0];
    var html = featureHtml(normal[0], '01');
    if (normal.length > 1) {
      html += '<div class="shop__row">';
      for (var i = 1; i < normal.length; i++) { html += itemHtml(normal[i], '0' + (i + 1), i > 1); }
      html += '</div>';
    }
    if (custom) { html += customHtml(custom, '0' + (normal.length + 1)); }
    grid.innerHTML = html;
    if (reduce) { $$('.reveal', grid).forEach(function (el) { el.classList.add('is-in'); }); }

    grid.addEventListener('click', function (e) {
      var add = e.target.closest('[data-add]');
      if (add) {
        var prod = products.find(function (x) { return x.id === add.dataset.add; });
        if (prod) addToCart(prod);
        return;
      }
      var jump = e.target.closest('[data-jump]');
      if (jump) {
        e.preventDefault();
        presetPiece(jump.dataset.jump);
        var order = document.getElementById('siparis');
        if (order) {
          var y = order.getBoundingClientRect().top + window.pageYOffset - 70;
          window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
        }
      }
    });
  }

  /* ---------------------------------------------------- CART + TOAST */
  var cart = 0;
  function showToast(msg) {
    var t = $('#toast'); if (!t) return;
    $('#toastName').textContent = msg;
    t.classList.add('is-shown');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () { t.classList.remove('is-shown'); }, 2200);
  }
  function addToCart(p) {
    cart += 1;
    var ct = $('#cartCount');
    ct.textContent = String(cart);
    ct.classList.add('is-shown');
    if (!reduce && ct.animate) {
      ct.animate([{ transform: 'scale(1.4)' }, { transform: 'scale(1)' }],
        { duration: 340, easing: 'cubic-bezier(0.34,1.2,0.64,1)' });
    }
    showToast(p.name + ' sepete eklendi');
  }
  function presetPiece(name) {
    var sel = $('#prc');
    if (sel) {
      $$('option', sel).forEach(function (o) { if (o.value === name || o.textContent === name) sel.value = o.value; });
    }
  }

  /* ---------------------------------------------------- PROCESS steps */
  function processSteps() {
    var steps = $$('.step');
    steps.forEach(function (b) {
      b.addEventListener('mouseenter', function () {
        steps.forEach(function (s) { s.classList.toggle('is-active', s === b); });
      });
    });
  }

  /* ---------------------------------------------------- REVEALS */
  function reveals() {
    var els = $$('.reveal');
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------- NAV (IO, no scroll listener) */
  function nav() {
    var navEl = $('#nav');
    var ids = ['hikaye', 'surec', 'urunler', 'mutlu', 'siparis'];
    var links = {};
    ids.forEach(function (id) { links[id] = $('a[href="#' + id + '"]'); });

    // stuck state via a top sentinel
    var sentinel = document.createElement('div');
    sentinel.style.cssText = 'position:absolute;top:0;left:0;height:1px;width:1px;pointer-events:none';
    document.body.prepend(sentinel);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        navEl.classList.toggle('is-stuck', !en[0].isIntersecting);
      }, { threshold: 0 }).observe(sentinel);

      // active section
      var secs = ids.map(function (id) { return document.getElementById(id); }).filter(Boolean);
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var id = e.target.id;
          Object.keys(links).forEach(function (k) {
            if (links[k]) links[k].classList.toggle('is-current', k === id);
          });
        });
      }, { rootMargin: '-46% 0px -50% 0px', threshold: 0 });
      secs.forEach(function (s) { io.observe(s); });
    }

    // smooth scroll with nav offset; respects reduced motion
    $$('a[data-nav], a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var href = a.getAttribute('href');
        if (!href) return;
        if (href === '#' || href.length < 2) { e.preventDefault(); return; }
        var tgt = document.querySelector(href);
        if (!tgt) return;
        e.preventDefault();
        navEl.classList.remove('is-menu');
        var y = tgt.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
      });
    });

    // mobile menu (keep aria-expanded in sync; close links collapse it)
    var toggle = $('#navToggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var open = navEl.classList.toggle('is-menu');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      $$('a', $('#navLinks')).forEach(function (a) {
        a.addEventListener('click', function () { toggle.setAttribute('aria-expanded', 'false'); });
      });
    }
  }

  /* ---------------------------------------------------- ORDER form (mailto) */
  function submitOrder(form) {
    var val = function (id) { var el = form.querySelector('#' + id); return (el && el.value || '').trim(); };
    var name = val('fn'), email = val('em'), piece = val('prc'), note = val('msg');
    var subject = 'Seselka - Talep: ' + piece;
    var body = ['Ad: ' + name, 'E-posta: ' + email, 'Parça: ' + piece, 'Not: ' + (note || '-')].join('\n');
    var mailto = 'mailto:atolye@seselka.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

    var btn = form.querySelector('button[type="submit"]');
    var original = btn.innerHTML;
    btn.innerHTML = 'E-posta açılıyor';
    btn.style.pointerEvents = 'none';
    window.location.href = mailto;
    setTimeout(function () {
      btn.innerHTML = original;
      btn.style.pointerEvents = '';
      form.reset();
    }, 2600);
  }

  /* ---------------------------------------------------- CART button */
  function cartUi() {
    var b = $('#cartBtn'); if (!b) return;
    b.addEventListener('click', function () {
      if (cart === 0) { showToast('Sepetiniz henüz boş'); return; }
      showToast(cart + ' parça · siparişe geç');
      var order = document.getElementById('siparis');
      if (order) setTimeout(function () {
        order.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      }, 360);
    });
  }

  /* ---------------------------------------------------- BAYRAM popup (date-gated) */
  function bayramPopup() {
    var el = $('#bayramPopup'); if (!el) return;
    var START = '2026-05-27', END = '2026-05-29';   // dahil; ?bayram=preview ile zorla
    var preview = new URLSearchParams(location.search).get('bayram') === 'preview';
    var now = new Date();
    var inWindow = now >= new Date(START + 'T00:00:00') && now <= new Date(END + 'T23:59:59');
    var seen = false;
    try { seen = sessionStorage.getItem('seselka-bayram') === '1'; } catch (e) {}
    if (!preview && (!inWindow || seen)) return;

    var panel = $('.popup__panel', el);
    var closeBtn = $('.popup__close', el);
    var lastFocus = null;
    var open = function () {
      lastFocus = document.activeElement;
      el.classList.add('is-open');
      el.setAttribute('aria-hidden', 'false');
      document.documentElement.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    };
    var close = function () {
      el.classList.remove('is-open');
      el.setAttribute('aria-hidden', 'true');
      document.documentElement.style.overflow = '';
      try { sessionStorage.setItem('seselka-bayram', '1'); } catch (e) {}
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };
    $$('[data-close]', el).forEach(function (b) { b.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) {
      if (!el.classList.contains('is-open')) return;
      if (e.key === 'Escape') { close(); return; }
      // simple focus trap: keep Tab inside the panel
      if (e.key === 'Tab' && panel && !panel.contains(e.target)) {
        e.preventDefault();
        if (closeBtn) closeBtn.focus();
      }
    });
    setTimeout(open, preview ? 200 : 900);
  }

  /* ---------------------------------------------------- BOOT */
  function boot() {
    renderProducts();
    processSteps();
    reveals();
    nav();
    cartUi();
    bayramPopup();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else { boot(); }

  window.__seselka = { submitOrder: submitOrder, addToCart: addToCart };
})();
