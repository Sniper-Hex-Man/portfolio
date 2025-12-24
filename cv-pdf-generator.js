// ================================
// ATS-Friendly CV PDF Generator
// Using html2pdf for proper Arabic support
// ================================

/**
 * Helper function to wrap English text in LTR isolate for proper BiDi rendering
 */
function isolateEnglish(text) {
    if (!text) return '';
    // Wrap English words/phrases in unicode isolate markers
    // This prevents RTL text from affecting LTR text direction
    return text.replace(/([A-Za-z0-9._@:\-\/+#&]+(?:\s+[A-Za-z0-9._@:\-\/+#&]+)*)/g,
        '<span style="unicode-bidi: isolate; direction: ltr;">$1</span>');
}

/**
 * Generate ATS-friendly PDF CV based on current language
 * Uses html2pdf which renders HTML to canvas then to PDF,
 * properly supporting Arabic and other Unicode characters.
 */
function generateATSCV() {
    const lang = currentLang || 'ar';
    const isRTL = lang === 'ar';
    const t = TRANSLATIONS[lang];
    const cv = CV_DATA;

    // Calculate years of experience
    const yearsExp = new Date().getFullYear() - cv.startYear;

    // Helper to process text for RTL
    const processText = (text) => isRTL ? isolateEnglish(text) : text;

    // Build HTML content as a complete document string
    const htmlContent = `
        <div id="cv-pdf-content" style="
            margin: 0;
            width: 190mm;
            padding: 10mm;
            padding-top: 8mm;
            background: white;
            font-family: 'Cairo', 'Segoe UI', Tahoma, sans-serif;
            direction: ${isRTL ? 'rtl' : 'ltr'};
            text-align: ${isRTL ? 'right' : 'left'};
            color: #1f2937;
            line-height: 1.8;
            font-size: 12px;
            box-sizing: border-box;
        ">
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                .cv-header { margin: 0; margin-bottom: 15px; border-bottom: 3px solid #4f46e5; padding-bottom: 12px; padding-top: 0; }
                .cv-name { font-size: 26px; font-weight: 800; color: #4f46e5; margin-bottom: 4px; }
                .cv-title { font-size: 14px; color: #6b7280; }
                .cv-section { margin-bottom: 18px; }
                .cv-section-title { font-size: 14px; font-weight: 700; color: #4f46e5; border-bottom: 2px solid #4f46e5; padding-bottom: 4px; margin-bottom: 10px; }
                .cv-text { font-size: 11px; color: #374151; margin-bottom: 6px; line-height: 1.8; }
                .cv-contact-grid { display: block; }
                .cv-contact-item { font-size: 11px; color: #374151; margin-bottom: 4px; display: block; }
                .cv-skill-category { font-size: 12px; font-weight: 600; color: #1f2937; margin-bottom: 3px; margin-top: 8px; }
                .cv-skill-list { font-size: 10px; color: #4b5563; direction: ltr; text-align: ${isRTL ? 'right' : 'left'}; unicode-bidi: plaintext; }
                .cv-exp-block { margin-bottom: 14px; }
                .cv-exp-title { font-size: 13px; font-weight: 700; color: #1f2937; margin-bottom: 3px; }
                .cv-exp-date { font-size: 10px; color: #6b7280; font-style: italic; margin-bottom: 5px; }
                .cv-exp-desc { font-size: 10px; color: #374151; margin-bottom: 5px; line-height: 1.7; }
                .cv-exp-item { font-size: 10px; color: #4b5563; margin-bottom: 3px; padding-${isRTL ? 'right' : 'left'}: 12px; line-height: 1.6; }
                .cv-edu-degree { font-size: 13px; font-weight: 600; color: #1f2937; }
                .cv-edu-school { font-size: 11px; color: #374151; }
                .cv-edu-info { font-size: 10px; color: #6b7280; }
                .ltr-text { unicode-bidi: isolate; direction: ltr; }
            </style>
            
            <!-- Header -->
            <div class="cv-header">
                <div class="cv-name">${t.hero.firstName} ${t.hero.lastName}</div>
                <div class="cv-title">${processText(t.about.heading)}</div>
            </div>
            
            <!-- Contact -->
            <div class="cv-section">
                <div class="cv-section-title">${t.pdf.contact}</div>
                <div style="display: flex; flex-wrap: wrap; gap: 8px 25px; font-size: 11px; color: #374151; direction: ltr; justify-content: ${isRTL ? 'flex-end' : 'flex-start'};">
                    <div><strong>${isRTL ? 'البريد:' : 'Email:'}</strong> ${cv.contact.email}</div>
                    <div><strong>${isRTL ? 'الهاتف:' : 'Phone:'}</strong> ${cv.contact.phone}</div>
                    <div><strong>${isRTL ? 'الموقع:' : 'Location:'}</strong> ${cv.contact.location[lang]}</div>
                </div>
                <div style="font-size: 11px; color: #374151; margin-top: 5px; direction: ltr; text-align: ${isRTL ? 'right' : 'left'};">
                    <strong>${isRTL ? 'GitHub:' : 'GitHub:'}</strong> ${cv.contact.github}
                </div>
            </div>
            
            <!-- Summary -->
            <div class="cv-section">
                <div class="cv-section-title">${t.pdf.summary}</div>
                <div class="cv-text">${processText(t.about.desc1)}</div>
            </div>
            
            <!-- Skills -->
            <div class="cv-section">
                <div class="cv-section-title">${t.pdf.skills}</div>
                ${Object.keys(cv.skills).map(category => {
        const skillCategory = cv.skills[category];
        if (!skillCategory.items) return '';
        const skillNames = skillCategory.items.map(item => {
            if (item.level) return `${item.name} (${item.rank})`;
            return item.name;
        }).join(' • ');
        return `
                        <div class="cv-skill-category">${skillCategory.title[lang]}:</div>
                        <div class="cv-skill-list">${skillNames}</div>
                    `;
    }).join('')}
            </div>
            
            <!-- Experience -->
            <div class="cv-section">
                <div class="cv-section-title">${t.pdf.experience}</div>
                ${cv.experience.map(exp => `
                    <div class="cv-exp-block">
                        <div class="cv-exp-title">${exp.title[lang]}</div>
                        <div class="cv-exp-date">${exp.date[lang]}</div>
                        <div class="cv-exp-desc">${processText(exp.description[lang])}</div>
                        ${exp.items.map(item => `
                            <div class="cv-exp-item">• ${processText(item[lang])}</div>
                        `).join('')}
                    </div>
                `).join('')}
            </div>
            
            <!-- Education -->
            <div class="cv-section">
                <div class="cv-section-title">${t.pdf.education}</div>
                <div class="cv-edu-degree">${cv.education.degree[lang]}</div>
                <div class="cv-edu-school">${cv.education.school[lang]}</div>
                <div class="cv-edu-info">${cv.education.date[lang]} | ${cv.education.location[lang]}</div>
            </div>
        </div>
    `;

    // Create a temporary container
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    // Use visibility:hidden and fixed positioning to ensure proper rendering on all environments
    tempDiv.style.cssText = 'position: fixed; left: 0; top: 0; z-index: -9999; visibility: hidden; width: 210mm; background: white;';
    document.body.appendChild(tempDiv);

    const element = tempDiv.querySelector('#cv-pdf-content');

    // PDF options - optimized for consistent rendering across devices
    const opt = {
        margin: 0,
        filename: t.pdf.fileName + '.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            scrollX: 0,
            scrollY: 0,
            windowWidth: 800,
            windowHeight: 1200
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
        }
    };

    // Wait for fonts to load before generating PDF
    document.fonts.ready.then(() => {
        // Generate PDF with delay to ensure rendering
        setTimeout(() => {
            html2pdf().set(opt).from(element).save().then(() => {
                document.body.removeChild(tempDiv);
                console.log('✅ PDF generated successfully');
            }).catch(err => {
                console.error('PDF generation error:', err);
                document.body.removeChild(tempDiv);
            });
        }, 150);
    });
}

// Initialize download button when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    const downloadBtn = document.getElementById('downloadCVBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function (e) {
            e.preventDefault();
            generateATSCV();
        });
    }
});

// Update button text when language changes
function updateDownloadButtonText() {
    const downloadBtn = document.getElementById('downloadCVBtn');
    if (downloadBtn) {
        const btnText = downloadBtn.querySelector('span');
        if (btnText && TRANSLATIONS[currentLang]) {
            btnText.textContent = TRANSLATIONS[currentLang].pdf.downloadBtn;
        }
    }
}
