// Particles.js Configuration
particlesJS('particles-js', {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: '#00ff4c'
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000'
      },
    },
    opacity: {
      value: 0.5,
      random: true,
      animation: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      animation: {
        enable: true,
        speed: 2,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#00ff4c',
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false,
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'grab'
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 0.8
        }
      },
      push: {
        particles_nb: 4
      }
    }
  },
  retina_detect: true
});

// Page Loader
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const loaderContainer = document.querySelector('.loader-container');
    loaderContainer.classList.add('fade-out');
    setTimeout(() => {
      loaderContainer.style.display = 'none';
      
      // Initialize AOS
      AOS.init({
        duration: 800,
        offset: 100,
        once: true
      });
    }, 100);
  }, 100);
  
  // Initialize countdown timer
  setupCountdownTimer();
  
  // Setup header scroll effect
  setupHeaderScroll();
  
  // Initialize mobile menu
  setupMobileMenu();
  
  // Back to top button
  setupBackToTop();

  // Setup Topic and Speaker hover effects
  setupHoverEffects();

  // Setup floating elements random position
  setupFloatingElements();
});

// Countdown Timer
function setupCountdownTimer() {
  const conferenceDate = new Date('November 29, 2025 00:00:00').getTime();
  const daysElement = document.getElementById('days');
  const hoursElement = document.getElementById('hours');
  const minutesElement = document.getElementById('minutes');
  const secondsElement = document.getElementById('seconds');
  
  function updateCounter() {
    const now = new Date().getTime();
    const distance = conferenceDate - now;
    
    if(distance < 0) {
      daysElement.innerHTML = "00";
      hoursElement.innerHTML = "00";
      minutesElement.innerHTML = "00";
      secondsElement.innerHTML = "00";
      return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    daysElement.innerHTML = days < 10 ? `0${days}` : days;
    hoursElement.innerHTML = hours < 10 ? `0${hours}` : hours;
    minutesElement.innerHTML = minutes < 10 ? `0${minutes}` : minutes;
    secondsElement.innerHTML = seconds < 10 ? `0${seconds}` : seconds;
  }
  
  updateCounter();
  setInterval(updateCounter, 1000);
}

// Header Scroll Effect
function setupHeaderScroll() {
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Mobile Menu
function setupMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });
  
  // Close menu when link is clicked
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });
}

// Back to Top Button
function setupBackToTop() {
  const backToTopButton = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });
  
  backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Hover Effects for Cards
function setupHoverEffects() {
  // Topic cards glow effect
  const topicCards = document.querySelectorAll('.topic-card');
  
  topicCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 90, 28, 0.4) 0%, rgba(0, 30, 41, 0.7) 50%)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.background = 'rgba(0, 30, 41, 0.7)';
    });
  });
  
  // Speaker cards effects
  const speakerCards = document.querySelectorAll('.speaker-card');
  
  speakerCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const speakerInfo = card.querySelector('.speaker-info');
      speakerInfo.style.background = 'rgba(0, 30, 41, 0.9)';
      speakerInfo.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
      const speakerInfo = card.querySelector('.speaker-info');
      speakerInfo.style.background = '';
      speakerInfo.style.transform = '';
    });
  });
}

// Floating Elements
function setupFloatingElements() {
  const floatingElements = document.querySelectorAll('.float-element');
  const heroSection = document.querySelector('.hero');
  
  if (floatingElements.length && heroSection) {
    const heroWidth = heroSection.offsetWidth;
    const heroHeight = heroSection.offsetHeight;
    
    floatingElements.forEach((element, index) => {
      // Random position
      let topPos = Math.floor(Math.random() * (heroHeight * 0.8));
      let leftPos = Math.floor(Math.random() * (heroWidth * 0.8));
      
      // Make sure elements don't overlap with the center content
      if (leftPos > heroWidth * 0.3 && leftPos < heroWidth * 0.7) {
        if (Math.random() > 0.5) {
          leftPos = Math.floor(Math.random() * (heroWidth * 0.3));
        } else {
          leftPos = Math.floor(Math.random() * (heroWidth * 0.3) + heroWidth * 0.7);
        }
      }
      
      element.style.top = `${topPos}px`;
      element.style.left = `${leftPos}px`;
    });
  }
}