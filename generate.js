/**
 * Auto-generate projects data from assets folder
 * Run: node generate.js
 * 
 * How to add a new project:
 * 1. Add project info in projects.json
 * 2. Put images in assets/FOLDER_NAME/
 * 3. Run: node generate.js
 */

const fs = require('fs');
const path = require('path');

// Supported image extensions
const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.PNG', '.JPG', '.JPEG'];

// Load projects metadata from JSON
function loadProjectsMeta() {
    const jsonPath = path.join(__dirname, 'projects.json');

    if (!fs.existsSync(jsonPath)) {
        console.error('❌ Error: projects.json not found!');
        console.log('📝 Create projects.json with your projects data.');
        process.exit(1);
    }

    try {
        const content = fs.readFileSync(jsonPath, 'utf8');
        return JSON.parse(content);
    } catch (e) {
        console.error('❌ Error parsing projects.json:', e.message);
        process.exit(1);
    }
}

// Get all images from a directory (recursively)
function getImagesFromDir(dirPath, basePath = '') {
    const images = [];

    if (!fs.existsSync(dirPath)) {
        return images;
    }

    const items = fs.readdirSync(dirPath);

    for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const relativePath = basePath ? `${basePath}/${item}` : item;
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            images.push(...getImagesFromDir(fullPath, relativePath));
        } else if (stat.isFile()) {
            const ext = path.extname(item);
            if (imageExtensions.includes(ext)) {
                images.push(relativePath);
            }
        }
    }

    // Sort images naturally (img (1), img (2), etc.)
    return images.sort((a, b) => {
        const numA = parseInt(a.match(/\d+/) || [0]);
        const numB = parseInt(b.match(/\d+/) || [0]);
        return numA - numB;
    });
}

// Main function
function generateProjectsData() {
    const projectMeta = loadProjectsMeta();
    const assetsDir = path.join(__dirname, 'assets');
    const projectsData = {};

    // Get all directories in assets
    const folders = fs.readdirSync(assetsDir).filter(item => {
        const fullPath = path.join(assetsDir, item);
        return fs.statSync(fullPath).isDirectory();
    });

    console.log('🔍 Scanning project folders...\n');

    for (const folder of folders) {
        const folderPath = path.join(assetsDir, folder);
        const images = getImagesFromDir(folderPath);

        if (images.length === 0) {
            console.log(`⚠️  ${folder}: No images found`);
            continue;
        }

        // Get metadata or create default
        const meta = projectMeta[folder] || {
            title: { ar: folder, en: folder },
            category: 'web',
            tags: [],
            description: { ar: '', en: '' },
            excerpt: { ar: '', en: '' }
        };

        // Generate ID from folder name
        const id = folder.toLowerCase().replace(/\s+/g, '_');

        // Build image paths relative to root
        const imagePaths = images.map(img => `assets/${folder}/${img}`);

        // Handle README file generation/detection
        const readmeFilePath = path.join(folderPath, 'README.md');
        if (!fs.existsSync(readmeFilePath)) {
            const titleEn = typeof meta.title === 'object' ? (meta.title.en || folder) : meta.title;
            const titleAr = typeof meta.title === 'object' ? (meta.title.ar || folder) : meta.title;
            const descEn = typeof meta.description === 'object' ? (meta.description.en || '') : meta.description;
            const descAr = typeof meta.description === 'object' ? (meta.description.ar || '') : meta.description;
            const tagsList = (meta.tags || []).join(', ');

            const readmeContent = '\uFEFF' + `# ${titleEn}
> ${titleAr}

## Executive Summary / الملخص التنفيذي
${descEn}

${descAr}

## Technical Architecture & Highlights
- **Category**: ${meta.category}
- **Tech Stack**: ${tagsList}
- **Status**: Production Deployment

## Core Capabilities
- Enterprise-grade architecture with focus on high performance, security, and scalability.
- Cross-platform responsiveness and clean user interface workflows.
- Modular codebase structured following industry best practices.

---
*Built & Engineered by Akram Abdullah (Senior Software Engineer)*
`;
            fs.writeFileSync(readmeFilePath, readmeContent, 'utf8');
        }

        const relativeReadmePath = `assets/${folder}/README.md`;

        // Handle both old format (string) and new format (object with ar/en)
        const title = typeof meta.title === 'object' ? meta.title : { ar: meta.title, en: meta.title };
        const description = typeof meta.description === 'object' ? meta.description : { ar: meta.description, en: meta.description };
        const excerpt = meta.excerpt ? (typeof meta.excerpt === 'object' ? meta.excerpt : { ar: meta.excerpt, en: meta.excerpt }) : { ar: '', en: '' };

        projectsData[id] = {
            title: title,
            description: description,
            excerpt: excerpt,
            category: meta.category,
            tags: meta.tags || [],
            images: imagePaths,
            thumbnail: imagePaths[0],
            readme: relativeReadmePath
        };

        console.log(`✅ ${folder}: ${images.length} images | README attached`);
    }

    // Write to JavaScript file
    const outputPath = path.join(__dirname, 'projects-data.js');
    const jsContent = `// Auto-generated projects data
// Run: node generate.js to regenerate
const PROJECTS_DATA = ${JSON.stringify(projectsData, null, 2)};
`;
    fs.writeFileSync(outputPath, jsContent, 'utf8');

    console.log(`\n🎉 Generated projects-data.js with ${Object.keys(projectsData).length} projects!`);
}

// Generate CV data from cv.json
function generateCvData() {
    const cvPath = path.join(__dirname, 'cv.json');

    if (!fs.existsSync(cvPath)) {
        console.log('⚠️  cv.json not found, skipping CV data generation');
        return;
    }

    try {
        const content = fs.readFileSync(cvPath, 'utf8');
        const cvData = JSON.parse(content);

        const outputPath = path.join(__dirname, 'cv-data.js');
        const jsContent = `// Auto-generated CV data
// Run: node generate.js to regenerate
const CV_DATA = ${JSON.stringify(cvData, null, 2)};
`;
        fs.writeFileSync(outputPath, jsContent, 'utf8');

        console.log('✅ Generated cv-data.js with skills, experience & contact info!');
    } catch (e) {
        console.error('❌ Error parsing cv.json:', e.message);
    }
}

// Run all generators
console.log('=====================================');
console.log('  Portfolio Data Generator');
console.log('=====================================\n');

generateProjectsData();
console.log('');
generateCvData();

console.log('\n=====================================');
console.log('  All done! 🚀');
console.log('=====================================');
