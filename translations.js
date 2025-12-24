// ================================
// Portfolio Translations - Arabic & English
// ================================

const TRANSLATIONS = {
    ar: {
        // Navigation
        nav: {
            home: 'الرئيسية',
            about: 'من أنا',
            skills: 'المهارات',
            experience: 'الخبرات',
            projects: 'المشاريع',
            contact: 'تواصل معي'
        },

        // Hero Section
        hero: {
            greeting: 'مرحباً، أنا',
            firstName: 'أكرم',
            lastName: 'عبدالله',
            titlePrefix: 'مطور',
            description: 'أبني حلولاً برمجية متكاملة للويب والموبايل باستخدام أحدث التقنيات.',
            yearsExp: 'سنوات',
            expSuffix: 'من الخبرة في تطوير أنظمة متقدمة للسوق السعودي والعالمي.',
            btnProjects: 'استكشف أعمالي',
            btnContact: 'تواصل معي',
            available: 'متاح للعمل',
            scrollMore: 'اكتشف المزيد'
        },

        // About Section
        about: {
            tag: '01',
            title: 'من أنا',
            heading: 'مطور برمجيات متكامل',
            desc1: 'كمطور Full-Stack محترف، أتخصص في بناء حلول برمجية متطورة لمنصات الويب والموبايل وسطح المكتب. أتقن لغات البرمجة مثل Dart, PHP, HTML, CSS، مع خبرة واسعة في أطر العمل مثل Laravel وإدارة قواعد البيانات باستخدام MySQL.',
            desc2: 'نجحت في تسليم مشاريع عالية التأثير للسوق السعودي وعملاء دوليين، وأركز على إنشاء أنظمة قوية وقابلة للتوسع، بما في ذلك أنظمة المصادقة الآمنة، ومزامنة البيانات في الوقت الفعلي، وتصميم APIs عالية الأداء.',
            security: 'أمان متقدم',
            realtime: 'Real-time Systems',
            cleanCode: 'كود نظيف',
            stats: {
                years: 'سنوات خبرة',
                projects: 'مشروع منجز',
                mobile: 'تطبيق موبايل',
                web: 'موقع ويب'
            },
            strengths: {
                problemSolving: 'حل المشكلات',
                problemDesc: 'تطوير حلول للمشكلات المعقدة أدت إلى زيادة الكفاءة بنسبة 90%',
                teamwork: 'العمل الجماعي',
                teamDesc: 'التعاون مع فرق متعددة التخصصات لإنجاز المشاريع ضمن المواعيد المحددة',
                attention: 'الاهتمام بالتفاصيل',
                attentionDesc: 'تطبيق منهجيات اختبار صارمة تحقق كود خالي من الأخطاء بنسبة 99%',
                clean: 'كود نظيف',
                cleanDesc: 'كتابة كود نظيف وفعال وقابل للصيانة مع اتباع أفضل الممارسات'
            }
        },

        // Skills Section (title only - data in cv.json)
        skills: {
            tag: '02',
            title: 'المهارات'
        },

        // Experience Section (title only - data in cv.json)
        experience: {
            tag: '03',
            title: 'الخبرات'
        },

        // Projects Section (titles only - data in projects.json)
        projects: {
            tag: '04',
            title: 'المشاريع',
            intro: 'مجموعة من المشاريع التي قمت بتطويرها للسوق السعودي واليمني. اضغط على أي مشروع لاستعراض التفاصيل والصور.',
            filters: {
                all: 'الكل',
                web: 'تطبيقات ويب',
                mobile: 'تطبيقات موبايل',
                ai: 'ذكاء اصطناعي'
            },
            viewProject: 'عرض المشروع'
        },

        // Contact Section (labels only - data in cv.json)
        contact: {
            tag: '05',
            title: 'تواصل معي',
            heading: 'لنعمل معاً',
            description: 'هل لديك مشروع في ذهنك؟ أنا متاح للعمل على مشاريع مثيرة. تواصل معي لنبدأ الحديث!',
            email: 'البريد الإلكتروني',
            phone: 'الهاتف',
            whatsapp: 'واتساب',
            chatNow: 'تواصل الآن',
            location: 'الموقع',
            ctaTitle: 'مستعد لبدء مشروعك؟',
            ctaDesc: 'احصل على استشارة مجانية لمشروعك القادم',
            startChat: 'ابدأ المحادثة'
        },

        // Footer
        footer: {
            tagline: 'مطور برمجيات متكامل',
            copyright: 'جميع الحقوق محفوظة.'
        },

        // Modal
        modal: {
            close: 'إغلاق'
        },

        // PDF CV
        pdf: {
            downloadBtn: 'تحميل السيرة الذاتية',
            fileName: 'Akram_Abdullah_CV_AR',
            title: 'السيرة الذاتية',
            contact: 'معلومات التواصل',
            summary: 'نبذة مختصرة',
            skills: 'المهارات التقنية',
            experience: 'الخبرات العملية',
            education: 'التعليم',
            present: 'الآن'
        }
    },

    en: {
        // Navigation
        nav: {
            home: 'Home',
            about: 'About',
            skills: 'Skills',
            experience: 'Experience',
            projects: 'Projects',
            contact: 'Contact'
        },

        // Hero Section
        hero: {
            greeting: "Hi, I'm",
            firstName: 'Akram',
            lastName: 'Abdullah',
            titlePrefix: 'Developer',
            description: 'I build integrated software solutions for web and mobile using the latest technologies.',
            yearsExp: 'years',
            expSuffix: 'of experience developing advanced systems for Saudi and global markets.',
            btnProjects: 'Explore My Work',
            btnContact: 'Get in Touch',
            available: 'Available for Work',
            scrollMore: 'Discover More'
        },

        // About Section
        about: {
            tag: '01',
            title: 'About Me',
            heading: 'Full-Stack Software Developer',
            desc1: 'As a professional Full-Stack developer, I specialize in building advanced software solutions for web, mobile, and desktop platforms. I master programming languages like Dart, PHP, HTML, CSS, with extensive experience in frameworks like Laravel and database management using MySQL.',
            desc2: 'I have successfully delivered high-impact projects for the Saudi market and international clients, focusing on creating robust and scalable systems, including secure authentication systems, real-time data synchronization, and high-performance API design.',
            security: 'Advanced Security',
            realtime: 'Real-time Systems',
            cleanCode: 'Clean Code',
            stats: {
                years: 'Years Experience',
                projects: 'Projects Completed',
                mobile: 'Mobile Apps',
                web: 'Websites'
            },
            strengths: {
                problemSolving: 'Problem Solving',
                problemDesc: 'Developing solutions for complex problems that increased efficiency by 90%',
                teamwork: 'Teamwork',
                teamDesc: 'Collaborating with multidisciplinary teams to deliver projects on schedule',
                attention: 'Attention to Detail',
                attentionDesc: 'Applying rigorous testing methodologies achieving 99% bug-free code',
                clean: 'Clean Code',
                cleanDesc: 'Writing clean, efficient, and maintainable code following best practices'
            }
        },

        // Skills Section (title only - data in cv.json)
        skills: {
            tag: '02',
            title: 'Skills'
        },

        // Experience Section (title only - data in cv.json)
        experience: {
            tag: '03',
            title: 'Experience'
        },

        // Projects Section (titles only - data in projects.json)
        projects: {
            tag: '04',
            title: 'Projects',
            intro: 'A collection of projects I developed for the Saudi and Yemeni markets. Click on any project to view details and screenshots.',
            filters: {
                all: 'All',
                web: 'Web Apps',
                mobile: 'Mobile Apps',
                ai: 'AI'
            },
            viewProject: 'View Project'
        },

        // Contact Section (labels only - data in cv.json)
        contact: {
            tag: '05',
            title: 'Contact Me',
            heading: "Let's Work Together",
            description: "Have a project in mind? I'm available to work on exciting projects. Contact me to start the conversation!",
            email: 'Email',
            phone: 'Phone',
            whatsapp: 'WhatsApp',
            chatNow: 'Chat Now',
            location: 'Location',
            ctaTitle: 'Ready to start your project?',
            ctaDesc: 'Get a free consultation for your next project',
            startChat: 'Start Chat'
        },

        // Footer
        footer: {
            tagline: 'Full-Stack Software Developer',
            copyright: 'All rights reserved.'
        },

        // Modal
        modal: {
            close: 'Close'
        },

        // PDF CV
        pdf: {
            downloadBtn: 'Download CV',
            fileName: 'Akram_Abdullah_CV_EN',
            title: 'Curriculum Vitae',
            contact: 'Contact Information',
            summary: 'Professional Summary',
            skills: 'Technical Skills',
            experience: 'Work Experience',
            education: 'Education',
            present: 'Present'
        }
    }
};
