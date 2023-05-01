/* eslint-disable no-undef */
const { body } = document;
const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');
body.append(wrapper);

const form = document.createElement('form');
wrapper.append(form);

const textarea = document.createElement('textarea');
textarea.classList.add('textarea');
form.append(textarea);

const wrapVirtualKeyboard = document.createElement('div');
wrapVirtualKeyboard.classList.add('wrap-virtual-keyboard');
wrapper.append(wrapVirtualKeyboard);

const virtualKeyboard = document.createElement('div');
virtualKeyboard.classList.add('virtual-keyboard');
wrapVirtualKeyboard.append(virtualKeyboard);

const textDescription = document.createElement('div');
textDescription.classList.add('text-description');
wrapper.append(textDescription);

const OSInfo = document.createElement('p');
OSInfo.classList.add('os-info');
OSInfo.innerHTML = 'Клавиатура создана в операционной системе Linux(Ubuntu 20.04.4 LTS)';
textDescription.append(OSInfo);

const infoLanguageSwitching = document.createElement('p');
infoLanguageSwitching.classList.add('os-info');
infoLanguageSwitching.innerHTML = 'Для переключения языка комбинация: AltLeft + ShiftLeft';
textDescription.append(infoLanguageSwitching);

let CapsLock = '0';
let Shift = '0';
let lang;

function addKeys() {
  for (let i = 0; i < keys.length; i += 1) {
    if (keys[i].type === 'functional') {
      const funcBtn = (new FunctionalButtons(
        keys[i].value,
        keys[i].btnName,
        keys[i].code,
        keys[i].type,
      )).createFuncButton();
      virtualKeyboard.append(funcBtn);
    } else {
      const simpleBtn = (new SimpleButtons(
        keys[i].value,
        keys[i].valueShift,
        keys[i].valueRu,
        keys[i].valueShiftRu,
        keys[i].btnName,
        keys[i].code,
        keys[i].type,
      )).createSimpleButton();
      virtualKeyboard.append(simpleBtn);
    }
  }
}
addKeys();

const keysUp = document.querySelectorAll('.keyUp');
const keysDown = document.querySelectorAll('.keyDown');
const btnSimple = document.querySelectorAll('.simpleBtn');
const arrBtn = btnSimple.length * 2;
const rusLang = document.getElementsByClassName('rus');
const engLang = document.getElementsByClassName('eng');

let flag = false;
let targetBtn;
let entryField;

function keysUpFunc() {
  for (let i = 0; i < arrBtn; i += 1) {
    keysDown[i].classList.add('hidden');
    keysUp[i].classList.remove('hidden');
  }
}

function keysDownFunc() {
  for (let i = 0; i < arrBtn; i += 1) {
    keysUp[i].classList.add('hidden');
    keysDown[i].classList.remove('hidden');
  }
}

function changeEngLang() {
  for (let i = 0; i < rusLang.length; i += 1) {
    rusLang[i].classList.add('hidden');
    engLang[i].classList.remove('hidden');
  }
}

function changeRusLang() {
  for (let i = 0; i < engLang.length; i += 1) {
    engLang[i].classList.add('hidden');
    rusLang[i].classList.remove('hidden');
  }
}

function deleteActiveClass() {
  if (document.querySelector('.active')) {
    const activeBtn = document.querySelector('.active');
    activeBtn.classList.remove('active');
  }
}

function addActiveClass(eventCode) {
  if (document.querySelector(`#${eventCode}`)) {
    const activeBtn = document.querySelector(`#${eventCode}`);
    activeBtn.classList.add('active');
  }
}

function addValueTextBtn(value, key, keyUp) {
  if (CapsLock === '0') {
    if (Shift === '0') {
      document.querySelector('textarea').value = value + key;
    } else if (Shift === '1') {
      Shift = '0';
      document.querySelector('textarea').value = value + keyUp;
    }
  } else if (CapsLock === '1') {
    if (Shift === '0') {
      document.querySelector('textarea').value = value + keyUp;
    } else if (Shift === '1') {
      Shift = '0';
      document.querySelector('textarea').value = value + key;
    }
  }
}

function doKeyUp() {
  deleteActiveClass();
  textarea.focus();
  localStorage.setItem('lang', lang);
}

function addValue(i) {
  if (lang === 'en') {
    addValueTextBtn(entryField, keys[i].value, keys[i].valueShift);
  } else if (lang === 'ru') {
    addValueTextBtn(entryField, keys[i].valueRu, keys[i].valueShiftRu);
  }
}

function changeLang() {
  if (lang === 'en') {
    lang = 'ru';
    changeRusLang();
  } else if (lang === 'ru') {
    lang = 'en';
    changeEngLang();
  }
}

document.addEventListener('keydown', (event) => {
  if (event.code) {
    addActiveClass(event.code);
  }

  entryField = document.querySelector('textarea').value;

  for (let i = 0; i < keys.length; i += 1) {
    if (event.code && event.code === keys[i].code && keys[i].type !== 'functional') {
      event.preventDefault();
      addValue(i);
    }
  }

  // shift
  if (event.shiftKey === true) {
    Shift = '1';
    keysUpFunc();
  }

  // Shift+Alt

  if (event.code && event.code === 'AltLeft') flag = true;
  if (event.code && event.code === 'ShiftLeft' && flag) {
    flag = false;
    changeLang();
  }

  // CapsLOck

  if (event.code && event.code === 'CapsLock') {
    event.preventDefault();

    if (CapsLock === '0') {
      CapsLock = '1';
      keysUpFunc();
    } else if (CapsLock === '1') {
      CapsLock = '0';
      keysDownFunc();
    }
  }
});

document.addEventListener('mousedown', (event) => {
  if (event.target.closest('div')) {
    addActiveClass(event.target.closest('div').dataset.code);
  }

  entryField = document.querySelector('textarea').value;

  targetBtn = event.target.closest('div');

  if (event.target.closest('div') && event.target.closest('div').dataset.type !== 'functional') {
    for (let i = 0; i < keys.length; i += 1) {
      if (event.target.closest('div').dataset.code === keys[i].code) {
        addValue(i);
      }
    }
  }

  // Backspace
  if (event.target.closest('div') && event.target.closest('div').dataset.code === 'Backspace') {
    const tmp = entryField.split('');
    tmp.pop();
    document.querySelector('textarea').value = tmp.join('');
  }

  // CapsLock
  if (event.target.closest('div') && event.target.closest('div').dataset.code === 'CapsLock') {
    if (CapsLock === '0') {
      CapsLock = '1';
      keysUpFunc();
    } else if (CapsLock === '1') {
      CapsLock = '0';
      keysDownFunc();
    }
  }

  // SHift
  if (event.target.closest('div') && (event.target.closest('div').dataset.code === 'ShiftLeft'
   || event.target.closest('div').dataset.code === 'ShiftRight')) {
    keysUpFunc();

    if (Shift === '0') {
      Shift = '1';
    } else if (Shift === '1') {
      Shift = '0';
    }
  }
  // Space
  if (event.target.closest('div') && event.target.closest('div').dataset.code === 'Space') {
    document.querySelector('textarea').value = `${entryField} `;
  }
  // Enter
  if (event.target.closest('div') && event.target.closest('div').dataset.code === 'Enter') {
    document.querySelector('textarea').value = `${entryField}\n`;
  }
  // Tab
  if (event.target.closest('div') && event.target.closest('div').dataset.code === 'Tab') {
    document.querySelector('textarea').value = `${entryField}    `;
  }
  // Delete
  if (event.target.closest('div') && event.target.closest('div').dataset.code === 'Delete') {
    document.querySelector('textarea').value = '';
  }
  // Alt+shift

  if (targetBtn && targetBtn.dataset.code === 'AltLeft') flag = true;
  if (targetBtn && targetBtn.dataset.code === 'ShiftLeft' && flag) {
    flag = false;
    changeLang();
  }
});

document.addEventListener('keyup', (event) => {
  doKeyUp();

  if (event.shiftKey === false) {
    Shift = '0';
    keysDownFunc();
  }
});

document.addEventListener('mouseup', (event) => {
  doKeyUp();

  targetBtn = event.target.closest('div');
  if (targetBtn && (targetBtn.dataset.code === 'ShiftLeft'
   || targetBtn.dataset.code === 'ShiftRight')) {
    keysDownFunc();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('lang')) {
    lang = localStorage.getItem('lang');
  } else {
    lang = 'en';
  }

  if (lang === 'en') {
    changeEngLang();
  } else if (lang === 'ru') {
    changeRusLang();
  }
});
