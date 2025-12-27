// ================================
// Language System
// ================================
let currentLang = 'ar'; // Default language

// Initialize language from localStorage
function initLanguage() {
    const savedLang = localStorage.getItem('portfolio_lang');
    if (savedLang && (savedLang === 'ar' || savedLang === 'en')) {
        currentLang = savedLang;
    }
    applyLanguage(currentLang);
}

// Apply language to the page
function applyLanguage(lang) {
    currentLang = lang;

    // Update HTML direction
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);

    // Update language switcher button text
    const langSwitcher = document.getElementById('langSwitcher');
    if (langSwitcher) {
        const langText = langSwitcher.querySelector('.lang-current');
        if (langText) {
            langText.textContent = lang === 'ar' ? 'EN' : 'ع';
        }
    }

    // Translate all elements with data-i18n attribute
    translatePage(lang);

    // Save to localStorage
    localStorage.setItem('portfolio_lang', lang);

    console.log(`🌐 Language switched to: ${lang.toUpperCase()}`);
}

// Translate all elements on the page
function translatePage(lang) {
    if (typeof TRANSLATIONS === 'undefined') {
        console.warn('⚠️ Translations not loaded');
        return;
    }

    const translations = TRANSLATIONS[lang];
    if (!translations) return;

    // Translate all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const text = getNestedTranslation(translations, key);
        if (text) {
            element.textContent = text;
        }
    });

    // Translate project cards in the grid
    translateProjectCards(lang);

    // Translate CV sections (skills, experience, education)
    translateCvSections(lang);

    // Update hero title order based on language
    if (typeof updateHeroTitle === 'function') {
        updateHeroTitle();
    }

    // Update page title
    document.title = lang === 'ar'
        ? 'أكرم عبدالله | مطور برمجيات'
        : 'Akram Abdullah | Software Developer';
}

// Translate project cards dynamically
function translateProjectCards(lang) {
    document.querySelectorAll('.project-card').forEach(card => {
        const projectId = card.dataset.project;
        if (!projectId || !projectsData[projectId]) return;

        const project = projectsData[projectId];

        // Translate title
        const titleEl = card.querySelector('.project-title');
        if (titleEl && project.title) {
            titleEl.textContent = project.title[lang] || project.title.ar || project.title;
        }

        // Translate excerpt
        const excerptEl = card.querySelector('.project-excerpt');
        if (excerptEl && project.excerpt) {
            excerptEl.textContent = project.excerpt[lang] || project.excerpt.ar ||
                (project.description[lang] || project.description.ar || '').split('\n')[0].substring(0, 80) + '...';
        }

        // Translate "View Project" button
        const viewBtn = card.querySelector('.project-view-btn');
        if (viewBtn) {
            const icon = viewBtn.querySelector('i');
            viewBtn.innerHTML = '';
            if (icon) viewBtn.appendChild(icon);
            viewBtn.appendChild(document.createTextNode(
                lang === 'ar' ? ' عرض المشروع' : ' View Project'
            ));
        }
    });
}

// Get nested translation value (e.g., "hero.greeting")
function getNestedTranslation(obj, key) {
    return key.split('.').reduce((o, k) => (o && o[k] !== undefined) ? o[k] : null, obj);
}

// Toggle language
function toggleLanguage() {
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    applyLanguage(newLang);
}

// Get current project translation
function getProjectTranslation(projectId, field) {
    if (typeof PROJECT_TRANSLATIONS === 'undefined') return null;
    const project = PROJECT_TRANSLATIONS[projectId];
    if (!project || !project[field]) return null;
    return project[field][currentLang] || project[field]['ar'];
}

// ================================
// CV Data - Will be loaded from cv-data.js
// ================================
let cvData = {};

// Load CV data and initialize components
function loadCvData() {
    if (typeof CV_DATA !== 'undefined') {
        cvData = CV_DATA;
        console.log('✅ CV data loaded from cv-data.js');
        initializeSkills();
        initializeExperience();
        initializeEducation();
        initializeContact();
    } else {
        console.warn('⚠️ cv-data.js not found, CV sections may not load');
    }
}

// Initialize skills section
function initializeSkills() {
    const skillsGrid = document.getElementById('skillsGrid');
    if (!skillsGrid || !cvData.skills) return;

    skillsGrid.innerHTML = '';

    // Generate skill categories
    Object.entries(cvData.skills).forEach(([key, category]) => {
        const categoryEl = createSkillCategory(key, category);
        skillsGrid.appendChild(categoryEl);
    });

    console.log('✅ Skills loaded');
}

// Create skill category element
function createSkillCategory(key, category) {
    const div = document.createElement('div');
    div.className = key === 'tools' ? 'skill-category glass-card tools-category' : 'skill-category glass-card';

    const title = category.title[currentLang] || category.title.ar;

    if (key === 'tools') {
        // Tools category (badges)
        const toolsHtml = category.items.map(tool => `
            <div class="tool-badge">
                <i class="${tool.icon}"></i>
                <span>${tool.name}</span>
            </div>
        `).join('');

        div.innerHTML = `
            <h3 class="category-title">
                <i class="${category.icon}"></i>
                ${title}
            </h3>
            <div class="tools-grid">${toolsHtml}</div>
        `;
    } else {
        // Regular skills with progress bars
        const skillsHtml = category.items.map(skill => `
            <div class="skill-item" data-level="${skill.level}">
                <div class="skill-header">
                    <span class="skill-name">${skill.name}</span>
                    <span class="skill-level">${skill.rank}</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" style="--progress: ${skill.level}%"></div>
                </div>
            </div>
        `).join('');

        div.innerHTML = `
            <h3 class="category-title">
                <i class="${category.icon}"></i>
                ${title}
            </h3>
            <div class="skills-list">${skillsHtml}</div>
        `;
    }

    return div;
}

// Initialize experience section
function initializeExperience() {
    const timeline = document.getElementById('experienceTimeline');
    if (!timeline || !cvData.experience) return;

    timeline.innerHTML = '';

    cvData.experience.forEach(exp => {
        const itemEl = createExperienceItem(exp);
        timeline.appendChild(itemEl);
    });

    console.log('✅ Experience loaded');
}

// Create experience timeline item
function createExperienceItem(exp) {
    const div = document.createElement('div');
    div.className = 'timeline-item';

    const title = exp.title[currentLang] || exp.title.ar;
    const date = exp.date[currentLang] || exp.date.ar;
    const description = exp.description[currentLang] || exp.description.ar;

    const itemsHtml = exp.items.map(item => {
        const text = item[currentLang] || item.ar;
        return `<li>${text}</li>`;
    }).join('');

    div.innerHTML = `
        <div class="timeline-marker">
            <i class="${exp.icon}"></i>
        </div>
        <div class="timeline-content glass-card">
            <div class="timeline-header">
                <h3 class="timeline-title">${title}</h3>
                <span class="timeline-date">
                    <i class="fas fa-calendar"></i>
                    ${date}
                </span>
            </div>
            <p class="timeline-description">${description}</p>
            <ul class="timeline-list">${itemsHtml}</ul>
        </div>
    `;

    return div;
}

// Initialize education section
function initializeEducation() {
    const educationSection = document.getElementById('educationSection');
    if (!educationSection || !cvData.education) return;

    const edu = cvData.education;
    const degree = edu.degree[currentLang] || edu.degree.ar;
    const school = edu.school[currentLang] || edu.school.ar;
    const date = edu.date[currentLang] || edu.date.ar;
    const location = edu.location[currentLang] || edu.location.ar;
    const eduTitle = currentLang === 'ar' ? 'التعليم' : 'Education';

    educationSection.innerHTML = `
        <h3 class="education-title">
            <i class="fas fa-graduation-cap"></i>
            <span>${eduTitle}</span>
        </h3>
        <div class="education-card glass-card">
            <div class="education-icon">
                <i class="${edu.icon}"></i>
            </div>
            <div class="education-info">
                <h4>${degree}</h4>
                <p class="education-school">${school}</p>
                <div class="education-meta">
                    <span><i class="fas fa-calendar"></i> ${date}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${location}</span>
                </div>
            </div>
        </div>
    `;

    console.log('✅ Education loaded');
}

// Initialize contact section with data from cv.json
function initializeContact() {
    if (!cvData.contact) return;

    const contact = cvData.contact;

    // Format phone number for display
    const phoneFormatted = contact.phone.replace(/(\+\d{3})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
    const whatsappNumber = contact.whatsapp.replace('+', '');

    // Update email
    const emailLink = document.getElementById('contactEmail');
    const emailValue = document.getElementById('emailValue');
    if (emailLink) emailLink.href = `mailto:${contact.email}`;
    if (emailValue) emailValue.textContent = contact.email;

    // Update phone
    const phoneLink = document.getElementById('contactPhone');
    const phoneValue = document.getElementById('phoneValue');
    if (phoneLink) phoneLink.href = `tel:${contact.phone}`;
    if (phoneValue) phoneValue.textContent = phoneFormatted;

    // Update WhatsApp
    const whatsappLink = document.getElementById('contactWhatsapp');
    if (whatsappLink) whatsappLink.href = `https://wa.me/${whatsappNumber}`;

    // Update CTA WhatsApp button
    const ctaBtn = document.getElementById('ctaWhatsappBtn');
    if (ctaBtn) {
        const msg = currentLang === 'ar'
            ? 'ألسلام عليكم ورحمة الله وبركاته \nكيفك ياهندسة؟\nعندي موضوع اناقشه معك لو فاضي🤗'
            : 'Hi,\n I would like to discuss a project with you\n🤗';
        ctaBtn.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    }

    // Update location
    const locationValue = document.getElementById('locationValue');
    if (locationValue && contact.location) {
        locationValue.textContent = contact.location[currentLang] || contact.location.ar;
    }

    // Update footer links
    const footerWhatsapp = document.getElementById('footerWhatsapp');
    const footerEmail = document.getElementById('footerEmail');
    const footerGithub = document.getElementById('footerGithub');

    if (footerWhatsapp) footerWhatsapp.href = `https://wa.me/${whatsappNumber}`;
    if (footerEmail) footerEmail.href = `mailto:${contact.email}`;
    if (footerGithub && contact.github) footerGithub.href = contact.github;

    // Update hero social links
    const heroWhatsapp = document.getElementById('heroWhatsapp');
    const heroEmail = document.getElementById('heroEmail');
    const heroPhone = document.getElementById('heroPhone');
    const heroGithub = document.getElementById('heroGithub');

    if (heroWhatsapp) heroWhatsapp.href = `https://wa.me/${whatsappNumber}`;
    if (heroEmail) heroEmail.href = `mailto:${contact.email}`;
    if (heroPhone) heroPhone.href = `tel:${contact.phone}`;
    if (heroGithub && contact.github) heroGithub.href = contact.github;

    console.log('✅ Contact info loaded');
}

// Translate CV sections when language changes
function translateCvSections(lang) {
    if (!cvData || Object.keys(cvData).length === 0) return;
    initializeSkills();
    initializeExperience();
    initializeEducation();
    initializeContact();
}

// ================================
// Projects Data - Will be loaded from projects-data.js
// ================================
let projectsData = {};

// Load projects data
function loadProjectsData() {
    // Check if data was loaded from external script
    if (typeof PROJECTS_DATA !== 'undefined') {
        projectsData = PROJECTS_DATA;
        console.log('✅ Projects data loaded from projects-data.js');
        initializeProjects();
    } else {
        console.error('❌ projects-data.js not found! Run: node generate.js');
    }
}

// Initialize project cards after data is loaded
function initializeProjects() {
    // Generate project cards dynamically
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    // Clear existing projects
    projectsGrid.innerHTML = '';

    // Generate cards for each project
    Object.entries(projectsData).forEach(([projectId, project]) => {
        const card = createProjectCard(projectId, project);
        projectsGrid.appendChild(card);
    });

    // Re-initialize filter buttons with new cards
    reinitializeFilters();

    // Apply translations
    translateProjectCards(currentLang);

    // Initialize project click handlers
    initProjectCards();

    // Apply fade-in animation
    document.querySelectorAll('.project-card').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });

    console.log(`✅ Generated ${Object.keys(projectsData).length} project cards`);
}

// Create a single project card element
function createProjectCard(projectId, project) {
    const card = document.createElement('div');
    card.className = 'project-card glass-card';
    card.dataset.category = project.category;
    card.dataset.project = projectId;

    // Get translated content from project data
    const title = project.title[currentLang] || project.title.ar || project.title;
    const excerpt = project.excerpt ? (project.excerpt[currentLang] || project.excerpt.ar) :
        (project.description[currentLang] || project.description.ar || '').split('\n')[0].substring(0, 80) + '...';
    const viewText = currentLang === 'ar' ? 'عرض المشروع' : 'View Project';

    // Generate tags HTML (max 3 tags)
    const tagsHtml = (project.tags || []).slice(0, 3).map(tag =>
        `<span class="tag">${tag}</span>`
    ).join('');

    card.innerHTML = `
        <div class="project-image">
            <img src="${project.thumbnail}" alt="${title}" loading="lazy">
            <div class="project-overlay">
                <button class="project-view-btn">
                    <i class="fas fa-expand"></i>
                    ${viewText}
                </button>
            </div>
        </div>
        <div class="project-info">
            <h3 class="project-title">${title}</h3>
            <p class="project-excerpt">${excerpt}</p>
            <div class="project-tags">${tagsHtml}</div>
        </div>
    `;

    return card;
}

// Reinitialize filter buttons with dynamically generated cards
function reinitializeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const newProjectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        // Remove old listeners by cloning
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);

        newBtn.addEventListener('click', () => {
            // Update active button
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            newBtn.classList.add('active');

            const filter = newBtn.dataset.filter;

            document.querySelectorAll('.project-card').forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category.includes(filter)) {
                    card.classList.remove('hidden');
                    setTimeout(() => card.style.opacity = 1, 10);
                } else {
                    card.style.opacity = 0;
                    setTimeout(() => card.classList.add('hidden'), 300);
                }
            });
        });
    });
}

// ================================
// Dynamic Title Animation
// ================================
const titles = ['Full-Stack', 'Laravel', 'Flutter', 'Mobile Apps', 'Web Apps'];
let titleIndex = 0;
const dynamicTitle = document.getElementById('dynamicTitle');
const titlePrefix = document.getElementById('titlePrefix');
const heroTitleContainer = document.getElementById('heroTitleContainer');

// Update title order based on language (prefix before or after)
function updateTitleOrder() {
    if (!heroTitleContainer || !titlePrefix || !dynamicTitle) return;

    const prefix = currentLang === 'ar' ? 'مطور' : 'Developer';
    titlePrefix.textContent = prefix;

    if (currentLang === 'ar') {
        // Arabic: مطور X (prefix first, dynamic second)
        titlePrefix.style.order = '1';
        dynamicTitle.style.order = '2';
    } else {
        // English: X Developer (dynamic first, prefix second)
        dynamicTitle.style.order = '1';
        titlePrefix.style.order = '2';
    }
}

// Typewriter effect - delete then type character by character
let isTyping = false;
const typingSpeed = 100; // ms per character
const deletingSpeed = 40; // ms per character (faster delete)
const pauseBetween = 2000; // pause between words

function typeWriter() {
    if (!dynamicTitle || isTyping) return;
    isTyping = true;

    const currentText = dynamicTitle.textContent;
    const nextIndex = (titleIndex + 1) % titles.length;
    const nextText = titles[nextIndex];

    // Delete current text character by character
    deleteText(currentText, () => {
        titleIndex = nextIndex;
        // Type new text character by character
        typeText(nextText, () => {
            isTyping = false;
        });
    });
}

function deleteText(text, callback) {
    let i = text.length;
    const deleteInterval = setInterval(() => {
        if (i > 0) {
            dynamicTitle.textContent = text.substring(0, i - 1);
            i--;
        } else {
            clearInterval(deleteInterval);
            callback();
        }
    }, deletingSpeed);
}

function typeText(text, callback) {
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            dynamicTitle.textContent = text.substring(0, i + 1);
            i++;
        } else {
            clearInterval(typeInterval);
            callback();
        }
    }, typingSpeed);
}

// Alias for translatePage to call
function updateHeroTitle() {
    updateTitleOrder();
}

// Initialize title order on load
updateTitleOrder();

// Start typewriter effect
setInterval(typeWriter, pauseBetween + 1500);


// ================================
// Navbar Scroll Effect
// ================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// ================================
// Mobile Navigation
// ================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ================================
// Active Navigation Link
// ================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ================================
// Counter Animation
// ================================
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateCounters() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.target);
        const increment = target / 50;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current);
                setTimeout(updateCounter, 30);
            } else {
                stat.textContent = target;
            }
        };

        updateCounter();
    });
}

// ================================
// Skill Bars Animation
// ================================
function animateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animated');
        }, index * 100);
    });
}

// ================================
// Intersection Observer for Animations
// ================================
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('about')) {
                if (!statsAnimated) {
                    animateCounters();
                    statsAnimated = true;
                }
            }
            if (entry.target.classList.contains('skills')) {
                animateSkillBars();
            }
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// ================================
// Project Filters
// ================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
            const category = card.dataset.category;
            if (filter === 'all' || category.includes(filter)) {
                card.classList.remove('hidden');
                setTimeout(() => card.style.opacity = 1, 10);
            } else {
                card.style.opacity = 0;
                setTimeout(() => card.classList.add('hidden'), 300);
            }
        });
    });
});

// ================================
// Project Modal
// ================================
const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalTags = document.getElementById('modalTags');
const galleryImage = document.getElementById('galleryImage');
const galleryThumbnails = document.getElementById('galleryThumbnails');
const galleryPrev = document.getElementById('galleryPrev');
const galleryNext = document.getElementById('galleryNext');
const currentSlideEl = document.getElementById('currentSlide');
const totalSlidesEl = document.getElementById('totalSlides');

let currentProject = null;
let currentSlide = 0;

// Initialize project card click handlers
function initProjectCards() {
    // Get freshly generated project cards from DOM
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.dataset.project;
            const project = projectsData[projectId];

            if (project) {
                currentProject = project;
                currentProject.id = projectId; // Store project ID for translations
                currentSlide = 0;
                openModal(project, projectId);
            }
        });
    });
}

function openModal(project, projectId) {
    // Get translated content from project data
    const title = project.title[currentLang] || project.title.ar || project.title;
    const description = project.description[currentLang] || project.description.ar || project.description;

    modalTitle.textContent = title;
    modalDescription.textContent = description;

    // Clear and populate tags
    modalTags.innerHTML = '';
    project.tags.forEach(tag => {
        const tagEl = document.createElement('span');
        tagEl.className = 'tag';
        tagEl.textContent = tag;
        modalTags.appendChild(tagEl);
    });

    // Set up gallery
    totalSlidesEl.textContent = project.images.length;
    updateGallery();

    // Generate thumbnails
    galleryThumbnails.innerHTML = '';
    project.images.forEach((img, index) => {
        const thumb = document.createElement('img');
        thumb.src = img;
        thumb.alt = `صورة ${index + 1}`;
        thumb.className = index === 0 ? 'active' : '';
        thumb.addEventListener('click', () => {
            currentSlide = index;
            updateGallery();
        });
        galleryThumbnails.appendChild(thumb);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function updateGallery() {
    if (!currentProject) return;

    galleryImage.src = currentProject.images[currentSlide];
    currentSlideEl.textContent = currentSlide + 1;

    // Update thumbnail active state
    const thumbs = galleryThumbnails.querySelectorAll('img');
    thumbs.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    if (!currentProject) return;
    currentSlide = (currentSlide + 1) % currentProject.images.length;
    updateGallery();
}

function prevSlide() {
    if (!currentProject) return;
    currentSlide = (currentSlide - 1 + currentProject.images.length) % currentProject.images.length;
    updateGallery();
}

// Gallery navigation
if (galleryNext) galleryNext.addEventListener('click', nextSlide);
if (galleryPrev) galleryPrev.addEventListener('click', prevSlide);

// Close modal
if (modalClose) modalClose.addEventListener('click', closeModal);
if (modal) modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentProject = null;
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!modal || !modal.classList.contains('active')) return;

    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') nextSlide(); // RTL
    if (e.key === 'ArrowRight') prevSlide(); // RTL
});

// ================================
// Smooth Scroll
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Skip if href doesn't start with #, is just "#", or empty
        // (href might have changed dynamically after page load)
        if (!href || !href.startsWith('#') || href === '#' || href.length <= 1) return;

        try {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        } catch (error) {
            // Invalid selector, ignore (e.g., href contains special characters)
            console.warn('Invalid selector:', href);
        }
    });
});

// ================================
// Fade-in Animation on Scroll
// ================================
const fadeElements = document.querySelectorAll('.glass-card, .timeline-item, .project-card');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});

// ================================
// Initialize
// ================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize language system
    initLanguage();

    // Language switcher click handler
    const langSwitcher = document.getElementById('langSwitcher');
    if (langSwitcher) {
        langSwitcher.addEventListener('click', toggleLanguage);
    }

    // Calculate dynamic years (use startYear from cv.json if available)
    const startYear = (typeof CV_DATA !== 'undefined' && CV_DATA.startYear) ? CV_DATA.startYear : 2018;
    const currentYear = new Date().getFullYear();
    const yearsOfExperience = currentYear - startYear;

    // Update hero years
    const heroYears = document.getElementById('heroYears');
    if (heroYears) {
        heroYears.textContent = yearsOfExperience;
    }

    // Update experience counter target
    const experienceYears = document.getElementById('experienceYears');
    if (experienceYears) {
        experienceYears.dataset.target = yearsOfExperience;
    }

    // Update copyright year
    const copyrightYear = document.getElementById('copyrightYear');
    if (copyrightYear) {
        copyrightYear.textContent = currentYear;
    }

    // Load CV data (skills, experience, education)
    loadCvData();

    // Load projects data
    loadProjectsData();

    // Add initial animation delay to elements
    document.querySelectorAll('.hero-content > *').forEach((el, i) => {
        el.style.animationDelay = `${i * 0.1}s`;
    });
});

console.log('🚀 Portfolio by Akram Abdullah - Loaded successfully!');


