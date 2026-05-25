// ========================
// Scroll Reveal Animation
// ========================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all reveal elements
document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});

// ========================
// Smooth Scrolling
// ========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========================
// Homepage Initiatives Carousel
// ========================
const initiativesCarousel = document.querySelector('[data-initiatives-carousel]');
if (initiativesCarousel) {
  const track = initiativesCarousel.querySelector('[data-carousel-track]');
  const prevButton = initiativesCarousel.querySelector('[data-carousel-prev]');
  const nextButton = initiativesCarousel.querySelector('[data-carousel-next]');
  const dotsContainer = initiativesCarousel.parentElement?.querySelector('[data-carousel-dots]');
  const progressBar = initiativesCarousel.parentElement?.querySelector('.carousel-progress span');
  const cards = Array.from(track.querySelectorAll('.initiative-card'));

  const dots = cards.map((card, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Go to initiative ${index + 1}`);
    dot.addEventListener('click', () => {
      card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
    dotsContainer?.appendChild(dot);
    return dot;
  });

  const setActive = () => {
    const trackRect = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;
    let activeIndex = 0;
    let activeDistance = Infinity;

    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(trackCenter - cardCenter);
      if (distance < activeDistance) {
        activeDistance = distance;
        activeIndex = index;
      }
    });

    dots.forEach((dot, index) => dot.classList.toggle('active', index === activeIndex));

    if (progressBar) {
      const progress = cards.length > 1 ? activeIndex / (cards.length - 1) : 0;
      progressBar.style.width = `${Math.max(18, 100 / cards.length)}%`;
      progressBar.style.transform = `translateX(${progress * 100}%)`;
    }
  };

  const moveBy = (direction) => {
    const currentIndex = dots.findIndex(dot => dot.classList.contains('active'));
    const nextIndex = Math.min(cards.length - 1, Math.max(0, currentIndex + direction));
    cards[nextIndex].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  prevButton?.addEventListener('click', () => moveBy(-1));
  nextButton?.addEventListener('click', () => moveBy(1));
  track.addEventListener('scroll', () => window.requestAnimationFrame(setActive), { passive: true });
  window.addEventListener('resize', setActive);
  window.addEventListener('load', setActive);
  setActive();
}

// ========================
// Navbar Smooth Background
// ========================
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.backdropFilter = 'blur(20px)';
      navbar.style.boxShadow = '0 15px 40px rgba(18, 44, 28, 0.15)';
    } else {
      navbar.style.backdropFilter = 'blur(16px)';
      navbar.style.boxShadow = '0 10px 35px rgba(18, 44, 28, 0.08)';
    }
  });
}

// ========================
// Active Nav Link on Scroll
// ========================
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a:not(.nav-cta)');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => link.classList.remove('active'));

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  if (current === 'contact') {
    const contactLink = document.querySelector('nav a[href*="contact.html"]');
    if (contactLink) contactLink.classList.add('active');
    return;
  }

  if (currentPage === 'about.html' || currentPage === 'projects.html' || currentPage === 'gallery.html' || currentPage === 'contact.html') {
    const pageLink = document.querySelector(`nav a[href="${currentPage}"]`);
    if (pageLink) pageLink.classList.add('active');
    return;
  }

  const homeLink = document.querySelector('nav a[href="index.html"]');
  if (homeLink) homeLink.classList.add('active');
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// ========================
// Gallery Auto-Layout
// ========================
function optimizeGalleryLayout() {
  const items = document.querySelectorAll('.gallery-item');
  
  if (window.innerWidth > 768) {
    items.forEach((item, index) => {
      if (index === 1) item.style.gridColumn = 'span 2';
      if (index === 3) item.style.gridColumn = 'span 2';
      if (index === 4) item.style.minHeight = '300px';
    });
  } else {
    items.forEach(item => {
      item.style.gridColumn = 'span 1';
      item.style.minHeight = '280px';
    });
  }
}

if (document.querySelector('.gallery-item')) {
  optimizeGalleryLayout();
  window.addEventListener('resize', optimizeGalleryLayout);
}

// ========================
// Form Validation
// ========================
const contactForm = document.querySelector('form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = contactForm.querySelector('#name');
    const email = contactForm.querySelector('#email');
    const message = contactForm.querySelector('#message');
    
    // Basic validation
    if (!name.value.trim()) {
      showNotification('Please enter your name', 'error');
      name.focus();
      return;
    }
    
    if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      showNotification('Please enter a valid email', 'error');
      email.focus();
      return;
    }
    
    if (!message.value.trim()) {
      showNotification('Please enter a message', 'error');
      message.focus();
      return;
    }
    
    // Simulate submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
}

// ========================
// Notification System
// ========================
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '16px 24px',
    borderRadius: '8px',
    fontWeight: '600',
    zIndex: '9999',
    animation: 'slideInRight 0.3s ease',
    maxWidth: '400px',
    wordWrap: 'break-word'
  });
  
  if (type === 'success') {
    notification.style.background = '#2e8b57';
    notification.style.color = '#ffffff';
  } else if (type === 'error') {
    notification.style.background = '#ee4d5a';
    notification.style.color = '#ffffff';
  } else {
    notification.style.background = '#f0f0f0';
    notification.style.color = '#333';
  }
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ========================
// Lazy Loading Images
// ========================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ========================
// Counter Animation
// ========================
function animateCounter() {
  const stats = document.querySelectorAll('.stat-item strong');
  
  stats.forEach(stat => {
    const finalValue = stat.textContent;
    const numericValue = parseInt(finalValue.replace(/\D/g, ''));
    
    if (!isNaN(numericValue)) {
      let currentValue = 0;
      const increment = Math.ceil(numericValue / 50);
      
      const counter = setInterval(() => {
        currentValue += increment;
        if (currentValue >= numericValue) {
          stat.textContent = finalValue;
          clearInterval(counter);
        } else {
          stat.textContent = currentValue.toLocaleString() + '+';
        }
      }, 30);
    }
  });
}

// Trigger counter animation when stats become visible
const statsWrap = document.querySelector('.stats-wrap');
if (statsWrap) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  statsObserver.observe(statsWrap);
}

// ========================
// Mobile Menu Close on Link Click
// ========================
const navCheck = document.querySelector('.nav-check');
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navCheck) navCheck.checked = false;
  });
});

// ========================
// Prevent Layout Shift
// ========================
window.addEventListener('load', () => {
  document.querySelectorAll('img').forEach(img => {
    if (!img.style.aspectRatio && img.naturalWidth && img.naturalHeight) {
      img.style.aspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`;
    }
  });
});

// ========================
// Add Animations CSS
// ========================
if (!document.getElementById('animations-style')) {
  const style = document.createElement('style');
  style.id = 'animations-style';
  style.textContent = `
    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes fadeOut {
      from {
        opacity: 1;
        transform: translateX(0);
      }
      to {
        opacity: 0;
        transform: translateX(30px);
      }
    }
  `;
  document.head.appendChild(style);
}

// ========================
// Keyboard Navigation
// ========================
document.addEventListener('keydown', (e) => {
  // Focus management
  if (e.key === 'Escape') {
    // Close any open modals
    document.querySelectorAll('.lightbox.active').forEach(modal => {
      modal.classList.remove('active');
    });
  }
});

// ========================
// Performance Monitoring
// ========================
if (window.performance && window.performance.timing) {
  window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log('Page Load Time: ' + pageLoadTime + 'ms');
  });
}