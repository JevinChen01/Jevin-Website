/* ── Case study full-page overlay with project navigation ── */
(function () {
  const backdrop  = document.getElementById('cs-backdrop');
  const drawer    = document.getElementById('cs-drawer');
  const content   = document.getElementById('cs-content');
  const closeBtn  = document.getElementById('cs-nav-close');
  const prevBtn   = document.getElementById('cs-nav-prev');
  const nextBtn   = document.getElementById('cs-nav-next');
  const topPrev   = document.getElementById('cs-top-prev');
  const topNext   = document.getElementById('cs-top-next');
  const topTitle  = document.getElementById('cs-top-title');
  const dots      = Array.from(document.querySelectorAll('.cs-nav-dot'));

  if (!backdrop || !drawer || !content) return;

  const projects = [
    { slug: 'corptax',       label: 'Corptax',         url: 'work/corptax/index.html'       },
    { slug: 'citifix',       label: 'Citifix',          url: 'work/citifix/index.html'       },
    { slug: 'bridgify',      label: 'Bridgify',         url: 'work/bridgify/index.html'      },
    { slug: 'bridgifymobile',label: 'Bridgify Mobile',  url: 'work/bridgifymobile/index.html'},
  ];

  let currentIdx  = -1;
  let loadVersion = 0;

  function updateNav() {
    const atStart = currentIdx <= 0;
    const atEnd   = currentIdx >= projects.length - 1;
    if (prevBtn) prevBtn.disabled = atStart;
    if (nextBtn) nextBtn.disabled = atEnd;
    if (topPrev) topPrev.disabled = atStart;
    if (topNext) topNext.disabled = atEnd;
    if (topTitle && currentIdx >= 0) topTitle.textContent = projects[currentIdx].label;
    dots.forEach((d, i) => d.classList.toggle('active', i === currentIdx));
  }

  function load(url) {
    const version = ++loadVersion;
    content.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:40vh;color:var(--text-muted);font-size:14px;">Loading…</div>';
    drawer.scrollTop = 0;

    fetch(url)
      .then(r => r.text())
      .then(html => {
        if (version !== loadVersion) return;
        const doc   = new DOMParser().parseFromString(html, 'text/html');
        const inner = doc.getElementById('cs-inner');
        content.innerHTML = inner ? inner.innerHTML : '<div style="padding:40px;color:var(--text-muted)">Content not found.</div>';
        drawer.scrollTop = 0;
        content.querySelectorAll('video[autoplay]').forEach(v => v.play().catch(() => {}));
      })
      .catch(() => {
        if (version !== loadVersion) return;
        content.innerHTML = '<div style="padding:40px;color:var(--text-muted)">Failed to load.</div>';
      });
  }

  function open(url) {
    // Match longest slug first to avoid 'bridgify' eating 'bridgifymobile'
    const sorted = [...projects].sort((a, b) => b.slug.length - a.slug.length);
    const match  = sorted.find(p => url.includes(p.slug));
    const idx    = match ? projects.indexOf(match) : 0;
    currentIdx = idx;
    updateNav();
    load(projects[currentIdx].url);
    backdrop.classList.add('open');
    drawer.classList.add('open');
    document.body.classList.add('cs-overlay-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    backdrop.classList.remove('open');
    drawer.classList.remove('open');
    document.body.classList.remove('cs-overlay-open');
    document.body.style.overflow = '';
    currentIdx = -1;
    ++loadVersion;
  }

  function navigate(dir) {
    const next = currentIdx + dir;
    if (next < 0 || next >= projects.length) return;
    currentIdx = next;
    updateNav();
    load(projects[currentIdx].url);
  }

  if (closeBtn) closeBtn.addEventListener('click', close);
  if (prevBtn)  prevBtn.addEventListener('click',  () => navigate(-1));
  if (nextBtn)  nextBtn.addEventListener('click',  () => navigate(1));
  if (topPrev)  topPrev.addEventListener('click',  () => navigate(-1));
  if (topNext)  topNext.addEventListener('click',  () => navigate(1));

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      if (i === currentIdx) return;
      currentIdx = i;
      updateNav();
      load(projects[i].url);
    });
  });

  backdrop.addEventListener('click', e => { if (e.target === backdrop) close(); });
  document.addEventListener('keydown', e => {
    if (!drawer.classList.contains('open')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowRight') navigate(1);
    if (e.key === 'ArrowLeft')  navigate(-1);
  });

  document.querySelectorAll('.clickable[data-cs]').forEach(card => {
    card.addEventListener('click', e => { e.preventDefault(); open(card.getAttribute('data-cs')); });
  });
})();
