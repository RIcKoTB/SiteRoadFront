// public/js/lang.js
(() => {
  const translations = {
    uk: {
      siteTitle:      'Історія залізниці України',
      navIntro:       'Головна',
      navPeriods:     'Періоди',
      navTimeline:    'Хронологія',
      navFacts:       'Цікаві факти',
      navGallery:     'Галерея',
      introTitle:     'Вступ',
      introDesc:      'Ласкаво просимо на сайт «Історія залізниці України»! Тут ви знайдете докладний огляд розвитку залізничного транспорту від перших колій до сучасних інновацій.',
      searchPlaceholder: 'Пошук…',
      quizPromoTitle: 'Перевір свої знання!',
      quizPromoDesc:  'Пройди коротку вікторину з історії залізниці України та дізнайся, наскільки ти експерт у темі.',
      openQuiz:       'Почати вікторину',
      openRules:      'Деталі правил',
      rulesTitle:     'Правила вікторини',
      rulesList:      [
        'Кожне питання має одну правильну відповідь.',
        'Час на відповідь — 30 секунд.',
        'За кожну правильну — 1 бал.'
      ],
      closeRules:     'Закрити',
      quizAnswerPlaceholder: 'Введи відповідь тут',
      quizNext:       'Наступне',
      quizClose:      'Вихід',
      periodsTitle:   'Історичні періоди',
      timelineTitle:  'Інтерактивна хронологія',
      timelineLabel:  'Показані події до року:',
      galleryTitle:   'Галерея',
      factsTitle:     'Цікаві факти',
      footerText:     '© 2025 Історія залізниці України',
    },
    en: {
      siteTitle:      'History of Ukrainian Railways',
      navIntro:       'Home',
      navPeriods:     'Periods',
      navTimeline:    'Timeline',
      navFacts:       'Facts',
      navGallery:     'Gallery',
      introTitle:     'Welcome',
      introDesc:      'Welcome to the History of Ukrainian Railways! Here you will find an overview of railway development from the first tracks to modern innovations.',
      searchPlaceholder: 'Search…',
      quizPromoTitle: 'Test Your Knowledge!',
      quizPromoDesc:  'Take a short quiz on the history of Ukrainian railways and see how expert you are.',
      openQuiz:       'Start Quiz',
      openRules:      'Rules',
      rulesTitle:     'Quiz Rules',
      rulesList:      [
        'Each question has one correct answer.',
        'Time per question — 30 seconds.',
        'Each correct answer — 1 point.'
      ],
      closeRules:     'Close',
      quizAnswerPlaceholder: 'Enter your answer here',
      quizNext:       'Next',
      quizClose:      'Exit',
      periodsTitle:   'Historical Periods',
      timelineTitle:  'Interactive Timeline',
      timelineLabel:  'Showing events until:',
      galleryTitle:   'Gallery',
      factsTitle:     'Facts',
      footerText:     '© 2025 History of Ukrainian Railways',
    },
  };

  let currentLang = 'uk';

  function updateStaticTexts() {
    const t = translations[currentLang];

    const map = {
      'site-title':      t.siteTitle,
      'nav-intro':       t.navIntro,
      'nav-periods':     t.navPeriods,
      'nav-timeline':    t.navTimeline,
      'nav-facts':       t.navFacts,
      'nav-gallery':     t.navGallery,
      'intro-title':     t.introTitle,
      'intro-desc':      t.introDesc,
      'search':          null,
      'quiz-promo-title':t.quizPromoTitle,
      'quiz-promo-desc': t.quizPromoDesc,
      'open-quiz':       t.openQuiz,
      'open-rules':      t.openRules,
      'rules-title':     t.rulesTitle,
      'rules-list':      null,
      'close-rules':     t.closeRules,
      'quiz-answer':     null,
      'quiz-next':       t.quizNext,
      'quiz-close':      t.quizClose,
      'periods-title':   t.periodsTitle,
      'timeline-title':  t.timelineTitle,
      'timeline-label':  null,
      'gallery-title':   t.galleryTitle,
      'facts-title':     t.factsTitle,
      'footer-text':     t.footerText,
    };

    for (const [id, text] of Object.entries(map)) {
      const el = document.getElementById(id);
      if (!el) continue;
      switch (id) {
        case 'search':
          el.placeholder = t.searchPlaceholder;
          break;
        case 'rules-list':
          el.innerHTML = t.rulesList.map(li => `<li>${li}</li>`).join('');
          break;
        case 'quiz-answer':
          el.placeholder = t.quizAnswerPlaceholder;
          break;
        case 'timeline-label':
          el.textContent = t.timelineLabel;
          break;
        default:
          el.textContent = text;
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateStaticTexts();

    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
      langBtn.textContent = 'EN';
      langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'uk' ? 'en' : 'uk';
        langBtn.textContent = currentLang === 'uk' ? 'EN' : 'UK';
        updateStaticTexts();
        document.dispatchEvent(new CustomEvent('langChanged', { detail: currentLang }));
      });
    }
  });

  // Для getAllData.js
  window.getCurrentLang = () => currentLang;
})();
