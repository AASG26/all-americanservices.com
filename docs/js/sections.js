/* Interactive pieces carried over from v4: the "what changes" toggle and the fit check. */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* ---------- What changes: toggle ---------- */
  const board = $('.changes__board');
  const label = $('#changesLabel');
  const lists = { stays: $('#listStays'), better: $('#listBetter') };
  $$('.toggle__btn').forEach((btn) => btn.addEventListener('click', () => {
    const which = btn.dataset.list;
    $$('.toggle__btn').forEach((b) => {
      const on = b === btn;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-selected', on);
    });
    board.classList.toggle('is-better', which === 'better');
    label.textContent = which === 'better' ? 'Where we help' : 'What stays the same';
    Object.entries(lists).forEach(([k, ul]) => {
      ul.hidden = k !== which;
      // restart the item stagger
      if (k === which) $$('li', ul).forEach((li) => { li.style.animation = 'none'; void li.offsetWidth; li.style.animation = ''; });
    });
  }));

  /* ---------- Fit check ---------- */
  const items = $$('.fit__item');
  const meter = $('#fitMeter');
  const fitLabel = $('#fitLabel');
  const result = $('#fitResult');
  const updateFit = () => {
    const n = items.filter((i) => i.getAttribute('aria-pressed') === 'true').length;
    const done = n === items.length;
    meter.style.width = `${(n / items.length) * 100}%`;
    fitLabel.textContent = done ? `${n} of ${items.length}!` :`${n} of ${items.length}`;
    result.classList.toggle('is-on', done);
    result.setAttribute('aria-hidden', !done);
    $('a', result).tabIndex = done ? 0 : -1;
  };
  items.forEach((item) => item.addEventListener('click', () => {
    item.setAttribute('aria-pressed', item.getAttribute('aria-pressed') !== 'true');
    updateFit();
  }));
  updateFit();
})();
