// 안전하게 DOM 준비 후 바인딩
(function(){
  const resultBox = document.getElementById('resultBox');
  const quoteBtn = document.getElementById('quoteBtn');
  const todayBtn = document.getElementById('todayBtn');
  const moneyBtn = document.getElementById('moneyBtn');
  const studyBtn = document.getElementById('studyBtn');
  const loveBtn = document.getElementById('loveBtn');
  const darkToggle = document.getElementById('darkToggle');

  // 공통: 결과 박스에 예쁘게 넣기
  function showBox(title, htmlContent){
    // title: 문자열, htmlContent: innerHTML (간단한 마크업 허용)
    resultBox.innerHTML = `<strong style="display:block;margin-bottom:10px;font-size:18px">${title}</strong>
                           <div>${htmlContent}</div>`;
    resultBox.classList.remove('hidden');
    resultBox.scrollIntoView({behavior:'smooth', block:'center'});
  }

  // 안전한 랜덤 선택기
  function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

  // 버튼들에 로직 연결 (quotes, fortunes arrays are loaded from fortune/*.js)
  quoteBtn.addEventListener('click', ()=> {
    if(typeof quotes === 'undefined' || !Array.isArray(quotes)){ showBox('오류','명언 데이터가 로드되지 않았습니다.'); return; }
    const q = pick(quotes);
    showBox('💡 오늘의 명언', `<em style="font-size:18px">"${q}"</em>`);
  });

  todayBtn.addEventListener('click', ()=> {
    if(typeof fortunesToday === 'undefined' || !Array.isArray(fortunesToday)){ showBox('오류','오늘의 운세 데이터가 없습니다.'); return; }
    const f = pick(fortunesToday);
    showBox('🔮 오늘의 운세', `<div>${f}</div>`);
  });

  moneyBtn.addEventListener('click', ()=> {
    if(typeof fortunesMoney === 'undefined' || !Array.isArray(fortunesMoney)){ showBox('오류','금전운 데이터가 없습니다.'); return; }
    const f = pick(fortunesMoney);
    showBox('💰 금전운', `<div>${f}</div>`);
  });

  studyBtn.addEventListener('click', ()=> {
    if(typeof fortunesStudy === 'undefined' || !Array.isArray(fortunesStudy)){ showBox('오류','학업운 데이터가 없습니다.'); return; }
    const f = pick(fortunesStudy);
    showBox('📘 학업운', `<div>${f}</div>`);
  });

  loveBtn.addEventListener('click', ()=> {
    if(typeof fortunesLove === 'undefined' || !Array.isArray(fortunesLove)){ showBox('오류','연애운 데이터가 없습니다.'); return; }
    const f = pick(fortunesLove);
    showBox('❤️ 연애운', `<div>${f}</div>`);
  });

  // 다크모드 toggle + 저장
  function setDark(on){
    if(on) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
    localStorage.setItem('jiuu-theme', on ? 'dark' : 'light');
    darkToggle.textContent = on ? '☀️' : '🌙';
  }

  darkToggle.addEventListener('click', ()=> {
    setDark(!document.body.classList.contains('dark'));
  });

  // 초기 테마 복원
  const saved = localStorage.getItem('jiuu-theme');
  if(saved === 'dark') setDark(true);
  else setDark(false);

})();
