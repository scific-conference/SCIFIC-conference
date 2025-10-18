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
            function handleScreenResize() {
                if (window.innerWidth > 768 && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            }
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
            if (!daysElement || !hoursElement || !minutesElement || !secondsElement) return;
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
        function setupNavigation() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('nav ul li a, .footer-links ul li a');
            function setActiveSectionOnly(targetSection) {
                sections.forEach(section => section.classList.remove('active'));
                if (targetSection) targetSection.classList.add('active');
            }
            function handleNavClick(e) {
                //e.preventDefault();
                const href = this.getAttribute('href');
                if (!href || href === '#') return;
                const targetSection = document.querySelector(href);
                if (!targetSection) return;
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
                setActiveSectionOnly(targetSection);
                const headerOffset = 80;
                const offsetPosition = targetSection.offsetTop - headerOffset;
                window.scrollTo({ top: Math.max(0, offsetPosition), behavior: 'smooth' });
            }
            navLinks.forEach(link => link.addEventListener('click', handleNavClick));
            document.querySelectorAll('a[href^="#"]:not([href="#"]):not(nav a):not(.footer-links a)').forEach(link => {
                link.addEventListener('click', handleNavClick);
            });
            function initializeActiveSection() {
                sections.forEach(section => section.classList.remove('active'));
                const homeSection = document.getElementById('home');
                if (homeSection) homeSection.classList.add('active');
                navLinks.forEach(link => link.classList.remove('active'));
                const homeLink = document.querySelector('nav ul li a[href="#home"]');
                if (homeLink) homeLink.classList.add('active');
            }
            initializeActiveSection();
            const hash = window.location.hash;
            if (hash && hash !== '#') {
                const targetSection = document.querySelector(hash);
                if (targetSection) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    const activeLink = document.querySelector(`nav ul li a[href="${hash}"]`);
                    if (activeLink) activeLink.classList.add('active');
                    setActiveSectionOnly(targetSection);
                    setTimeout(() => {
                        const headerOffset = 80;
                        const offsetPosition = targetSection.offsetTop - headerOffset;
                        window.scrollTo({ top: Math.max(0, offsetPosition), behavior: 'auto' });
                    }, 100);
                }
            }
            function setActiveSection() {
                const scrollPosition = window.scrollY;
                const headerHeight = 80;
                let currentSection = null;
                if (scrollPosition < 10) {
                    currentSection = document.getElementById('home');
                } else {
                    sections.forEach(section => {
                        const sectionTop = section.offsetTop;
                        const sectionBottom = sectionTop + section.offsetHeight;
                        if (scrollPosition >= sectionTop - headerHeight && scrollPosition < sectionBottom - headerHeight) {
                            currentSection = section;
                        }
                    });
                }
                if (currentSection) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    const activeLink = document.querySelector(`nav ul li a[href="#${currentSection.id}"]`);
                    if (activeLink) activeLink.classList.add('active');
                }
            }
            window.addEventListener('scroll', setActiveSection);
            window.addEventListener('resize', setActiveSection);
            setTimeout(() => {
                navLinks.forEach(link => link.classList.remove('active'));
                const homeLink = document.querySelector('nav ul li a[href="#home"]');
                if (homeLink) homeLink.classList.add('active');
            }, 500);
        }

        // Language Switching
        function setupLanguageSwitcher() {
            const langButtons = document.querySelectorAll('.lang-btn');

            const translations = {
                en: {
                    sections: "Home",
                    materials: "Materials",
                    contacts: "Contacts",
                    participants: "Schedule",
                    meetings: "Sections",
                    archive: "Archive",
                    registerNow: "Register Now",
                    contactUs: "Contact Us",
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
                    registrationText1: "Abstracts of reports and applications for participation in the conference must be sent using the Google form (you need to press the \"Register\" button), to <span class=\"highlight\">November 15, 2025</span>.",
                    registrationText2: "Theses are sent electronically with the extension <span class=\"highlight\">«.doc»</span> or <span class=\"highlight\">«.docx»</span> and the name according to the template: <span class=\"highlight\">SURNAME-group_-Section_(1, 2)-Name_of_work. (Example: <a target=\"_blank\" href=\"https://drive.google.com/drive/folders/1ktg8FOQ__DUgoMT-h3jEWuMpgGRrn9pF\" class=\"example-link\">YUDIN-555im-Section_1-Protection_In_ICS</a>)</span>",
                    registrationText3: "Participation in the conference is <span class=\"highlight\">free</span>. If you would like to receive a printed version of the abstract book, the cost will be <span class=\"highlight\">$15</span>, shipping costs are separate and depend on the delivery location. The scientific edition is published from the ISBN. Payment details can be obtained through the organizing committee by writing a letter to <span class=\"highlight\">scific@csn.khai.edu</span>",
                    registrationText4: "<span class=\"registration-warning\">Important! Participants who plan to receive printed theses must choose the appropriate option in the form when registering and submitting their theses </span>",
                    conferenceInfoText1: "The conference will be held online. Conference working languages: <span class=\"highlight\">Ukrainian</span>, <span class=\"highlight\">English</span>.",
                    conferenceInfoText2: "<span class=\"highlight\">CONFERENCE TOPICS</span>:<br><span class=\"highlight\">Section 1</span>. Information and cybersecurity.<br><span class=\"highlight\">Section 2</span>. Functional safety.<br><span class=\"highlight\">Section 3</span>. Legal provision of cybersecurity.",
                    conferenceInfoText3: "For more detailed information about the conference, click the \"<span class=\"highlight\">Join us</span>\" button to join a special Telegram group.<br>By clicking the \"<span class=\"highlight\">Conference program</span>\" button, you can review the conference program (up-to-date materials will be available a week before the conference).<br>If you need more detailed information about the conference and paper submission, click the \"<span class=\"highlight\">Information letter</span>\" button.",
                    conferenceInfoText4: "Every year, valuable prizes are drawn among the best reports of the conference participants!",
                    joinUsButton: "Join us",
                    conferenceProgramButton: "Conference program",
                    informationLetterButton: "Information letter",
                    thesisTemplate: "Thesis Template",
                    templateLinks: {
                        en: "https://drive.google.com/drive/folders/1ktg8FOQ__DUgoMT-h3jEWuMpgGRrn9pF",
                        uk: "https://drive.google.com/drive/folders/17EnEdAhusTHWuP9lOsJ9Oq4YfdM-K1Mj"
                    },
                    faqTitle: "FAQ",
                    faqQuestions: [
                        { question: "What is the format of the conference?", answer: "The conference is held in an online format." },
                        { question: "What are the working languages ​​of the conference?", answer: "Working languages ​​of the conference: <span class=\"highlight\">Ukrainian</span> or <span class=\"highlight\">English</span>." },
                        { question: "Can I submit several abstracts from one author?", answer: "Yes, one author can submit an unlimited number of abstracts for consideration, but during the conference he must reveal and report on all of them." },
                        { question: "Can I publish abstracts that have already been printed before?", answer: "No, only original works that have not been published before will be accepted for consideration." },
                        { question: "Will there be an ISBN/ISSN?", answer: "Yes, the collection of abstracts will be assigned an ISBN." },
                        { question: "Is personal presence mandatory?", answer: "Participants are required to attend online meetings in person, and must connect according to the conference schedule via the designated links on the conference website." },
                        { question: "How will online access be organized?", answer: "Instructions for connecting to online sessions will be sent to registered participants by email." },
                        { question: "Are participant certificates provided?", answer: "Yes, all conference participants will receive a certificate in electronic form." },
                        { question: "Is it possible to speak without submitting an abstract?", answer: "No, participants can only give a presentation if they submit their abstracts by the established deadline." },
                        { question: "What is the deadline for submitting papers?", answer: "The deadline for submitting abstracts is <span class=\"highlight\">11/15/2025</span>." },
                        { question: "What is the format for submitting papers?", answer: "Abstracts should be submitted in electronic format with the extension <span class=\"highlight\">«.doc»</span> or <span class=\"highlight\">«.docx»</span> and the name according to the template: <span class=\"highlight\">SURNAME-Group-Section_(1,2)-Title_of_paper</span>." },
                        { question: "How to get a printed collection of abstracts?", answer: "Printed copies of the collection will be received by those who selected the item <span class=\"highlight\">I need a printed collection</span> during registration and paid the organizational fee." }
                    ],
                    contactListHTML: `
                        <h3><span class=\"highlight\">ORGANIZING COMMITTEE</span></h3>
                        <p><strong>Chairs of the Organizing Committee:</strong><br>
                        KHARCHENKO Viacheslav Serhiiovych (Dr. Sc. (Tech.), Prof., Department of Computer Systems, Networks and Cybersecurity, NAU "KhAI", Kharkiv, Ukraine);<br>
                        YUDIN Oles Viktorovych (PhD student, Department of Computer Systems, Networks and Cybersecurity, NAU "KhAI", Kharkiv, Ukraine).</p><br>
                        <p><strong>Co-Chairs of the Organizing Committee:</strong><br>
                        PEVNEV Volodymyr Yakovlevych (Dr. Sc. (Tech.), Assoc. Prof., Department of Computer Systems, Networks and Cybersecurity, NAU "KhAI", Kharkiv, Ukraine);<br>
                        ZEMLIANKO Heorhii Andriiovych (PhD in Cybersecurity, Assoc. Prof., Department of Computer Systems, Networks and Cybersecurity, NAU "KhAI", Kharkiv, Ukraine).</p><br>
                        <h3><span class=\"highlight\">PROGRAM COMMITTEE</span></h3>
                        <p>
                        YUDIN Oles Viktorovych (PhD student, Department of Computer Systems, Networks and Cybersecurity, NAU "KhAI", Kharkiv, Ukraine);<br>
                        PEVNEV Volodymyr Yakovlevych (Dr. Sc. (Tech.), Assoc. Prof., Department of Computer Systems, Networks and Cybersecurity, NAU "KhAI", Kharkiv, Ukraine);<br>
                        ZEMLIANKO Heorhii Andriiovych (PhD in Cybersecurity, Assoc. Prof., Department of Computer Systems, Networks and Cybersecurity, NAU "KhAI", Kharkiv, Ukraine);<br>
                        DRAKON Daria Sergeevna (4th-year student, V.N. Karazin Kharkiv National University, Kharkiv, Ukraine);<br>
                        KIRICHENKO Danylo (Master of Science in Applied Computer Science - Focus on Engineering at University of Duisburg-Essen, Duisburg, Germany).
                        </p><br>
                        <h3><span class=\"highlight\">SECRETARY</span></h3>
                        <p>
                        FEDORENKO Daria Dmytrivna (Student of group 535-b, Department of Computer Systems, Networks and Cybersecurity, NAU "KhAI", Kharkiv, Ukraine).
                        </p><br>

                        <h3><span class=\"highlight\">CONTACT INFORMATION</span></h3>
                        <p><strong>Technical Support:</strong> <a href="mailto:g.zemlynko@csn.khai.edu" class="contact-link">g.zemlynko@csn.khai.edu</a></p>
                        <p><strong>General Inquiries:</strong> <a href="mailto:scific@csn.khai.edu" class="contact-link">scific@csn.khai.edu</a></p>
                        <p><strong>Address:</strong> <span class="highlight">National Aerospace University "KhAI", vul. Vadyma Manka 17, Kharkiv, Ukraine</span></p>
                    `
                },
                uk: {
                    sections: "Головна",
                    materials: "Матеріали",
                    contacts: "Контакти",
                    participants: "Розклад",
                    meetings: "Секції",
                    archive: "Архів",
                    registerNow: "Зареєструватися",
                    contactUs: "Зв'яжіться з нами",
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
                    registrationText1: "Тези доповідей та заявку на участь у конференції, необхідно надіслати за допомогою google-форми (треба натиснути кнопку \"Зареєструватися\"), до <span class=\"highlight\">15 листопада 2025 року</span>.",
                    registrationText2: "Тези надсилаються в електронному вигляді з розширенням <span class=\"highlight\">«.doc»</span> або <span class=\"highlight\">«.docx»</span> та назвою згідно шаблону: <span class=\"highlight\">ПРІЗВИЩЕ-група_-Секція_(1,2)-Назва_роботи. (Приклад: <a target=\"_blank\" href=\"https://drive.google.com/drive/folders/17EnEdAhusTHWuP9lOsJ9Oq4YfdM-K1Mj\" class=\"example-link\">ЮДІН-555ім-Секція_1-Захист_Інформації_в_ІКС</a>)</span>.",
                    registrationText3: "Участь в конференції <span class=\"highlight\">безкоштовна</span>. За умови замовлення друкованої версії збірника тез вартість становить <span class=\"highlight\">150 грн</span>. Наукове видання видається з ISBN.",
                    registrationText4: "<span class=\"registration-warning\">Важливо! Учасники, які планують отримувати друковані тези, повинні вибрати відповідний варіант у формі під час реєстрації та подання своїх тези.</span>",
                    conferenceInfoText1: "Конференція буде проходити онлайн. Робочі мови конференції: <span class=\"highlight\">українська</span>, <span class=\"highlight\">англійська</span>.",
                    conferenceInfoText2: "<span class=\"highlight\">ТЕМИ КОНФЕРЕНЦІЇ</span>:<br><span class=\"highlight\">Секція 1</span>. Інформаційна безпека та кібербезпека.<br><span class=\"highlight\">Секція 2</span>. Функціональна безпека.<br><span class=\"highlight\">Секція 3</span>. Правове забезпечення кібербезпеки.",
                    conferenceInfoText3: "Для отримання докладної інформації про конференцію, натисніть кнопку \"<span class=\"highlight\">Приєднатися</span>\", щоб приєднатися до спеціальної Telegram-групи.<br>Натиснувши кнопку \"<span class=\"highlight\">Програма конференції</span>\", ви зможете ознайомитися з програмою конференції (актуальні матеріали будуть доступні за тиждень до конференції).<br>Якщо вам потрібна докладна інформація про конференцію та подання робіт, натисніть кнопку \"<span class=\"highlight\">Інформаційний лист</span>\".",
                    conferenceInfoText4: "Щороку серед найкращих доповідей учасників конференції розігруються цінні призи!",
                    joinUsButton: "Приєднатися",
                    conferenceProgramButton: "Програма конференції",
                    informationLetterButton: "Інформаційний лист",
                    thesisTemplate: "Шаблон тез",
                    templateLinks: {
                        en: "https://drive.google.com/drive/folders/1ktg8FOQ__DUgoMT-h3jEWuMpgGRrn9pF",
                        uk: "https://drive.google.com/drive/folders/17EnEdAhusTHWuP9lOsJ9Oq4YfdM-K1Mj"
                    },
                    faqTitle: "ЧаПи",
                    faqQuestions: [
                        { question: "Який формат проведення конференції?", answer: "Конференція проводиться у онлайн форматі." },
                        { question: "Які робочі мови конференції?", answer: "Робочі мови конференції: <span class=\"highlight\">українська</span> або <span class=\"highlight\">англійська</span>." },
                        { question: "Чи можна подати кілька тез від одного автора?", answer: "Так, один автор може подати необмежену кількість тез для розгляду, але підчас конференції повинен всі їх розкрити і доповісти." },
                        { question: "Чи можна публікувати тези, які вже були раніше надруковані?", answer: "Ні, до розгляду приймаються лише оригінальні роботи, що раніше не були опубліковані." },
                        { question: "Чи буде ISBN/ISSN?", answer: "Так, збірнику тез буде присвоєно ISBN." },
                        { question: "Чи обов’язкова особиста присутність?", answer: "Для учасників особиста присутність є обов'язковою на онлайн мітах, необхідно підключитися за розкладом конференції через призначені посилання на сайті конференції." },
                        { question: "Як буде організовано онлайн-доступ?", answer: "Інструкції щодо підключення до онлайн-сесій будуть надіслані зареєстрованим учасникам електронною поштою." },
                        { question: "Чи передбачені сертифікати учасників?", answer: "Так, усі учасники конференції отримають сертифікат у електронному вигляді." },
                        { question: "Чи можна виступити без подання тез?", answer: "Ні, учасники можуть виступити з доповіддю лише за умови подання тез у встановлений дедлайн." },
                        { question: "Який дедлайн подання робіт?", answer: "Остаточний термін подання тез: <span class=\"highlight\">15.11.2025</span>." },
                        { question: "Який формат подання робіт?", answer: "Тезисы мають подаватися в електронному форматі з розширенням <span class=\"highlight\">«.doc»</span> або <span class=\"highlight\">«.docx»</span> та назвою згідно шаблону: <span class=\"highlight\">ПРІЗВИЩЕ-Група-Секція_(1,2)-Назва_роботи</span>." },
                        { question: "Як отримати друкований збірник тез?", answer: "Друковані примірники збірника отримають хто під час регестрації обрав пункт <span class=\"highlight\">Потребую друковоний збірник</span> і сплатив організаційний внесок." }
                    ],
                    contactListHTML: `
                        <h3><span class=\"highlight\">ОРГАНІЗАЦІЙНИЙ КОМІТЕТ</span></h3>
                        <p><strong>Голови оргкомітету:</strong><br>
                        ХАРЧЕНКО В’ячеслав Сергійович (д.т.н., проф., кафедра комп’ютерних систем, мереж і кібербезпеки, НАУ «ХАІ», Харків, Україна);<br>
                        ЮДІН Олесь Вікторович (аспірант, кафедра комп’ютерних систем, мереж і кібербезпеки, НАУ «ХАІ», Харків, Україна).</p>
                        <p><strong>Співголови оргкомітету:</strong><br>
                        ПЄВНЄВ Володимир Яковлевич (д.т.н., доцент, кафедра комп’ютерних систем, мереж і кібербезпеки, НАУ «ХАІ», Харків, Україна);<br>
                        ЗЕМЛЯНКО Георгій Андрійович (PhD з кібербезпеки, доцент кафедра комп’ютерних систем, мереж і кібербезпеки, НАУ «ХАІ», Харків, Україна).</p><br>
                        <h3><span class=\"highlight\">ПРОГРАМНИЙ КОМІТЕТ</span></h3>
                        <p>
                        ЮДІН Олесь Вікторович (аспірант, кафедра комп’ютерних систем, мереж і кібербезпеки, НАУ «ХАІ», Харків, Україна);<br>
                        ПЄВНЄВ Володимир Яковлевич (д.т.н., доцент, кафедра комп’ютерних систем, мереж і кібербезпеки, НАУ «ХАІ», Харків, Україна);<br>
                        ЗЕМЛЯНКО Георгій Андрійович (PhD з кібербезпеки, доцент кафедра комп’ютерних систем, мереж і кібербезпеки, НАУ «ХАІ», Харків, Україна);<br>
                        ДРАКОН Дар'я Сергіївна (студентка 4 курсу, Харківський національний університет імені В. Н. Каразіна, м. Харків, Україна);<br>
                        KIRICHENKO Danylo (Master of Science in Applied Computer Science - Focus on Engineering at University of Duisburg-Essen, Duisburg, Germany).
                        </p><br>
                        <h3><span class=\"highlight\">СЕКРЕТАР КОМІТЕТУ</span></h3>
                        <p>
                        ФЕДОРЕНКО Дар'я Дмитрівна (студентка 535-б групи, кафедра комп’ютерних систем, мереж і кібербезпеки, НАУ «ХАІ», Харків, Україна).
                        </p><br>

                        <h3><span class=\"highlight\">КОНТАКТНА ІНФОРМАЦІЯ</span></h3>
                        <p><strong>Технічна підтримка:</strong> <a href="mailto:g.zemlynko@csn.khai.edu" class="contact-link">g.zemlynko@csn.khai.edu</a></p>
                        <p><strong>Загальні запитання:</strong> <a href="mailto:scific@csn.khai.edu" class="contact-link">scific@csn.khai.edu</a></p>
                        <p><strong>Адреса:</strong> <span class="highlight">Національний Аерокосмічний Університет "ХАІ", вул. Вадима Манька 17, м. Харків, Україна</span></p>
                    `
                }
            };

            function updateContent(lang) {
                const data = translations[lang];
                const logo = document.querySelector('.logo.glitch a');
                const logoGlitch = document.querySelector('.logo.glitch');
                if (logo && logoGlitch) {
                    logo.textContent = lang === 'en' ? 'SCIFiC' : 'СКІФіК';
                    logoGlitch.setAttribute('data-text', lang === 'en' ? 'SCIFiC' : 'СКІФіК');
                }
                const footerLogo = document.querySelector('.footer-logo .logo');
                if (footerLogo && !footerLogo.querySelector('a')) {
                    footerLogo.innerHTML = `<a href="#home">${lang === 'en' ? 'SCIFiC' : 'СКІФіК'}</a>`;
                } else if (footerLogo && footerLogo.querySelector('a')) {
                    footerLogo.querySelector('a').textContent = lang === 'en' ? 'SCIFiC' : 'СКІФіК';
                }

                const navItems = document.querySelectorAll('nav ul li a');
                if (navItems.length >= 6) {
                    navItems[0].textContent = data.sections;
                    navItems[1].textContent = data.materials;
                    navItems[2].textContent = data.participants;
                    navItems[3].textContent = data.meetings;
                    navItems[4].textContent = data.archive;
                    navItems[5].textContent = data.contacts;
                }

                const registrationBlockTexts = document.querySelectorAll('#registration-block .block-text > div > p');
                if (registrationBlockTexts.length >= 4) {
                    registrationBlockTexts[0].innerHTML = data.registrationText1;
                    registrationBlockTexts[1].innerHTML = data.registrationText2;
                    registrationBlockTexts[2].innerHTML = data.registrationText3;
                    registrationBlockTexts[3].innerHTML = data.registrationText4;
                }

                const templateButton = document.querySelector('#registration-block .template-btn');
                if (templateButton) {
                    templateButton.textContent = data.thesisTemplate;
                    templateButton.setAttribute('href', lang === 'en' ? data.templateLinks.en : data.templateLinks.uk);
                }

                const dateLocation = document.getElementById('date-location');
                const conferenceDescription = document.getElementById('conference-description');
                if (dateLocation) dateLocation.textContent = data.dateLocation;
                if (conferenceDescription) conferenceDescription.textContent = data.conferenceDescription;

                const ctaButtons = document.querySelectorAll('.cta-buttons a');
                if (ctaButtons.length >= 2) {
                    ctaButtons[0].textContent = data.registerNow;
                    ctaButtons[1].textContent = data.viewSchedule;
                }

                const conferenceInfoBlockTexts = document.querySelectorAll('#conference-info-block .block-text > div > p');
                if (conferenceInfoBlockTexts.length >= 4) {
                    conferenceInfoBlockTexts[0].innerHTML = data.conferenceInfoText1;
                    conferenceInfoBlockTexts[1].innerHTML = data.conferenceInfoText2;
                    conferenceInfoBlockTexts[2].innerHTML = data.conferenceInfoText3;
                    conferenceInfoBlockTexts[3].innerHTML = data.conferenceInfoText4;
                }

                const conferenceInfoBlockButtons = document.querySelectorAll('#conference-info-block .block-links a');
                if (conferenceInfoBlockButtons.length >= 3) {
                    conferenceInfoBlockButtons[0].textContent = data.joinUsButton;
                    conferenceInfoBlockButtons[1].textContent = data.conferenceProgramButton;
                    conferenceInfoBlockButtons[2].textContent = data.informationLetterButton;
                }

                const registerButton = document.getElementById('register-button');
                if (registerButton) {
                    registerButton.setAttribute('href', lang === 'en' ? 'https://forms.gle/SqmMuFce2XWfuNxp8' : 'https://forms.gle/XPRaouqdcR4yoYNP6');
                }

                const materialsRegisterButton = document.querySelector('.materials-register-btn');
                if (materialsRegisterButton) {
                    materialsRegisterButton.setAttribute('href', lang === 'en' ? 'https://forms.gle/SqmMuFce2XWfuNxp8' : 'https://forms.gle/XPRaouqdcR4yoYNP6');
                }

                const registrationBlockButtons = document.querySelectorAll('#registration-block .block-links a');
                if (registrationBlockButtons.length >= 2) {
                    registrationBlockButtons[0].textContent = data.registerNow;
                    registrationBlockButtons[0].setAttribute('href', lang === 'en' ? 'https://forms.gle/SqmMuFce2XWfuNxp8' : 'https://forms.gle/XPRaouqdcR4yoYNP6');
                    registrationBlockButtons[1].textContent = data.contactUs;
                }

                const informationLetterButton = document.querySelector('#conference-info-block .block-links a:nth-child(3)');
                if (informationLetterButton) {
                    informationLetterButton.setAttribute('href', lang === 'en' ?
                        'https://drive.google.com/file/d/1AYjJTM2UWtBEqbtcrnQjf5WKT7kGu8v7/view?usp=drive_link' :
                        'https://drive.google.com/file/d/15SXPiLXMjAFvdX8tnC9L2-yPAo9WyBvN/view?usp=drive_link');
                }

                const tickerItems = document.querySelectorAll('.ticker-content span');
                if (tickerItems.length >= 4) {
                    tickerItems[0].textContent = data.news1;
                    tickerItems[1].textContent = data.news2;
                    tickerItems[2].textContent = data.news3;
                    tickerItems[3].textContent = data.news4;
                }

                const materialsTitle = document.querySelector('#materials > h2');
                const contactsTitle = document.querySelector('#contacts > h2');
                const participantsTitle = document.querySelector('#participants > h2');
                const meetingsTitle = document.querySelector('#meetings > h2');
                if (materialsTitle) materialsTitle.innerHTML = data.conferenceMaterials;
                if (contactsTitle) contactsTitle.innerHTML = data.contactsTitle;
                if (participantsTitle) participantsTitle.textContent = data.participantsTitle;
                if (meetingsTitle) meetingsTitle.innerHTML = data.meetingsTitle;

                const archiveTitle = document.getElementById('archive-title');
                if (archiveTitle) {
                    archiveTitle.innerHTML = lang === 'en' ? 'Conference <span class="highlight">Archive</span>' : '<span class="highlight">Архів</span> конференції';
                }

                const sessionTitles = document.querySelectorAll('.session-card h3');
                if (sessionTitles.length >= 4) {
                    sessionTitles[0].textContent = lang === 'en' ? 'Plenary Session' : 'Пленарне засідання';
                    sessionTitles[1].textContent = lang === 'en' ? 'Section 1 - Information and cybersecurity' : 'Секція 1 - Інформаційна безпека та кібербезпека';
                    sessionTitles[2].textContent = lang === 'en' ? 'Section 2 - Functional Safety' : 'Секція 2 - Функціональна безпека';
                    sessionTitles[3].textContent = lang === 'en' ? 'Section 3 - Legal provision of cybersecurity' : 'Секція 3 - Правове забезпечення кібербезпеки';
                }

                const sessionTimes = document.querySelectorAll('.session-card .session-time');
                if (sessionTimes.length >= 4) {
                    sessionTimes.forEach(st => st.textContent = lang === 'en' ? 'All days of the conference' : 'Усі дні конференції');
                }

                const sectionTitles = document.querySelectorAll('.block-title');
                if (sectionTitles.length >= 2) {
                    sectionTitles[0].textContent = lang === 'en' ? 'Registration' : 'Реєстрація';
                    sectionTitles[1].textContent = lang === 'en' ? 'Information about Conference' : 'Інформація про конференцію';
                }

                const footerLinks = document.querySelectorAll('.footer-links ul li a');
                if (footerLinks.length >= 6) {
                    footerLinks[0].textContent = data.sections;
                    footerLinks[1].textContent = data.materials;
                    footerLinks[2].textContent = data.participants;
                    footerLinks[3].textContent = data.meetings;
                    footerLinks[4].textContent = data.archive;
                    footerLinks[5].textContent = data.contacts;
                }

                const footerLinksHeader = document.querySelector('.footer-links h3');
                const footerSocialHeader = document.querySelector('.footer-social h3');
                if (footerLinksHeader) footerLinksHeader.textContent = data.quickLinks;
                if (footerSocialHeader) footerSocialHeader.textContent = data.connectWithUs;

                const tableHeaders = document.querySelectorAll('.conference-schedule th');
                if (tableHeaders.length >= 3) {
                    tableHeaders[0].textContent = lang === 'en' ? 'Tasks' : 'Завдання';
                    tableHeaders[1].textContent = lang === 'en' ? 'First day' : 'Перший день';
                    tableHeaders[2].textContent = lang === 'en' ? 'Second day' : 'Другий день';
                }

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

                const archiveBlocks = document.querySelectorAll('.archive-block h3');
                archiveBlocks.forEach((block, index) => {
                    const year = 2024 - index;
                    block.textContent = lang === 'en' ? `Theses SCIFiC ${year}` : `Збірник тез СКІФіК ${year}`;
                });

                const archiveLinks = document.querySelectorAll('.archive-links a');
                archiveLinks.forEach(link => {
                    if (lang === 'en') {
                        if (link.textContent.includes('Google')) link.textContent = 'GoogleDrive';
                        else if (link.textContent.includes('Research')) link.textContent = 'ResearchGate';
                        else if (link.textContent.includes('Library')) link.textContent = 'Library of KhAI';
                    } else {
                        if (link.textContent.includes('Google')) link.textContent = 'GoogleDrive';
                        else if (link.textContent.includes('Research')) link.textContent = 'ResearchGate';
                        else if (link.textContent.includes('Library')) link.textContent = 'Бібліотека ХАІ';
                    }
                });

                const contactList = document.getElementById('contact-list');
                if (contactList) {
                    contactList.innerHTML = data.contactListHTML;
                }

                const faqTitle = document.getElementById('faq-title');
                if (faqTitle) faqTitle.textContent = data.faqTitle;

                const faqContainer = document.querySelector('#faq-block .faq-container');
                if (faqContainer) {
                    faqContainer.innerHTML = '';
                    data.faqQuestions.forEach(item => {
                        const faqItem = document.createElement('div');
                        faqItem.className = 'faq-item';
                        const faqQuestion = document.createElement('div');
                        faqQuestion.className = 'faq-question';
                        faqQuestion.innerHTML = item.question;
                        const faqAnswer = document.createElement('div');
                        faqAnswer.className = 'faq-answer';
                        faqAnswer.innerHTML = item.answer;
                        faqItem.appendChild(faqQuestion);
                        faqItem.appendChild(faqAnswer);
                        faqContainer.appendChild(faqItem);
                    });
                    const faqQuestions = document.querySelectorAll('.faq-question');
                    faqQuestions.forEach(question => {
                        const newQuestion = question.cloneNode(true);
                        question.parentNode.replaceChild(newQuestion, question);
                        newQuestion.addEventListener('click', function () {
                            document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));
                            document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('active'));
                            this.classList.add('active');
                            this.nextElementSibling.classList.add('active');
                        });
                    });
                }
            }

            langButtons.forEach(button => {
                button.addEventListener('click', function (e) {
                    e.preventDefault();
                    langButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    const lang = this.getAttribute('data-lang');
                    updateContent(lang);
                });
            });

            updateContent('en');
        }

        // Loading animation
        function setupLoadingScreen() {
            const loadingScreen = document.getElementById('loading-screen');
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

        document.addEventListener('DOMContentLoaded', () => {
            setupLoadingScreen();
            createDigitalRain();
            setupMobileMenu();
            setupCountdownTimer();
            setupNavigation();
            setupLanguageSwitcher();

            const homeSection = document.getElementById('home');
            if (homeSection) {
                document.querySelectorAll('section').forEach(section => section.classList.remove('active'));
                homeSection.classList.add('active');
            }

            window.scrollTo(0, 0);
            setTimeout(() => {
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
            }, 100);

            // Обработка хеша из URL при загрузке
            const hash = window.location.hash;
            if (hash && hash !== '#') {
                const targetSection = document.querySelector(hash);
                if (targetSection) {
                    // Убираем активный класс со всех секций
                    document.querySelectorAll('section').forEach(section => section.classList.remove('active'));
                    // Делаем активной целевую секцию
                    targetSection.classList.add('active');
                    
                    // Обновляем активную ссылку в навигации
                    navLinks.forEach(link => link.classList.remove('active'));
                    const activeLink = document.querySelector(`a[href="${hash}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                    
                    // Прокручиваем к секции БЕЗ плавности (мгновенно, как при обычной загрузке)
                    const headerOffset = 80;
                    const offsetPosition = targetSection.offsetTop - headerOffset;
                    window.scrollTo({
                        top: Math.max(0, offsetPosition),
                        behavior: 'auto' // ← ВАЖНО: 'auto', а не 'smooth'
                    });
                }
            } else {
                // Если хеша нет — активируем #home
                const homeSection = document.getElementById('home');
                if (homeSection) {
                    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
                    homeSection.classList.add('active');
                }
                const homeLink = document.querySelector('a[href="#home"]');
                if (homeLink) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    homeLink.classList.add('active');
                }
            }
        });
