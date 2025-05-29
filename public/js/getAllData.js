document.addEventListener('DOMContentLoaded', async () => {
  // ————————————————
  // 1) Історичні періоди
  // ————————————————
  try {
    const periodsRes = await fetch('http://127.0.0.1:8000/history-periods');
    if (!periodsRes.ok) throw new Error(`Periods HTTP ${periodsRes.status}`);
    const periods = await periodsRes.json();
    const periodsContainer = document.getElementById('period-list');
    periodsContainer.innerHTML = '';
    periods.forEach(p => {
      const card = document.createElement('div');
      card.className = 'bg-white dark:bg-gray-800 p-6 rounded shadow flex flex-col';
      card.innerHTML = `
        <h3 class="text-xl font-bold mb-2">${p.name}</h3>
        <p>${p.description}</p>
      `;
      periodsContainer.appendChild(card);
    });
  } catch (e) {
    console.error('Помилка fetch periods:', e);
    document.getElementById('period-list').innerHTML =
      '<p class="text-red-500">Не вдалося завантажити періоди</p>';
  }

  // ————————————————
  // 2) Факти
  // ————————————————
  try {
    const factsRes = await fetch('http://127.0.0.1:8000/facts');
    if (!factsRes.ok) throw new Error(`Facts HTTP ${factsRes.status}`);
    const facts = await factsRes.json();
    const factsContainer = document.getElementById('facts-list');
    factsContainer.innerHTML = '';
    facts.forEach(f => {
      const card = document.createElement('div');
      card.className = 'bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg';
      card.innerHTML = `<p class="text-lg font-medium">✦ ${f.fact}</p>`;
      factsContainer.appendChild(card);
    });
  } catch (e) {
    console.error('Помилка fetch facts:', e);
    document.getElementById('facts-list').innerHTML =
      '<p class="text-red-500">Не вдалося завантажити факти</p>';
  }

  // ————————————————
  // 3) Хронологія
  // ————————————————
  try {
    const tlRes = await fetch('http://127.0.0.1:8000/time-line');
    if (!tlRes.ok) throw new Error(`Timeline HTTP ${tlRes.status}`);
    const timeline = await tlRes.json();
    const tlContainer = document.getElementById('timeline-items');
    const maxYear = +document.getElementById('year-slider').value;
    tlContainer.innerHTML = '';
    timeline
      .filter(item => item.date <= maxYear)
      .forEach(item => {
        const el = document.createElement('div');
        el.className = 'inline-block bg-green-600 text-white p-4 rounded';
        el.innerHTML = `<strong>${item.date}</strong><div>${item.event}</div>`;
        tlContainer.appendChild(el);
      });
  } catch (e) {
    console.error('Помилка fetch timeline:', e);
    document.getElementById('timeline-items').innerHTML =
      '<p class="text-red-500">Не вдалося завантажити хронологію</p>';
  }

  // ————————————————
  // 4) Галерея
  // ————————————————
  try {
    const galRes = await fetch('http://127.0.0.1:8000/gallery');
    if (!galRes.ok) throw new Error(`Gallery HTTP ${galRes.status}`);
    const gallery = await galRes.json();
    let idx = 0;
    const imgEl = document.getElementById('gallery-img');
    const prevBtn = document.getElementById('prev-img');
    const nextBtn = document.getElementById('next-img');

    function showImage(i) {
      imgEl.classList.remove('opacity-100');
      imgEl.classList.add('opacity-0');
      setTimeout(() => {
        imgEl.src = gallery[i].path;
        imgEl.onload = () => {
          imgEl.classList.remove('opacity-0');
          imgEl.classList.add('opacity-100');
        };
      }, 300);
    }

    prevBtn.addEventListener('click', () => {
      idx = (idx - 1 + gallery.length) % gallery.length;
      showImage(idx);
    });
    nextBtn.addEventListener('click', () => {
      idx = (idx + 1) % gallery.length;
      showImage(idx);
    });

    // Показати перше
    showImage(0);
  } catch (e) {
    console.error('Помилка fetch gallery:', e);
    document.getElementById('gallery-img').alt = 'Не вдалося завантажити галерею';
  }

  // ————————————————
  // 5) Вікторина
  // ————————————————
  try {
    const quizRes = await fetch('http://127.0.0.1:8000/quiz');
    if (!quizRes.ok) throw new Error(`Quiz HTTP ${quizRes.status}`);
    const questions = await quizRes.json();
    let currentQ = 0, score = 0;

    const openQuiz = document.getElementById('open-quiz');
    const openRules = document.getElementById('open-rules');
    const closeRules = document.getElementById('close-rules');
    const quizModal = document.getElementById('quiz-modal');
    const questionEl = document.getElementById('quiz-question');
    const answerEl = document.getElementById('quiz-answer');
    const nextBtn = document.getElementById('quiz-next');
    const closeBtn = document.getElementById('quiz-close');

    openQuiz.addEventListener('click', () => {
      currentQ = 0; score = 0;
      questionEl.textContent = questions[currentQ].question;
      answerEl.value = '';
      quizModal.classList.remove('hidden');
    });

    openRules.addEventListener('click', () => {
      document.getElementById('rules-modal').classList.remove('hidden');
    });
    closeRules.addEventListener('click', () => {
      document.getElementById('rules-modal').classList.add('hidden');
    });

    nextBtn.addEventListener('click', () => {
      if (answerEl.value.trim() === questions[currentQ].answer) score++;
      currentQ++;
      if (currentQ < questions.length) {
        questionEl.textContent = questions[currentQ].question;
        answerEl.value = '';
      } else {
        alert(`Ваш результат: ${score}/${questions.length}`);
        quizModal.classList.add('hidden');
      }
    });
    closeBtn.addEventListener('click', () => {
      quizModal.classList.add('hidden');
    });
  } catch (e) {
    console.error('Помилка fetch quiz:', e);
  }

  // ————————————————
  // 6) Слайдер оновлення timeline
  // ————————————————
  document.getElementById('year-slider').addEventListener('input', async (e) => {
    // заново побудувати хронологію
    const tlRes = await fetch('http://127.0.0.1:8000/time-line');
    const timeline = await tlRes.json();
    const tlContainer = document.getElementById('timeline-items');
    const maxYear = +e.target.value;
    document.getElementById('slider-value').textContent = maxYear;
    tlContainer.innerHTML = '';
    timeline.filter(item => item.date <= maxYear).forEach(item => {
      const el = document.createElement('div');
      el.className = 'inline-block bg-green-600 text-white p-4 rounded';
      el.innerHTML = `<strong>${item.date}</strong><div>${item.event}</div>`;
      tlContainer.appendChild(el);
    });
  });

    // ————————————————
  // 7) Пошук по періодах
  // ————————————————
   // ————————————————
  // 7) Пошук по історичних періодах
  // ————————————————
  const searchInput = document.getElementById('search');
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    document.querySelectorAll('#period-list > div').forEach((card) => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(q) ? '' : 'none';
    });
  });


  // ————————————————
  // 8) Перемикання теми
  // ————————————————
  document.getElementById('theme-toggle').onclick = () => {
    document.documentElement.classList.toggle('dark');
  };
});
