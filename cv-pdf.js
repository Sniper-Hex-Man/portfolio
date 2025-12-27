// ================================
// Professional CV PDF Generator
// Uses @digicole/pdfmake-rtl for Arabic RTL support
// ================================

const CVPDFGenerator = {
    // Colors
    colors: {
        primary: '#1e293b',
        secondary: '#64748b',
        accent: '#2563eb',
        lightBg: '#f1f5f9'
    },

    // Generate PDF
    async generatePDF(lang = 'ar') {
        const isRTL = lang === 'ar';
        const t = TRANSLATIONS[lang].pdf;
        const heroT = TRANSLATIONS[lang].hero;
        const aboutT = TRANSLATIONS[lang].about;
        const contact = CV_DATA.contact;
        const skills = CV_DATA.skills;
        const experiences = CV_DATA.experience;
        const edu = CV_DATA.education;

        // Full name and title
        const fullName = heroT.firstName + ' ' + heroT.lastName;
        const title = 'Full-Stack Developer';

        // Build document definition
        const docDefinition = {
            pageSize: 'A4',
            pageMargins: [40, 40, 40, 40],

            // Content
            content: [
                // Header - Name
                {
                    text: fullName,
                    fontSize: 28,
                    bold: true,
                    color: this.colors.primary,
                    alignment: isRTL ? 'right' : 'left',
                    margin: [0, 0, 0, 5]
                },

                // Title
                {
                    text: title,
                    fontSize: 16,
                    bold: true,
                    color: this.colors.accent,
                    alignment: isRTL ? 'right' : 'left',
                    margin: [0, 0, 0, 10]
                },

                // Separator line
                {
                    canvas: [{
                        type: 'line',
                        x1: 0, y1: 0,
                        x2: 515, y2: 0,
                        lineWidth: 2,
                        lineColor: this.colors.accent
                    }],
                    margin: [0, 0, 0, 15]
                },

                // Contact info
                {
                    columns: [
                        { text: contact.email, alignment: 'center', fontSize: 9, color: this.colors.secondary },
                        { text: contact.phone, alignment: 'center', fontSize: 9, color: this.colors.secondary },
                        { text: contact.location[lang], alignment: 'center', fontSize: 9, color: this.colors.secondary },
                        { text: 'github.com/Sniper-Hex-Man', alignment: 'center', fontSize: 9, color: this.colors.secondary }
                    ],
                    margin: [0, 0, 0, 20]
                },

                // Summary Section
                this.createSection(t.summary, [
                    {
                        text: aboutT.desc1,
                        fontSize: 11,
                        alignment: isRTL ? 'right' : 'left',
                        lineHeight: 1.6
                    }
                ], isRTL),

                // Skills Section
                this.createSection(t.skills, this.buildSkillsContent(skills, lang, isRTL), isRTL),

                // Experience Section
                this.createSection(t.experience, this.buildExperienceContent(experiences, lang, isRTL), isRTL),

                // Education Section
                this.createSection(t.education, this.buildEducationContent(edu, lang, isRTL), isRTL)
            ]
        };

        // Create and download PDF
        const fileName = t.fileName + '.pdf';

        try {
            pdfMake.createPdf(docDefinition).download(fileName);
        } catch (error) {
            console.error('PDF generation failed:', error);
            alert('خطأ في إنشاء PDF: ' + error.message);
        }
    },

    // Create section with title bar
    createSection(title, content, isRTL) {
        return {
            stack: [
                {
                    table: {
                        widths: ['*'],
                        body: [[
                            {
                                text: title,
                                fontSize: 14,
                                bold: true,
                                color: this.colors.primary,
                                fillColor: this.colors.lightBg,
                                margin: [10, 8, 10, 8],
                                alignment: isRTL ? 'right' : 'left'
                            }
                        ]]
                    },
                    layout: 'noBorders',
                    margin: [0, 0, 0, 10]
                },
                ...content
            ],
            margin: [0, 0, 0, 15]
        };
    },

    // Build skills content
    buildSkillsContent(skills, lang, isRTL) {
        const categories = ['backend', 'frontend', 'mobile', 'tools'];
        const content = [];

        categories.forEach(catKey => {
            const category = skills[catKey];
            if (!category) return;

            const skillsList = category.items.map(item => {
                if (item.level) return `${item.name} (${item.rank})`;
                return item.name;
            }).join('  •  ');

            content.push({
                columns: isRTL ? [
                    { text: skillsList, fontSize: 10, color: this.colors.secondary, alignment: 'right' },
                    { text: category.title[lang] + ':', width: 100, fontSize: 11, bold: true, color: this.colors.primary, alignment: 'right' }
                ] : [
                    { text: category.title[lang] + ':', width: 100, fontSize: 11, bold: true, color: this.colors.primary },
                    { text: skillsList, fontSize: 10, color: this.colors.secondary }
                ],
                columnGap: 10,
                margin: [0, 0, 0, 6]
            });
        });

        return content;
    },

    // Build experience content
    buildExperienceContent(experiences, lang, isRTL) {
        const content = [];

        experiences.forEach((exp, index) => {
            content.push({
                columns: isRTL ? [
                    { text: exp.date[lang], fontSize: 10, color: this.colors.accent, width: 80, alignment: 'left' },
                    { text: exp.title[lang], fontSize: 12, bold: true, color: this.colors.primary, alignment: 'right' }
                ] : [
                    { text: exp.title[lang], fontSize: 12, bold: true, color: this.colors.primary },
                    { text: exp.date[lang], fontSize: 10, color: this.colors.accent, width: 80, alignment: 'right' }
                ]
            });

            content.push({
                text: exp.description[lang],
                fontSize: 10,
                color: this.colors.secondary,
                alignment: isRTL ? 'right' : 'left',
                margin: [0, 3, 0, 5]
            });

            const bullets = exp.items.map(item => ({
                text: item[lang],
                fontSize: 10,
                margin: [0, 2, 0, 2]
            }));

            content.push({
                ul: bullets,
                margin: [isRTL ? 0 : 15, 0, isRTL ? 15 : 0, index < experiences.length - 1 ? 12 : 0]
            });
        });

        return content;
    },

    // Build education content
    buildEducationContent(edu, lang, isRTL) {
        return [
            {
                columns: isRTL ? [
                    { text: edu.date[lang], fontSize: 10, color: this.colors.accent, width: 80, alignment: 'left' },
                    { text: edu.degree[lang], fontSize: 12, bold: true, color: this.colors.primary, alignment: 'right' }
                ] : [
                    { text: edu.degree[lang], fontSize: 12, bold: true, color: this.colors.primary },
                    { text: edu.date[lang], fontSize: 10, color: this.colors.accent, width: 80, alignment: 'right' }
                ]
            },
            {
                text: edu.school[lang] + ' - ' + edu.location[lang],
                fontSize: 10,
                color: this.colors.secondary,
                alignment: isRTL ? 'right' : 'left',
                margin: [0, 3, 0, 0]
            }
        ];
    }
};

// Initialize download button
document.addEventListener('DOMContentLoaded', function () {
    const downloadBtn = document.getElementById('downloadCVBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function () {
            CVPDFGenerator.generatePDF(currentLang);
        });
    }
});
