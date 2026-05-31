/* Seselka Home — interaction layer (v2)
   - hero reveal
   - process step switching (3D weave stages, scroll-driven + auto-advance)
   - product list (sort + render). Only 4 products. Three with real photos, one typographic.
   - cart + toast
   - scroll reveals
   - active-section nav
*/

(function () {
  'use strict';

  const $  = (s, p) => (p || document).querySelector(s);
  const $$ = (s, p) => Array.from((p || document).querySelectorAll(s));

  /* -------------------------------------------------- HERO reveal */
  function heroReveal() {
    requestAnimationFrame(() => $('#hero').classList.add('is-revealed'));
  }

  /* -------------------------------------------------- PROCESS stages */
  function process() {
    const sec = $('#surec');
    const steps = $$('.process__step', sec);
    const pill = $('#stagePill');

    function setStage(n) {
      sec.dataset.stage = String(n);
      steps.forEach((b) => {
        const on = Number(b.dataset.stage) === n;
        b.classList.toggle('is-active', on);
        if (on && pill) pill.textContent = 'Aşama 0' + n + ' · ' + b.dataset.label;
      });
    }

    steps.forEach((b) => {
      b.addEventListener('click', () => setStage(Number(b.dataset.stage)));
      b.addEventListener('mouseenter', () => setStage(Number(b.dataset.stage)));
    });

    // Drive by scroll: whichever step is in the middle of viewport sets the stage
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const n = Number(e.target.dataset.stage);
          if (n) setStage(n);
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );
    steps.forEach((b) => io.observe(b));

    // Auto-play once on first reveal — gated by tweaks
    let played = false;
    new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || played) return;
          if (window.__tweaks && window.__tweaks.autoplayProcess === false) return;
          played = true;
          const mult = (window.__tweaks && window.__tweaks.motionMult) || 1;
          const delays = [600, 1700, 2800, 3900].map((d) => d * mult);
          delays.forEach((ms, i) => setTimeout(() => setStage(i + 1), ms));
        });
      },
      { threshold: 0.4 }
    ).observe(sec);
  }

  /* -------------------------------------------------- PRODUCTS */
  const products = [
    {
      id: 'sepet-hasir',
      name: 'Hasır Sepet',
      sub: 'SEPET · ORTA',
      price: 1480,
      desc: 'Geri dönüşen kâğıttan elde örülmüş, çift kulplu. Battaniyeden ekmeğe — günün her saati.',
      img: 'assets/photo-basket.png',
      meta: ['28 × 24 cm', 'Doğal ton', '~ 34 saat'],
      badge: 'YENİ',
      featured: 1,
    },
    {
      id: 'hediye-kutusu',
      name: 'Hediye Kutusu',
      sub: 'AMBALAJ · KÜÇÜK',
      price: 2180,
      desc: 'Mukavva kutu, kuşaklı sash, mum mühür ve örme sepet. Bir parça hediye etmenin Seselka yolu.',
      img: 'assets/photo-packaging.png',
      meta: ['32 × 22 × 12 cm', 'Doğal · Krem', 'Hediye paketinde'],
      badge: '',
      featured: 2,
    },
    {
      id: 'mum-muhurlu',
      name: 'Mum Mühürlü Set',
      sub: 'HEDİYE SETİ',
      price: 980,
      desc: 'Bez kese, el yazısı tebrik kartı, mum mühürlü zarf ve kurdele — kapı eşiğinde açılacak küçük bir ritüel.',
      img: 'assets/photo-detail.png',
      meta: ['4 parça', 'Doğal', 'Stokta'],
      badge: 'AZ',
      featured: 3,
    },
    {
      id: 'ozel',
      name: 'Özel Sipariş',
      sub: 'ÖLÇÜYE ÖZEL',
      price: null,
      desc: 'Aklınızdaki ölçü, kullanım ya da renk için bize yazın. Atölye sırasına alınır, üretim 4–6 hafta sürer.',
      img: null,
      meta: ['Konuşalım', 'Ölçüye özel', '4–6 hafta'],
      badge: '',
      featured: 4,
      custom: true,
    },
  ];

  function fmtPrice(n) {
    if (n == null) return '';
    return '₺ ' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function productCard(p) {
    if (p.custom) {
      return `
        <a class="product product--custom" href="#siparis" data-id="${p.id}">
          <div class="product__photo">
            <div class="custom-inner">
              <img src="assets/icon-monogram-clean.png" alt="">
              <h4>Aklınızdaki<br>parça <em>için</em><span class="dot"></span></h4>
              <p>Ölçü, renk veya kullanım için bize yazın — atölye sırasına alalım.</p>
              <span class="btn btn--ghost" style="pointer-events:none;">Sipariş ver <span class="arrow"></span></span>
            </div>
          </div>
          <div class="product__meta">
            <span class="product__name"><span class="sub">${p.sub}</span>${p.name}</span>
            <span class="product__price" style="font-style: italic; font-family: var(--font-serif);">konuşalım</span>
          </div>
          <p class="product__desc">${p.desc}</p>
          <div class="product__foot">
            ${p.meta.map((m, i) => i === 0 ? `<span>${m}</span>` : `<span class="dot-sep"></span><span>${m}</span>`).join('')}
          </div>
        </a>
      `;
    }
    return `
      <a class="product" href="#" data-id="${p.id}">
        <div class="product__photo">
          ${p.badge ? `<span class="product__badge ${p.badge === 'YENİ' ? 'is-new' : ''}">${p.badge}</span>` : ''}
          <img src="${p.img}" class="ph" alt="${p.name}">
          <button class="product__cta" data-add="${p.id}">
            <span class="pls">+</span> Sepete ekle · ${fmtPrice(p.price)}
          </button>
        </div>
        <div class="product__meta">
          <span class="product__name"><span class="sub">${p.sub}</span>${p.name}</span>
          <span class="product__price">${fmtPrice(p.price)}</span>
        </div>
        <p class="product__desc">${p.desc}</p>
        <div class="product__foot">
          ${p.meta.map((m, i) => i === 0 ? `<span>${m}</span>` : `<span class="dot-sep"></span><span>${m}</span>`).join('')}
        </div>
      </a>
    `;
  }

  let currentSort = 'featured';

  function renderProducts() {
    const grid = $('#grid');
    let list = products.slice();

    list.sort((a, b) => {
      if (currentSort === 'featured') return a.featured - b.featured;
      const ap = a.price == null ? Infinity : a.price;
      const bp = b.price == null ? Infinity : b.price;
      if (currentSort === 'asc')  return ap - bp;
      if (currentSort === 'desc') return bp - ap;
      return 0;
    });

    grid.innerHTML = '';
    list.forEach((p, i) => {
      const tmp = document.createElement('div');
      tmp.innerHTML = productCard(p);
      const card = tmp.firstElementChild;
      grid.appendChild(card);
      setTimeout(() => card.classList.add('is-in'), 90 * i + 80);
    });
  }

  function bindProducts() {
    $('#sort').addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderProducts();
    });

    $('#grid').addEventListener('click', (e) => {
      const add = e.target.closest('[data-add]');
      if (add) {
        e.preventDefault();
        const id = add.dataset.add;
        const prod = products.find((x) => x.id === id);
        if (prod) addToCart(prod);
        return;
      }
      // links inside the grid
      const card = e.target.closest('.product:not(.product--custom)');
      if (card) e.preventDefault();
    });
  }

  /* -------------------------------------------------- CART + TOAST */
  let cart = 0;
  function addToCart(p) {
    cart += 1;
    const ct = $('#cartCount');
    ct.textContent = String(cart);
    ct.classList.add('is-shown');
    ct.animate(
      [{ transform: 'scale(1.4)' }, { transform: 'scale(1)' }],
      { duration: 360, easing: 'cubic-bezier(0.34,1.2,0.64,1)' }
    );

    const toast = $('#toast');
    $('#toastName').textContent = p.name;
    toast.classList.add('is-shown');
    clearTimeout(addToCart._t);
    addToCart._t = setTimeout(() => toast.classList.remove('is-shown'), 2200);
  }

  /* -------------------------------------------------- REVEALS */
  function reveals() {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('is-in');
          // for hikaye section, also flip the parent class
          if (e.target.classList.contains('hikaye__copy')) {
            $('#hikaye').classList.add('is-on');
          }
          io.unobserve(e.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
    );
    $$('.reveal').forEach((el) => io.observe(el));
  }

  /* -------------------------------------------------- NAV stuck + active */
  function nav() {
    const navEl = $('#nav');
    const sections = ['hero', 'hikaye', 'surec', 'urunler', 'mutlu', 'siparis'];
    const labels = {
      hero: '01 — KİMLİK',
      hikaye: '02 — HİKÂYE',
      surec: '03 — SÜREÇ',
      urunler: '04 — ÜRÜNLER',
      mutlu: '05 — MUTLU EV',
      siparis: '06 — SİPARİŞ',
    };
    const pagenum = $('#pagenum');
    const navLinks = {
      hikaye:  $('a[href="#hikaye"]'),
      surec:   $('a[href="#surec"]'),
      urunler: $('a[href="#urunler"]'),
      mutlu:   $('a[href="#mutlu"]'),
      siparis: $('a[href="#siparis"]'),
    };

    const onScroll = () => {
      navEl.classList.toggle('is-stuck', window.scrollY > 30);
      let active = 'hero';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= window.innerHeight * 0.35 && r.bottom >= window.innerHeight * 0.35) {
          active = id;
        }
      }
      pagenum.textContent = labels[active] || labels.hero;
      Object.entries(navLinks).forEach(([k, v]) => v && v.classList.toggle('is-current', k === active));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    $$('a[data-nav]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        const tgt = id && document.querySelector(id);
        if (!tgt) return;
        e.preventDefault();
        window.scrollTo({ top: tgt.getBoundingClientRect().top + window.scrollY - 60, behavior: 'smooth' });
      });
    });
  }

  /* -------------------------------------------------- ORDER form */
  function submitOrder(form) {
    // Static site, no backend: compose the request as an email to the atelier.
    const val = (id) => (form.querySelector('#' + id)?.value || '').trim();
    const name = val('fn'), email = val('em'), piece = val('prc'), note = val('msg');

    const subject = `Seselka — Talep: ${piece}`;
    const body = [
      `Ad: ${name}`,
      `E-posta: ${email}`,
      `Parça: ${piece}`,
      `Not: ${note || '—'}`,
    ].join('\n');
    const mailto = `mailto:atolye@seselka.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const btn = form.querySelector('button');
    const original = btn.innerHTML;
    btn.innerHTML = 'E-posta açılıyor ·';
    btn.style.pointerEvents = 'none';

    window.location.href = mailto;

    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.pointerEvents = '';
      form.reset();
    }, 2600);
  }

  /* -------------------------------------------------- CART btn */
  function cartUi() {
    $('#cartBtn').addEventListener('click', () => {
      const t = $('#toast');
      if (cart === 0) {
        $('#toastName').textContent = 'Sepet boş';
        t.classList.add('is-shown');
        setTimeout(() => t.classList.remove('is-shown'), 1600);
      } else {
        $('#toastName').textContent = cart + ' parça · sipariş başla';
        t.classList.add('is-shown');
        setTimeout(() => t.classList.remove('is-shown'), 1800);
        setTimeout(() => {
          document.getElementById('siparis').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 400);
      }
    });
  }

  /* -------------------------------------------------- BAYRAM popup (date-gated) */
  function bayramPopup() {
    const el = $('#bayramPopup');
    if (!el) return;

    // ---- CONFIG ----------------------------------------------------------
    // Tatil aralığı (dahil, yerel saat). Popup yalnızca bu aralıkta ve oturum
    // başına bir kez açılır. Test için URL'ye ?bayram=preview ekle (tarihten
    // bağımsız açılır).
    const START = '2026-05-27';   // bayram başlangıcı (YYYY-MM-DD, dahil)
    const END   = '2026-05-29';   // bayram bitişi    (YYYY-MM-DD, dahil)
    // ----------------------------------------------------------------------

    const preview  = new URLSearchParams(location.search).get('bayram') === 'preview';
    const now      = new Date();
    const inWindow = now >= new Date(START + 'T00:00:00') && now <= new Date(END + 'T23:59:59');
    const seen     = sessionStorage.getItem('seselka-bayram') === '1';
    if (!preview && (!inWindow || seen)) return;

    const open = () => {
      el.classList.add('is-open');
      el.setAttribute('aria-hidden', 'false');
      document.documentElement.style.overflow = 'hidden';
      if (window.instgrm && window.instgrm.Embeds) window.instgrm.Embeds.process();
    };
    const close = () => {
      el.classList.remove('is-open');
      el.setAttribute('aria-hidden', 'true');
      document.documentElement.style.overflow = '';
      try { sessionStorage.setItem('seselka-bayram', '1'); } catch (e) {}
    };

    el.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', close));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && el.classList.contains('is-open')) close();
    });

    setTimeout(open, preview ? 200 : 1000);
  }

  /* -------------------------------------------------- BOOT */
  function boot() {
    heroReveal();
    process();
    renderProducts();
    bindProducts();
    reveals();
    nav();
    cartUi();
    bayramPopup();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.__seselka = { submitOrder, addToCart };
})();
