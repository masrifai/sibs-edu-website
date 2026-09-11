(function () {
  'use strict';

  /* AOS */
  AOS.init({ duration: 700, once: true, offset: 60 });

  /* Navbar scroll */
  const nav = document.getElementById('mainNav');
  if (nav) {
    const startedScrolled = nav.classList.contains('scrolled');
    const tick = () => {
      if (window.scrollY > 60) {
        nav.classList.add('scrolled');
      } else if (!startedScrolled) {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', tick, { passive: true });
    tick();
  }

  /* Back to top */
  const btt = document.getElementById('backToTop');
  if (btt) {
    window.addEventListener('scroll', () => btt.classList.toggle('visible', window.scrollY > 400), { passive: true });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* Counter animation */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.count, 10);
        const step = target / (1600 / 16);
        let cur = 0;
        const t = setInterval(() => {
          cur = Math.min(cur + step, target);
          el.textContent = Math.floor(cur).toLocaleString('id-ID');
          if (cur >= target) clearInterval(t);
        }, 16);
        obs.unobserve(el);
      });
    }, { threshold: .5 });
    counters.forEach(c => obs.observe(c));
  }

  /* Lightbox */
  const lb     = document.getElementById('lightbox');
  const lbImg  = document.getElementById('lightboxImg');
  const lbClose= document.getElementById('lightboxClose');
  if (lb) {
    document.querySelectorAll('[data-lightbox]').forEach(item => {
      item.addEventListener('click', () => {
        lbImg.src = item.dataset.lightbox;
        lb.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
    const close = () => { lb.classList.remove('active'); document.body.style.overflow = ''; lbImg.src = ''; };
    lbClose.addEventListener('click', close);
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  /* Gallery / generic filter */
  document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      btn.closest('.filter-wrap').querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('[data-category]').forEach(item => {
        item.style.display = (filter === 'all' || item.dataset.category === filter) ? '' : 'none';
      });
    });
  });

  /* Sidebar news filter */
  document.querySelectorAll('.sidebar-cat-list a[data-filter]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const filter = link.dataset.filter;
      document.querySelectorAll('.sidebar-cat-list a[data-filter]').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      document.querySelectorAll('#newsGrid [data-category]').forEach(item => {
        item.style.display = (filter === 'all' || item.dataset.category === filter) ? '' : 'none';
      });
    });
  });

  /* Active nav */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) a.classList.add('active');
  });

  /* Mobile nav close on link click */
  document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)').forEach(a => {
    a.addEventListener('click', () => {
      const el = document.getElementById('navMenu');
      if (el?.classList.contains('show')) bootstrap.Collapse.getInstance(el)?.hide();
    });
  });

  /* Smooth anchor scroll */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

})();
