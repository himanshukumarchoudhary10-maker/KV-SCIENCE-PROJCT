/* ============================================================
   APP.JS — No login required, open access
   ============================================================ */

// ── Smooth parallax on hero cards ──
(function initParallax() {
  const hero = document.querySelector('.heroNodeWrap');
  if (!hero) return;
  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    hero.style.transform = `translate(${dx * 8}px, ${dy * 6}px)`;
  });
})();

// ── Pricing toggle ──
(function initPricing() {
  const toggle = document.getElementById('billingToggle');
  const prices = document.querySelectorAll('[data-monthly][data-annual]');
  if (!toggle) return;
  toggle.addEventListener('change', () => {
    const annual = toggle.checked;
    prices.forEach(el => {
      el.textContent = annual ? el.dataset.annual : el.dataset.monthly;
    });
    document.querySelectorAll('.pricePeriod').forEach(el => {
      el.textContent = annual ? '/ yr' : '/ mo';
    });
  });
})();

// ── SVG neural line connector ──
(function drawLines() {
  const svg = document.getElementById('neuralSvg');
  if (!svg) return;

  const center = document.getElementById('nodeCenter');
  const satellites = document.querySelectorAll('.satellite');
  if (!center || !satellites.length) return;

  function getCenter(el) {
    const r = el.getBoundingClientRect();
    const sr = svg.getBoundingClientRect();
    return {
      x: r.left + r.width / 2 - sr.left,
      y: r.top + r.height / 2 - sr.top
    };
  }

  function draw() {
    svg.innerHTML = '';
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    grad.setAttribute('id', 'lineGrad');
    grad.setAttribute('gradientUnits', 'userSpaceOnUse');
    const s1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    s1.setAttribute('offset', '0%');
    s1.setAttribute('stop-color', '#c9b8a0');
    const s2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    s2.setAttribute('offset', '100%');
    s2.setAttribute('stop-color', '#a78b71');
    s2.setAttribute('stop-opacity', '0.3');
    grad.appendChild(s1);
    grad.appendChild(s2);
    defs.appendChild(grad);
    svg.appendChild(defs);

    const c = getCenter(center);
    satellites.forEach(sat => {
      const s = getCenter(sat);
      const mx = (c.x + s.x) / 2 + (Math.random() - 0.5) * 60;
      const my = (c.y + s.y) / 2 + (Math.random() - 0.5) * 60;

      // Main bezier line
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M ${c.x} ${c.y} Q ${mx} ${my} ${s.x} ${s.y}`);
      path.setAttribute('class', 'node-line');
      path.setAttribute('stroke', 'url(#lineGrad)');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke-width', '2.5');
      svg.appendChild(path);

      // Dashed secondary flow line
      const dash = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      dash.setAttribute('d', `M ${c.x} ${c.y} Q ${mx} ${my} ${s.x} ${s.y}`);
      dash.setAttribute('fill', 'none');
      dash.setAttribute('stroke', 'rgba(201,184,160,0.25)');
      dash.setAttribute('stroke-width', '1');
      dash.setAttribute('stroke-dasharray', '5 15');
      svg.appendChild(dash);
    });
  }

  draw();
  window.addEventListener('resize', draw);
})();

// ── Scroll reveal ──
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();
