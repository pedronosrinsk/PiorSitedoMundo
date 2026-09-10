(function(){
  const email = document.getElementById('email');
  const senha = document.getElementById('senha');
  const termos = document.getElementById('termos');
  const termsBox = document.getElementById('termsBox');
  const captcha = document.getElementById('captcha');

  const msgEmailFake = document.getElementById('msgEmailFake');
  const msgEmailTruth = document.getElementById('msgEmailTruth');
  const msgSenha = document.getElementById('msgSenha');
  const msgCaptcha = document.getElementById('msgCaptcha');

  const advanceBtn = document.getElementById('advanceBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const forgotBtn = document.getElementById('forgotBtn');
  const toast = document.getElementById('toast');

  const cancelModal = document.getElementById('cancelModal');
  const modalX = document.getElementById('modalX');
  const modalYes = document.getElementById('modalYes');
  const modalNo = document.getElementById('modalNo');

  const formWrap = document.getElementById('formWrap');
  const winScreen = document.getElementById('winScreen');
  const card = document.getElementById('card');

  let senhaAttempts = 0;
  let dodgeCount = 0;
  const DODGE_LIMIT = 4;
  let tamed = false;

  function verificarFimTermos() {
    const chegouAoFim = termsBox.scrollTop + termsBox.clientHeight >= termsBox.scrollHeight - 5;
    if (chegouAoFim) {
      termos.disabled = false;
      termos.parentElement.style.cursor = 'pointer';
    }
  }

  termsBox.addEventListener('wheel', (e) => {
    e.preventDefault();
    const fatorLentidao = 0.05;
    termsBox.scrollTop += e.deltaY * fatorLentidao;
    verificarFimTermos();
  }, { passive: false });

  termsBox.addEventListener('scroll', verificarFimTermos);

  function randomSpot(el){
    const w = el.offsetWidth || 90;
    const h = el.offsetHeight || 36;
    const maxX = window.innerWidth - w - 16;
    const maxY = window.innerHeight - h - 16;
    return {
      left: Math.max(16, Math.random() * maxX),
      top: Math.max(16, Math.random() * maxY)
    };
  }

  function tameButton(){
    tamed = true;
    advanceBtn.classList.remove('fleeing');
    advanceBtn.classList.add('tamed');
    advanceBtn.style.position = 'static';
    advanceBtn.style.left = 'auto';
    advanceBtn.style.top = 'auto';
    advanceBtn.textContent = 'tá bom, pode clicar';
  }

  advanceBtn.addEventListener('mouseenter', () => {
    if(tamed) return;
    dodgeCount++;
    if(dodgeCount >= DODGE_LIMIT){
      tameButton();
      return;
    }
    advanceBtn.classList.add('fleeing');
    const spot = randomSpot(advanceBtn);
    advanceBtn.style.left = spot.left + 'px';
    advanceBtn.style.top = spot.top + 'px';
    if(dodgeCount === 2){
      showToast('Dica de verdade: tente Tab e depois Enter.');
    }
  });

  let toastTimer = null;
  function showToast(text){
    toast.textContent = text;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  }

  forgotBtn.addEventListener('click', () => {
    showToast('Se tu não sabe quem dirá eu.');
  });

  function positionModalX(){
    const corners = [
      { left: '18px', top: '18px' },
      { right: '18px', top: '18px' },
      { left: '18px', bottom: '18px' }
    ];
    const c = corners[Math.floor(Math.random() * corners.length)];
    modalX.style.left = c.left || 'auto';
    modalX.style.right = c.right || 'auto';
    modalX.style.top = c.top || 'auto';
    modalX.style.bottom = c.bottom || 'auto';
  }

  function closeModal(){ 
    cancelModal.classList.remove('show'); 
  }

  cancelBtn.addEventListener('click', () => {
    positionModalX();
    cancelModal.classList.add('show');
  });

  modalX.addEventListener('click', closeModal);
  modalNo.addEventListener('click', closeModal);
  
  modalYes.addEventListener('click', () => {
    document.getElementById('form').reset();
    termos.disabled = true;
    termos.parentElement.style.cursor = 'not-allowed';
    senhaAttempts = 0;
    [msgEmailFake, msgEmailTruth, msgSenha, msgCaptcha].forEach(m => m.classList.remove('show'));
    closeModal();
  });

  cancelModal.addEventListener('click', (e) => {
    if(e.target === cancelModal) closeModal();
  });

  function launchConfetti(){
    const colors = ['#ff5d5d', '#f2b705', '#5ee06b', '#241b2f'];
    for(let i = 0; i < 40; i++){
      const bit = document.createElement('div');
      bit.className = 'confetti';
      bit.style.left = Math.random() * 100 + '%';
      bit.style.background = colors[i % colors.length];
      bit.style.animationDuration = (1.2 + Math.random() * 1.2) + 's';
      bit.style.animationDelay = (Math.random() * 0.4) + 's';
      card.appendChild(bit);
      setTimeout(() => bit.remove(), 3000);
    }
  }

  document.getElementById('form').addEventListener('submit', function(e){
    e.preventDefault();

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    if(!emailOk){
      msgEmailFake.classList.add('show');
      msgEmailTruth.classList.remove('show');
      setTimeout(() => msgEmailTruth.classList.add('show'), 900);
      email.focus();
      return;
    }
    msgEmailFake.classList.remove('show');
    msgEmailTruth.classList.remove('show');

    if(senha.value.trim().length === 0){
      msgSenha.textContent = 'Precisamos de uma senha, mesmo que você não lembre direito.';
      msgSenha.classList.add('show');
      senha.focus();
      return;
    }

    if(senhaAttempts === 0){
      senhaAttempts++;
      msgSenha.textContent = 'Essa senha tá feia. Tenta de novo — você deve ter esquecido.';
      msgSenha.classList.add('show');
      senha.value = '';
      senha.classList.add('shake');
      setTimeout(() => senha.classList.remove('shake'), 400);
      senha.focus();
      return;
    }

    if(senha.value.trim().length < 4){
      msgSenha.textContent = 'Agora sim é sério: pelo menos 4 caracteres.';
      msgSenha.classList.add('show');
      senha.focus();
      return;
    }
    msgSenha.classList.remove('show');

    if(!termos.checked){
      showToast('Você precisa rolar e aceitar os termos.');
      return;
    }

    if(captcha.value.trim() !== '2'){
      msgCaptcha.textContent = 'Errou! Volte para a aula de matemática.';
      msgCaptcha.classList.add('show');
      captcha.focus();
      return;
    }
    msgCaptcha.classList.remove('show');

    document.getElementById('statSenha').textContent = senhaAttempts + 1;
    document.getElementById('statFuga').textContent = dodgeCount;
    formWrap.classList.add('hide');
    winScreen.classList.add('show');
    launchConfetti();
  });

  document.getElementById('restartBtn').addEventListener('click', () => {
    location.reload();
  });
})();