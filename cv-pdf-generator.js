// ================================
// ATS-Friendly CV PDF Generator
// Using pdfmake with proper Arabic font support
// ================================

// Track font loading status
let arabicFontLoaded = false;
let fontLoadAttempts = 0;
const MAX_FONT_LOAD_ATTEMPTS = 3;

/**
 * Reverse Arabic text for proper RTL display in pdfmake
 * pdfmake doesn't support RTL natively, so we need to reverse word order
 */
function reverseArabicText(text) {
    if (!text) return '';

    // Split by spaces, reverse, and join
    const words = text.split(' ');
    return words.reverse().join(' ');
}

/**
 * Check if text contains Arabic characters
 */
function containsArabic(text) {
    if (!text) return false;
    const arabicPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
    return arabicPattern.test(text);
}

/**
 * Process text for RTL if needed
 */
function processTextForRTL(text, isRTL) {
    if (!isRTL || !containsArabic(text)) return text;
    return reverseArabicText(text);
}

/**
 * Convert ArrayBuffer to Base64
 */
function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

/**
 * Load Arabic font from embedded base64 data (no CORS issues)
 */
function loadArabicFont() {
    if (arabicFontLoaded) return true;

    try {
        fontLoadAttempts++;
        console.log(`Loading embedded Arabic fonts (attempt ${fontLoadAttempts})`);

        // Check if embedded font data exists (Cairo font - same as portfolio)
        if (typeof CAIRO_REGULAR_BASE64 === 'undefined' || typeof CAIRO_BOLD_BASE64 === 'undefined') {
            throw new Error('Embedded font data not found. Make sure cairo-font-data.js is loaded.');
        }

        // Register fonts with pdfmake VFS using embedded base64 data
        if (!pdfMake.vfs) {
            pdfMake.vfs = {};
        }
        pdfMake.vfs['Cairo-Regular.ttf'] = CAIRO_REGULAR_BASE64;
        pdfMake.vfs['Cairo-Bold.ttf'] = CAIRO_BOLD_BASE64;

        // Configure fonts
        pdfMake.fonts = {
            ArabicFont: {
                normal: 'Cairo-Regular.ttf',
                bold: 'Cairo-Bold.ttf',
                italics: 'Cairo-Regular.ttf',
                bolditalics: 'Cairo-Bold.ttf'
            },
            Roboto: {
                normal: 'Roboto-Regular.ttf',
                bold: 'Roboto-Medium.ttf',
                italics: 'Roboto-Italic.ttf',
                bolditalics: 'Roboto-MediumItalic.ttf'
            }
        };

        arabicFontLoaded = true;
        console.log('✅ Arabic font (Cairo) loaded successfully from embedded data');
        return true;

    } catch (error) {
        console.error('❌ Failed to load embedded Arabic font:', error.message);
        return false;
    }
}

/**
 * Generate ATS-friendly PDF CV based on current language
 */
async function generateATSCV() {
    const lang = currentLang || 'ar';
    const isRTL = lang === 'ar';
    const t = TRANSLATIONS[lang];
    const cv = CV_DATA;

    // Calculate years of experience
    const yearsExp = new Date().getFullYear() - cv.startYear;

    // Show loading state on button
    const downloadBtn = document.getElementById('downloadCVBtn');
    const originalContent = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>' + (isRTL ? 'جاري التحميل...' : 'Loading...') + '</span>';
    downloadBtn.disabled = true;

    try {
        // Load Arabic font
        if (isRTL) {
            const fontLoaded = await loadArabicFont();
            if (!fontLoaded) {
                console.warn('Arabic font could not be loaded, using fallback');
            }
        }

        // Define colors
        const primaryColor = '#4f46e5';
        const textColor = '#1f2937';
        const lightTextColor = '#6b7280';

        // Helper to process text for RTL
        const pText = (text) => processTextForRTL(text, isRTL);

        // Choose font based on language
        const mainFont = (isRTL && arabicFontLoaded) ? 'ArabicFont' : 'Roboto';

        // Build document definition
        const docDefinition = {
            pageSize: 'A4',
            pageMargins: [30, 30, 30, 30],
            defaultStyle: {
                font: mainFont,
                fontSize: 9,
                color: textColor,
                lineHeight: 1.3
            },
            content: [
                // Header - Name and Title
                {
                    text: pText(t.hero.firstName + ' ' + t.hero.lastName),
                    fontSize: 22,
                    bold: true,
                    color: primaryColor,
                    alignment: isRTL ? 'right' : 'left',
                    margin: [0, 0, 0, 4]
                },
                {
                    text: pText(t.about.heading),
                    fontSize: 12,
                    color: lightTextColor,
                    alignment: isRTL ? 'right' : 'left',
                    margin: [0, 0, 0, 8]
                },
                {
                    canvas: [{ type: 'line', x1: 0, y1: 0, x2: 535, y2: 0, lineWidth: 2, lineColor: primaryColor }],
                    margin: [0, 0, 0, 10]
                },

                // Contact Section
                {
                    text: pText(t.pdf.contact),
                    fontSize: 13,
                    bold: true,
                    color: primaryColor,
                    alignment: isRTL ? 'right' : 'left',
                    margin: [0, 0, 0, 6]
                },
                {
                    columns: isRTL ? [
                        { text: 'البريد: ' + cv.contact.email, fontSize: 9, alignment: 'right', width: '*' },
                        { text: 'الهاتف: ' + cv.contact.phone, fontSize: 9, alignment: 'center', width: '*' },
                        { text: 'الموقع: ' + cv.contact.location[lang], fontSize: 9, alignment: 'left', width: '*' }
                    ] : [
                        { text: 'Email: ' + cv.contact.email, fontSize: 9, alignment: 'left', width: '*' },
                        { text: 'Phone: ' + cv.contact.phone, fontSize: 9, alignment: 'center', width: '*' },
                        { text: 'Location: ' + cv.contact.location[lang], fontSize: 9, alignment: 'right', width: '*' }
                    ],
                    margin: [0, 0, 0, 3]
                },
                {
                    text: 'GitHub: ' + cv.contact.github,
                    fontSize: 9,
                    alignment: isRTL ? 'right' : 'left',
                    margin: [0, 0, 0, 10]
                },

                // Summary Section
                {
                    text: pText(t.pdf.summary),
                    fontSize: 13,
                    bold: true,
                    color: primaryColor,
                    alignment: isRTL ? 'right' : 'left',
                    margin: [0, 0, 0, 5]
                },
                {
                    text: pText(t.about.desc1),
                    fontSize: 9,
                    alignment: isRTL ? 'right' : 'left',
                    margin: [0, 0, 0, 10],
                    lineHeight: 1.4
                },

                // Skills Section
                {
                    text: pText(t.pdf.skills),
                    fontSize: 13,
                    bold: true,
                    color: primaryColor,
                    alignment: isRTL ? 'right' : 'left',
                    margin: [0, 0, 0, 5]
                },
                ...buildSkillsContent(cv.skills, lang, isRTL, pText),

                // Experience Section
                {
                    text: pText(t.pdf.experience),
                    fontSize: 13,
                    bold: true,
                    color: primaryColor,
                    alignment: isRTL ? 'right' : 'left',
                    margin: [0, 8, 0, 5]
                },
                ...buildExperienceContent(cv.experience, lang, isRTL, pText),

                // Education Section
                {
                    text: pText(t.pdf.education),
                    fontSize: 13,
                    bold: true,
                    color: primaryColor,
                    alignment: isRTL ? 'right' : 'left',
                    margin: [0, 8, 0, 5]
                },
                {
                    text: pText(cv.education.degree[lang]),
                    fontSize: 11,
                    bold: true,
                    alignment: isRTL ? 'right' : 'left',
                    margin: [0, 0, 0, 2]
                },
                {
                    text: pText(cv.education.school[lang]),
                    fontSize: 9,
                    alignment: isRTL ? 'right' : 'left',
                    margin: [0, 0, 0, 2]
                },
                {
                    text: pText(cv.education.date[lang] + ' | ' + cv.education.location[lang]),
                    fontSize: 9,
                    color: lightTextColor,
                    alignment: isRTL ? 'right' : 'left'
                }
            ]
        };

        // Generate and download PDF
        pdfMake.createPdf(docDefinition).download(t.pdf.fileName + '.pdf');
        console.log('✅ PDF generated successfully with pdfmake');

    } catch (error) {
        console.error('PDF generation error:', error);
        alert(isRTL ? 'حدث خطأ أثناء إنشاء PDF' : 'Error generating PDF');
    } finally {
        // Restore button state
        downloadBtn.innerHTML = originalContent;
        downloadBtn.disabled = false;
    }
}

/**
 * Build skills content for pdfmake
 */
function buildSkillsContent(skills, lang, isRTL, pText) {
    const content = [];

    Object.keys(skills).forEach(category => {
        const skillCategory = skills[category];
        if (!skillCategory.items) return;

        const skillNames = skillCategory.items.map(item => {
            if (item.level) return item.name + ' (' + item.rank + ')';
            return item.name;
        }).join(' • ');

        content.push({
            text: pText(skillCategory.title[lang]) + ':',
            fontSize: 10,
            bold: true,
            alignment: isRTL ? 'right' : 'left',
            margin: [0, 4, 0, 2]
        });

        content.push({
            text: skillNames,
            fontSize: 9,
            color: '#4b5563',
            alignment: isRTL ? 'right' : 'left',
            margin: [0, 0, 0, 3]
        });
    });

    return content;
}

/**
 * Build experience content for pdfmake
 */
function buildExperienceContent(experience, lang, isRTL, pText) {
    const content = [];

    experience.forEach(exp => {
        content.push({
            text: pText(exp.title[lang]),
            fontSize: 11,
            bold: true,
            alignment: isRTL ? 'right' : 'left',
            margin: [0, 5, 0, 2]
        });

        content.push({
            text: pText(exp.date[lang]),
            fontSize: 9,
            italics: true,
            color: '#6b7280',
            alignment: isRTL ? 'right' : 'left',
            margin: [0, 0, 0, 3]
        });

        content.push({
            text: pText(exp.description[lang]),
            fontSize: 9,
            alignment: isRTL ? 'right' : 'left',
            margin: [0, 0, 0, 3]
        });

        // Experience items as bullet points
        exp.items.forEach(item => {
            content.push({
                text: (isRTL ? pText(item[lang]) + ' •' : '• ' + item[lang]),
                fontSize: 9,
                color: '#4b5563',
                alignment: isRTL ? 'right' : 'left',
                margin: isRTL ? [0, 0, 10, 2] : [10, 0, 0, 2]
            });
        });
    });

    return content;
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
