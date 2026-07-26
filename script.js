/**
 * Akram Abdullah Portfolio Engine - Senior Full-Stack Architecture
 */

// Global State Variables
let currentLanguage = 'ar';
let currentTheme = 'light';
let currentProject = null;
let currentImageIndex = 0;
let projectImages = [];
let activeFilter = 'all';

// Typewriter Roles Array
const TYPEWRITER_ROLES = {
    ar: [
        "Full-Stack Architect",
        "خبير Laravel & Livewire",
        "مهندس تطبيقات Flutter",
        "مطور شبكات ودسكتوب Electron",
        "متخصص ذكاء اصطناعي AI"
    ],
    en: [
        "Full-Stack Architect",
        "Laravel & Livewire Expert",
        "Flutter Mobile Engineer",
        "Electron & Node.js Developer",
        "AI Integration Specialist"
    ]
};

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterTimeout = null;

// ================================
// Theme Management (Light / Dark)
// ================================
function initTheme() {
    const savedTheme = localStorage.getItem('portfolio_theme');
    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
        currentTheme = savedTheme;
    } else {
        currentTheme = 'light';
    }
    applyTheme(currentTheme);
}

function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        const icon = themeBtn.querySelector('i');
        if (icon) {
            icon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
    localStorage.setItem('portfolio_theme', theme);
}

function toggleTheme() {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
}

// ================================
// Language & i18n System
// ================================
function initLanguage() {
    const savedLang = localStorage.getItem('portfolio_lang');
    if (savedLang && (savedLang === 'ar' || savedLang === 'en')) {
        currentLanguage = savedLang;
    }
    applyLanguage(currentLanguage);
}

function applyLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    const langSwitcher = document.getElementById('langSwitcher');
    if (langSwitcher) {
        const langText = langSwitcher.querySelector('.lang-current');
        if (langText) {
            langText.textContent = lang === 'ar' ? 'EN' : 'عربي';
        }
    }

    // Update Elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = getTranslation(key, lang);
        if (translation) {
            el.textContent = translation;
        }
    });

    // Update Placeholders with data-i18n-ph
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const key = el.getAttribute('data-i18n-ph');
        const translation = getTranslation(key, lang);
        if (translation) {
            el.setAttribute('placeholder', translation);
        }
    });

    localStorage.setItem('portfolio_lang', lang);

    // Restart Typewriter with new language
    restartTypewriter();

    // Reload Dynamic Data
    loadCvData();
    loadProjectsData();
}

function toggleLanguage() {
    const nextLang = currentLanguage === 'ar' ? 'en' : 'ar';
    applyLanguage(nextLang);
}

function getTranslation(key, lang) {
    if (typeof TRANSLATIONS === 'undefined') return null;
    const keys = key.split('.');
    let result = TRANSLATIONS[lang];
    for (const k of keys) {
        if (result && result[k] !== undefined) {
            result = result[k];
        } else {
            return null;
        }
    }
    return result;
}

// ================================
// Dynamic Typewriter Effect
// ================================
function restartTypewriter() {
    if (typewriterTimeout) clearTimeout(typewriterTimeout);
    roleIndex = 0;
    charIndex = 0;
    isDeleting = false;
    typewrite();
}

function typewrite() {
    const dynamicEl = document.getElementById('dynamicTitle');
    if (!dynamicEl) return;

    const roles = TYPEWRITER_ROLES[currentLanguage] || TYPEWRITER_ROLES['en'];
    const currentRole = roles[roleIndex % roles.length];

    if (isDeleting) {
        charIndex--;
        dynamicEl.textContent = currentRole.substring(0, charIndex);
    } else {
        charIndex++;
        dynamicEl.textContent = currentRole.substring(0, charIndex);
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2200; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex++;
        typeSpeed = 400; // Pause before typing next word
    }

    typewriterTimeout = setTimeout(typewrite, typeSpeed);
}

// ================================
// CV & Contact Data Renderer
// ================================
function loadCvData() {
    if (typeof CV_DATA === 'undefined') return;

    // Contact Links
    if (CV_DATA.contact) {
        const whatsappUrl = `https://wa.me/${CV_DATA.contact.whatsapp.replace(/[^0-9]/g, '')}`;
        const emailUrl = `mailto:${CV_DATA.contact.email}`;

        // Contact Methods
        const heroWhatsapp = document.getElementById('heroWhatsapp');
        if (heroWhatsapp) heroWhatsapp.href = whatsappUrl;

        const heroEmail = document.getElementById('heroEmail');
        if (heroEmail) heroEmail.href = emailUrl;

        const heroPhone = document.getElementById('heroPhone');
        if (heroPhone) heroPhone.href = `tel:${CV_DATA.contact.phone}`;

        const heroGithub = document.getElementById('heroGithub');
        if (heroGithub && CV_DATA.contact.github) heroGithub.href = CV_DATA.contact.github;

        const emailValue = document.getElementById('emailValue');
        if (emailValue) emailValue.textContent = CV_DATA.contact.email;

        const phoneValue = document.getElementById('phoneValue');
        if (phoneValue) phoneValue.textContent = CV_DATA.contact.phone;

        const contactEmail = document.getElementById('contactEmail');
        if (contactEmail) contactEmail.href = emailUrl;

        const contactPhone = document.getElementById('contactPhone');
        if (contactPhone) contactPhone.href = `tel:${CV_DATA.contact.phone}`;

        const contactWhatsapp = document.getElementById('contactWhatsapp');
        if (contactWhatsapp) contactWhatsapp.href = whatsappUrl;

        const ctaWhatsappBtn = document.getElementById('ctaWhatsappBtn');
        if (ctaWhatsappBtn) ctaWhatsappBtn.href = whatsappUrl;

        const footerWhatsapp = document.getElementById('footerWhatsapp');
        if (footerWhatsapp) footerWhatsapp.href = whatsappUrl;

        const footerEmail = document.getElementById('footerEmail');
        if (footerEmail) footerEmail.href = emailUrl;

        const footerGithub = document.getElementById('footerGithub');
        if (footerGithub && CV_DATA.contact.github) footerGithub.href = CV_DATA.contact.github;
    }

    // Load Skills
    loadSkillsData();

    // Load Experience Timeline
    loadExperienceData();
}

function loadSkillsData() {
    const grid = document.getElementById('skillsGrid');
    if (!grid || !CV_DATA.skills) return;

    let html = '';
    const skillsObj = CV_DATA.skills;

    for (const key in skillsObj) {
        const cat = skillsObj[key];
        const title = cat.title[currentLanguage] || cat.title.en;

        if (key === 'tools') {
            html += `
                <div class="skill-category tools-category glass-card reveal-up">
                    <h3 class="category-title"><i class="${cat.icon}"></i> ${title}</h3>
                    <div class="tools-grid">
                        ${cat.items.map(tool => `
                            <div class="tool-badge">
                                <i class="${tool.icon}"></i>
                                <span>${tool.name}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        } else {
            const isFullWidth = key === 'mobile_desktop' || cat.items.length <= 4;
            html += `
                <div class="skill-category glass-card reveal-up ${isFullWidth ? 'full-width-category' : ''}">
                    <h3 class="category-title"><i class="${cat.icon}"></i> ${title}</h3>
                    <div class="skills-list ${isFullWidth ? 'skills-list-grid' : ''}">
                        ${cat.items.map(skill => `
                            <div class="skill-item">
                                <div class="skill-header">
                                    <span class="skill-name">${skill.name}</span>
                                    <span class="skill-level">${currentLanguage === 'ar' ? (skill.rank === 'Senior' || !skill.rank ? 'خبير' : skill.rank) : (skill.rank || 'Senior')}</span>
                                </div>
                                <div class="skill-bar">
                                    <div class="skill-progress" data-progress="${skill.level}" style="width: 0%;"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    }

    grid.innerHTML = html;

    // Re-bind scroll observer for newly rendered skill cards
    if (window.skillsObserver) {
        document.querySelectorAll('#skillsGrid .reveal-up').forEach(el => window.skillsObserver.observe(el));
    }
}

function loadExperienceData() {
    const timeline = document.getElementById('experienceTimeline');
    if (!timeline || !CV_DATA.experience) return;

    let html = '';
    CV_DATA.experience.forEach((exp, idx) => {
        const title = exp.title[currentLanguage] || exp.title.en;
        const date = exp.date[currentLanguage] || exp.date.en;
        const desc = exp.description[currentLanguage] || exp.description.en;

        html += `
            <div class="timeline-item reveal-up">
                <div class="timeline-icon"><i class="${exp.icon}"></i></div>
                <div class="timeline-content glass-card">
                    <div class="timeline-header">
                        <h3 class="timeline-title">${title}</h3>
                        <span class="timeline-date"><i class="far fa-calendar-alt"></i> ${date}</span>
                    </div>
                    <p class="timeline-description">${desc}</p>
                    <ul class="timeline-list">
                        ${exp.items.map(item => {
            const itemText = typeof item === 'object' ? (item[currentLanguage] || item.en) : item;
            return `<li><i class="fas fa-check-circle"></i> <span>${itemText}</span></li>`;
        }).join('')}
                    </ul>
                </div>
            </div>
        `;
    });

    timeline.innerHTML = html;

    // Load Education
    const eduContainer = document.getElementById('educationSection');
    if (eduContainer && CV_DATA.education) {
        const edu = CV_DATA.education;
        const degree = edu.degree[currentLanguage] || edu.degree.en;
        const school = edu.school[currentLanguage] || edu.school.en;
        const date = edu.date[currentLanguage] || edu.date.en;
        const location = edu.location[currentLanguage] || edu.location.en;

        eduContainer.innerHTML = `
            <div class="education-card glass-card reveal-up">
                <div class="education-icon"><i class="${edu.icon}"></i></div>
                <div class="education-info">
                    <h3>${degree}</h3>
                    <div class="school-name">${school}</div>
                    <div class="education-details">
                        <span><i class="far fa-calendar-alt"></i> ${date}</span>
                        <span><i class="fas fa-location-dot"></i> ${location}</span>
                    </div>
                </div>
            </div>
        `;
    }
}

// ================================
// Projects Grid & Live Filter Engine
// ================================
function loadProjectsData() {
    const grid = document.getElementById('projectsGrid');
    if (!grid || typeof PROJECTS_DATA === 'undefined') return;

    let html = '';

    for (const key in PROJECTS_DATA) {
        const project = PROJECTS_DATA[key];
        const title = project.title[currentLanguage] || project.title.en;
        const excerpt = project.excerpt ? (project.excerpt[currentLanguage] || project.excerpt.en) : '';
        const category = project.category || 'web';
        const thumbnail = project.thumbnail || (project.images && project.images[0]) || '';
        const tags = project.tags || [];

        html += `
            <div class="project-card glass-card reveal-up" onclick="openProjectModal('${key}')" data-key="${key}" data-category="${category}" data-tags="${tags.join(',').toLowerCase()}">
                <div class="project-image">
                    <img src="${thumbnail}" alt="${title}" loading="lazy">
                    <div class="project-overlay">
                        <button class="project-view-btn">
                            <i class="fas fa-eye"></i>
                            <span>${currentLanguage === 'ar' ? 'استعراض التفاصيل' : 'View Details'}</span>
                        </button>
                    </div>
                </div>
                <div class="project-info">
                    <h3 class="project-title">${title}</h3>
                    <p class="project-excerpt">${excerpt}</p>
                    <div class="project-tags">
                        ${tags.slice(0, 4).map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    grid.innerHTML = html;
    filterProjects();
}

function filterProjects() {
    const searchInput = document.getElementById('projectSearchInput');
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        const category = card.dataset.category || '';
        const tags = card.dataset.tags || '';
        const title = card.querySelector('.project-title').textContent.toLowerCase();
        const excerpt = card.querySelector('.project-excerpt').textContent.toLowerCase();

        const matchesFilter = (activeFilter === 'all') || category.includes(activeFilter);
        const matchesQuery = !query || title.includes(query) || excerpt.includes(query) || tags.includes(query);

        if (matchesFilter && matchesQuery) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// ================================
// Redesigned Lightbox Project Modal
// ================================
function openProjectModal(key) {
    if (typeof PROJECTS_DATA === 'undefined' || !PROJECTS_DATA[key]) return;

    currentProject = PROJECTS_DATA[key];
    projectImages = currentProject.images || [currentProject.thumbnail];
    currentImageIndex = 0;

    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategoryBadge');
    const modalDescription = document.getElementById('modalDescription');
    const modalTags = document.getElementById('modalTags');

    if (!modal) return;

    // Title & Category
    const title = currentProject.title[currentLanguage] || currentProject.title.en;
    modalTitle.textContent = title;
    modalCategory.textContent = currentProject.category ? currentProject.category.toUpperCase() : 'PROJECT';

    // Description Paragraphs
    const descText = currentProject.description[currentLanguage] || currentProject.description.en;
    const formattedDesc = descText.split('\n\n').map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
    modalDescription.innerHTML = formattedDesc;

    // Tags
    if (modalTags && currentProject.tags) {
        modalTags.innerHTML = currentProject.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    }

    // README Download Button
    const modalReadmeBtn = document.getElementById('modalReadmeBtn');
    if (modalReadmeBtn) {
        if (currentProject.readme) {
            modalReadmeBtn.setAttribute('data-readme', currentProject.readme);
            modalReadmeBtn.setAttribute('data-filename', `${key}_README.md`);
            modalReadmeBtn.style.display = 'inline-flex';
        } else {
            modalReadmeBtn.style.display = 'none';
        }
    }

    // Gallery Setup
    updateGalleryImage();
    renderGalleryThumbnails();

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function updateGalleryImage() {
    const imgEl = document.getElementById('galleryImage');
    const blurBg = document.getElementById('galleryBlurBg');
    const currBadge = document.getElementById('currentSlide');
    const totalBadge = document.getElementById('totalSlides');
    const counterSep = document.getElementById('counterSep');

    if (imgEl && projectImages.length > 0) {
        imgEl.src = projectImages[currentImageIndex];
    }
    if (blurBg && projectImages.length > 0) {
        blurBg.style.backgroundImage = `url("${projectImages[currentImageIndex]}")`;
    }
    if (currBadge) currBadge.textContent = currentImageIndex + 1;
    if (totalBadge) totalBadge.textContent = projectImages.length;
    if (counterSep) counterSep.textContent = currentLanguage === 'ar' ? 'من' : 'of';

    // Active Thumbnail & Auto Scroll into view
    document.querySelectorAll('.gallery-thumbs-strip img').forEach((thumb, i) => {
        if (i === currentImageIndex) {
            thumb.classList.add('active');
            thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
            thumb.classList.remove('active');
        }
    });
}

function renderGalleryThumbnails() {
    const strip = document.getElementById('galleryThumbnails');
    if (!strip) return;

    if (projectImages.length <= 1) {
        strip.style.display = 'none';
        return;
    }

    strip.style.display = 'flex';
    strip.innerHTML = projectImages.map((src, i) => `
        <img src="${src}" class="${i === 0 ? 'active' : ''}" onclick="selectGalleryImage(${i})" alt="Thumb ${i + 1}">
    `).join('');
}

function selectGalleryImage(idx) {
    currentImageIndex = idx;
    updateGalleryImage();
}

function nextGalleryImage() {
    if (projectImages.length === 0) return;
    currentImageIndex = (currentImageIndex + 1) % projectImages.length;
    updateGalleryImage();
}

function prevGalleryImage() {
    if (projectImages.length === 0) return;
    currentImageIndex = (currentImageIndex - 1 + projectImages.length) % projectImages.length;
    updateGalleryImage();
}

// ================================
// Scroll Reveal Observer
// ================================
function initScrollObserver() {
    const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Animate skill progress bars on scroll
                const bars = entry.target.querySelectorAll('.skill-progress');
                bars.forEach(bar => {
                    const target = bar.getAttribute('data-progress');
                    if (target) {
                        setTimeout(() => {
                            bar.style.width = target + '%';
                        }, 100);
                    }
                });
            }
        });
    }, { threshold: 0.12 });

    window.skillsObserver = observer;
    reveals.forEach(el => observer.observe(el));
}

// Stats Counter Animation
function initStatsCounter() {
    const statVals = document.querySelectorAll('.stat-val');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target, 10);
                if (isNaN(target)) return;

                let count = 0;
                const duration = 1500;
                const step = target / (duration / 20);

                const timer = setInterval(() => {
                    count += step;
                    if (count >= target) {
                        el.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        el.textContent = Math.floor(count) + '+';
                    }
                }, 20);

                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statVals.forEach(val => observer.observe(val));
}

// ================================
// Event Listeners Initialization
// ================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();

    // Theme Switcher Button
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

    // Language Switcher Button
    const langSwitcher = document.getElementById('langSwitcher');
    if (langSwitcher) langSwitcher.addEventListener('click', toggleLanguage);

    // Navbar Toggle (Mobile)
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Scroll Navbar Effect
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 40) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        }
    });

    // Project Filters Listeners
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            activeFilter = e.target.dataset.filter;
            filterProjects();
        });
    });

    // Project Search Input Listener
    const searchInput = document.getElementById('projectSearchInput');
    const clearBtn = document.getElementById('searchClearBtn');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            if (clearBtn) {
                clearBtn.style.display = searchInput.value ? 'block' : 'none';
            }
            filterProjects();
        });
    }
    if (clearBtn && searchInput) {
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            clearBtn.style.display = 'none';
            filterProjects();
        });
    }

    // Modal Control Listeners
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.querySelector('.modal-overlay');
    if (modalClose) modalClose.addEventListener('click', closeProjectModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeProjectModal);

    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');
    if (prevBtn) prevBtn.addEventListener('click', prevGalleryImage);
    if (nextBtn) nextBtn.addEventListener('click', nextGalleryImage);

    // README Download Button Listener (UTF-8 BOM Protection for Mobile Devices)
    const modalReadmeBtn = document.getElementById('modalReadmeBtn');
    if (modalReadmeBtn) {
        modalReadmeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const readmeUrl = modalReadmeBtn.getAttribute('data-readme');
            const fileName = modalReadmeBtn.getAttribute('data-filename') || 'README.md';
            if (readmeUrl) {
                downloadReadmeFile(readmeUrl, fileName);
            }
        });
    }

    // Keyboard Navigation for Modal
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('projectModal');
        if (modal && modal.classList.contains('active')) {
            if (e.key === 'Escape') closeProjectModal();
            if (e.key === 'ArrowRight') prevGalleryImage();
            if (e.key === 'ArrowLeft') nextGalleryImage();
        }
    });

    // Initialize Observers
    initScrollObserver();
    initStatsCounter();
});

// ================================
// UTF-8 Mobile-Safe README Downloader
// ================================
async function downloadReadmeFile(readmeUrl, fileName) {
    const BOM = '\uFEFF';
    try {
        const response = await fetch(readmeUrl);
        if (!response.ok) throw new Error('HTTP ' + response.status);
        let text = await response.text();

        // Prepend UTF-8 Byte Order Mark (BOM) to force mobile text viewers to render Arabic correctly
        if (!text.startsWith(BOM)) {
            text = BOM + text;
        }

        const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
        const blobUrl = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(blobUrl);
        }, 300);
    } catch (err) {
        console.warn('Direct fetch failed for README download, using direct link fallback:', err);
        const a = document.createElement('a');
        a.href = readmeUrl;
        a.download = fileName;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => document.body.removeChild(a), 300);
    }
}

console.log('🚀 Akram Abdullah Senior Portfolio Engine V2 Fully Loaded!');
