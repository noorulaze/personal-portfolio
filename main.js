/**
 * Noorul Aze Portfolio - Core Interactions & Logic
 * Version 6.0 - High Performance & Accessibility
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initTypewriter();
  initScrollEffects();
  initGalleryFilter();
  initModals();
  initCounterAnimation();
  initContactForm();
});

/* ==========================================================================
   1. Theme Toggle (Dark & Emerald Accent)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('noorul_theme') || 'dark';
  document.body.setAttribute('data-theme', currentTheme);
  updateThemeIcon(toggleBtn, currentTheme);

  toggleBtn.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('noorul_theme', newTheme);
    updateThemeIcon(toggleBtn, newTheme);
  });
}

function updateThemeIcon(btn, theme) {
  const icon = btn.querySelector('i');
  if (!icon) return;
  if (theme === 'dark') {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
}

/* ==========================================================================
   2. Typing Effect in Hero
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('typewriter-text');
  if (!target) return;

  const phrases = [
    'AI Agent Developer',
    'Web Developer',
    'Digital Marketer',
    'CapCut Video Editor',
    'Future Entrepreneur'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 90;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      target.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 45;
    } else {
      target.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typeSpeed = 1600; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 350;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ==========================================================================
   3. Scroll Effects & Navbar Active Highlights
   ========================================================================== */
function initScrollEffects() {
  const navbar = document.getElementById('navbar');
  const progressBar = document.querySelector('.scroll-progress-bar');
  const backToTopBtn = document.getElementById('back-to-top');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinksContainer = document.querySelector('.nav-links');

  // Mobile menu toggle
  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
  }

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = progress + '%';
    }

    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Active Section Highlight
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   4. Gallery Filtering System
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
   5. Modals System (Resume & Interactive Project Details)
   ========================================================================== */
const PROJECTS_DATA = {
  "1": {
    title: "Autonomous AI Marketing Agent",
    category: "AI Agent Development",
    image: "assets/images/project-web1.jpg",
    fallback: "assets/images/placeholder-ai.svg",
    description: "Designed and engineered autonomous agentic workflows that leverage LLM tool calling and web retrieval to conduct automated competitor market research, draft multi-angle marketing hooks, and automate campaign performance summaries.",
    tech: ["Autonomous AI", "Python", "LLM APIs", "Agent Workflows", "Prompt Chains"]
  },
  "2": {
    title: "Minimal Green Web App & Portfolio",
    category: "Web Development",
    image: "assets/images/project-web2.jpg",
    fallback: "assets/images/placeholder-web.svg",
    description: "A lightweight, modern web portfolio crafted with custom CSS design tokens, smooth dark theme transitions, accessible keyboard navigation, and responsive typography optimized across mobile and desktop viewports.",
    tech: ["HTML5", "CSS3 Custom Properties", "JavaScript ES6+", "Responsive Design", "Vercel"]
  },
  "3": {
    title: "Cinematic Reels & Shorts Edit",
    category: "Video Editing",
    image: "assets/images/project-video1.jpg",
    fallback: "assets/images/placeholder-video.svg",
    description: "High-retention short-form video edit featuring precise beat synchronization, speed ramping, keyframed kinetic subtitles, and layered sound effects designed in CapCut.",
    tech: ["CapCut", "Speed Ramping", "Motion Graphics", "Sound Design", "Vertical 9:16"]
  },
  "4": {
    title: "Lightroom Color Grading Showcase",
    category: "Photo Editing",
    image: "assets/images/instagram-photo1.jpg",
    fallback: "assets/images/placeholder-photo.svg",
    description: "Signature color grading and preset development in Adobe Lightroom. Focuses on deep emerald greens, teal highlights, and balanced skin tone contrast for atmospheric outdoor and portrait photography.",
    tech: ["Adobe Lightroom", "Color Grading", "Tone Curves", "HSL Profiles", "Preset Design"]
  },
  "5": {
    title: "Meta Ads Campaign Growth",
    category: "Digital Marketing",
    image: "assets/images/project-marketing1.jpg",
    fallback: "assets/images/placeholder-marketing.svg",
    description: "Comprehensive paid social acquisition strategy incorporating targeted lookalike and interest audiences, creative split testing, and conversion-optimized ad funnels on Instagram & Meta platforms.",
    tech: ["Meta Ads Manager", "Audience Research", "A/B Split Testing", "Funnel Optimization", "Analytics"]
  },
  "6": {
    title: "Instagram Reels & Motion Graphics",
    category: "Video Editing",
    image: "assets/images/instagram-reel1.jpg",
    fallback: "assets/images/placeholder-video.svg",
    description: "Engaging social media short-form video production engineered for algorithmic retention, featuring seamless transitions, styled animated typography, and dynamic pacing.",
    tech: ["CapCut Pro", "Kinetic Typography", "Audio Transitions", "Hook Design", "Instagram"]
  }
};

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

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('active')) {
      closeModal();
    }
  });

  // Resume Modal Trigger
  const resumeBtn = document.getElementById('view-resume-btn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(`
        <div style="text-align:center; padding: 20px;">
          <h2 style="font-family: var(--font-display); font-size: 2rem; margin-bottom: 4px;">NOORUL AZE</h2>
          <p style="color: var(--accent-green); font-weight: 700; margin-bottom: 4px;">AI Agent Developer | Web Developer | Digital Marketer</p>
          <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 20px;">
            <i class="fas fa-map-marker-alt" style="color:var(--accent-green);"></i> Tirur, Malappuram, Kerala, India
          </p>
          <div style="text-align: left; background: var(--glass-bg); padding: 24px; border-radius: 12px; border: 1px solid var(--glass-border); margin-bottom: 24px;">
            <h3 style="color: var(--accent-green); font-size: 1.15rem; margin-bottom: 12px; border-bottom: 1px solid var(--glass-border); padding-bottom: 6px;">Professional Profile</h3>
            <p style="font-size: 0.92rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 16px;">
              Passionate 17-year-old AI Agent Developer, Web Developer, and Digital Marketer based in Tirur, Kerala. Skilled in creating autonomous AI agents, developing modern web applications, editing viral short-form video content, and running targeted Meta ad campaigns.
            </p>
            <h3 style="color: var(--accent-green); font-size: 1.15rem; margin-bottom: 12px; border-bottom: 1px solid var(--glass-border); padding-bottom: 6px;">Core Competencies</h3>
            <ul style="list-style: none; padding-left: 0; font-size: 0.9rem; line-height: 1.8; color: var(--text-secondary);">
              <li><i class="fas fa-check" style="color:var(--accent-green); margin-right:8px;"></i> <strong>AI & LLMs:</strong> Autonomous AI Agents, Prompt Engineering, Gemini API, ChatGPT</li>
              <li><i class="fas fa-check" style="color:var(--accent-green); margin-right:8px;"></i> <strong>Web Development:</strong> HTML5, CSS3, JavaScript ES6+, Responsive Design, UI/UX</li>
              <li><i class="fas fa-check" style="color:var(--accent-green); margin-right:8px;"></i> <strong>Creative Editing:</strong> CapCut, Adobe Lightroom, Video Pacing, Color Grading</li>
              <li><i class="fas fa-check" style="color:var(--accent-green); margin-right:8px;"></i> <strong>Digital Marketing:</strong> Meta Ads, Audience Research, Growth Marketing</li>
            </ul>
          </div>
          <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
            <a href="https://wa.me/919074300569?text=Hello%20Noorul%20Aze,%20I%20reviewed%20your%20resume%20and%20would%20like%20to%20connect." target="_blank" class="btn btn-primary">
              <i class="fab fa-whatsapp"></i> Chat on WhatsApp
            </a>
            <a href="mailto:noorulazetirur@gmail.com?subject=Inquiry%20from%20Portfolio%20Resume" class="btn btn-glass">
              <i class="fas fa-envelope"></i> Email Noorul
            </a>
          </div>
        </div>
      `);
    });
  }

  // Gallery Card Click & Keyboard Enter Trigger
  const galleryCards = document.querySelectorAll('.gallery-card');
  galleryCards.forEach(card => {
    const handleCardOpen = () => {
      const projectId = card.getAttribute('data-project-id');
      const project = PROJECTS_DATA[projectId];
      if (!project) return;

      const techHtml = project.tech.map(t => `<span class="project-modal-tech-item">${t}</span>`).join('');

      openModal(`
        <div class="project-modal-container">
          <div class="project-modal-img-wrap">
            <img src="${project.image}" alt="${project.title}" onerror="this.onerror=null; this.src='${project.fallback}';">
          </div>
          <span class="project-modal-badge">${project.category}</span>
          <h2 class="project-modal-title">${project.title}</h2>
          <p class="project-modal-desc">${project.description}</p>
          <div class="project-modal-tech-list">
            ${techHtml}
          </div>
          <div class="project-modal-actions">
            <a href="https://wa.me/919074300569?text=Hi%20Noorul%20Aze,%20I'm%20interested%20in%20your%20project:%20${encodeURIComponent(project.title)}" target="_blank" class="btn btn-primary">
              <i class="fab fa-whatsapp"></i> Discuss on WhatsApp
            </a>
            <a href="#contact" class="btn btn-glass" onclick="document.getElementById('modal-close').click();">
              <i class="fas fa-paper-plane"></i> Contact Noorul
            </a>
          </div>
        </div>
      `);
    };

    card.addEventListener('click', handleCardOpen);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCardOpen();
      }
    });

    const previewBtn = card.querySelector('.card-preview-btn');
    if (previewBtn) {
      previewBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleCardOpen();
      });
    }
  });
}

/* ==========================================================================
   6. Animated Stat Counters (Accurate Suffix & Instant Display)
   ========================================================================== */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  function animateCounter(counter) {
    if (counter.dataset.animated === 'true') return;
    counter.dataset.animated = 'true';

    const targetNum = parseInt(counter.getAttribute('data-target') || '0', 10);
    const suffix = counter.getAttribute('data-suffix') || '';
    const duration = 1200; // ms
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(ease * targetNum);

      counter.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = targetNum + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    counters.forEach(c => {
      const rect = c.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        animateCounter(c);
      } else {
        observer.observe(c);
      }
    });
  } else {
    counters.forEach(animateCounter);
  }
}

/* ==========================================================================
   7. Spam-Protected Contact Form with Inline Status Feedback
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusBox = document.getElementById('form-status');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Honeypot spam trap
    const hp = document.getElementById('hp-check');
    if (hp && hp.value.trim() !== '') {
      console.warn('Spam submission detected and blocked.');
      return;
    }

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      if (statusBox) {
        statusBox.className = 'form-status error';
        statusBox.style.display = 'block';
        statusBox.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please fill in all required fields.';
      }
      return;
    }

    // Basic email pattern validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      if (statusBox) {
        statusBox.className = 'form-status error';
        statusBox.style.display = 'block';
        statusBox.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please enter a valid email address.';
      }
      return;
    }

    const whatsappMsg = `Hello Noorul Aze,%0A%0AMy name is ${encodeURIComponent(name)} (${encodeURIComponent(email)}).%0A%0AMessage:%0A${encodeURIComponent(message)}`;
    const waUrl = `https://wa.me/919074300569?text=${whatsappMsg}`;
    const mailtoUrl = `mailto:noorulazetirur@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom:%20${encodeURIComponent(name)}%20(${encodeURIComponent(email)})`;

    if (statusBox) {
      statusBox.className = 'form-status success';
      statusBox.style.display = 'block';
      statusBox.innerHTML = `
        <strong><i class="fas fa-check-circle"></i> Thank you, ${name}!</strong> Your message is ready to send.
        <div style="margin-top: 10px; display: flex; gap: 8px; flex-wrap: wrap;">
          <a href="${waUrl}" target="_blank" class="btn btn-primary" style="padding: 6px 14px; font-size: 0.85rem;">
            <i class="fab fa-whatsapp"></i> Send on WhatsApp
          </a>
          <a href="${mailtoUrl}" class="btn btn-glass" style="padding: 6px 14px; font-size: 0.85rem;">
            <i class="fas fa-envelope"></i> Send via Email
          </a>
        </div>
      `;
    }

    form.reset();
  });
}
