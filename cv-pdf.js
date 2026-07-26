// ================================
// Professional Executive CV PDF Generator
// Uses @digicole/pdfmake-rtl for Arabic RTL support
// ================================

const CVPDFGenerator = {
    // Premium Color Palette
    colors: {
        headerBg: '#0f172a',      // Dark Slate Header
        headerText: '#ffffff',    // Crisp White Text
        headerSub: '#60a5fa',     // Accent Blue Subtitle
        primary: '#1e293b',       // Dark Navy Primary Text
        secondary: '#475569',     // Slate Secondary Text
        accent: '#2563eb',        // Royal Blue Accent
        accentLight: '#eff6ff',   // Soft Blue Fill
        lightBg: '#f8fafc',       // Soft Slate Background
        border: '#e2e8f0',       // Subtle Border
        muted: '#94a3b8'         // Muted Text
    },

    // Generate PDF
    async generatePDF(lang = 'ar') {
        const isRTL = lang === 'ar';
        const t = (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS[lang] && TRANSLATIONS[lang].pdf) ? TRANSLATIONS[lang].pdf : {};
        const heroT = (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS[lang] && TRANSLATIONS[lang].hero) ? TRANSLATIONS[lang].hero : {};
        const aboutT = (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS[lang] && TRANSLATIONS[lang].about) ? TRANSLATIONS[lang].about : {};
        const contact = (typeof CV_DATA !== 'undefined' && CV_DATA.contact) ? CV_DATA.contact : {};
        const skills = (typeof CV_DATA !== 'undefined' && CV_DATA.skills) ? CV_DATA.skills : {};
        const experiences = (typeof CV_DATA !== 'undefined' && CV_DATA.experience) ? CV_DATA.experience : [];
        const edu = (typeof CV_DATA !== 'undefined' && CV_DATA.education) ? CV_DATA.education : {};
        const projectsData = typeof PROJECTS_DATA !== 'undefined' ? PROJECTS_DATA : {};

        // Candidate Info
        const fullName = (heroT.firstName && heroT.lastName) 
            ? `${heroT.firstName} ${heroT.lastName}` 
            : (isRTL ? 'أكرم عبدالله' : 'Akram Abdullah');
            
        const jobTitle = isRTL 
            ? 'مهندس ومطور برمجيات أول | Senior Full-Stack & Mobile Engineer' 
            : 'Senior Full-Stack & Mobile Software Engineer';

        // Document Definition
        const docDefinition = {
            pageSize: 'A4',
            pageMargins: [35, 35, 35, 45],

            // Content
            content: [
                // 1. Header Banner
                this.buildHeaderBanner(fullName, jobTitle, contact, lang, isRTL),

                { text: '', margin: [0, 0, 0, 15] },

                // 2. Executive Summary Section
                this.createSection(
                    t.summary || (isRTL ? 'الملخص المهني' : 'Executive Summary'),
                    [
                        {
                            text: aboutT.desc1 || (isRTL 
                                ? 'مطور برمجيات أول بخبرة تزيد عن 7 سنوات، أتخصص في تصميم وتطوير الأنظمة والتطبيقات المعقدة للويب والموبايل والمؤسسات.' 
                                : 'Senior Software Engineer with 7+ years of experience specializing in scalable web, cross-platform mobile, and enterprise solutions.'),
                            fontSize: 10,
                            color: this.colors.primary,
                            alignment: isRTL ? 'right' : 'left',
                            lineHeight: 1.45
                        },
                        {
                            text: aboutT.desc2 || '',
                            fontSize: 9.5,
                            color: this.colors.secondary,
                            alignment: isRTL ? 'right' : 'left',
                            lineHeight: 1.45,
                            margin: [0, 4, 0, 0]
                        }
                    ],
                    isRTL
                ),

                // 3. Key Stats & Highlights Section
                this.createSection(
                    t.highlights || (isRTL ? 'أبرز المنجزات والإحصائيات' : 'Key Highlights & Metrics'),
                    [this.buildStatsGrid(lang, isRTL)],
                    isRTL
                ),

                // 4. Technical Expertise Section
                this.createSection(
                    t.skills || (isRTL ? 'المهارات والتقنيات' : 'Technical Expertise'),
                    this.buildSkillsContent(skills, lang, isRTL),
                    isRTL
                ),

                // 5. Featured Projects Section
                this.createSection(
                    t.featuredProjects || (isRTL ? 'أبرز المشاريع والأنظمة المؤسسية' : 'Featured Enterprise Systems'),
                    this.buildProjectsContent(projectsData, lang, isRTL),
                    isRTL
                ),

                // 6. Experience Section
                this.createSection(
                    t.experience || (isRTL ? 'الخبرات والمسيرة' : 'Work History'),
                    this.buildExperienceContent(experiences, lang, isRTL),
                    isRTL
                ),

                // 7. Education Section
                this.createSection(
                    t.education || (isRTL ? 'المؤهل الأكاديمي' : 'Education'),
                    this.buildEducationContent(edu, lang, isRTL),
                    isRTL
                )
            ],

            // Footer with page numbering
            footer: function (currentPage, pageCount) {
                const footerText = isRTL 
                    ? `أكرم عبدالله - السيرة الذاتية | صفحة ${currentPage} من ${pageCount}`
                    : `Akram Abdullah - Professional Resume | Page ${currentPage} of ${pageCount}`;
                return {
                    text: footerText,
                    alignment: 'center',
                    fontSize: 8.5,
                    color: '#94a3b8',
                    margin: [0, 15, 0, 0]
                };
            }
        };

        // File name & download
        const fileName = (t.fileName || (isRTL ? 'Akram_Abdullah_CV_AR' : 'Akram_Abdullah_CV_EN')) + '.pdf';

        try {
            pdfMake.createPdf(docDefinition).download(fileName);
        } catch (error) {
            console.error('PDF generation failed:', error);
            alert((isRTL ? 'خطأ في إنشاء PDF: ' : 'PDF Generation Error: ') + error.message);
        }
    },

    // Header Banner Generator with Vector SVG Icons
    buildHeaderBanner(fullName, jobTitle, contact, lang, isRTL) {
        const email = contact.email || 'megamansa64020@gmail.com';
        const phone = contact.phone || '+966504550864';
        const loc = (contact.location && contact.location[lang]) ? contact.location[lang] : (isRTL ? 'المملكة العربية السعودية' : 'Saudi Arabia');
        const github = 'github.com/Sniper-Hex-Man';

        // Crisp Vector SVG Icons
        const emailSvg = `<svg viewBox="0 0 24 24" width="10" height="10"><path fill="#2563eb" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`;
        const phoneSvg = `<svg viewBox="0 0 24 24" width="10" height="10"><path fill="#2563eb" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>`;
        const locSvg = `<svg viewBox="0 0 24 24" width="10" height="10"><path fill="#2563eb" d="M12 2 C8.13 2 5 5.13 5 9 C5 14.25 12 22 12 22 C12 22 19 14.25 19 9 C19 5.13 15.87 2 12 2 Z M12 11.5 C10.62 11.5 9.5 10.38 9.5 9 C9.5 7.62 10.62 6.5 12 6.5 C13.38 6.5 14.5 7.62 14.5 9 C14.5 10.38 13.38 11.5 12 11.5 Z"/></svg>`;
        const githubSvg = `<svg viewBox="0 0 24 24" width="10" height="10"><path fill="#2563eb" d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>`;

        return {
            stack: [
                // Candidate Name
                {
                    text: fullName,
                    fontSize: 24,
                    bold: true,
                    color: this.colors.primary,
                    alignment: isRTL ? 'right' : 'left',
                    margin: [0, 0, 0, 3]
                },
                // Subtitle / Job Title
                {
                    text: jobTitle,
                    fontSize: 11.5,
                    bold: true,
                    color: this.colors.accent,
                    alignment: isRTL ? 'right' : 'left',
                    margin: [0, 0, 0, 10]
                },

                // Contact Details 2x2 Grid with SVG Icons (Zero Line Wrapping!)
                {
                    columns: isRTL ? [
                        // Right Column (in RTL)
                        {
                            width: '50%',
                            stack: [
                                {
                                    columns: [
                                        { text: email, fontSize: 9, color: this.colors.secondary, alignment: 'right' },
                                        { svg: emailSvg, width: 10, alignment: 'right', margin: [0, 2, 0, 0] }
                                    ],
                                    columnGap: 5,
                                    margin: [0, 0, 0, 4]
                                },
                                {
                                    columns: [
                                        { text: loc, fontSize: 9, color: this.colors.secondary, alignment: 'right' },
                                        { svg: locSvg, width: 10, alignment: 'right', margin: [0, 2, 0, 0] }
                                    ],
                                    columnGap: 5
                                }
                            ]
                        },
                        // Left Column (in RTL)
                        {
                            width: '50%',
                            stack: [
                                {
                                    columns: [
                                        { text: phone, fontSize: 9, color: this.colors.secondary, alignment: 'right' },
                                        { svg: phoneSvg, width: 10, alignment: 'right', margin: [0, 2, 0, 0] }
                                    ],
                                    columnGap: 5,
                                    margin: [0, 0, 0, 4]
                                },
                                {
                                    columns: [
                                        { text: github, fontSize: 9, color: this.colors.secondary, alignment: 'right' },
                                        { svg: githubSvg, width: 10, alignment: 'right', margin: [0, 2, 0, 0] }
                                    ],
                                    columnGap: 5
                                }
                            ]
                        }
                    ] : [
                        // Left Column (in LTR)
                        {
                            width: '50%',
                            stack: [
                                {
                                    columns: [
                                        { svg: emailSvg, width: 10, margin: [0, 2, 0, 0] },
                                        { text: email, fontSize: 9, color: this.colors.secondary }
                                    ],
                                    columnGap: 5,
                                    margin: [0, 0, 0, 4]
                                },
                                {
                                    columns: [
                                        { svg: locSvg, width: 10, margin: [0, 2, 0, 0] },
                                        { text: loc, fontSize: 9, color: this.colors.secondary }
                                    ],
                                    columnGap: 5
                                }
                            ]
                        },
                        // Right Column (in LTR)
                        {
                            width: '50%',
                            stack: [
                                {
                                    columns: [
                                        { svg: phoneSvg, width: 10, margin: [0, 2, 0, 0] },
                                        { text: phone, fontSize: 9, color: this.colors.secondary }
                                    ],
                                    columnGap: 5,
                                    margin: [0, 0, 0, 4]
                                },
                                {
                                    columns: [
                                        { svg: githubSvg, width: 10, margin: [0, 2, 0, 0] },
                                        { text: github, fontSize: 9, color: this.colors.secondary }
                                    ],
                                    columnGap: 5
                                }
                            ]
                        }
                    ],
                    margin: [0, 0, 0, 8]
                },

                // Accent Separator Line
                {
                    canvas: [{
                        type: 'line',
                        x1: 0, y1: 0,
                        x2: 525, y2: 0,
                        lineWidth: 1.5,
                        lineColor: this.colors.accent
                    }],
                    margin: [0, 0, 0, 10]
                }
            ]
        };
    },

    // Create Section Header with accent bar
    createSection(title, content, isRTL) {
        return {
            stack: [
                {
                    table: {
                        widths: ['*'],
                        body: [[
                            {
                                text: title,
                                fontSize: 12,
                                bold: true,
                                color: this.colors.primary,
                                fillColor: this.colors.accentLight,
                                margin: [10, 5, 10, 5],
                                alignment: isRTL ? 'right' : 'left'
                            }
                        ]]
                    },
                    layout: {
                        hLineWidth: function () { return 0; },
                        vLineWidth: function (i, node) {
                            if (isRTL) {
                                return (i === node.table.widths.length) ? 4 : 0;
                            } else {
                                return (i === 0) ? 4 : 0;
                            }
                        },
                        vLineColor: function () { return '#2563eb'; }
                    },
                    margin: [0, 0, 0, 8]
                },
                ...content
            ],
            margin: [0, 0, 0, 12]
        };
    },

    // Build Key Highlights & Stats Grid
    buildStatsGrid(lang, isRTL) {
        const stats = [
            { num: '+7', label: isRTL ? 'سنوات خبرة تطوير' : 'Years Experience' },
            { num: '+30', label: isRTL ? 'مشروع مؤسسي منجز' : 'Projects Delivered' },
            { num: '+20', label: isRTL ? 'تطبيق موبايل ودسكتوب' : 'Mobile/Desktop Apps' },
            { num: '+10', label: isRTL ? 'منصات ويب متكاملة' : 'Web & Enterprise Systems' }
        ];

        const cells = stats.map(st => ({
            fillColor: this.colors.lightBg,
            margin: [4, 8, 4, 8],
            alignment: 'center',
            stack: [
                { text: st.num, fontSize: 14, bold: true, color: this.colors.accent, alignment: 'center', margin: [0, 0, 0, 3] },
                { text: st.label, fontSize: 8.5, color: this.colors.secondary, alignment: 'center' }
            ]
        }));

        return {
            table: {
                widths: ['25%', '25%', '25%', '25%'],
                body: [cells]
            },
            layout: {
                hLineWidth: function () { return 1; },
                vLineWidth: function () { return 1; },
                hLineColor: function () { return '#e2e8f0'; },
                vLineColor: function () { return '#e2e8f0'; }
            },
            margin: [0, 0, 0, 4]
        };
    },

    // Build skills content dynamically
    buildSkillsContent(skills, lang, isRTL) {
        const content = [];
        const categoryKeys = Object.keys(skills);

        categoryKeys.forEach(catKey => {
            const category = skills[catKey];
            if (!category || !category.items) return;

            const skillsList = category.items.map(item => {
                if (item.rank) {
                    const rankLabel = isRTL ? (item.rank === 'Senior' ? 'خبير' : item.rank) : item.rank;
                    return `${item.name} (${rankLabel})`;
                }
                return item.name;
            }).join('  •  ');

            const catTitle = (category.title && category.title[lang]) ? category.title[lang] : catKey;

            content.push({
                columns: isRTL ? [
                    { text: skillsList, fontSize: 9, color: this.colors.secondary, alignment: 'right' },
                    { text: catTitle + ':', width: 130, fontSize: 9.5, bold: true, color: this.colors.primary, alignment: 'right' }
                ] : [
                    { text: catTitle + ':', width: 130, fontSize: 9.5, bold: true, color: this.colors.primary },
                    { text: skillsList, fontSize: 9, color: this.colors.secondary }
                ],
                columnGap: 8,
                margin: [0, 0, 0, 4]
            });
        });

        return content;
    },

    // Build Featured Projects content (Selected top project from each category)
    buildProjectsContent(projectsData, lang, isRTL) {
        const content = [];
        const featuredProjects = [
            {
                key: 'medicalcompany',
                categoryTag: isRTL ? 'الذكاء الاصطناعي و BI' : 'AI & Business Intelligence'
            },
            {
                key: 'darzapp',
                categoryTag: isRTL ? 'تطبيق موبايل (Flutter)' : 'Mobile App (Flutter)'
            },
            {
                key: 'bms',
                categoryTag: isRTL ? 'نظام ERP مؤسسي' : 'Enterprise ERP System'
            },
            {
                key: 'alkassar_group',
                categoryTag: isRTL ? 'منصة ويب وتجارة' : 'Web & Corporate Platform'
            }
        ];

        featuredProjects.forEach((item, index) => {
            const proj = projectsData[item.key];
            if (!proj) return;

            const title = (proj.title && proj.title[lang]) ? proj.title[lang] : item.key;
            const excerpt = (proj.excerpt && proj.excerpt[lang]) ? proj.excerpt[lang] : '';
            const tags = (proj.tags || []).slice(0, 4).join('  •  ');

            content.push({
                columns: isRTL ? [
                    { text: tags, fontSize: 8, color: this.colors.accent, alignment: 'left', width: 170 },
                    { text: `• ${title} (${item.categoryTag})`, fontSize: 9.5, bold: true, color: this.colors.primary, alignment: 'right' }
                ] : [
                    { text: `• ${title} (${item.categoryTag})`, fontSize: 9.5, bold: true, color: this.colors.primary },
                    { text: tags, fontSize: 8, color: this.colors.accent, alignment: 'right', width: 170 }
                ],
                margin: [0, index > 0 ? 5 : 0, 0, 2]
            });

            if (excerpt) {
                content.push({
                    text: excerpt,
                    fontSize: 8.5,
                    color: this.colors.secondary,
                    alignment: isRTL ? 'right' : 'left',
                    margin: [isRTL ? 0 : 10, 0, isRTL ? 10 : 0, 4]
                });
            }
        });

        return content;
    },

    // Build experience content
    buildExperienceContent(experiences, lang, isRTL) {
        const content = [];

        experiences.forEach((exp, index) => {
            const expTitle = (exp.title && exp.title[lang]) ? exp.title[lang] : '';
            const expDate = (exp.date && exp.date[lang]) ? exp.date[lang] : '';
            const expDesc = (exp.description && exp.description[lang]) ? exp.description[lang] : '';

            content.push({
                columns: isRTL ? [
                    { text: expDate, fontSize: 9, bold: true, color: this.colors.accent, width: 90, alignment: 'left' },
                    { text: expTitle, fontSize: 10.5, bold: true, color: this.colors.primary, alignment: 'right' }
                ] : [
                    { text: expTitle, fontSize: 10.5, bold: true, color: this.colors.primary },
                    { text: expDate, fontSize: 9, bold: true, color: this.colors.accent, width: 90, alignment: 'right' }
                ],
                margin: [0, 0, 0, 3]
            });

            if (expDesc) {
                content.push({
                    text: expDesc,
                    fontSize: 9,
                    color: this.colors.secondary,
                    alignment: isRTL ? 'right' : 'left',
                    margin: [0, 0, 0, 3]
                });
            }

            if (exp.items && exp.items.length > 0) {
                const bullets = exp.items.map(item => ({
                    text: (typeof item === 'object' && item[lang]) ? item[lang] : item,
                    fontSize: 8.5,
                    color: '#334155',
                    margin: [0, 1, 0, 1]
                }));

                content.push({
                    ul: bullets,
                    margin: [isRTL ? 0 : 10, 0, isRTL ? 10 : 0, index < experiences.length - 1 ? 6 : 0]
                });
            }
        });

        return content;
    },

    // Build education content
    buildEducationContent(edu, lang, isRTL) {
        if (!edu || !edu.degree) return [];

        const degree = (edu.degree && edu.degree[lang]) ? edu.degree[lang] : '';
        const school = (edu.school && edu.school[lang]) ? edu.school[lang] : '';
        const date = (edu.date && edu.date[lang]) ? edu.date[lang] : '';
        const loc = (edu.location && edu.location[lang]) ? edu.location[lang] : '';

        return [
            {
                columns: isRTL ? [
                    { text: date, fontSize: 9, bold: true, color: this.colors.accent, width: 90, alignment: 'left' },
                    { text: degree, fontSize: 10.5, bold: true, color: this.colors.primary, alignment: 'right' }
                ] : [
                    { text: degree, fontSize: 10.5, bold: true, color: this.colors.primary },
                    { text: date, fontSize: 9, bold: true, color: this.colors.accent, width: 90, alignment: 'right' }
                ]
            },
            {
                text: `${school} — ${loc}`,
                fontSize: 9,
                color: this.colors.secondary,
                alignment: isRTL ? 'right' : 'left',
                margin: [0, 2, 0, 0]
            }
        ];
    }
};

// Initialize download button
document.addEventListener('DOMContentLoaded', function () {
    const downloadBtn = document.getElementById('downloadCVBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function () {
            CVPDFGenerator.generatePDF(typeof currentLanguage !== 'undefined' ? currentLanguage : 'ar');
        });
    }
});
