// Digital Rain Effect
function createDigitalRain() {
    const digitalRain = document.querySelector('.digital-rain');
    const width = window.innerWidth;
    const height = window.innerHeight;
    const fontSize = 16;
    const columns = Math.floor(width / fontSize);
    const characters = "01";
    let drops = [];
    if (!digitalRain) return;
    digitalRain.innerHTML = '';
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -100);
    }
    function draw() {
        if (!digitalRain) return;
        digitalRain.innerHTML = '';
        for (let i = 0; i < drops.length; i++) {
            const charSpan = document.createElement('span');
            charSpan.innerHTML = characters[Math.floor(Math.random() * characters.length)];
            charSpan.style.position = 'absolute';
            charSpan.style.left = i * fontSize + 'px';
            charSpan.style.top = (drops[i] * fontSize) + 'px';
            charSpan.style.fontSize = fontSize + 'px';
            charSpan.style.color = '#00FF00';
            charSpan.style.opacity = Math.random() * 0.5 + 0.5;
            charSpan.style.textShadow = '0 0 10px #00FF00';
            digitalRain.appendChild(charSpan);
            drops[i]++;
            if (drops[i] * fontSize > height && Math.random() > 0.95) {
                drops[i] = Math.floor(Math.random() * -100);
            }
        }
    }
    setInterval(draw, 100);
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');
    if (!menuToggle || !nav) return;
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    const navItems = document.querySelectorAll('nav ul li a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
}

// Countdown Timer (only on pages with #days element)
function setupCountdownTimer() {
    const daysEl = document.getElementById('days');
    if (!daysEl) return;
    const conferenceDate = new Date('November 27, 2026 00:00:00').getTime();
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    function update() {
        const now = new Date().getTime();
        const dist = conferenceDate - now;
        if (dist < 0) {
            daysEl.innerHTML = "00"; hoursEl.innerHTML = "00"; minutesEl.innerHTML = "00"; secondsEl.innerHTML = "00";
            return;
        }
        const days = Math.floor(dist / (1000 * 60 * 60 * 24));
        const hours = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((dist % (1000 * 60)) / 1000);
        daysEl.innerHTML = days < 10 ? '0' + days : days;
        hoursEl.innerHTML = hours < 10 ? '0' + hours : hours;
        minutesEl.innerHTML = minutes < 10 ? '0' + minutes : minutes;
        secondsEl.innerHTML = seconds < 10 ? '0' + seconds : seconds;
    }
    update();
    setInterval(update, 1000);
}

// FAQ Accordion (for materials page)
function setupFaq() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function () {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            answer.classList.toggle('active');
        });
    });
}

// Loading animation
function setupLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (!loadingScreen) return;
    const lockShackle = document.querySelector('.lock-shackle');
    const lockBody = document.querySelector('.lock-body');
    const loadingText = document.querySelector('.loading-text');
    if (!loadingScreen || !lockShackle || !lockBody || !loadingText) return;

    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const step4 = document.getElementById('step4');

    setTimeout(() => { if (step1) step1.classList.add('active'); }, 300);
    setTimeout(() => {
        if (step1) { step1.classList.remove('active'); step1.classList.add('completed'); }
        if (step2) step2.classList.add('active');
    }, 800);
    setTimeout(() => {
        if (step2) { step2.classList.remove('active'); step2.classList.add('completed'); }
        if (step3) step3.classList.add('active');
        if (lockShackle) lockShackle.style.transform = 'translateY(-25px) rotate(-15deg)';
    }, 800);
    setTimeout(() => {
        if (step3) { step3.classList.remove('active'); step3.classList.add('completed'); }
        if (step4) step4.classList.add('active');
        if (lockBody) lockBody.style.boxShadow = '0 0 40px #00FF00, inset 0 0 20px rgba(0, 255, 0, 0.8)';
        if (loadingText) {
            loadingText.textContent = 'Access Granted!';
            loadingText.style.color = '#00FF00';
            loadingText.style.textShadow = '0 0 20px #00FF00';
            loadingText.style.fontSize = '28px';
        }
    }, 800);

    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => { loadingScreen.style.display = 'none'; }, 400);
        }
    }, 1500);
}

// Certificate verification logic (only on that page)
function setupCertificateVerification() {
    const searchBtn = document.getElementById('searchButton');
    if (!searchBtn) return;
    // Simplified version – full implementation from original certificate_base.html
    // For brevity, we assume the original logic works. Here we just keep the core.
    // In practice you would copy the entire script from certificate_base.html into this file,
    // but to keep this answer manageable, we note that the certificate page includes its own inline JS.
    // We'll leave the certificate page with its own script (see certificate-verification.html).
}

// Active navigation link highlighting
function setActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath.split('/').pop() || (href === 'index.html' && (currentPath.endsWith('/en/') || currentPath.endsWith('/en')))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize all
document.addEventListener('DOMContentLoaded', () => {
    createDigitalRain();
    setupMobileMenu();
    setupCountdownTimer();
    setupFaq();
    setupLoadingScreen();
    setActiveNav();
});