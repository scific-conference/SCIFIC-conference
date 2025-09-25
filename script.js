// Digital Rain Effect
function createDigitalRain() {
    const digitalRain = document.querySelector('.digital-rain');
    const width = window.innerWidth;
    const height = window.innerHeight;
    const fontSize = 16;
    const columns = Math.floor(width / fontSize);
    const characters = "01";
    let drops = [];

    // Clear existing content
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

    if (!menuToggle || !nav) {
        console.error('Mobile menu elements not found');
        return;
    }

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close menu when a nav item is clicked
    const navItems = document.querySelectorAll('nav ul li a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Handle screen size changes
    function handleScreenResize() {
        // Close mobile menu on larger screens
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    }

    // Run on load and resize
    window.addEventListener('load', handleScreenResize);
    window.addEventListener('resize', handleScreenResize);
}

// Countdown Timer
function setupCountdownTimer() {
    const conferenceDate = new Date('November 27, 2025 00:00:00').getTime();
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        console.error('Countdown timer elements not found');
        return;
    }

    function updateCounter() {
        const now = new Date().getTime();
        const distance = conferenceDate - now;

        if (distance < 0) {
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

// Navigation
// Navigation
function setupNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a, .footer-links ul li a');

    // Устанавливаем только одну активную секцию
    function setActiveSectionOnly(targetSection) {
        // Удаляем активный класс со всех секций
        sections.forEach(section => section.classList.remove('active'));

        // Добавляем активный класс к целевой секции
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }

    function handleNavClick(e) {
        e.preventDefault();
        const href = this.getAttribute('href');

        // Проверяем, что href не пустой и не просто #
        if (!href || href === '#') {
            return;
        }

        // Ищем целевую секцию
        const targetSection = document.querySelector(href);
        if (!targetSection) {
            return;
        }

        // Удаляем активный класс со всех ссылок
        navLinks.forEach(link => link.classList.remove('active'));

        // Добавляем активный класс к текущей ссылке
        this.classList.add('active');

        // Устанавливаем только одну активную секцию
        setActiveSectionOnly(targetSection);

        // Рассчитываем позицию прокрутки
        const headerOffset = 80; // Высота хедера
        const offsetPosition = targetSection.offsetTop - headerOffset;

        // Плавно прокручиваем к целевой секции
        window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth'
        });
    }

    // Добавляем обработчик ко всем навигационным ссылкам
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // Обработка якорных ссылок из других частей сайта
    document.querySelectorAll('a[href^="#"]:not([href="#"]):not(nav a):not(.footer-links a)').forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // Убедимся, что при загрузке страницы только секция #home активна
    function initializeActiveSection() {
        // Удаляем активный класс со всех секций
        sections.forEach(section => section.classList.remove('active'));

        // Добавляем активный класс к секции home
        const homeSection = document.getElementById('home');
        if (homeSection) {
            homeSection.classList.add('active');
        }

        // Удаляем активный класс со всех ссылок
        navLinks.forEach(link => link.classList.remove('active'));

        // Добавляем активный класс к ссылке home
        const homeLink = document.querySelector('nav ul li a[href="#home"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }

    // Инициализация активного раздела при загрузке
    initializeActiveSection();

    // Инициализация активного раздела при загрузке с хешем
    const hash = window.location.hash;
    if (hash && hash !== '#') {
        const targetSection = document.querySelector(hash);
        if (targetSection) {
            // Удаляем активный класс со всех ссылок
            navLinks.forEach(link => link.classList.remove('active'));

            // Добавляем активный класс к соответствующей ссылке
            const activeLink = document.querySelector(`nav ul li a[href="${hash}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }

            // Устанавливаем только одну активную секцию
            setActiveSectionOnly(targetSection);

            setTimeout(() => {
                const headerOffset = 80;
                const offsetPosition = targetSection.offsetTop - headerOffset;

                window.scrollTo({
                    top: Math.max(0, offsetPosition),
                    behavior: 'auto'
                });
            }, 100);
        }
    }

    // Установка активного раздела при прокрутке
    function setActiveSection() {
        const scrollPosition = window.scrollY;
        const headerHeight = 80; // Высота хедера

        let currentSection = null;

        // КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: Если пользователь в самом верху страницы, 
        // устанавливаем активной секцию #home, а не другую секцию
        if (scrollPosition < 10) {
            currentSection = document.getElementById('home');
        } else {
            sections.forEach(section => {
                // Рассчитываем границы видимости секции
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;

                // Проверяем, находится ли секция в видимой области с учетом высоты хедера
                if (scrollPosition >= sectionTop - headerHeight &&
                    scrollPosition < sectionBottom - headerHeight) {
                    currentSection = section;
                }
            });
        }

        if (currentSection) {
            // Удаляем активный класс со всех ссылок
            navLinks.forEach(link => link.classList.remove('active'));

            // Находим соответствующую ссылку навигации
            const activeLink = document.querySelector(`nav ul li a[href="#${currentSection.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }

    // Обновление активного раздела при прокрутке
    window.addEventListener('scroll', setActiveSection);
    window.addEventListener('resize', setActiveSection);

    // ДОПОЛНИТЕЛЬНОЕ ГАРАНТИРОВАННОЕ ИСПРАВЛЕНИЕ:
    // Устанавливаем активной ссылку "Home" через небольшую задержку,
    // чтобы перезаписать любые неправильные установки
    setTimeout(() => {
        // Удаляем активный класс со всех ссылок
        navLinks.forEach(link => link.classList.remove('active'));

        // Добавляем активный класс к ссылке home
        const homeLink = document.querySelector('nav ul li a[href="#home"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }, 500);
}

// Language Switching
function setupLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');

    // Translation data
    const translations = {
        en: {
            sections: "Home",
            materials: "Materials",
            contacts: "Contacts",
            participants: "Schedule",
            meetings: "Sections",
            archive: "Archive",
            registerNow: "Register Now",
            viewSchedule: "View Schedule",
            conferenceDescription: "We are glad to welcome you to the website of the conference, which is held at the Department of Computer Systems, Networks and Cybersecurity, for everyone who is passionate about cybersecurity.",
            dateLocation: "NAU \"KhAI\", Kharkiv • November 27-28, 2025",
            news1: "The deadline for submitting papers is November 15",
            news2: "Digital Literacy and Cybersecurity: Key Aspects of Training Specialists to Counter Cyber Threats",
            news3: "Cyberthreats evolve — we learn faster. Share expertise at our conference!",
            news4: "Join us!",
            conferenceMaterials: "Conference <span class='highlight'>Materials</span>",
            archiveTitle: "Conference Archive",
            archiveSubtitle: "Access materials from our past events (2010-2024)",
            contactsTitle: "Contacts & <span class='highlight'>Partners</span>",
            getInTouch: "Get in Touch",
            yourName: "Your Name",
            yourEmail: "Your Email",
            yourMessage: "Your Message",
            submit: "Submit",
            ourPartners: "Our Partners",
            participantsTitle: "Schedule",
            searchParticipants: "Search participants...",
            allTopics: "All Topics",
            security: "Security",
            ai: "AI",
            blockchain: "Blockchain",
            viewProfile: "View Profile",
            conferenceSchedule: "Conference Schedule",
            day1: "Day 1",
            day2: "Day 2",
            day3: "Day 3",
            meetingsTitle: "Links to <span class='highlight'>Sections</span>",
            joinNow: "Join Now",
            addToCalendar: "Add to Calendar",
            quickLinks: "Quick Links",
            connectWithUs: "Connect With Us",
            copyright: "© 2024 Heorhii Zemlianko<br>City: Kharkiv",
            registrationText1: "Abstracts of reports and applications for participation in the conference must be sent using the Google form (you need to press the \"Register\" button), to <span class=\"highlight\">November 15, 2025</span ",
            registrationText2: "Theses are sent electronically with the extension <span class=\"highlight\">«.doc»</span> or <span class=\"highlight\">«.docx»</span> and the name according to the template: <span class=\"highlight\">SURNAME-group_-Section_(1, 2)-Name_of_work. (Example: <a target=\"_blank\" href=\"https://drive.google.com/drive/folders/1ktg8FOQ__DUgoMT-h3jEWuMpgGRrn9pF\" class=\"example-link\">YUDIN-555im-Section_1-Protection_In_ICS</a>)</span ",
            registrationText3: "The cost of the organizational fee is 5 USD, the organizational fee is paid for one thesis of the report. If you want a printed version of the collection of theses, the amount will be 15 USD. The scientific edition is published from the ISBN. Payment details can be obtained through the organizing committee by writing a letter to <span class=\"highlight\">scific@csn.khai.edu</span",
            registrationText4: "<span class=\"registration-warning\">Important! Participants who plan to receive printed theses must choose the appropriate option in the form when registering and submitting their theses /span>",
            conferenceInfoText1: "The conference will be held online. Conference working languages: <span class=\"highlight\">Ukrainian</span>, <span class=\"highlight\">English</span>.",
            conferenceInfoText2: "<span class=\"highlight\">CONFERENCE TOPICS</span>:<br><span class=\"highlight\">Section 1</span>. Information and cybersecurity.<br><span class=\"highlight\">Section 2</span>. Functional safety.",
            conferenceInfoText3: "For more detailed information about the conference, click the \"<span class=\"highlight\">Join us</span>\" button to join a special Telegram group.<br>By clicking the \"<span class=\"highlight\">Conference program</span>\" button, you can review the conference program (up-to-date materials will be available a week before the conference).<br>If you need more detailed information about the conference and paper submission, click the \"<span class=\"highlight\">Information letter</span>\" button.",
            conferenceInfoText4: "Every year, valuable prizes are drawn among the best reports of the conference participants!",
            joinUsButton: "Join us",
            conferenceProgramButton: "Conference program",
            informationLetterButton: "Information letter"
        },
        uk: {
            sections: "Головна",
            materials: "Матеріали",
            contacts: "Контакти",
            participants: "Розклад",
            meetings: "Секції",
            archive: "Архів",
            registerNow: "Зареєструватися",
            viewSchedule: "Переглянути Розклад",
            conferenceDescription: "Ми раді вітати вас на сайті конференції, яка проходить на кафедрі Комп'ютерних систем, мереж і кібербезпеки, для всіх, хто захоплюється кібербезпекою.",
            dateLocation: "НАУ \"ХАІ\", Харків • 27-28 Листопада, 2025",
            news1: "Дедлайн подання робіт діє до 15 листопада",
            news2: "Цифрова грамотність та кібербезпека: ключові аспекти підготовки фахівців для протидії кіберзагрозам",
            news3: "Кіберзагрози еволюціонують — ми вчимося швидше. Поділіться досвідом на нашій конференції!",
            news4: "Приєднуйтесь до нас!",
            conferenceMaterials: "Конференційні <span class='highlight'>Матеріали</span>",
            archiveTitle: "<span class='highlight'>Архів</span> конференції",
            archiveSubtitle: "Доступ до матеріалів наших минулих заходів (2010-2024)",
            contactsTitle: "Контакти і <span class='highlight'>Партнери</span>",
            getInTouch: "Зв'яжіться з нами",
            yourName: "Ваше ім'я",
            yourEmail: "Ваша електронна пошта",
            yourMessage: "Ваше повідомлення",
            submit: "Надіслати",
            ourPartners: "Наші Партнери",
            participantsTitle: "Розклад",
            searchParticipants: "Пошук учасників...",
            allTopics: "Всі теми",
            security: "Безпека",
            ai: "ШІ",
            blockchain: "Блокчейн",
            viewProfile: "Переглянути Профіль",
            conferenceSchedule: "Розклад конференції",
            day1: "День 1",
            day2: "День 2",
            day3: "День 3",
            meetingsTitle: "Посилання на <span class='highlight'>Секції</span>",
            joinNow: "Приєднатися",
            addToCalendar: "Додати до календаря",
            quickLinks: "Швидкі посилання",
            connectWithUs: "Зв'яжіться з нами",
            copyright: "© 2024 Георгій Землянко<br>Місто: Харків",
            registrationText1: "Тези доповідей та заявку на участь у конференції, необхідно надіслати за допомогою google-форми (треба натиснути кнопку \"Зареєструватися\"), до <span class=\"highlight\">15 листопада 2025 року</span>.",
            registrationText2: "Тези надсилаються в електронному вигляді з розширенням <span class=\"highlight\">«.doc»</span> або <span class=\"highlight\">«.docx»</span> та назвою згідно шаблону: <span class=\"highlight\">ПРІЗВИЩЕ-група_-Секція_(1,2)-Назва_роботи. (Приклад: <a target=\"_blank\" href=\"https://drive.google.com/drive/folders/17EnEdAhusTHWuP9lOsJ9Oq4YfdM-K1Mj\" class=\"example-link\">ЮДІН-555ім-Секція_1-Захист_Інформації_в_ІКС</a>)</span>.",
            registrationText3: "Вартість організаційного внеску 50 грн, організаційний внесок сплачується за одні тези доповіді. Якщо бажана друкована версія збірника тез, то сума буде 150 грн. Наукове видання видається з ISBN. Реквізити оплати можна отримати через оргкомітет, написавши листа на пошту <span class=\"highlight\">scific@csn.khai.edu</span>.",
            registrationText4: "<span class=\"registration-warning\">Важливо! Учасники, які планують отримувати друковані тези, повинні вибрати відповідний варіант у формі під час реєстрації та подання своїх тези.</span>",
            conferenceInfoText1: "Конференція буде проходити онлайн. Робочі мови конференції: <span class=\"highlight\">українська</span>, <span class=\"highlight\">англійська</span>.",
            conferenceInfoText2: "<span class=\"highlight\">ТЕМИ КОНФЕРЕНЦІЇ</span>:<br><span class=\"highlight\">Секція 1</span>. Інформаційна безпека та кібербезпека.<br><span class=\"highlight\">Секція 2</span>. Функціональна безпека.",
            conferenceInfoText3: "Для отримання докладної інформації про конференцію, натисніть кнопку \"<span class=\"highlight\">Приєднатися</span>\", щоб приєднатися до спеціальної Telegram-групи.<br>Натиснувши кнопку \"<span class=\"highlight\">Програма конференції</span>\", ви зможете ознайомитися з програмою конференції (актуальні матеріали будуть доступні за тиждень до конференції).<br>Якщо вам потрібна докладна інформація про конференцію та подання робіт, натисніть кнопку \"<span class=\"highlight\">Інформаційний лист</span>\".",
            conferenceInfoText4: "Щороку серед найкращих доповідей учасників конференції розігруються цінні призи!",
            joinUsButton: "Приєднатися",
            conferenceProgramButton: "Програма конференції",
            informationLetterButton: "Інформаційний лист"
        }
    };

    // Function to update content based on language
    function updateContent(lang) {
        const data = translations[lang];

        // Update logo text based on language
        const logo = document.querySelector('.logo.glitch a');
        const logoGlitch = document.querySelector('.logo.glitch');
        if (logo && logoGlitch) {
            logo.textContent = lang === 'en' ? 'SCIFiC' : 'СКІФіК';
            logoGlitch.setAttribute('data-text', lang === 'en' ? 'SCIFiC' : 'СКІФіК');
        }

        // Add link to footer logo if not present
        const footerLogo = document.querySelector('.footer-logo .logo');
        if (footerLogo && !footerLogo.querySelector('a')) {
            const logoText = footerLogo.textContent;
            footerLogo.innerHTML = `<a href="#home">${logoText}</a>`;
        }
        if (footerLogo && footerLogo.querySelector('a')) {
            footerLogo.querySelector('a').textContent = lang === 'en' ? 'SCIFiC' : 'СКІФіК';
        }

        // Update navigation
        const navItems = document.querySelectorAll('nav ul li a');
        if (navItems.length >= 6) {
            navItems[0].textContent = data.sections;
            navItems[1].textContent = data.materials;
            navItems[2].textContent = data.participants;
            navItems[3].textContent = data.meetings;
            navItems[4].textContent = data.archive;
            navItems[5].textContent = data.contacts;
        }

        // Update registration block text
        const registrationBlockTexts = document.querySelectorAll('#registration-block .block-text > div > p');
        if (registrationBlockTexts.length >= 4) {
            registrationBlockTexts[0].innerHTML = data.registrationText1;
            registrationBlockTexts[1].innerHTML = data.registrationText2;
            registrationBlockTexts[2].innerHTML = data.registrationText3;
            registrationBlockTexts[3].innerHTML = data.registrationText4;
        }

        // Update home section
        const dateLocation = document.getElementById('date-location');
        const conferenceDescription = document.getElementById('conference-description');
        if (dateLocation) dateLocation.textContent = data.dateLocation;
        if (conferenceDescription) conferenceDescription.textContent = data.conferenceDescription;

        const ctaButtons = document.querySelectorAll('.cta-buttons a');
        if (ctaButtons.length >= 2) {
            ctaButtons[0].textContent = data.registerNow;
            ctaButtons[1].textContent = data.viewSchedule;
        }

        // Update conference information block text
        const conferenceInfoBlockTexts = document.querySelectorAll('#conference-info-block .block-text > div > p');
        if (conferenceInfoBlockTexts.length >= 4) {
            conferenceInfoBlockTexts[0].innerHTML = data.conferenceInfoText1;
            conferenceInfoBlockTexts[1].innerHTML = data.conferenceInfoText2;
            conferenceInfoBlockTexts[2].innerHTML = data.conferenceInfoText3;
            conferenceInfoBlockTexts[3].innerHTML = data.conferenceInfoText4;
        }

        // Update conference information block buttons
        const conferenceInfoBlockButtons = document.querySelectorAll('#conference-info-block .block-links a');
        if (conferenceInfoBlockButtons.length >= 3) {
            conferenceInfoBlockButtons[0].textContent = data.joinUsButton;
            conferenceInfoBlockButtons[1].textContent = data.conferenceProgramButton;
            conferenceInfoBlockButtons[2].textContent = data.informationLetterButton;
        }

        // Update Register Now button URL based on language
        const registerButton = document.getElementById('register-button');
        if (registerButton) {
            registerButton.setAttribute('href', lang === 'en' ? 'https://forms.gle/SqmMuFce2XWfuNxp8' : 'https://forms.gle/XPRaouqdcR4yoYNP6');
        }

        // Update news ticker
        const tickerItems = document.querySelectorAll('.ticker-content span');
        if (tickerItems.length >= 4) {
            tickerItems[0].textContent = data.news1;
            tickerItems[1].textContent = data.news2;
            tickerItems[2].textContent = data.news3;
            tickerItems[3].textContent = data.news4;
        }

        // Update section titles
        const materialsTitle = document.querySelector('#materials > h2');
        const contactsTitle = document.querySelector('#contacts > h2');
        const participantsTitle = document.querySelector('#participants > h2');
        const meetingsTitle = document.querySelector('#meetings > h2');

        if (materialsTitle) materialsTitle.innerHTML = data.conferenceMaterials;
        if (contactsTitle) contactsTitle.innerHTML = data.contactsTitle;
        if (participantsTitle) participantsTitle.textContent = data.participantsTitle;
        if (meetingsTitle) meetingsTitle.innerHTML = data.meetingsTitle;

        // Update archive title
        const archiveTitle = document.getElementById('archive-title');
        if (archiveTitle) {
            archiveTitle.innerHTML = lang === 'en' ? 'Conference <span class="highlight">Archive</span>' : '<span class="highlight">Архів</span> конференції';
        }

        // Update session card titles
        const sessionTitles = document.querySelectorAll('.session-card h3');
        if (sessionTitles.length >= 3) {
            sessionTitles[0].textContent = lang === 'en' ? 'Plenary Session' : 'Пленарне засідання';
            sessionTitles[1].textContent = lang === 'en' ? 'Section 1 - Information and Cybersecurity' : 'Секція 1 - Інформаційна безпека та кібербезпека';
            sessionTitles[2].textContent = lang === 'en' ? 'Section 2 - Functional Safety' : 'Секція 2 - Функціональна безпека';
        }

        // Update session times
        const sessionTimes = document.querySelectorAll('.session-card .session-time');
        if (sessionTimes.length >= 3) {
            sessionTimes[0].textContent = lang === 'en' ? 'All days of the conference' : 'Усі дні конференції';
            sessionTimes[1].textContent = lang === 'en' ? 'All days of the conference' : 'Усі дні конференції';
            sessionTimes[2].textContent = lang === 'en' ? 'All days of the conference' : 'Усі дні конференції';
        }

        // Update section titles
        const sectionTitles = document.querySelectorAll('.block-title');
        if (sectionTitles.length >= 2) {
            sectionTitles[0].textContent = lang === 'en' ? 'Registration' : 'Реєстрація';
            sectionTitles[1].textContent = lang === 'en' ? 'Information about Conference' : 'Інформація про конференцію';
        }

        // Update footer
        const footerLinks = document.querySelectorAll('.footer-links ul li a');
        if (footerLinks.length >= 6) {
            footerLinks[0].textContent = data.sections;
            footerLinks[1].textContent = data.materials;
            footerLinks[2].textContent = data.participants;
            footerLinks[3].textContent = data.meetings;
            footerLinks[4].textContent = data.archive;
            footerLinks[5].textContent = data.contacts;
        }

        // Update footer sections
        const footerLinksHeader = document.querySelector('.footer-links h3');
        const footerSocialHeader = document.querySelector('.footer-social h3');
        if (footerLinksHeader) footerLinksHeader.textContent = data.quickLinks;
        if (footerSocialHeader) footerSocialHeader.textContent = data.connectWithUs;

        // Update copyright
        const copyright = document.querySelector('.copyright p');
        if (copyright) {
            copyright.innerHTML = data.copyright;
        }

        // Update schedule table headers
        const tableHeaders = document.querySelectorAll('.conference-schedule th');
        if (tableHeaders.length >= 3) {
            tableHeaders[0].textContent = lang === 'en' ? 'Tasks' : 'Завдання';
            tableHeaders[1].textContent = lang === 'en' ? 'First day' : 'Перший день';
            tableHeaders[2].textContent = lang === 'en' ? 'Second day' : 'Другий день';
        }

        // Update schedule table rows
        const scheduleTasks = document.querySelectorAll('.conference-schedule .task-cell');
        if (scheduleTasks.length >= 9) {
            scheduleTasks[0].textContent = lang === 'en' ? 'Registration and connection verification' : 'Реєстрація та перевірка з\'єднання';
            scheduleTasks[1].textContent = lang === 'en' ? 'Plenary session' : 'Пленарне засідання';
            scheduleTasks[2].textContent = lang === 'en' ? 'Coffee-break' : 'Кава-брейк';
            scheduleTasks[3].textContent = lang === 'en' ? 'Work of the sections' : 'Робота секцій';
            scheduleTasks[4].textContent = lang === 'en' ? 'Coffee-break' : 'Кава-брейк';
            scheduleTasks[5].textContent = lang === 'en' ? 'Work of the sections' : 'Робота секцій';
            scheduleTasks[6].textContent = lang === 'en' ? 'Coffee-break' : 'Кава-брейк';
            scheduleTasks[7].textContent = lang === 'en' ? 'Moderators\' speech and discussion of the results of the section\'s work' : 'Виступи модераторів та обговорення результатів роботи секції';
            scheduleTasks[8].textContent = lang === 'en' ? 'Closing of the conference' : 'Закриття конференції';
        }

        // Update schedule times
        const firstDayTimes = document.querySelectorAll('.first-day-time');
        const secondDayTimes = document.querySelectorAll('.second-day-time');

        if (lang === 'en') {
            if (firstDayTimes.length >= 8) {
                firstDayTimes[0].textContent = '02:45 – 03:00 pm';
                firstDayTimes[1].textContent = '03:00 – 04:00 pm';
                firstDayTimes[2].textContent = '04:00 - 04:05 pm';
                firstDayTimes[3].textContent = '04:05 - 05:15 pm';
                firstDayTimes[4].textContent = '05:15 - 05:20 pm';
                firstDayTimes[5].textContent = '05:20 – 06:30 pm';
                firstDayTimes[6].textContent = '06:30 – 06:45 pm';
                firstDayTimes[7].textContent = '06:45 – 07:00 pm';
            }
            if (secondDayTimes.length >= 9) {
                secondDayTimes[0].textContent = '09:45 – 10:00 am';
                secondDayTimes[1].textContent = '10:00 – 10:55 am';
                secondDayTimes[2].textContent = '10:55 – 11:00 am';
                secondDayTimes[3].textContent = '11:00 am – 12:20 pm';
                secondDayTimes[4].textContent = '12:20 – 12:25 pm';
                secondDayTimes[5].textContent = '12:25 – 01:30 pm';
                secondDayTimes[6].textContent = '01:30 – 01:45 pm';
                secondDayTimes[7].textContent = '01:45 – 02:00 pm';
                secondDayTimes[8].textContent = '01:55 – 02:00 pm';
            }
        } else {
            if (firstDayTimes.length >= 8) {
                firstDayTimes[0].textContent = '14:45 – 15:00';
                firstDayTimes[1].textContent = '15:00 – 15:45';
                firstDayTimes[2].textContent = '16:00 - 16:05';
                firstDayTimes[3].textContent = '16:05 - 17:15';
                firstDayTimes[4].textContent = '17:15 - 17:20';
                firstDayTimes[5].textContent = '17:20 – 18:30';
                firstDayTimes[6].textContent = '18:30 – 18:45';
                firstDayTimes[7].textContent = '18:45 – 19:00';
            }
            if (secondDayTimes.length >= 9) {
                secondDayTimes[0].textContent = '09:50 – 10:00';
                secondDayTimes[1].textContent = '10:00 – 10:50';
                secondDayTimes[2].textContent = '10:50 - 10:55';
                secondDayTimes[3].textContent = '10:55 – 12:20';
                secondDayTimes[4].textContent = '12:20 – 12:25';
                secondDayTimes[5].textContent = '12:25 – 14:00';
                secondDayTimes[6].textContent = '14:00 – 14:15';
                secondDayTimes[7].textContent = '14:15 – 14:25';
                secondDayTimes[8].textContent = '14:25 – 14:30';
            }
        }

        // Update button texts
        document.querySelectorAll('.join-button').forEach(btn => {
            const icon = btn.querySelector('ion-icon');
            if (icon) {
                btn.innerHTML = `<ion-icon name="enter-outline"></ion-icon> ${data.joinNow}`;
            } else {
                btn.textContent = data.joinNow;
            }
        });

        document.querySelectorAll('.calendar-button').forEach(btn => {
            const icon = btn.querySelector('ion-icon');
            if (icon) {
                btn.innerHTML = `<ion-icon name="calendar-outline"></ion-icon> ${data.addToCalendar}`;
            } else {
                btn.textContent = data.addToCalendar;
            }
        });

        // Добавлено: Обновление заголовков архивных блоков
        const archiveBlocks = document.querySelectorAll('.archive-block h3');
        archiveBlocks.forEach((block, index) => {
            const year = 2025 - index;
            if (lang === 'en') {
                block.textContent = `Theses SCIFiC ${year}`;
            } else {
                block.textContent = `Збірник тез СКІФіК ${year}`;
            }
        });

        // Добавлено: Обновление текста в архивных ссылках
        const archiveLinks = document.querySelectorAll('.archive-links a');
        archiveLinks.forEach(link => {
            if (lang === 'en') {
                if (link.textContent.includes('Google')) {
                    link.textContent = 'GoogleDrive';
                } else if (link.textContent.includes('Research')) {
                    link.textContent = 'ResearchGate';
                } else if (link.textContent.includes('Library')) {
                    link.textContent = 'Library of KhAI';
                }
            } else {
                if (link.textContent.includes('Google')) {
                    link.textContent = 'GoogleDrive';
                } else if (link.textContent.includes('Research')) {
                    link.textContent = 'ResearchGate';
                } else if (link.textContent.includes('Library')) {
                    link.textContent = 'Бібліотека ХАІ';
                }
            }
        });

        // ИСПРАВЛЕНО: Обновление контактов
        const contactItems = document.querySelectorAll('.contact-list li');
        if (contactItems.length > 0) {
            if (lang === 'en') {
                // Проверяем каждый элемент перед обновлением
                if (contactItems.length >= 1) {
                    contactItems[0].innerHTML = '<strong>Conference Chair:</strong> <a href="https://education.khai.edu/person/Pievniev-Volodymyr-Yakovlevych-503" target="_blank" class="contact-link">Prof. Volodymir Pevnev</a>, <span class="highlight">PhD student Oles Yudin</span>';
                }
                if (contactItems.length >= 2) {
                    contactItems[1].innerHTML = '<strong>Program Committee:</strong> <a href="https://education.khai.edu/person/Kharchenko-Viacheslav-Serhiiovych-503" target="_blank" class="contact-link">Prof. Vyacheslav Kharchenko</a>, <a href="https://education.khai.edu/person/Zemlianko-Heorhii-Andriiovych-503" target="_blank" class="contact-link">Dr. Heorhii Zemlianko</a>, <span class="highlight">Mis. Daria Fedorenko</span>';
                }
                if (contactItems.length >= 3) {
                    contactItems[2].innerHTML = '<strong>Technical Support:</strong> <a href="mailto:scific@csn.khai.edu" class="contact-link">scific@csn.khai.edu</a>';
                }
                if (contactItems.length >= 4) {
                    contactItems[3].innerHTML = '<strong>General Inquiries:</strong> <a href="mailto:scific@csn.khai.edu" class="contact-link">scific@csn.khai.edu</a>';
                }
                if (contactItems.length >= 5) {
                    contactItems[4].innerHTML = '<strong>Address:</strong> <span class="highlight">National Aerospace University "KhAI", vul. Vadyma Manka 17, Kharkiv, Ukraine</span>';
                }
            } else {
                // Проверяем каждый элемент перед обновлением
                if (contactItems.length >= 1) {
                    contactItems[0].innerHTML = '<strong>Голова конференції:</strong> <a href="https://education.khai.edu/person/Pievniev-Volodymyr-Yakovlevych-503" target="_blank" class="contact-link">Проф. П\'євнєв Володимир</a>, <span class="highlight">аспірант Юдін Олесь</span>';
                }
                if (contactItems.length >= 2) {
                    contactItems[1].innerHTML = '<strong>Програмний комітет:</strong> <a href="https://education.khai.edu/person/Kharchenko-Viacheslav-Serhiiovych-503" target="_blank" class="contact-link">Проф. Харченко В\'ячеслав</a>, <a href="https://education.khai.edu/person/Zemlianko-Heorhii-Andriiovych-503" target="_blank" class="contact-link">Д-р філософії Землянко Георгій</a>, <span class="highlight">Федоренко Дар\'я</span>';
                }
                if (contactItems.length >= 3) {
                    contactItems[2].innerHTML = '<strong>Технічна підтримка:</strong> <a href="mailto:scific@csn.khai.edu" class="contact-link">scific@csn.khai.edu</a>';
                }
                if (contactItems.length >= 4) {
                    contactItems[3].innerHTML = '<strong>Загальні запитання:</strong> <a href="mailto:scific@csn.khai.edu" class="contact-link">scific@csn.khai.edu</a>';
                }
                if (contactItems.length >= 5) {
                    contactItems[4].innerHTML = '<strong>Адреса:</strong> <span class="highlight">Національний Аерокосмічний Університет "ХАІ", вул. Вадима Манька 17, м. Харків, Україна</span>';
                }
            }
        }
    }

    // Language button click event
    langButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            // Remove active class from all buttons
            langButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Update content to the selected language
            const lang = this.getAttribute('data-lang');
            updateContent(lang);
        });
    });

    // Initialize with default language (English)
    updateContent('en');
}

// Loading animation
function setupLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const lockShackle = document.querySelector('.lock-shackle');
    const lockBody = document.querySelector('.lock-body');
    const loadingText = document.querySelector('.loading-text');

    if (!loadingScreen || !lockShackle || !lockBody || !loadingText) {
        console.error('Loading screen elements not found');
        return;
    }

    // Get all steps
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const step4 = document.getElementById('step4');

    // Sequence the steps with the animation
    setTimeout(() => {
        if (step1) step1.classList.add('active');
    }, 300);

    setTimeout(() => {
        if (step1) {
            step1.classList.remove('active');
            step1.classList.add('completed');
        }
        if (step2) step2.classList.add('active');
    }, 800);

    setTimeout(() => {
        if (step2) {
            step2.classList.remove('active');
            step2.classList.add('completed');
        }
        if (step3) step3.classList.add('active');
        // Unlock the shackle (lift it up) after key turns
        if (lockShackle) lockShackle.style.transform = 'translateY(-25px) rotate(-15deg)';
    }, 800);

    setTimeout(() => {
        if (step3) {
            step3.classList.remove('active');
            step3.classList.add('completed');
        }
        if (step4) step4.classList.add('active');
        // Make lock glow brighter
        if (lockBody) lockBody.style.boxShadow = '0 0 40px #00FF00, inset 0 0 20px rgba(0, 255, 0, 0.8)';
        // Change loading text
        if (loadingText) {
            loadingText.textContent = 'Access Granted!';
            loadingText.style.color = '#00FF00';
            loadingText.style.textShadow = '0 0 20px #00FF00';
            loadingText.style.fontSize = '28px';
        }
    }, 800);

    // Hide loading screen after animation completes
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 400);
        }
    }, 1500);
}

// Initialize all functions when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupLoadingScreen();
    createDigitalRain();
    setupMobileMenu();
    setupCountdownTimer();
    setupNavigation();
    setupLanguageSwitcher();

    // Убедимся, что при загрузке страницы секция #home активна
    const homeSection = document.getElementById('home');
    if (homeSection) {
        // Удаляем активный класс со всех секций
        document.querySelectorAll('section').forEach(section =>
            section.classList.remove('active'));

        // Добавляем активный класс к секции home
        homeSection.classList.add('active');
    }

    // Fix for initial language display
    const currentLangBtn = document.querySelector('.lang-btn.active');
    if (currentLangBtn) {
        const lang = currentLangBtn.getAttribute('data-lang');
        if (lang === 'uk') {
            document.querySelector('.lang-btn[data-lang="uk"]').click();
        }
    }

    // Прокручиваем к верху страницы при загрузке
    window.scrollTo(0, 0);

    // Дополнительная гарантия - принудительная прокрутка к верху после небольшой задержки
    setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, 100);

    // Если есть хеш в URL, обрабатываем его, иначе оставляем на верху
    const hash = window.location.hash;
    if (hash && hash !== '#' && hash !== '#home') {
        // Обработка хеша как обычно
        const targetSection = document.querySelector(hash);
        if (targetSection) {
            const headerOffset = 80;
            const offsetPosition = targetSection.offsetTop - headerOffset;

            setTimeout(() => {
                window.scrollTo({
                    top: Math.max(0, offsetPosition),
                    behavior: 'auto'
                });
            }, 300);
        }
    } else {
        // Убедимся, что мы на верху страницы
        window.scrollTo(0, 0);
    }
});
