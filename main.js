/**
 * NOORUL AZE - PERSONAL PORTFOLIO JAVASCRIPT
 * Includes Address, AI Agent Developer & Web Developer Setup
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initParticleBackground();
  initTypewriter();
  initScrollEffects();
  initGalleryFilter();
  initModals();
  initCounterAnimation();
  initContactForm();
});

/* ==========================================================================
   1. Theme Switcher (Dark / Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle');
  if (!themeBtn) return;

  const currentTheme = localStorage.getItem('azu-portfolio-theme') || 'dark';
  document.body.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeBtn.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('azu-portfolio-theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#theme-toggle i');
  if (icon) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

/* ==========================================================================
   2. Soft Emerald Canvas Particle System
   ========================================================================== */
function initParticleBackground() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 22), 55);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? 'rgba(16, 185, 129, ' : 'rgba(52, 211, 153, '
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + '0.5)';
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(16, 185, 129, ${0.12 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(animateParticles);
  }

  animateParticles();
}

/* ==========================================================================
   3. Dynamic Typewriter Effect
   ========================================================================== */
function initTypewriter() {
  const target = document.querySelector('.typewriter-text');
  if (!target) return;

  const words = [
    'AI Agent Developer',
    'Web Developer',
    'Digital Marketing Student',
    'Video & Photo Editor',
    'Content Creator',
    'Future Entrepreneur'
  ];

  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIdx];

    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIdx - 1);
      charIdx--;
    } else {
      target.textContent = currentWord.substring(0, charIdx + 1);
      charIdx++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === currentWord.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ==========================================================================
   4. Scroll Progress & Sticky Navbar
   ========================================================================== */
function initScrollEffects() {
  const progressBar = document.querySelector('.scroll-progress-bar');
  const navbar = document.querySelector('.navbar');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;

    if (progressBar) progressBar.style.width = `${progress}%`;

    if (navbar) {
      if (scrollTop > 50) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    }

    if (backToTopBtn) {
      if (scrollTop > 400) backToTopBtn.classList.add('visible');
      else backToTopBtn.classList.remove('visible');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
  }
}

/* ==========================================================================
   5. Gallery Filter System
   ========================================================================== */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');

      galleryCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   6. Modals System
   ========================================================================== */
function initModals() {
  const backdrop = document.getElementById('modal-backdrop');
  const closeBtn = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-body');

  if (!backdrop || !closeBtn || !modalBody) return;

  function openModal(contentHtml) {
    modalBody.innerHTML = contentHtml;
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  const resumeBtn = document.getElementById('view-resume-btn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(`
        <div style="text-align:center; padding: 20px;">
          <h2 style="font-family: var(--font-display); font-size: 2rem; margin-bottom: 4px;">NOORUL AZE</h2>
          <p style="color: var(--accent-green); font-weight: 700; margin-bottom: 4px;">AI Agent Developer | Web Developer | Digital Marketer</p>
          <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 20px;">
            <i class="fas fa-map-marker-alt" style="color:var(--accent-green);"></i> Korangath, Niramaruthur (PO), Tirur, Malappuram, Kerala - 676109, India
          </p>
          <div style="text-align: left; background: var(--glass-bg); padding: 24px; border-radius: 12px; border: 1px solid var(--glass-border); margin-bottom: 24px;">
            <h3 style="color: var(--accent-green); margin-bottom: 10px;">Summary</h3>
            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">
              Passionate 17-year-old AI Agent Developer, Web Engineer & Digital Marketing student based in Tirur, Malappuram, Kerala. Specializing in autonomous AI agents, LLM workflows, full-stack web applications, Meta Ads campaigns, cinematic video editing (CapCut), and Adobe Lightroom color grading.
            </p>
            <h3 style="color: var(--accent-green); margin-top: 20px; margin-bottom: 10px;">Location Address</h3>
            <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6;">
              Korangath, Niramaruthur (PO), Tirur, Malappuram, Kerala - 676109, India.
            </p>
            <h3 style="color: var(--accent-green); margin-top: 20px; margin-bottom: 10px;">Core Technical Expertise</h3>
            <ul style="color: var(--text-secondary); line-height: 1.8; margin-left: 20px;">
              <li><strong>AI Agent Development</strong>: Autonomous agentic workflows, LLM integrations (Gemini, GPT), prompt architecture, and automation tools.</li>
              <li><strong>Web Development</strong>: Modern responsive websites, web applications, landing pages, HTML5, CSS3, JavaScript, React/Vite.</li>
              <li><strong>Digital Marketing & Meta Ads</strong>: High-ROI campaign setup, audience targeting, and brand growth strategies.</li>
              <li><strong>Creative Media</strong>: Cinematic video editing (CapCut), sound design, and Adobe Lightroom color grading.</li>
            </ul>
          </div>
          <button class="btn btn-primary" onclick="simulateResumeDownload()">
            <i class="fas fa-download"></i> Download Complete PDF Resume
          </button>
        </div>
      `);
    });
  }

  document.querySelectorAll('.read-more-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const card = link.closest('.blog-card');
      const title = card.querySelector('.blog-card-title').textContent;
      const excerpt = card.querySelector('.blog-excerpt').textContent;
      openModal(`
        <div>
          <span style="color: var(--accent-green); font-weight: 700; font-size: 0.82rem; text-transform: uppercase;">Article Preview</span>
          <h2 style="font-family: var(--font-display); font-size: 1.8rem; margin: 10px 0 16px 0;">${title}</h2>
          <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 16px;">${excerpt}</p>
          <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7;">
            Written by Noorul Aze. Combining artificial intelligence with modern creative workflows allows creators and developers to scale content production cleanly.
          </p>
        </div>
      `);
    });
  });
}

function simulateResumeDownload() {
  alert('Downloading Noorul Aze - Resume (PDF)...');
}

/* ==========================================================================
   7. Animated Counter Statistics
   ========================================================================== */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const targetNum = parseInt(counter.getAttribute('data-target') || '0', 10);
        let count = 0;
        const speed = targetNum / 40;

        const updateCount = () => {
          count += speed;
          if (count < targetNum) {
            counter.textContent = Math.ceil(count) + '+';
            setTimeout(updateCount, 30);
          } else {
            counter.textContent = targetNum + '+';
          }
        };

        updateCount();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ==========================================================================
   8. Interactive Contact Form
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const message = document.getElementById('form-message').value;

    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    const whatsappMsg = `Hello Noorul Aze,%0A%0AMy name is ${encodeURIComponent(name)} (${encodeURIComponent(email)}).%0A%0AMessage: ${encodeURIComponent(message)}`;
    const waUrl = `https://wa.me/919074300569?text=${whatsappMsg}`;

    const choice = confirm('Send this message directly via WhatsApp to Noorul Aze?');
    if (choice) {
      window.open(waUrl, '_blank');
    } else {
      alert('Thank you! Your message has been recorded. Noorul Aze will get back to you shortly.');
    }

    form.reset();
  });
}
