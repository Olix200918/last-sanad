// التحقق من تسجيل الدخول عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // استعادة الثيم المحفوظ
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    const categoryCards = document.querySelectorAll('.category-main');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            const subOptions = document.querySelectorAll(`.${category}-option`);
            
            // إخفاء جميع الخيارات الفرعية أولاً
            document.querySelectorAll('.sub-option').forEach(opt => {
                opt.classList.add('hidden');
            });
            
            // إزالة التأثير النشط من جميع الفئات
            document.querySelectorAll('.category-main').forEach(cat => {
                cat.classList.remove('active-category');
            });
            
            // إظهار الخيارات الفرعية للفئة المحددة
            subOptions.forEach(opt => {
                opt.classList.remove('hidden');
            });
            
            // إضهار زر الإغلاق
            closeMenuBtn.classList.remove('hidden');
            
            // إضافة التأثير النشط للفئة المحددة
            this.classList.add('active-category');
        });
    });

    // إضافة وظيفة زر الإغلاق
    closeMenuBtn.addEventListener('click', function() {
        // إخفاء جميع الخيارات الفرعية
        document.querySelectorAll('.sub-option').forEach(opt => {
            opt.classList.add('hidden');
        });
        
        // إزالة التأثير النشط من جميع الفئات
        document.querySelectorAll('.category-main').forEach(cat => {
            cat.classList.remove('active-category');
        });
        
        // إخفاء زر الإغلاق
        this.classList.add('hidden');
    });

    // Log for debugging
    console.log('Initializing language');
    
    const savedLang = localStorage.getItem('language') || 'ar';
    document.documentElement.setAttribute('lang', savedLang);
    
    const translateBtn = document.getElementById('translateBtn');
    if (translateBtn) {
        const span = translateBtn.querySelector('span');
        if (span) {
            span.textContent = savedLang.toUpperCase();
        }
    }
    
    translateContent(savedLang);

    // Fix for link scanner
    const scanButton = document.querySelector('.links-content .check-btn');
    const linkInput = document.querySelector('.links-content input[type="url"]');
    
    if (scanButton && linkInput) {
        scanButton.addEventListener('click', async function(e) {
            e.preventDefault();
            
            // Remove any existing result
            const existingResult = linkInput.parentElement.querySelector('.scan-result');
            if (existingResult) {
                existingResult.remove();
            }

            // Disable input and button while scanning
            linkInput.disabled = true;
            scanButton.disabled = true;
            scanButton.textContent = document.documentElement.lang === 'ar' ? 'جاري الفحص...' : 'Scanning...';

            const result = await scanLink(linkInput.value);

            // Create result element
            const resultDiv = document.createElement('div');
            resultDiv.className = `scan-result ${result.safe ? 'safe' : 'unsafe'}`;
            resultDiv.textContent = result.message;

            // Add result after the input group
            linkInput.parentElement.appendChild(resultDiv);

            // Re-enable input and button
            linkInput.disabled = false;
            scanButton.disabled = false;
            scanButton.textContent = document.documentElement.lang === 'ar' ? 'فحص الرابط' : 'Check Link';
        });
    }

    // Clear any previous results
    const existingResults = document.querySelectorAll('.scan-result');
    existingResults.forEach(result => result.remove());
});

// دالة تبديل الثيم
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    updateThemeIcon(newTheme);
}

// تحديث أيقونة الثيم
function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-btn i');
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// دالة تسجيل الخروج
function logout() {
    localStorage.removeItem('sanadUserData');
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const toolContents = document.querySelectorAll('.tool-content');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked nav item
            item.classList.add('active');

            // Hide all tool contents
            toolContents.forEach(content => content.classList.add('hidden'));

            // Show the corresponding tool content
            const category = item.dataset.category;
            const targetContent = document.querySelector(`.${category}-content`);
            targetContent.classList.remove('hidden');
        });
    });

    // Show first category by default
    navItems[0].click();
});

function toggleLanguage() {
    const currentLang = document.documentElement.getAttribute('lang');
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    
    document.documentElement.setAttribute('lang', newLang);
    localStorage.setItem('language', newLang);
    
    // Update button text
    const langBtn = document.querySelector('.lang-btn span');
    if (langBtn) {
        langBtn.textContent = newLang.toUpperCase();
    }
    
    translateContent(newLang);
}

// الإبقاء على دالة الترجمة الأساسية
const translations = {
    ar: {
        'dashboard-title': 'Sanad - لوحة التحكم',
        'suspicious-links': 'كاشف الروابط المشبوهة',
        'bank-links': 'كاشف روابط البنوك',
        'track-order': 'تتبع الطلبية',
        'file-checker': 'فاحص الملفات',
        'dark-web-checker': 'فاحص الويب المظلم',
        'enter-suspicious-link': 'أدخل الرابط المشبوه',
        'enter-bank-link': 'أدخل رابط البنك',
        'enter-tracking-number': 'أدخل رقم التتبع',
        'enter-email': 'أدخل البريد الإلكتروني',
        'check-link': 'فحص الرابط',
        'verify-link': 'تحقق من الرابط',
        'track': 'تتبع',
        'check-file': 'فحص الملف',
        'check': 'فحص',
        'choose-file': 'اختر ملف',
        'main': 'الرئيسية',
        'security-ai': 'الذكاء الأمني',
        'shop': 'المتجر',
        'all-products': 'جميع المنتجات',
        'security-tools': 'أدوات الحماية',
        'courses': 'الدورات التدريبية',
        'search-products': 'البحث عن منتجات...',
        'sort-by': 'ترتيب حسب',
        'price-low-high': 'السعر: من الأقل إلى الأعلى',
        'price-high-low': 'السعر: من الأعلى إلى الأقل',
        'newest': 'الأحدث',
        'no-products': 'لا توجد منتجات حالياً',
        'products-coming-soon': 'سيتم إضافة منتجات قريباً',
        'ai-assistant-title': 'المساعد الأمني الذكي',
        'ai-assistant-subtitle': 'اسأل أي سؤال يتعلق بالأمن السيبراني',
        'ai-welcome-message': 'مرحباً! أنا المساعد الأمني الخاص بك. كيف يمكنني مساعدتك اليوم؟',
        'type-question': 'اكتب سؤالك هنا...',
        'contact-verify': 'التحقق من جهات الاتصال',
        'enter-phone': 'أدخل رقم الهاتف',
        'verify-contact': 'تحقق من الرقم',
        'phone-verified': 'تم التحقق من الرقم',
        'phone-not-verified': 'لم يتم التحقق من الرقم',
        'invalid-phone': 'رقم الهاتف غير صالح',
        'enter-valid-phone': 'الرجاء إدخال رقم هاتف صالح'
    },
    en: {
        'dashboard-title': 'Sanad - Dashboard',
        'suspicious-links': 'Suspicious Links Detector',
        'bank-links': 'Bank Links Detector',
        'track-order': 'Track Order',
        'file-checker': 'File Checker',
        'dark-web-checker': 'Dark Web Checker',
        'enter-suspicious-link': 'Enter suspicious link',
        'enter-bank-link': 'Enter bank link',
        'enter-tracking-number': 'Enter tracking number',
        'enter-email': 'Enter email',
        'check-link': 'Check Link',
        'verify-link': 'Verify Link',
        'track': 'Track',
        'check-file': 'Check File',
        'check': 'Check',
        'choose-file': 'Choose File',
        'main': 'Main',
        'security-ai': 'Security AI',
        'shop': 'Shop',
        'all-products': 'All Products',
        'security-tools': 'Security Tools',
        'courses': 'Courses',
        'search-products': 'Search products...',
        'sort-by': 'Sort by',
        'price-low-high': 'Price: Low to High',
        'price-high-low': 'Price: High to Low',
        'newest': 'Newest',
        'no-products': 'No products available',
        'products-coming-soon': 'Products coming soon',
        'ai-assistant-title': 'Smart Security Assistant',
        'ai-assistant-subtitle': 'Ask any cybersecurity related question',
        'ai-welcome-message': 'Hello! I\'m your security assistant. How can I help you today?',
        'type-question': 'Type your question here...',
        'contact-verify': 'Contact Verification',
        'enter-phone': 'Enter phone number',
        'verify-contact': 'Verify Number',
        'phone-verified': 'Phone number verified',
        'phone-not-verified': 'Phone number not verified',
        'invalid-phone': 'Invalid phone number',
        'enter-valid-phone': 'Please enter a valid phone number'
    }
};

// الإبقاء على دالة الترجمة الأساسية
function translateContent(lang) {
    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', lang);
    
    // Translate elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Translate placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });

    // Update document title
    document.title = translations[lang]['dashboard-title'];

    // Update language button text
    const langBtn = document.querySelector('.lang-btn span');
    if (langBtn) {
        langBtn.textContent = lang.toUpperCase();
    }

    // Update text direction based on language
    document.body.style.direction = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Store the selected language
    localStorage.setItem('language', lang);
}

document.getElementById('fileInput').addEventListener('change', function() {
    const fileName = this.files[0]?.name;
    const label = document.querySelector('.file-input-label');
    if (fileName) {
        label.textContent = fileName;
    } else {
        label.textContent = 'اختر ملف';
    }
});

// Add this constant at the top of your file
const VIRUSTOTAL_API_KEY = '29c59925d2a5a97f4c56bc244d3c95600ffd8d20742e0ab3992ba9cc6370f657';

async function scanLink() {
    const linkInput = document.querySelector('.links-content input[type="url"]');
    const scanButton = document.querySelector('.links-content .check-btn');
    
    if (!linkInput || !scanButton) {
        console.error('Required elements not found');
        return;
    }

    // Remove any existing result
    const existingResult = linkInput.parentElement.querySelector('.scan-result');
    if (existingResult) {
        existingResult.remove();
    }

    // Disable input and button while scanning
    linkInput.disabled = true;
    scanButton.disabled = true;
    scanButton.textContent = document.documentElement.lang === 'ar' ? 'جاري الفحص...' : 'Scanning...';

    try {
        let url = linkInput.value.trim();
        
        // Basic URL validation
        if (!url) {
            throw new Error(document.documentElement.lang === 'ar' 
                ? 'الرجاء إدخال رابط صحيح'
                : 'Please enter a valid URL');
        }

        // URL correction logic
        if (!url.match(/^https?:\/\//i)) {
            // Check if it starts with www.
            if (url.startsWith('www.')) {
                url = 'https://' + url;
            } else {
                url = 'https://www.' + url;
            }
            
            // Update the input value with the corrected URL
            linkInput.value = url;
        }

        // URL format validation and protocol check
        let urlObject;
        try {
            urlObject = new URL(url);
            
            // Check if using insecure HTTP
            if (urlObject.protocol === 'http:') {
                const resultDiv = document.createElement('div');
                resultDiv.className = 'scan-result unsafe';
                resultDiv.textContent = document.documentElement.lang === 'ar'
                    ? ' تحذير: هذا الرابط غير آمن لأنه يستخدم بروتوكول HTTP غير المشفر. قد يتم اعتراض بياناتك!'
                    : ' Warning: This link is unsafe as it uses unencrypted HTTP. Your data may be intercepted!';
                linkInput.parentElement.appendChild(resultDiv);
                return;
            }
        } catch {
            throw new Error(document.documentElement.lang === 'ar'
                ? 'صيغة الرابط غير صحيحة'
                : 'Invalid URL format');
        }

        // First, get the URL ID from VirusTotal
        const urlId = btoa(url).replace(/=/g, '');
        
        // Try to get analysis first
        let response = await fetch(`https://www.virustotal.com/api/v3/urls/${urlId}`, {
            method: 'GET',
            headers: {
                'x-apikey': VIRUSTOTAL_API_KEY
            }
        });

        // If URL not found, submit it for scanning
        if (response.status === 404) {
            const formData = new FormData();
            formData.append('url', url);
            
            response = await fetch('https://www.virustotal.com/api/v3/urls', {
                method: 'POST',
                headers: {
                    'x-apikey': VIRUSTOTAL_API_KEY
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Error submitting URL for scanning');
            }

            // Wait for analysis to complete
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            response = await fetch(`https://www.virustotal.com/api/v3/urls/${urlId}`, {
                method: 'GET',
                headers: {
                    'x-apikey': VIRUSTOTAL_API_KEY
                }
            });
        }

        if (!response.ok) {
            throw new Error('Error getting scan results');
        }

        const data = await response.json();
        const stats = data.data.attributes.last_analysis_stats;
        const maliciousCount = stats.malicious + stats.suspicious;
        const isSuspicious = maliciousCount > 0;

        // Create result element with simplified message
        const resultDiv = document.createElement('div');
        resultDiv.className = `scan-result ${isSuspicious ? 'unsafe' : 'safe'}`;
        
        // Simplified message based on language
        if (document.documentElement.lang === 'ar') {
            if (isSuspicious) {
                resultDiv.textContent = ' تحذير: هذا الرابط غير آمن وقد يكون ضار';
            } else {
                resultDiv.textContent = ' الرابط آمن ويمكن الوثوق به';
            }
        } else {
            if (isSuspicious) {
                resultDiv.textContent = ' Warning: This link is unsafe and may be harmful';
            } else {
                resultDiv.textContent = ' Link is safe and trustworthy';
            }
        }

        // Add result after the input group
        linkInput.parentElement.appendChild(resultDiv);

    } catch (error) {
        console.error('Scan error:', error);
        
        // Handle errors
        const resultDiv = document.createElement('div');
        resultDiv.className = 'scan-result unsafe';
        resultDiv.textContent = error.message || (document.documentElement.lang === 'ar'
            ? 'حدث خطأ أثناء فحص الرابط'
            : 'Error scanning the link');
        linkInput.parentElement.appendChild(resultDiv);
    } finally {
        // Re-enable input and button
        linkInput.disabled = false;
        scanButton.disabled = false;
        scanButton.textContent = document.documentElement.lang === 'ar' ? 'فحص الرابط' : 'Check Link';
    }
}

// قائمة روابط البنوك الكويتية الرسمية
const officialBankDomains = {
    'kfh.com': {
        name: {
            ar: 'بيت التمويل الكويتي',
            en: 'Kuwait Finance House'
        },
        mainDomains: ['kfh.com', 'www.kfh.com'],
        paymentDomains: ['payments.kfh.com', 'pay.kfh.com', 'kpay.kfh.com', 'kfhonline.com', 'tam.kfh.com'],
        onlineDomains: ['online.kfh.com', 'kfhonline.com', 'online.kfhonline.com']
    },
    'nbk.com': {
        name: {
            ar: 'بنك الكويت الوطني',
            en: 'National Bank of Kuwait'
        },
        mainDomains: ['nbk.com', 'www.nbk.com'],
        paymentDomains: ['payment.nbk.com', 'pay.nbk.com'],
        onlineDomains: ['online.nbk.com', 'nbkonline.com']
    },
    'burgan.com': {
        name: {
            ar: 'بنك برقان',
            en: 'Burgan Bank'
        },
        mainDomains: ['burgan.com', 'www.burgan.com'],
        paymentDomains: ['payment.burgan.com', 'pay.burgan.com'],
        onlineDomains: ['online.burgan.com']
    },
    'cbk.com': {
        name: {
            ar: 'البنك التجاري الكويتي',
            en: 'Commercial Bank of Kuwait'
        },
        mainDomains: ['cbk.com', 'www.cbk.com'],
        paymentDomains: ['payments.cbk.com', 'pay.cbk.com'],
        onlineDomains: ['online.cbk.com']
    },
    'abk.com.kw': {
        name: {
            ar: 'البنك الأهلي الكويتي',
            en: 'Arab Kuwaiti Bank'
        },
        mainDomains: ['abk.com.kw', 'www.abk.com.kw'],
        paymentDomains: ['payments.abk.com.kw', 'pay.abk.com.kw'],
        onlineDomains: ['online.abk.com.kw']
    },
    'ahliunited.com.kw': {
        name: {
            ar: 'البنك الأهلي المتحد',
            en: 'Ahli United Bank'
        },
        mainDomains: ['ahliunited.com.kw', 'www.ahliunited.com.kw'],
        paymentDomains: ['payments.ahliunited.com.kw', 'pay.ahliunited.com.kw'],
        onlineDomains: ['online.ahliunited.com.kw']
    },
    'bankboubyan.com': {
        name: {
            ar: 'بنك بوبيان',
            en: 'Bank Boubyan'
        },
        mainDomains: ['bankboubyan.com', 'www.bankboubyan.com'],
        paymentDomains: ['payments.bankboubyan.com', 'pay.bankboubyan.com'],
        onlineDomains: ['online.bankboubyan.com']
    }
};

// تحديث دالة التحقق من روابط البنوك لتستخدم اللغة الحالية
async function verifyBankLink() {
    const input = document.querySelector('.tool-panel input[data-translate-placeholder="enter-bank-link"]');
    const scanButton = input.nextElementSibling; // زر الفحص
    
    // Remove any existing result
    const existingResult = input.parentElement.querySelector('.scan-result');
    if (existingResult) {
        existingResult.remove();
    }

    // Disable input and button while scanning
    input.disabled = true;
    scanButton.disabled = true;
    scanButton.textContent = document.documentElement.lang === 'ar' ? 'جاري الفحص...' : 'Verifying...';

    try {
        let url = input.value.trim();
        const currentLang = document.documentElement.getAttribute('lang');
        
        // Basic URL validation
        if (!url) {
            throw new Error(currentLang === 'ar' 
                ? 'الرجاء إدخال رابط صحيح'
                : 'Please enter a valid URL');
        }

        // URL correction logic
        if (!url.match(/^https?:\/\//i)) {
            // Check if it starts with www.
            if (url.startsWith('www.')) {
                url = 'https://' + url;
            } else {
                url = 'https://www.' + url;
            }
            
            // Update the input value with the corrected URL
            input.value = url;
        }

        // URL format validation
        let urlObj;
        try {
            urlObj = new URL(url);
            
            // Check if using insecure HTTP
            if (urlObj.protocol === 'http:') {
                const resultDiv = document.createElement('div');
                resultDiv.className = 'scan-result unsafe';
                resultDiv.textContent = currentLang === 'ar'
                    ? 'تحذير: هذا الرابط غير آمن لأنه يستخدم بروتوكول HTTP غير المشفر. قد يتم اعتراض بياناتك!'
                    : 'Warning: This link is unsafe as it uses unencrypted HTTP. Your data may be intercepted!';
                input.parentElement.appendChild(resultDiv);
                return;
            }
        } catch {
            throw new Error(currentLang === 'ar'
                ? 'صيغة الرابط غير صحيحة'
                : 'Invalid URL format');
        }

        const domain = urlObj.hostname.toLowerCase();
        let isOfficial = false;
        let bankName = '';
        let domainType = '';

        for (const [bankDomain, bankInfo] of Object.entries(officialBankDomains)) {
            if (bankInfo.mainDomains.includes(domain)) {
                isOfficial = true;
                bankName = bankInfo.name[currentLang];
                domainType = currentLang === 'ar' ? 'الموقع الرئيسي' : 'Main Website';
                break;
            } else if (bankInfo.paymentDomains.includes(domain)) {
                isOfficial = true;
                bankName = bankInfo.name[currentLang];
                domainType = currentLang === 'ar' ? 'بوابة الدفع' : 'Payment Gateway';
                break;
            } else if (bankInfo.onlineDomains.includes(domain)) {
                isOfficial = true;
                bankName = bankInfo.name[currentLang];
                domainType = currentLang === 'ar' ? 'الخدمات المصرفية عبر الإنترنت' : 'Online Banking';
                break;
            }
        }

        const resultDiv = document.createElement('div');
        resultDiv.className = `scan-result ${isOfficial ? 'safe' : 'unsafe'}`;

        if (isOfficial) {
            resultDiv.textContent = currentLang === 'ar' 
                ? `هذا رابط رسمي لـ ${bankName} (${domainType})`
                : `This is an official ${bankName} link (${domainType})`;
        } else {
            resultDiv.textContent = currentLang === 'ar'
                ? 'تحذير: هذا ليس رابطاً رسمياً لأي بنك كويتي معروف'
                : 'Warning: This is not an official link for any known Kuwaiti bank';
        }

        input.parentElement.appendChild(resultDiv);

    } catch (error) {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'scan-result unsafe';
        resultDiv.textContent = error.message;
        input.parentElement.appendChild(resultDiv);
    } finally {
        // Re-enable input and button
        input.disabled = false;
        scanButton.disabled = false;
        scanButton.textContent = document.documentElement.lang === 'ar' 
            ? 'تحقق من الرابط' 
            : 'Verify Link';
    }
}

// إضافة معلومات الأدوات
const toolsInfo = {
    'suspicious-links': {
        title: {
            ar: 'كاشف الروابط المشبوهة',
            en: 'Suspicious Links Detector'
        },
        description: {
            ar: 'تقوم هذه الأداة بفحص الروابط للكشف عن علامات الاحتيال المحتملة مثل النطاقات المزيفة والروابط المشبوهة. تساعد في حماية المستخدم من الوقوع ضحية لعمليات التصيد والاحتيال.',
            en: 'This tool scans links to detect potential fraud indicators such as fake domains and suspicious URLs. It helps protect users from falling victim to phishing and fraud attempts.'
        }
    },
    'bank-links': {
        title: {
            ar: 'كاشف روابط البنوك',
            en: 'Bank Links Verifier'
        },
        description: {
            ar: 'تتحقق هذه الأداة من روابط البنوك الكويتية للتأكد من أنها روابط رسمية وآمنة. تساعد في تجنب المواقع المزيفة التي تحاول سرقة المعلومات البنكية.',
            en: 'This tool verifies Kuwaiti bank links to ensure they are official and secure. It helps avoid fake websites attempting to steal banking information.'
        }
    },
    'file-checker': {
        title: {
            ar: 'فاحص الملفات',
            en: 'File Checker'
        },
        description: {
            ar: 'تقوم هذه الأداة بفحص الملفات للكشف عن البرامج الضارة والفيروسات. تدعم معظم أنواع الملفات وتستخدم قاعدة بيانات كبيرة للتهديدات المعروفة.',
            en: 'This tool scans files for malware and viruses. It supports most file types and uses a large database of known threats.'
        }
    },
    'dark-web-checker': {
        title: {
            ar: 'فاحص الويب المظلم',
            en: 'Dark Web Checker'
        },
        description: {
            ar: 'تحقق مما إذا كان بريدك الإلكتروني قد تم تسريبه في الويب المظلم. نقوم بفحص قواعد البيانات المسربة للعثور على أي معلومات مرتبطة ببريدك الإلكتروني.',
            en: 'Check if your email has been leaked on the dark web. We scan leaked databases to find any information associated with your email.'
        }
    },
    'track-order': {
        title: {
            ar: 'تتبع الطلبية',
            en: 'Track Order'
        },
        description: {
            ar: 'تتيح هذه الأداة تتبع طلبيتك باستخدام رقم التتبع الخاص بها. تدعم العديد من شركات الشحن العالمية.',
            en: 'This tool allows you to track your order using its tracking number. Supports multiple global shipping carriers.'
        }
    }
};

function showToolInfo(toolId) {
    // إزالة أي نافذة معلومات سابقة
    const existingInfo = document.querySelector('.tool-info');
    if (existingInfo) {
        existingInfo.remove();
    }

    const toolInfo = toolsInfo[toolId];
    const lang = document.documentElement.lang;
    
    // إنشاء نافذة المعلومات
    const infoDiv = document.createElement('div');
    infoDiv.className = 'tool-info';
    
    infoDiv.innerHTML = `
        <h3>${toolInfo.title[lang]}</h3>
        <p>${toolInfo.description[lang]}</p>
        <button class="close-info" onclick="this.parentElement.remove()">
            ${lang === 'ar' ? 'إغلاق' : 'Close'}
        </button>
    `;
    
    document.body.appendChild(infoDiv);
}

// إضافة دالة فحص الملفات
async function checkFile() {
    const fileInput = document.getElementById('fileInput');
    const checkButton = document.querySelector('.links-content .check-btn[data-translate="check-file"]');
    const container = fileInput.parentElement;
    
    // إزالة أي نتائج سابقة
    const existingResult = container.querySelector('.scan-result');
    if (existingResult) {
        existingResult.remove();
    }
    
    if (!fileInput.files[0]) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'scan-result unsafe';
        errorDiv.textContent = document.documentElement.lang === 'ar' 
            ? 'الرجاء اختيار ملف للفحص'
            : 'Please select a file to scan';
        container.appendChild(errorDiv);
        return;
    }

    // تعطيل الزر أثناء الفحص
    checkButton.disabled = true;
    checkButton.textContent = document.documentElement.lang === 'ar' ? 'جاري الفحص...' : 'Scanning...';

    try {
        const file = fileInput.files[0];
        
        // التحقق من حجم الملف (الحد الأقصى 32MB)
        if (file.size > 32 * 1024 * 1024) {
            throw new Error(document.documentElement.lang === 'ar' 
                ? 'حجم الملف يجب أن يكون أقل من 32 ميجابايت'
                : 'File size must be less than 32MB');
        }

        // قراءة الملف كـ ArrayBuffer
        const buffer = await file.arrayBuffer();
        const bytes = new Uint8Array(buffer);

        // حساب SHA-256 hash للملف
        const hashBuffer = await crypto.subtle.digest('SHA-256', bytes);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const fileHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        // استعلام VirusTotal عن الملف
        const response = await fetch(`https://www.virustotal.com/api/v3/files/${fileHash}`, {
            method: 'GET',
            headers: {
                'x-apikey': VIRUSTOTAL_API_KEY
            }
        });

        // إذا لم يتم العثور على الملف، قم برفعه
        if (response.status === 404) {
            // الحصول على URL لرفع الملف
            const uploadUrlResponse = await fetch('https://www.virustotal.com/api/v3/files/upload_url', {
                method: 'GET',
                headers: {
                    'x-apikey': VIRUSTOTAL_API_KEY
                }
            });

            const uploadUrlData = await uploadUrlResponse.json();
            const uploadUrl = uploadUrlData.data;

            // رفع الملف
            const formData = new FormData();
            formData.append('file', file);

            await fetch(uploadUrl, {
                method: 'POST',
                headers: {
                    'x-apikey': VIRUSTOTAL_API_KEY
                },
                body: formData
            });

            // انتظار لمدة 3 ثواني للتحليل
            await new Promise(resolve => setTimeout(resolve, 3000));

            // إعادة الاستعلام عن نتائج التحليل
            const analysisResponse = await fetch(`https://www.virustotal.com/api/v3/files/${fileHash}`, {
                method: 'GET',
                headers: {
                    'x-apikey': VIRUSTOTAL_API_KEY
                }
            });

            if (!analysisResponse.ok) {
                throw new Error('Error analyzing file');
            }

            const analysisData = await analysisResponse.json();
            showFileAnalysisResult(analysisData);
        } else {
            const data = await response.json();
            showFileAnalysisResult(data);
        }

    } catch (error) {
        console.error('File check error:', error);
        showFileError(error.message);
    } finally {
        // إعادة تفعيل الزر
        checkButton.disabled = false;
        checkButton.textContent = document.documentElement.lang === 'ar' ? 'فحص الملف' : 'Check File';
    }
}

// دالة لعرض نتائج تحليل الملف
function showFileAnalysisResult(data) {
    const fileInput = document.getElementById('fileInput');
    const container = fileInput.parentElement;
    
    // إزالة أي نتائج سابقة
    const existingResult = container.querySelector('.scan-result');
    if (existingResult) {
        existingResult.remove();
    }

    const stats = data.data.attributes.last_analysis_stats;
    const maliciousCount = stats.malicious + stats.suspicious;
    
    const resultDiv = document.createElement('div');
    resultDiv.className = `scan-result ${maliciousCount > 0 ? 'unsafe' : 'safe'}`;
    
    if (document.documentElement.lang === 'ar') {
        resultDiv.textContent = maliciousCount > 0
            ? `تحذير: تم اكتشاف ${maliciousCount} تهديد في الملف`
            : 'الملف آمن ولا يحتوي على تهديدات';
    } else {
        resultDiv.textContent = maliciousCount > 0
            ? `Warning: ${maliciousCount} threats detected in the file`
            : 'File is safe and contains no threats';
    }

    container.appendChild(resultDiv);
}

// دالة لعرض رسائل الخطأ
function showFileError(message) {
    const fileInput = document.getElementById('fileInput');
    const container = fileInput.parentElement;
    
    // إزالة أي نتائج سابقة
    const existingResult = container.querySelector('.scan-result');
    if (existingResult) {
        existingResult.remove();
    }

    const errorDiv = document.createElement('div');
    errorDiv.className = 'scan-result unsafe';
    errorDiv.textContent = message;
    container.appendChild(errorDiv);
}

// إضافة مستمع الحدث لزر الفحص
document.addEventListener('DOMContentLoaded', function() {
    const checkFileBtn = document.querySelector('.links-content .check-btn[data-translate="check-file"]');
    if (checkFileBtn) {
        checkFileBtn.addEventListener('click', checkFile);
    }
});

// إضافة مفتاح API لخدمة Have I Been Pwned
const HIBP_API_KEY = 'https://haveibeenpwned.com/api/v3/breachedaccount/%7Bronrozorooo@gmail.com%7D'; // تحتاج للحصول على مفتاح API من الموقع

async function checkDarkWeb() {
    const emailInput = document.querySelector('[data-translate-placeholder="enter-email"]');
    const email = emailInput.value.trim();
    
    // التحقق من صحة البريد الإلكتروني
    if (!isValidEmail(email)) {
        showResult('dark-web', {
            status: 'error',
            message: 'الرجاء إدخال بريد إلكتروني صحيح'
        });
        return;
    }

    // إظهار حالة التحميل
    const button = document.querySelector('[onclick="checkDarkWeb()"]');
    const originalText = button.textContent;
    button.textContent = 'جاري الفحص...';
    button.disabled = true;

    try {
        // استخدام API haveibeenpwned للتحقق من تسريب البريد الإلكتروني
        const response = await fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${email}`, {
            method: 'GET',
            headers: {
                'hibp-api-key': 'YOUR_API_KEY_HERE' // تحتاج للحصول على مفتاح API من الموقع
            }
        });

        let result;
        if (response.status === 404) {
            // البريد الإلكتروني آمن
            result = {
                status: 'safe',
                message: 'لم يتم العثور على تسريبات لهذا البريد الإلكتروني'
            };
        } else if (response.status === 200) {
            // تم العثور على تسريبات
            const breaches = await response.json();
            result = {
                status: 'unsafe',
                message: `تم العثور على ${breaches.length} تسريب لهذا البريد الإلكتروني`,
                details: breaches
            };
        }

        showResult('dark-web', result);
    } catch (error) {
        showResult('dark-web', {
            status: 'error',
            message: 'حدث خطأ أثناء الفحص. الرجاء المحاولة مرة أخرى'
        });
    } finally {
        // إعادة الزر إلى حالته الأصلية
        button.textContent = originalText;
        button.disabled = false;
    }
}

function showResult(type, result) {
    // إزالة أي نتائج سابقة
    const existingResult = document.querySelector('.scan-result');
    if (existingResult) {
        existingResult.remove();
    }

    // إنشاء عنصر النتيجة
    const resultElement = document.createElement('div');
    resultElement.className = `scan-result ${result.status}`;

    // إضافة أيقونة مناسبة
    let icon = '';
    switch (result.status) {
        case 'safe':
            icon = '<i class="fas fa-check-circle"></i> ';
            break;
        case 'unsafe':
            icon = '<i class="fas fa-exclamation-triangle"></i> ';
            break;
        case 'error':
            icon = '<i class="fas fa-times-circle"></i> ';
            break;
    }

    // إضافة المحتوى
    resultElement.innerHTML = `
        <div class="result-header ${result.status}">
            ${icon}${result.message}
        </div>
        ${result.details ? `
        <div class="result-details">
            <p>المواقع التي تم تسريب البيانات منها:</p>
            <ul>
                ${result.details.map(breach => `
                    <li>${breach.Name} (${breach.BreachDate})</li>
                `).join('')}
            </ul>
        </div>
        ` : ''}
    `;

    // إضافة النتيجة بعد حقل الإدخال
    const inputGroup = document.querySelector(`[data-translate-placeholder="enter-email"]`).closest('.input-group');
    inputGroup.insertAdjacentElement('afterend', resultElement);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function trackOrder() {
    const trackingInput = document.querySelector('input[data-translate-placeholder="enter-tracking-number"]');
    const trackingNumber = trackingInput.value.trim();
    
    // Remove any existing results
    const existingResult = document.querySelector('.tracking-result');
    if (existingResult) {
        existingResult.remove();
    }

    if (!trackingNumber) {
        showError(document.documentElement.lang === 'ar' 
            ? 'الرجاء إدخال رقم التتبع'
            : 'Please enter a tracking number');
        return;
    }

    try {
        // Show loading state
        showLoadingState(trackingInput);

        // Replace this with your valid Ship24 API key
        const API_KEY = 'apik_cjwYYNlOhUgdVGnUX34uyg6y9UANQc';
        
        const response = await fetch('https://api.ship24.com/public/v1/tracking/search', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ trackingNumber })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        showTrackingResult(data, trackingInput);

    } catch (error) {
        console.error('Tracking error:', error);
        showError(document.documentElement.lang === 'ar'
            ? 'حدث خطأ أثناء التتبع. الرجاء المحاولة مرة أخرى'
            : 'Error tracking order. Please try again.');
    }
}

function showLoadingState(input) {
    const loadingElement = document.createElement('div');
    loadingElement.className = 'tracking-result loading';
    loadingElement.innerHTML = `
        <div class="result-header">
            <i class="fas fa-spinner fa-spin"></i>
            <span data-translate="checking-status">جاري التحقق...</span>
        </div>
    `;
    input.closest('.input-group').insertAdjacentElement('afterend', loadingElement);
}

function showTrackingResult(data, input) {
    const resultElement = document.createElement('div');
    resultElement.className = 'tracking-result';

    if (data.data && data.data.trackings && data.data.trackings.length > 0) {
        const tracking = data.data.trackings[0];
        const shipment = tracking.shipment;
        
        resultElement.innerHTML = `
            <div class="result-header success">
                <i class="fas fa-box"></i>
                <span>Tracking Information Found</span>
            </div>
            <div class="result-details">
                <div class="tracking-info">
                    <p><strong>Origin:</strong> ${shipment.originCountryCode || 'N/A'}</p>
                    <p><strong>Destination:</strong> ${shipment.destinationCountryCode || 'N/A'}</p>
                    <p><strong>Status:</strong> ${shipment.status || 'N/A'}</p>
                    <p><strong>Last Update:</strong> ${new Date(shipment.lastUpdate).toLocaleString()}</p>
                </div>
                ${shipment.events && shipment.events.length > 0 ? `
                    <div class="tracking-timeline">
                        <h4>Tracking Timeline</h4>
                        ${shipment.events.map(event => `
                            <div class="timeline-event">
                                <div class="event-date">${new Date(event.timestamp).toLocaleString()}</div>
                                <div class="event-location">${event.location || 'N/A'}</div>
                                <div class="event-status">${event.status || 'N/A'}</div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    } else {
        resultElement.innerHTML = `
            <div class="result-header error">
                <i class="fas fa-exclamation-circle"></i>
                <span data-translate="order-not-found">لم يتم العثور على الطلبية</span>
            </div>
        `;
    }

    input.closest('.input-group').insertAdjacentElement('afterend', resultElement);
}

function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'tracking-result error';
    errorElement.innerHTML = `
        <div class="result-header">
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    const existingError = document.querySelector('.tracking-result');
    if (existingError) {
        existingError.remove();
    }
    
    const trackingInput = document.querySelector('input[data-translate-placeholder="enter-tracking-number"]');
    trackingInput.closest('.input-group').insertAdjacentElement('afterend', errorElement);
}

// قاعدة بيانات الأسئلة والأجوبة
const securityQA = {
    responses: {
        instagram_hack: {
            ar: `إذا تم اختراق حسابك على انستقرام، اتبع هذه الخطوات:
1. قم بتغيير كلمة المرور فوراً
2. فعّل المصادقة الثنائية
3. تحقق من البريد الإلكتروني المرتبط بالحساب
4. راجع الأجهزة المتصلة وقم بتسجيل الخروج من جميع الأجهزة
5. أبلغ انستقرام عن الاختراق
6. راقب النشاط المشبوه على حسابك`,
            en: `If your Instagram account was hacked, follow these steps:
1. Change your password immediately
2. Enable two-factor authentication
3. Check associated email account
4. Review connected devices and log out from all devices
5. Report the hack to Instagram
6. Monitor suspicious activity on your account`
        }
    }
};

// إضافة مفتاح API الخاص بـ Gemini
const GEMINI_API_KEY = 'AIzaSyAYP0l6YlVmIi5f2hdsAVtpTM5yTwCUHrs';

// إضافة مجموعة من الملصقات
const STICKERS = {
    greeting: '👋',
    security: '🔒',
    warning: '⚠️',
    success: '✅',
    error: '❌',
    thinking: '🤔',
    idea: '💡',
    computer: '💻',
    shield: '🛡️',
    key: '🔑',
    web: '🌐',
    phone: '📱',
    email: '📧',
    virus: '🦠',
    lock: '🔐',
    unlock: '🔓',
    search: '🔍',
    alert: '🚨'
};

// تحديث دالة إرسال السؤال
async function sendSecurityQuestion() {
    const input = document.querySelector('#userInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    input.value = '';
    addChatMessage(message, true);
    showTypingIndicator();
    
    try {
        // تحسين السياق للبوت
        const context = `You are a helpful AI assistant that can answer both general questions and cybersecurity related questions. 
        Please provide clear and accurate information. If the question is about cybersecurity, include relevant security tips and warnings. 
        Use emojis appropriately in your responses to make them more engaging. Keep your responses friendly and easy to understand.
        If you're not sure about something, be honest about it.
        
        User question: ${message}`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: context
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 800,
                }
            })
        });

        hideTypingIndicator();

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        if (!data.candidates || !data.candidates[0]?.content?.parts[0]?.text) {
            throw new Error('Invalid response format');
        }

        let botResponse = data.candidates[0].content.parts[0].text;
        // إضافة ملصق مناسب للرد
        botResponse = addRelevantSticker(botResponse);
        addChatMessage(botResponse, false);

    } catch (error) {
        console.error('Chat Error:', error);
        hideTypingIndicator();
        
        const errorMessage = document.documentElement.getAttribute('lang') === 'ar' 
            ? `${STICKERS.error} عذراً، حدث خطأ. الرجاء المحاولة مرة أخرى.`
            : `${STICKERS.error} Sorry, an error occurred. Please try again.`;
        
        addChatMessage(errorMessage, false);
    }
}

// دالة لإضافة ملصق مناسب للرد
function addRelevantSticker(response) {
    // إضافة ملصق بناءً على محتوى الرد
    if (response.toLowerCase().includes('hello') || response.toLowerCase().includes('hi') || 
        response.includes('مرحبا') || response.includes('السلام')) {
        return `${STICKERS.greeting} ${response}`;
    }
    if (response.toLowerCase().includes('security') || response.toLowerCase().includes('protect') ||
        response.includes('حماية') || response.includes('أمان')) {
        return `${STICKERS.shield} ${response}`;
    }
    if (response.toLowerCase().includes('warning') || response.toLowerCase().includes('caution') ||
        response.includes('تحذير') || response.includes('خطر')) {
        return `${STICKERS.warning} ${response}`;
    }
    if (response.toLowerCase().includes('password') || response.toLowerCase().includes('key') ||
        response.includes('كلمة المرور') || response.includes('مفتاح')) {
        return `${STICKERS.key} ${response}`;
    }
    if (response.toLowerCase().includes('virus') || response.toLowerCase().includes('malware') ||
        response.includes('فيروس') || response.includes('برمجيات خبيثة')) {
        return `${STICKERS.virus} ${response}`;
    }
    if (response.toLowerCase().includes('email') || response.includes('بريد')) {
        return `${STICKERS.email} ${response}`;
    }
    if (response.toLowerCase().includes('website') || response.includes('موقع')) {
        return `${STICKERS.web} ${response}`;
    }
    // إضافة ملصق افتراضي إذا لم يتم العثور على كلمات مفتاحية
    return `${STICKERS.idea} ${response}`;
}

// تحديث دالة formatMessage لدعم الملصقات بشكل أفضل
function formatMessage(text) {
    // تحويل الروابط إلى عناصر قابلة للنقر
    text = text.replace(
        /(https?:\/\/[^\s]+)/g, 
        '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
    );
    
    // تنسيق النقاط والقوائم
    text = text.replace(/\n- /g, '<br>• ');
    text = text.replace(/\n\d+\. /g, '<br>$& ');
    
    // تحويل السطور الجديدة إلى <br>
    text = text.replace(/\n/g, '<br>');
    
    // تكبير حجم الملصقات
    text = text.replace(/([\u{1F300}-\u{1F9FF}])/gu, '<span style="font-size: 1.4em">$1</span>');
    
    return text;
}

// دالة إظهار مؤشر الكتابة
function showTypingIndicator() {
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    `;
    document.querySelector('.chat-messages').appendChild(typingIndicator);
}

// دالة إخفاء مؤشر الكتابة
function hideTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// إضافة دالة القراءة الصوتية
function speakText(text, lang) {
    // إيقاف أي قراءة حالية
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
    utterance.rate = 1; // سرعة القراءة
    utterance.pitch = 1; // درجة الصوت
    window.speechSynthesis.speak(utterance);
}

// تحديث دالة إضافة رسائل المحادثة
function addChatMessage(message, isUser = false) {
    const chatContainer = document.querySelector('.chat-messages');
    if (!chatContainer) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const currentLang = document.documentElement.getAttribute('lang');
    
    // إضافة زر القراءة الصوتية للرسائل من البوت فقط
    const speakButton = !isUser ? `
        <button class="speak-button" onclick="speakText('${message.replace(/'/g, "\\'")}', '${currentLang}')">
            <i class="fas fa-volume-up"></i>
        </button>
    ` : '';
    
    messageDiv.innerHTML = `
        <div class="message-content">
            <i class="${isUser ? 'fas fa-user' : 'fas fa-robot'}"></i>
            <div class="message-text">
                ${formatMessage(message)}
            </div>
            ${speakButton}
        </div>
    `;
    
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// دالة للحصول على الوقت الحالي
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString(
        document.documentElement.getAttribute('lang') === 'ar' ? 'ar-SA' : 'en-US',
        { hour: '2-digit', minute: '2-digit' }
    );
}

// تحديث CSS ديناميكياً
function addCustomStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .message {
            transition: opacity 0.3s ease, transform 0.3s ease;
            margin-bottom: 15px;
        }

        .message-content {
            padding: 12px 15px;
            border-radius: 15px;
            position: relative;
            max-width: 80%;
            word-wrap: break-word;
        }

        .bot-content {
            background: var(--accent-color);
            color: white;
        }

        .user-content {
            background: var(--button-bg);
            color: var(--text-primary);
        }

        .message-header {
            display: flex;
            align-items: center;
            margin-bottom: 5px;
            gap: 8px;
        }

        .message-icon {
            font-size: 0.9em;
        }

        .message-time {
            font-size: 0.8em;
            opacity: 0.8;
        }

        .message-text {
            line-height: 1.5;
            font-size: 0.95em;
        }

        .message-text a {
            color: inherit;
            text-decoration: underline;
            word-break: break-all;
        }

        @media (max-width: 768px) {
            .message-content {
                max-width: 90%;
            }
        }

        @media (max-width: 480px) {
            .message-content {
                max-width: 95%;
            }
            
            .message-text {
                font-size: 0.9em;
            }
        }

        .typing-indicator {
            padding: 12px 15px;
            background: var(--accent-color);
            border-radius: 15px;
            display: inline-flex;
            align-items: center;
            margin-bottom: 15px;
            opacity: 0.8;
        }

        /* أنماط زر القراءة الصوتية */
        .speak-button {
            background: none;
            border: none;
            color: var(--accent-color);
            cursor: pointer;
            padding: 5px;
            margin-left: 8px;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }

        .speak-button:hover {
            background-color: var(--accent-color);
            color: white;
        }

        .speak-button i {
            font-size: 14px;
        }

        /* تحديث تنسيق رسائل المحادثة */
        .message-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .message-text {
            flex: 1;
        }
    `;
    document.head.appendChild(styleSheet);
}

// إضافة الأنماط عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    addCustomStyles();
    
    const chatInput = document.querySelector('#userInput');
    const sendButton = document.querySelector('.send-button');

    if (chatInput && sendButton) {
        // تحسين تجربة الإدخال
        chatInput.addEventListener('input', () => {
            sendButton.style.opacity = chatInput.value.trim() ? '1' : '0.5';
        });

        sendButton.addEventListener('click', () => {
            if (chatInput.value.trim()) {
                sendSecurityQuestion();
            }
        });
        
        chatInput.addEventListener('keypress', e => {
            if (e.key === 'Enter' && !e.shiftKey && chatInput.value.trim()) {
                e.preventDefault();
                sendSecurityQuestion();
            }
        });

        // تركيز تلقائي على حقل الإدخال
        chatInput.focus();
    }
});

