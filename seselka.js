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

  function metaHtml(meta) {
    return meta.map(function (m) { return '<span>' + m + '</span>'; }).join('');
  }

  function card(p) {
    if (p.custom) {
      return '' +
        '<article class="card card--custom" data-id="' + p.id + '">' +
          '<div class="card__body">' +
            '<span class="eyebrow">' + p.sub + '</span>' +
            '<h4 class="h3">Aklınızdaki parça <span class="mark">için</span></h4>' +
            '<p class="card__desc">' + p.desc + '</p>' +
            '<div class="card__foot">' + metaHtml(p.meta) + '</div>' +
            '<a class="card__add" href="#siparis" data-jump="' + p.name + '">Sipariş ver</a>' +
          '</div>' +
        '</article>';
    }
    return '' +
      '<article class="card" data-id="' + p.id + '">' +
        '<div class="card__cut">' +
          (p.badge ? '<span class="card__badge' + (p.badge === 'YENİ' ? ' is-new' : '') + '">' + p.badge + '</span>' : '') +
          '<img src="' + p.img + '" alt="' + p.name + '" loading="lazy">' +
        '</div>' +
        '<div class="card__body">' +
          '<div class="card__row">' +
            '<span class="card__price">' + fmtPrice(p.price) + '</span>' +
            '<span class="card__size">' + (p.meta[0] || '') + '</span>' +
          '</div>' +
          '<span class="card__name"><span class="sub">' + p.sub + '</span>' + p.name + '</span>' +
          '<p class="card__desc">' + p.desc + '</p>' +
          '<button class="card__add" type="button" data-add="' + p.id + '">Sepete ekle</button>' +
        '</div>' +
      '</article>';
  }

  function renderProducts() {
    var grid = $('#grid');
    if (!grid) return;
    grid.innerHTML = products.map(card).join('');
    var cards = $$('.card', grid);
    cards.forEach(function (c, i) {
      if (reduce) { c.classList.add('is-in'); return; }
      setTimeout(function () { c.classList.add('is-in'); }, 80 * i + 60);
    });

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

    // mobile menu
    var toggle = $('#navToggle');
    if (toggle) {
      toggle.addEventListener('click', function () { navEl.classList.toggle('is-menu'); });
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

    var open = function () {
      el.classList.add('is-open');
      el.setAttribute('aria-hidden', 'false');
      document.documentElement.style.overflow = 'hidden';
    };
    var close = function () {
      el.classList.remove('is-open');
      el.setAttribute('aria-hidden', 'true');
      document.documentElement.style.overflow = '';
      try { sessionStorage.setItem('seselka-bayram', '1'); } catch (e) {}
    };
    $$('[data-close]', el).forEach(function (b) { b.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && el.classList.contains('is-open')) close();
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
