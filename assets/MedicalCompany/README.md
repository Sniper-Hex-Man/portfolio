# 📊 Enterprise Pharma & Medical Warehouse Executive BI System
> **منظومة التقارير التنفيذية والتحليلات الإدارية المتقدمة لمستودعات وشركات الأدوية (Pharma & Medical Distribution ERP/BI)**

---

## 📌 Arabic Overview | نظرة عامة
تطوير منصة تقارير إدارية وتحليلات أعمال متقدمة (**Enterprise Business Intelligence & Reporting Platform**) مصممة خصيصاً لقطاع **مستودعات وتوزيع الأدوية والشركات الطبية**. تتيح المنصة ربط وتحليل بيانات مبيعات الدواء والمخزون والتدفقات المالية مع متابعة الذمم المالية ومؤشرات الأداء الحيوية (KPIs) في الوقت الفعلي، بالإضافة إلى دمج المساعد الذكي بالذكاء الاصطناعي لتوليد الرؤى والتقارير التنفيذية آلياً.

---

## ✨ Key Functional Modules | الوحدات والأقسام الرئيسية

### 1. 📈 لوحة القيادة ومؤشرات الأداء (Executive BI & Pharma Overview)
- **مؤشرات الأداء اللحظية (KPI Telemetry)**: متابعة فورية لمبيعات الأدوية، الإيرادات، هامش الربح، والذمم المالية.
- **الرسوم البيانية التفاعلية**: تحليل اتجاهات مبيعات القطاعات والمستودعات عبر رسوم بيانية ديناميكية متقدمة (Recharts).
- **التصفية والتنقل التكتيكي**: فلترة البيانات حسب الفترات الزمنية والأصناف الدوائية والشركات الموردة.

### 2. 💊 تحليلات العملاء والذمم المالية (Pharma Sales & Aging Intelligence)
- **إدارة عملاء وموزعي الأدوية (Sales & Customers Hub)**: استعراض شامل لحجم مسح الصيدليات والمستشفيات وسجل الطلبيات.
- **تقارير أعمار الديون (Pharma Debt Aging Reports)**: تحليل دقيق لتقادم الديون والذمم المالية للمستودعات وتصنيف المستحقات.
- **مؤشر المخاطر الائتمانية (Customer Risk Rating)**: تقييم الائتمان وسلوك السداد للعملاء والصيدليات وتجنب التعثر المالي.
- **سجل التحصيلات والخصومات**: شفافية كشوف الحساب ومتابعة عمليات الدفع والخصومات الممنوحة.

### 3. 📦 تحليلات حركة وتوريد المخزون الدوائي (Purchases & Inventory Intelligence)
- **تتبع فواتير التوريد (Purchases & Invoices Tab)**: متابعة فواتير الشراء من المصانع والشركات الموردة للأدوية.
- **تحليل تسعير وربحية الأدوية (Pharma Pricing & Margins)**: تتبع اتجاهات أسعار المنتجات الطبية وهواكش الربح وحركة المخزون.
- **مقارنات الشراء والمبيعات (Supply vs. Sales Velocity)**: ربط الشراء بالمبيعات لمنع النقص أو التكدس في المستودعات.

### 4. 🤖 المساعد الذكي لقطاع الأدوية (AI-Powered Generative Analytics)
- **توليد التقارير التلقائي**: دمج تقنيات الذكاء الاصطناعي (**Google Generative AI**) لتحليل حركة المبيعات وتوليد ملخصات تنبؤية للقيادة.
- **استكشاف الشذوذ والانحرافات**: تنبيهات آلية حول الانحرافات المالية والتشغيلية في مسح المنتجات الطبية.

### 5. ⚡ محرك البحث اللحظي والتصدير الفائق (Fuzzy Search & High-Speed Export)
- **البحث الضبابي السريع (Fuzzy Search Engine)**: سرعة استجابة فائقة للبحث في مئات الآلاف من الأصناف الدوائية والصيدليات.
- **محرك تصدير Excel المعقد (ExcelJS Integration)**: تصدير تقارير الجداول المنسقة تفصيلياً بخاصية التحميل المباشر.

### 6. 🔒 نظام الأمان والصلاحيات الدقيقة (Granular RBAC Security System)
- **إدارة تدرج الصلاحيات (Role-Based Access Control)**: حماية البيانات الحساسة وفق المستويات الإدارية والصلاحيات الممنوحة.
- **مراقبة وحماية جلسات العمل (Session & Access Control)**: مصادقة آمنة وتدقيق كامل لعمليات النظام.

---

## 🌐 English Overview

Engineered a specialized **Enterprise Executive Reporting & Business Intelligence System** for **Pharmaceutical Warehousing & Medical Distribution** networks. The platform consolidates high-volume drug sales, inventory velocity, credit risk aging, and vendor procurement into interactive executive dashboards powered by AI analytical insights.

### 🚀 Core Architecture Capabilities:
- **Pharma Executive Dashboard**: Instant telemetry of pharmaceutical sales, net margins, and inventory performance metrics.
- **Customer & Pharmacy Credit Risk Aging**: Detailed aging reports for pharmacies/hospitals, credit risk evaluations, and payment histories.
- **Medical Procurement & Margin Intelligence**: Real-time tracking of purchase invoices, vendor price dynamics, and stock velocity.
- **Generative AI Integration**: Powered by Google Generative AI to generate natural-language executive summaries and predictive trend analysis.
- **Instant Search & Dynamic Excel Engine**: Sub-second fuzzy search across massive drug catalogs paired with automated Excel export pipelines via ExcelJS.
- **Enterprise Security Protocols**: Role-based authorization framework protecting multi-branch financial telemetry.

---

## 🛠️ Technical Stack & Architecture | البنية التقنية

- **Core Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling & UI**: TailwindCSS v4, Lucide Icons, Glassmorphic Dashboard Design
- **Data Visualization**: Recharts Dynamic Charting Engine
- **Database & Data Layer**: Better-SQLite3, High-Throughput Relational Engine, SingleFlight request deduplication, Custom Caching Layer
- **AI Engine**: Google Generative AI (@google/generative-ai)
- **Data Processing**: ExcelJS, JSONStream, Custom High-Speed Fuzzy Search Algorithm
- **Authentication & Security**: Role-Based Access Control (RBAC), Custom Session Management Engine
