// Theme toggling
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-btn i');
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Language toggling
function toggleLanguage() {
    const currentLang = document.documentElement.getAttribute('lang');
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    
    document.documentElement.setAttribute('lang', newLang);
    localStorage.setItem('language', newLang);
    
    const langBtn = document.querySelector('.lang-btn span');
    if (langBtn) {
        langBtn.textContent = newLang.toUpperCase();
    }
    
    translateContent(newLang);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Set saved language
    const savedLang = localStorage.getItem('language') || 'ar';
    document.documentElement.setAttribute('lang', savedLang);
    const langBtn = document.querySelector('.lang-btn span');
    if (langBtn) {
        langBtn.textContent = savedLang.toUpperCase();
    }
});

// Translations
const translations = {
    ar: {
        'virus-guide': 'دليل الفيروسات',
        'hacked-accounts-guide': 'دليل الحسابات المخترقة',
        'bank-security-guide': 'دليل أمان البنوك',
        'view-guide': 'عرض الدليل'
    },
    en: {
        'virus-guide': 'Virus Guide',
        'hacked-accounts-guide': 'Hacked Accounts Guide',
        'bank-security-guide': 'Bank Security Guide',
        'view-guide': 'View Guide'
    }
};

function translateContent(lang) {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Guide content
const guideContent = {
    'virus-guide': {
        ar: {
            title: 'دليل الحماية من الفيروسات',
            sections: [
                {
                    title: 'مقدمة عن الفيروسات',
                    content: 'الفيروسات هي برامج ضارة مصممة لإلحاق الضرر بجهازك ونظامك. تعرف على كيفية حماية نفسك.',
                    icon: 'fa-virus'
                },
                {
                    title: 'طرق الحماية الأساسية',
                    content: `
                        1. تثبيت برنامج مكافحة فيروسات موثوق
                        2. تحديث النظام والبرامج باستمرار
                        3. عدم فتح المرفقات المشبوهة
                        4. تجنب تحميل البرامج من مصادر غير موثوقة
                        5. عمل نسخ احتياطية منتظمة`,
                    icon: 'fa-shield-virus'
                },
                {
                    title: 'علامات الإصابة بالفيروسات',
                    content: `
                        • بطء غير طبيعي في الجهاز
                        • ظهور إعلانات منبثقة بكثرة
                        • تغيير إعدادات المتصفح تلقائياً
                        • اختفاء أو تشفير الملفات
                        • تعطل برامج الحماية`,
                    icon: 'fa-triangle-exclamation'
                }
            ]
        },
        en: {
            title: 'Virus Protection Guide',
            sections: [
                {
                    title: 'Introduction to Viruses',
                    content: 'Viruses are malicious programs designed to harm your device and system. Learn how to protect yourself.',
                    icon: 'fa-virus'
                },
                {
                    title: 'Basic Protection Methods',
                    content: `
                        1. Install trusted antivirus software
                        2. Keep system and programs updated
                        3. Don't open suspicious attachments
                        4. Avoid downloading programs from untrusted sources
                        5. Make regular backups`,
                    icon: 'fa-shield-virus'
                },
                {
                    title: 'Signs of Virus Infection',
                    content: `
                        • Unusual system slowdown
                        • Frequent pop-up ads
                        • Automatic browser settings changes
                        • Missing or encrypted files
                        • Disabled protection software`,
                    icon: 'fa-triangle-exclamation'
                }
            ]
        }
    },
    'hacked-accounts-guide': {
        ar: {
            title: 'دليل حماية الحسابات من الاختراق',
            sections: [
                {
                    title: 'كيفية حماية حساباتك',
                    content: `
                        1. استخدام كلمات مرور قوية وفريدة
                        2. تفعيل المصادقة الثنائية
                        3. تجنب مشاركة معلومات الحساب
                        4. مراقبة نشاط الحساب بانتظام
                        5. تحديث معلومات الأمان باستمرار`,
                    icon: 'fa-user-shield'
                },
                {
                    title: 'المصادقة الثنائية',
                    content: `
                        • استخدام تطبيقات المصادقة
                        • تفعيل رسائل SMS للتحقق
                        • استخدام مفاتيح الأمان المادية
                        • تأمين البريد الإلكتروني المرتبط`,
                    icon: 'fa-key'
                }
            ]
        },
        en: {
            title: 'Account Protection Guide',
            sections: [
                {
                    title: 'How to Protect Your Accounts',
                    content: `
                        1. Use strong and unique passwords
                        2. Enable two-factor authentication
                        3. Avoid sharing account information
                        4. Monitor account activity regularly
                        5. Keep security information updated`,
                    icon: 'fa-user-shield'
                },
                {
                    title: 'Two-Factor Authentication',
                    content: `
                        • Use authentication apps
                        • Enable SMS notifications for verification
                        • Use physical security keys
                        • Secure your email`,
                    icon: 'fa-key'
                }
            ]
        }
    },
    'bank-security-guide': {
        ar: {
            title: 'دليل الأمان المصرفي',
            sections: [
                {
                    title: 'حماية معاملاتك البنكية',
                    content: `
                        1. استخدام شبكات آمنة فقط
                        2. التحقق من روابط البنك
                        3. عدم مشاركة معلومات البطاقة
                        4. مراقبة الكشوفات البنكية
                        5. تفعيل إشعارات المعاملات`,
                    icon: 'fa-credit-card'
                },
                {
                    title: 'التسوق الآمن عبر الإنترنت',
                    content: `
                        • التحقق من أمان المواقع
                        • استخدام بطاقات افتراضية للتسوق
                        • تجنب حفظ معلومات البطاقة
                        • التحقق من سمعة المتجر`,
                    icon: 'fa-cart-shopping'
                }
            ]
        },
        en: {
            title: 'Banking Security Guide',
            sections: [
                {
                    title: 'Protect Your Banking Transactions',
                    content: `
                        1. Use secure networks only
                        2. Verify bank links
                        3. Never share card information
                        4. Monitor bank statements
                        5. Enable transaction notifications`,
                    icon: 'fa-credit-card'
                },
                {
                    title: 'Safe Shopping Online',
                    content: `
                        • Verify website security
                        • Use virtual cards for shopping
                        • Avoid saving card information
                        • Verify store reputation`,
                    icon: 'fa-cart-shopping'
                }
            ]
        }
    }
};

// Show guide content
function showGuide(guideId) {
    const lang = document.documentElement.getAttribute('lang') || 'ar';
    const guide = guideContent[guideId][lang];
    
    const modal = document.createElement('div');
    modal.className = 'guide-modal';
    
    let content = `
        <div class="guide-modal-content">
            <div class="guide-header">
                <h2>${guide.title}</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="guide-body">
    `;
    
    guide.sections.forEach(section => {
        content += `
            <div class="guide-section">
                <div class="section-header">
                    <i class="fas ${section.icon}"></i>
                    <h3>${section.title}</h3>
                </div>
                <div class="section-content">
                    ${section.content.replace(/\n/g, '<br>')}
                </div>
            </div>
        `;
    });
    
    content += `
            </div>
        </div>
    `;
    
    modal.innerHTML = content;
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => modal.remove();
    
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}

// Add click handlers to guide buttons
document.addEventListener('DOMContentLoaded', function() {
    // ... existing initialization code ...
    
    // Add guide button handlers
    document.querySelectorAll('.view-guide-btn').forEach(button => {
        const guideCard = button.closest('.guide-card');
        const guideTitle = guideCard.querySelector('h3');
        const guideId = guideTitle.getAttribute('data-translate');
        
        button.onclick = () => showGuide(guideId);
    });
});

// Add these styles to your CSS
const modalStyles = `
.guide-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.guide-modal-content {
    background: var(--bg-secondary);
    width: 90%;
    max-width: 800px;
    max-height: 90vh;
    border-radius: 10px;
    overflow-y: auto;
}

.guide-header {
    padding: 20px;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.close-modal {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: var(--text-primary);
}

.guide-body {
    padding: 20px;
}

.guide-section {
    background: var(--bg-primary);
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    transition: transform 0.3s ease;
}

.guide-section:hover {
    transform: translateY(-2px);
}

.section-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.section-header i {
    font-size: 2em;
    margin-right: 15px;
    color: var(--accent-color);
}

[lang="ar"] .section-header i {
    margin-right: 0;
    margin-left: 15px;
}

.section-content {
    line-height: 1.6;
    padding-left: 45px;
}

[lang="ar"] .section-content {
    padding-left: 0;
    padding-right: 45px;
}

.image-container {
    margin: 15px 0;
    text-align: center;
}

.image-container img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
`;

// Add the modal styles
const styleSheet = document.createElement("style");
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet); 