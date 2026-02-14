// Enhanced VMC Technical Memo Animations and Interactions
document.addEventListener('DOMContentLoaded', function() {

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Enhanced search functionality with animations
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');

  if (searchInput && searchButton) {
    let searchTimeout;

    searchInput.addEventListener('input', function() {
      clearTimeout(searchTimeout);
      const searchTerm = this.value.trim();

      // Animate search button based on input
      if (searchTerm.length > 0) {
        searchButton.classList.add('search-active');
      } else {
        searchButton.classList.remove('search-active');
      }

      // Debounced search
      searchTimeout = setTimeout(() => {
        if (searchTerm.length >= 2) {
          performSearch(searchTerm);
        }
      }, 300);
    });

    searchButton.addEventListener('click', function() {
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        performSearch(searchTerm);
      } else {
        // Shake animation for empty search
        searchInput.classList.add('shake');
        setTimeout(() => searchInput.classList.remove('shake'), 500);
      }
    });

    // Enter key support
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        searchButton.click();
      }
    });
  }

  function performSearch(term) {
    console.log('Recherche:', term);
    // Add search result animation
    showSearchResults(term);
  }

  function showSearchResults(term) {
    // Create a temporary search results notification
    const notification = document.createElement('div');
    notification.className = 'search-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">🔍</span>
        <span>Recherche de "${term}"...</span>
      </div>
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => notification.classList.add('show'), 10);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Card hover effects
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.classList.add('card-hover');
    });

    card.addEventListener('mouseleave', function() {
      this.classList.remove('card-hover');
    });
  });

  // Button ripple effect
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Theme toggle (if needed in future)
  function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌓';
    themeToggle.title = 'Changer de thème';

    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-theme');
      const isDark = document.body.classList.contains('dark-theme');
      localStorage.setItem('vmc-theme', isDark ? 'dark' : 'light');

      // Animate theme change
      document.body.style.transition = 'background-color 0.5s, color 0.5s';
      setTimeout(() => {
        document.body.style.transition = '';
      }, 500);
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('vmc-theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
    }

    // Add to header
    const header = document.querySelector('header');
    if (header) {
      header.appendChild(themeToggle);
    }
  }

  // Initialize theme toggle
  initThemeToggle();

  // Parallax effect for header background
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('header');

    if (header) {
      const rate = scrolled * -0.5;
      header.style.backgroundPosition = `center ${rate}px`;
    }
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  document.querySelectorAll('.card, .section-container, .feature-item').forEach(el => {
    observer.observe(el);
  });

  // Loading progress enhancement
  function enhanceLoadingProgress() {
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
        }
        progressBar.style.width = progress + '%';
      }, 200);
    }
  }

  enhanceLoadingProgress();

  // Accessibility improvements
  function initAccessibility() {
    // Focus management for menu
    const menuButton = document.getElementById('menuButton');
    const sideMenu = document.getElementById('sideMenu');

    if (menuButton && sideMenu) {
      menuButton.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });

      // Trap focus in menu when open
      const focusableElements = sideMenu.querySelectorAll('a, button');
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      document.addEventListener('keydown', function(e) {
        if (sideMenu.classList.contains('open')) {
          if (e.key === 'Tab') {
            if (e.shiftKey) {
              if (document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
              }
            } else {
              if (document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
              }
            }
          }
        }
      });
    }

    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Aller au contenu principal';
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  initAccessibility();

  // Performance monitoring
  function initPerformanceMonitoring() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      window.addEventListener('load', function() {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
        }, 0);
      });
    }
  }

  initPerformanceMonitoring();
});

// Additional CSS for dynamic elements
const additionalStyles = `
/* Search Notification */
.search-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background: var(--primary-color);
  color: white;
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 3000;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  max-width: 300px;
}

.search-notification.show {
  transform: translateX(0);
}

.notification-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.notification-icon {
  font-size: 1.2rem;
}

/* Shake Animation */
.shake {
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

/* Ripple Effect */
.ripple-effect {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  transform: scale(0);
  animation: ripple 0.6s linear;
  pointer-events: none;
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

/* Search Active State */
.search-active {
  animation: pulse 1s infinite;
}

/* Card Hover Enhancement */
.card-hover {
  animation: cardPulse 0.6s ease;
}

@keyframes cardPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

/* Theme Toggle */
.theme-toggle {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  z-index: 100;
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

/* Skip Link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--primary-color);
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 4000;
  transition: top 0.3s ease;
}

.skip-link:focus {
  top: 6px;
}

/* Enhanced Focus States */
.btn:focus,
#searchInput:focus,
.menu-button:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);