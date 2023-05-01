"use strict";
let body = document.body;
let wrapper = document.createElement('div');
wrapper.classList.add('wrapper');
body.append(wrapper);

let form = document.createElement('form');
wrapper.append(form);

let textarea = document.createElement('textarea');
textarea.classList.add('textarea');
form.append(textarea);

let wrapVirtualKeyboard = document.createElement("div");
wrapVirtualKeyboard.classList.add("wrap-virtual-keyboard");
wrapper.append(wrapVirtualKeyboard);

let virtualKeyboard = document.createElement('div');
virtualKeyboard.classList.add('virtual-keyboard');
wrapVirtualKeyboard.append(virtualKeyboard);

let textDescription = document.createElement("div");
textDescription.classList.add("text-description");
wrapper.append(textDescription);

let OSInfo = document.createElement('p');
OSInfo.classList.add("os-info");
OSInfo.innerHTML = "Клавиатура создана в операционной системе Linux(Ubuntu 20.04.4 LTS)";
textDescription.append(OSInfo);

let infoLanguageSwitching = document.createElement('p');
infoLanguageSwitching.classList.add("os-info");
infoLanguageSwitching.innerHTML = "Для переключения языка комбинация: AltLeft + ShiftLeft";
textDescription.append(infoLanguageSwitching);


let CapsLock = '0';
let Shift = '0';
let lang;


function addKeys () {
   for(let i = 0; i < keys.length; i++) {
      if (keys[i]['type'] === "functional") {
         let funcBtn = (new FunctionalButtons(keys[i]['value'], keys[i]["btnName"], keys[i]["code"], keys[i]['type'])).createFuncButton();
         virtualKeyboard.append(funcBtn);
      }
      else {
         let simpleBtn = (new SimpleButtons(keys[i]['value'],keys[i]["valueShift"],keys[i]["valueRu"],keys[i]["valueShiftRu"], keys[i]["btnName"], keys[i]["code"], keys[i]['type'] )).createSimpleButton();
         virtualKeyboard.append(simpleBtn);
      }
   }
}
addKeys();




let keysUp = document.querySelectorAll(".keyUp");
let keysDown = document.querySelectorAll(".keyDown");
let btnSimple = document.querySelectorAll('.simpleBtn');
let arrBtn = btnSimple.length*2;
let rusLang = document.getElementsByClassName("rus");
let engLang = document.getElementsByClassName("eng");

let btn = document.querySelectorAll('.btn');
let flag = false;
let targetBtn; 
let entryField;

function keysUpFunc() {
   for(let i = 0; i < arrBtn; i++) {
      keysDown[i].classList.add('hidden');
      keysUp[i].classList.remove('hidden');
   }
   console.log(keysUp);
}

function keysDownFunc() {
   for(let i = 0; i < arrBtn; i++) {
      keysUp[i].classList.add('hidden');
      keysDown[i].classList.remove('hidden');
   }
}
//отображение клавиш
function changeEngLang() {
   for (let i = 0; i < rusLang.length; i++) {
      rusLang[i].classList.add('hidden');
      engLang[i].classList.remove('hidden');
   }
}
//отображение клавиш
function changeRusLang() {
   for (let i = 0; i < engLang.length; i++) {
      engLang[i].classList.add('hidden');
      rusLang[i].classList.remove('hidden');

   }
}

function deleteActiveClass() {
   if(document.querySelector('.active')) {
      let activeBtn = document.querySelector('.active');
      activeBtn.classList.remove('active');
   }
}

function addActiveClass (eventCode) {
   if (document.querySelector('#'+eventCode)){
      let activeBtn = document.querySelector('#'+eventCode);
      activeBtn.classList.add('active');
   }
}

function addValueTextBtn (entryField, key, keyUp) {
   if(CapsLock === '0') {
      if(Shift ==='0') {
         document.querySelector("textarea").value = entryField + key;
      } 
      else if (Shift === '1') {
         Shift = '0';  
         document.querySelector("textarea").value = entryField + keyUp;
      }
   } else if (CapsLock === '1') {
      if(Shift === '0') { 
        document.querySelector("textarea").value = entryField + keyUp;
      } else if (Shift === '1') {
         Shift = '0';
         document.querySelector("textarea").value = entryField + key;
      }
   }
}

function doKeyUp(){
   deleteActiveClass();
   textarea.focus();
   localStorage.setItem('lang', lang);
}

function addValue(i) {

  if(lang === 'en') {
    addValueTextBtn(entryField, keys[i]['value'], keys[i]['valueShift']);

  } else if (lang === 'ru') {
    addValueTextBtn(entryField, keys[i]['valueRu'], keys[i]['valueShiftRu']);
            }
}

function changeLang() {
   if(lang === 'en') {
      lang = 'ru';
      changeRusLang();
   } else if (lang === 'ru') {
      lang = 'en';
     changeEngLang();
   }
 }

 function onCapsLock(CapsLock) {
   if (CapsLock === "0") {
      CapsLock = "1";
      keysUpFunc();

   } else if(CapsLock === "1") {
      CapsLock = "0";
      keysDownFunc();
   }
 }

document.addEventListener('keydown', function(event) {
   
   if(event.code) {
     addActiveClass(event.code); 
   }
   
   entryField = document.querySelector("textarea").value;

   for(let i = 0; i < keys.length; i++) {
      if (event.code && event.code === keys[i]['code'] && keys[i]['type'] !== 'functional') {
         event.preventDefault();
         addValue(i);
      }
   }


//shift
   if(event.shiftKey === true) {
      Shift = '1';
      keysUpFunc();
}

//Shift+Alt

if(event.code && event.code === "AltLeft") flag = true;
if(event.code && event.code === "ShiftLeft" && flag) {
   flag = false;
   changeLang();  
}

//CapsLOck

   if(event.code && event.code === "CapsLock") {
      event.preventDefault();

      if (CapsLock === "0") {
         CapsLock = "1";
         keysUpFunc();
      } else if(CapsLock === "1") {
         CapsLock = "0";
         keysDownFunc();
      } 
   }
});


document.addEventListener('mousedown', function (event) {

   if (event.target.closest('div')) {
      addActiveClass(event.target.closest('div').dataset.code);
   }

   entryField = document.querySelector("textarea").value;
   
   targetBtn = event.target.closest('div');

   if(event.target.closest('div') && event.target.closest('div').dataset.type !== "functional") {
      for(let i = 0; i < keys.length; i++) {
         if (event.target.closest('div').dataset.code === keys[i]['code']) {
            addValue(i); 
         }
      }
   }

//Backspace
   if (event.target.closest('div') && event.target.closest('div').dataset.code === "Backspace") {
      let tmp = entryField.split('');
      tmp.pop();
      document.querySelector('textarea').value = tmp.join('');
   }

//CapsLock
   if (event.target.closest('div') && event.target.closest('div').dataset.code === "CapsLock") {
      if (CapsLock === "0") {
         CapsLock = "1";
         keysUpFunc();
         console.log(CapsLock);

      } else if (CapsLock === "1") {
         CapsLock = "0";
         keysDownFunc();
         console.log(CapsLock);
      }
   }

//SHift
   if ( event.target.closest('div') && (event.target.closest('div').dataset.code === "ShiftLeft" ||
   event.target.closest('div').dataset.code === "ShiftRight")) {
      keysUpFunc();

      if (Shift === '0') {
         Shift = '1';
      } else if (Shift === '1') {
         Shift = '0';
      }
   }
//Space
   if (event.target.closest('div') && event.target.closest('div').dataset.code === "Space") {
      document.querySelector("textarea").value = entryField + " ";
   }
//Enter
   if (event.target.closest('div') && event.target.closest('div').dataset.code === "Enter") {
      document.querySelector("textarea").value = entryField + "\n";
   }
//Tab
   if (event.target.closest('div') && event.target.closest('div').dataset.code === "Tab") {
      document.querySelector("textarea").value = entryField + "    ";
   }
//Delete
   if (event.target.closest('div') && event.target.closest('div').dataset.code === "Delete") {
      document.querySelector("textarea").value = "";
   }
//Alt+shift

if(targetBtn && targetBtn.dataset.code === "AltLeft") flag = true;
   if(targetBtn && targetBtn.dataset.code === "ShiftLeft" && flag) {
      flag = false;
      changeLang();
   }
});

document.addEventListener('keyup', function(event) {

   doKeyUp();

   if(event.shiftKey === false) {
      Shift = '0';
      keysDownFunc();
   } 
});

document.addEventListener('mouseup', function (event) {
   
   doKeyUp();

   targetBtn = event.target.closest('div');
   if (targetBtn && (targetBtn.dataset.code === "ShiftLeft" ||
   targetBtn.dataset.code === "ShiftRight")) {
      keysDownFunc();
   }  
});


document.addEventListener('DOMContentLoaded', function () {
  
   if(localStorage.getItem('lang')) {
      lang = localStorage.getItem('lang');
   } else {
      lang = 'en';
   }

   if(lang === 'en') {
      changeEngLang();
   } else if (lang === 'ru') {
      changeRusLang();
   }

}); 
