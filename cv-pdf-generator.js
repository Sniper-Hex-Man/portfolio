// ================================
// ATS-Friendly CV PDF Generator
// Using pdfmake for direct PDF generation with Arabic support
// ================================

/**
 * Generate ATS-friendly PDF CV based on current language
 * Uses pdfmake for consistent rendering across all devices
 */
function generateATSCV() {
    const lang = currentLang || 'ar';
    const isRTL = lang === 'ar';
    const t = TRANSLATIONS[lang];
    const cv = CV_DATA;

    // Calculate years of experience
    const yearsExp = new Date().getFullYear() - cv.startYear;

    // Colors
    const primaryColor = '#4f46e5';
    const textColor = '#1f2937';
    const mutedColor = '#6b7280';

    // Build document content
    const content = [];

    // === HEADER ===
    content.push({
        text: `${t.hero.firstName} ${t.hero.lastName}`,
        style: 'header',
        alignment: isRTL ? 'right' : 'left'
    });

    content.push({
        text: t.about.heading,
        style: 'subheader',
        alignment: isRTL ? 'right' : 'left',
        margin: [0, 0, 0, 5]
    });

    content.push({
        canvas: [{
            type: 'line',
            x1: 0, y1: 0,
            x2: 515, y2: 0,
            lineWidth: 2,
            lineColor: primaryColor
        }],
        margin: [0, 0, 0, 15]
    });

    // === CONTACT INFO ===
    content.push({
        text: t.pdf.contact,
        style: 'sectionTitle',
        alignment: isRTL ? 'right' : 'left'
    });

    content.push({
        canvas: [{
            type: 'line',
            x1: 0, y1: 0,
            x2: 515, y2: 0,
            lineWidth: 0.5,
            lineColor: primaryColor
        }],
        margin: [0, 0, 0, 8]
    });

    const contactText = [
        `${isRTL ? 'البريد:' : 'Email:'} ${cv.contact.email}`,
        `${isRTL ? 'الهاتف:' : 'Phone:'} ${cv.contact.phone}`,
        `${isRTL ? 'الموقع:' : 'Location:'} ${cv.contact.location[lang]}`,
        `GitHub: ${cv.contact.github}`
    ].join('  |  ');

    content.push({
        text: contactText,
        style: 'normalText',
        alignment: isRTL ? 'right' : 'left',
        margin: [0, 0, 0, 15]
    });

    // === SUMMARY ===
    content.push({
        text: t.pdf.summary,
        style: 'sectionTitle',
        alignment: isRTL ? 'right' : 'left'
    });

    content.push({
        canvas: [{
            type: 'line',
            x1: 0, y1: 0,
            x2: 515, y2: 0,
            lineWidth: 0.5,
            lineColor: primaryColor
        }],
        margin: [0, 0, 0, 8]
    });

    content.push({
        text: t.about.desc1,
        style: 'normalText',
        alignment: isRTL ? 'right' : 'left',
        margin: [0, 0, 0, 15]
    });

    // === SKILLS ===
    content.push({
        text: t.pdf.skills,
        style: 'sectionTitle',
        alignment: isRTL ? 'right' : 'left'
    });

    content.push({
        canvas: [{
            type: 'line',
            x1: 0, y1: 0,
            x2: 515, y2: 0,
            lineWidth: 0.5,
            lineColor: primaryColor
        }],
        margin: [0, 0, 0, 8]
    });

    Object.keys(cv.skills).forEach(category => {
        const skillCategory = cv.skills[category];
        if (!skillCategory.items) return;

        const skillNames = skillCategory.items.map(item => {
            if (item.level) return `${item.name} (${item.rank})`;
            return item.name;
        }).join(' • ');

        content.push({
            text: [
                { text: skillCategory.title[lang] + ': ', bold: true },
                { text: skillNames, color: mutedColor }
            ],
            style: 'normalText',
            alignment: isRTL ? 'right' : 'left',
            margin: [0, 0, 0, 5]
        });
    });

    content.push({ text: '', margin: [0, 0, 0, 10] });

    // === EXPERIENCE ===
    content.push({
        text: t.pdf.experience,
        style: 'sectionTitle',
        alignment: isRTL ? 'right' : 'left'
    });

    content.push({
        canvas: [{
            type: 'line',
            x1: 0, y1: 0,
            x2: 515, y2: 0,
            lineWidth: 0.5,
            lineColor: primaryColor
        }],
        margin: [0, 0, 0, 8]
    });

    cv.experience.forEach(exp => {
        content.push({
            text: exp.title[lang],
            style: 'jobTitle',
            alignment: isRTL ? 'right' : 'left'
        });

        content.push({
            text: exp.date[lang],
            style: 'dateText',
            alignment: isRTL ? 'right' : 'left',
            margin: [0, 0, 0, 3]
        });

        content.push({
            text: exp.description[lang],
            style: 'normalText',
            alignment: isRTL ? 'right' : 'left',
            margin: [0, 0, 0, 5]
        });

        // Experience items as bullet list
        const itemsList = exp.items.map(item => ({
            text: item[lang],
            style: 'bulletItem',
            alignment: isRTL ? 'right' : 'left'
        }));

        content.push({
            ul: itemsList,
            margin: [isRTL ? 0 : 15, 0, isRTL ? 15 : 0, 10]
        });
    });

    // === EDUCATION ===
    content.push({
        text: t.pdf.education,
        style: 'sectionTitle',
        alignment: isRTL ? 'right' : 'left'
    });

    content.push({
        canvas: [{
            type: 'line',
            x1: 0, y1: 0,
            x2: 515, y2: 0,
            lineWidth: 0.5,
            lineColor: primaryColor
        }],
        margin: [0, 0, 0, 8]
    });

    content.push({
        text: cv.education.degree[lang],
        style: 'jobTitle',
        alignment: isRTL ? 'right' : 'left'
    });

    content.push({
        text: cv.education.school[lang],
        style: 'normalText',
        alignment: isRTL ? 'right' : 'left'
    });

    content.push({
        text: `${cv.education.date[lang]} | ${cv.education.location[lang]}`,
        style: 'dateText',
        alignment: isRTL ? 'right' : 'left'
    });

    // Document definition
    const docDefinition = {
        pageSize: 'A4',
        pageMargins: [40, 40, 40, 40],
        content: content,
        defaultStyle: {
            font: 'Roboto',
            fontSize: 10,
            lineHeight: 1.3
        },
        styles: {
            header: {
                fontSize: 24,
                bold: true,
                color: primaryColor,
                margin: [0, 0, 0, 5]
            },
            subheader: {
                fontSize: 12,
                color: mutedColor,
                margin: [0, 0, 0, 10]
            },
            sectionTitle: {
                fontSize: 13,
                bold: true,
                color: primaryColor,
                margin: [0, 10, 0, 3]
            },
            jobTitle: {
                fontSize: 12,
                bold: true,
                color: textColor,
                margin: [0, 0, 0, 2]
            },
            dateText: {
                fontSize: 9,
                italics: true,
                color: mutedColor
            },
            normalText: {
                fontSize: 10,
                color: textColor
            },
            bulletItem: {
                fontSize: 9,
                color: mutedColor,
                margin: [0, 2, 0, 2]
            }
        }
    };

    // Generate and download PDF
    pdfMake.createPdf(docDefinition).download(t.pdf.fileName + '.pdf');
    console.log('✅ PDF generated successfully');
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
