(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Nav: solid on scroll + mobile menu ---------- */
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  const setNavState = () => nav.classList.toggle('is-solid', window.scrollY > 40);
  setNavState();

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  links.addEventListener('click', (e) => {
    if (e.target.closest('a') && nav.classList.contains('is-open')) toggle.click();
  });

  /* ---------- Hero plays in on load ---------- */
  document.querySelectorAll('.hero .reveal').forEach((el, i) => {
    el.style.transitionDelay = `${150 + i * 140}ms`;
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-in')));
  });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal:not(.hero .reveal)');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        // Stagger siblings that enter together (a parent can set its own beat with data-stagger, in ms)
        const siblings = [...el.parentElement.children].filter((c) => c.classList.contains('reveal'));
        const step = Number(el.parentElement.dataset.stagger) || 90;
        el.style.transitionDelay = `${Math.min(siblings.indexOf(el), 6) * step}ms`;
        el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- Manifesto: words light up as you scroll ---------- */
  const manifesto = document.getElementById('manifestoText');
  const words = [];
  if (manifesto) {
    const wrap = (node, hot) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((part) => {
            if (!part.trim()) { frag.appendChild(document.createTextNode(part)); return; }
            const span = document.createElement('span');
            span.className = 'w' + (hot ? ' hot' : '');
            span.textContent = part;
            frag.appendChild(span);
            words.push(span);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          wrap(child, hot || child.tagName === 'EM');
        }
      });
    };
    wrap(manifesto, false);
  }

  const lightWords = () => {
    if (!words.length) return;
    if (reduceMotion) { words.forEach((w) => w.classList.add('on')); return; }
    const rect = manifesto.getBoundingClientRect();
    const vh = window.innerHeight;
    // 0 when the block's top enters the bottom of the screen (95%); 1 as soon as the whole paragraph
    // is on screen (its bottom reaches 90% of the viewport), so it's fully lit while you're reading it
    const start = vh * 0.95;
    const end = vh * 0.9;
    const progress = (start - rect.top) / (rect.height + start - end);
    const p = Math.max(0, Math.min(1, progress));
    const lit = Math.round(p * words.length);
    words.forEach((w, i) => w.classList.toggle('on', i < lit));
    // The background house mark firms up in step with the words
    manifesto.closest('.manifesto').style.setProperty('--mk', p.toFixed(3));
    // Underline a key phrase once its last word is lit
    manifesto.querySelectorAll('em').forEach((em) => {
      const last = em.querySelector('.w:last-child');
      em.classList.toggle('lit', !!last && last.classList.contains('on'));
    });
  };

  /* ---------- Gentle parallax on the truck band ---------- */
  const bandBg = document.querySelector('.band__bg');
  const parallax = () => {
    if (!bandBg || reduceMotion) return;
    const r = bandBg.parentElement.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) return;
    const offset = (r.top + r.height / 2 - window.innerHeight / 2) * -0.12;
    bandBg.style.transform = `translate3d(0, ${offset}px, 0)`;
  };

  /* ---------- House logos: roof peak level with the top of a line of text ----------
     Manifesto: the "What lies beneath" label. Closer: the first line of "You built something worth…".
     Uses layout offsets (not on-screen position) so the text's reveal slide-in doesn't throw it off. */
  // box = the positioned container the mark is placed in (passed in: SVG elements have no offsetParent)
  const pegPeakTo = (mark, text, box) => {
    if (!mark || !text || !box) return;
    let top = text.offsetTop;
    for (let el = text.offsetParent; el && el !== box; el = el.offsetParent) top += el.offsetTop;
    const cs = getComputedStyle(text);
    const fs = parseFloat(cs.fontSize);
    const lh = parseFloat(cs.lineHeight) || fs * 1.2;
    // in both Oswald and Arial, capital letters start about 0.37em above the middle of the first line
    mark.style.top = `${top + lh / 2 - fs * 0.37}px`;
  };
  const alignMark = () => {
    pegPeakTo(document.querySelector('.manifesto__mark'), document.querySelector('.manifesto .eyebrow'), document.querySelector('.manifesto'));
    pegPeakTo(document.querySelector('.closer__mark'), document.querySelector('.closer__head h2'), document.querySelector('.closer__head'));
  };
  alignMark();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(alignMark);
  window.addEventListener('resize', alignMark);

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      setNavState();
      lightWords();
      parallax();
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
})();
