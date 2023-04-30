class FunctionalButtons {
    constructor(value, className, codeKey, typeBtn) {
        this.value = value;
        this.className = className;
        this.codeKey = codeKey;
        this.typeBtn = typeBtn;
    }
    createFuncButton() {
        let btn = document.createElement('div');
        btn.classList.add('btn');
        btn.classList.add(this.className);
        btn.innerHTML = this.value;
        btn.id = this.codeKey;
        btn.setAttribute("data-code", this.codeKey);
        btn.setAttribute("data-type", this.typeBtn);
        return btn;
    }
}

class SimpleButtons extends FunctionalButtons{
    constructor(value,valueShift,valueRu,valueShiftRu, className, codeKey, typeBtn, ) {
        super(value, className, codeKey, typeBtn);
        this.valueShift = valueShift;
        this.valueRu = valueRu;
        this.valueShiftRu = valueShiftRu;

    }
    createSimpleButton() {
        let btn = document.createElement('div');
        btn.classList.add('btn');
        btn.classList.add('simpleBtn')
        btn.classList.add(this.className);

        let engBtn = document.createElement('span');
        engBtn.classList.add('eng');

        btn.append(engBtn);

        let rusBtn = document.createElement('span');
        rusBtn.classList.add('rus');
        rusBtn.classList.add('hidden');
        btn.append(rusBtn);

        let engKeydown = document.createElement('span');
        engKeydown.classList.add('keyDown');
        engKeydown.classList.add('keyDownEng');
        engKeydown.innerHTML = this.value;
        engBtn.append(engKeydown);

        let engKeyUp = document.createElement('span');
        engKeyUp.classList.add('keyUp');
        engKeyUp.classList.add('keyUpEng');
        engKeyUp.innerHTML = this.valueShift;
        engKeyUp.classList.add('hidden');
        engBtn.append(engKeyUp);

        let rusKeydown = document.createElement('span');
        rusKeydown.classList.add('keyDown');
        rusKeydown.classList.add('keyDownRus');
        rusKeydown.innerHTML = this.valueRu;
        rusBtn.append(rusKeydown);

        let rusKeyUp = document.createElement('span');
        rusKeyUp.classList.add('keyUp');
        rusKeyUp.classList.add('keyUpRus');
        rusKeyUp.innerHTML = this.valueShiftRu;
        rusKeyUp.classList.add('hidden');
        rusBtn.append(rusKeyUp);

        btn.id = this.codeKey;
        btn.setAttribute("data-code", this.codeKey);
        btn.setAttribute("data-type", this.typeBtn);
        return btn;
    }
}

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
let lang = 'en';


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


let keysUpFunc = function keysUpFunc() {
   for(let i = 0; i < arrBtn; i++) {
      keysDown[i].classList.add('hidden');
      keysUp[i].classList.remove('hidden');
   }
}

let keysDownFunc = function keysDownFunc() {
   for(let i = 0; i < arrBtn; i++) {
      keysUp[i].classList.add('hidden');
      keysDown[i].classList.remove('hidden');
   }
}

let changeEngLang = function changeEngLang() {
   for (let i = 0; i < rusLang.length; i++) {
      rusLang[i].classList.add('hidden');
      engLang[i].classList.remove('hidden');
   }
}

let changeRusLang = function changeRusLang() {
   for (let i = 0; i < engLang.length; i++) {
      engLang[i].classList.add('hidden');
      rusLang[i].classList.remove('hidden');

   }
}

let deleteActiveClass = function deleteActiveClass() {
   if(document.querySelector('.active')) {
      let activeBtn = document.querySelector('.active');
      activeBtn.classList.remove('active');
   }
}

let addActiveClass = function addActiveClass(eventCode) {
   if (document.querySelector('#'+eventCode)){
      let activeBtn = document.querySelector('#'+eventCode);
      activeBtn.classList.add('active');
   }
}


function addValueTextBtn(entryField, event) {
   if(CapsLock === '0') {
      if(Shift ==='0') {
         document.querySelector("textarea").value = entryField + event.target.innerText;
      } 
      else if (Shift === '1') {
         Shift = '0';
         document.querySelector("textarea").value = entryField + event.target.innerText;
      }
   } else if (CapsLock === '1') {
      if(Shift === '0') {
        document.querySelector("textarea").value = entryField + event.target.innerText;
      } else if (Shift === '1') {
         Shift = '0';
         document.querySelector("textarea").value = entryField + event.target.innerText;
      }
   }
}

document.addEventListener('keydown', function(event) {
   addActiveClass(event.code);
   textarea.focus();

   if(event.shiftKey === true) {
         Shift = '1';
         keysUpFunc();
   }

   if(event.code === "AltLeft") flag = true;
   if(event.code === "ShiftLeft" && flag) {
      flag = false;

      if(lang === 'en') {
         lang = 'ru';
         changeRusLang();

      } else if (lang === 'ru') {
         lang = 'en';
        changeEngLang();
      }
   }

   if(event.code === "CapsLock") {
         if (CapsLock === "0") {
            CapsLock = "1";
         } else if(CapsLock === "1") {
            CapsLock = "0";
         }
      }
});


document.addEventListener('keyup', function(event) {
   deleteActiveClass();

   if(event.shiftKey === false) {
      Shift = '0';
      keysDownFunc();
   }
});

document.addEventListener('mousedown', function (event) {
   addActiveClass(event.target.dataset.code);
},true);


document.addEventListener('mousedown', function (event) {
   let entryField = document.querySelector("textarea").value;
   /*
   let entryField = document.querySelector("textarea").value;
   let addValueTextBtn = function addText() {
      if(CapsLock === '0') {
         if(Shift ==='0') {
            document.querySelector("textarea").value = entryField + event.target.innerText;

           // console.log(event.target.innerText);
         } 
         else if (Shift === '1') {
            Shift = '0';
            //console.log(keys[i][secondValue]);
            //console.log(entryField);
            //document.querySelector("textarea").value = entryField + keys[i][secondValue];
            document.querySelector("textarea").value = entryField + event.target.innerText;
         }
      } else if (CapsLock === '1') {
         if(Shift === '0') {
           // document.querySelector("textarea").value = entryField + keys[i][secondValue];
           document.querySelector("textarea").value = entryField + event.target.innerText;
         } else if (Shift === '1') {
            Shift = '0';
            //document.querySelector("textarea").value = entryField + keys[i][firstValue];
            document.querySelector("textarea").value = entryField + event.target.innerText;
         }
      }
   }
*/

   let addValueNumberBtn = function addValueNumberBtn(firstValue, secondValue, i) {
      if (Shift === '0') {
         document.querySelector("textarea").value = entryField + keys[i][firstValue];
      } else if (Shift === '1') {
         Shift = '0';
         document.querySelector("textarea").value = entryField + keys[i][secondValue];
      }
   }


   if (event.target.dataset.code === "Backspace") {
      let startCursor = document.querySelector("textarea").selectionStart;
      document.querySelector("textarea").value = entryField.slice(0, startCursor - 1);
   }



   if (event.target.dataset.code === "CapsLock") {
      if (CapsLock === "0") {
         CapsLock = "1";
         keysUpFunc();

      } else if (CapsLock === "1") {
         CapsLock = "0";
         keysDownFunc();
      }
   }

   if (event.target.dataset.code === "ShiftLeft" ||
       event.target.dataset.code === "ShiftRight") {
      console.log(event.target.dataset.code);
      keysUpFunc();

      if (Shift === '0') {
         Shift = '1';
      } else if (Shift === '1') {
         Shift = '0';
      }
   }

   if (event.target.dataset.code === "Space") {
      document.querySelector("textarea").value = entryField + " ";
   }

   if (event.target.dataset.code === "Enter") {
      document.querySelector("textarea").value = entryField + "\n";
   }

   if (event.target.dataset.code === "Tab") {
      document.querySelector("textarea").value = entryField + "    ";
   }

   if (event.target.dataset.code === "Delete") {
      document.querySelector("textarea").value = "";
   }

   if(event.target.dataset.code === "AltLeft") flag = true;
   if(event.target.dataset.code === "ShiftLeft" && flag) {
      flag = false;
      if(lang === 'en') {
         lang = 'ru';
         changeRusLang();

      } else if (lang === 'ru') {
         lang = 'en';
         changeEngLang();
      }
   }

   if(event.target.dataset.type === "letter") {
      for(let i = 0; i < keys.length; i++) {
         if (event.target.dataset.code === keys[i]['code']) {

            if(lang === 'en') {
               addValueTextBtn(entryField, event);
            } else if (lang === 'ru') {
               addValueTextBtn(entryField, event);
            }
         }
      }
   }


   if(event.target.dataset.type === "number") {
      for(let i = 0; i < keys.length; i++) {
         if (event.target.dataset.code === keys[i]['code']) {
            if(lang === 'en') {
               addValueNumberBtn('value', 'valueShift', i);
         } else if (lang === 'ru') {
               addValueNumberBtn('valueRu', 'valueShiftRu', i);
            }
         }
      }
   }
});


document.addEventListener('mouseup', function (event) {

   deleteActiveClass();
   if (event.target.dataset.code === "ShiftLeft" ||
       event.target.dataset.code === "ShiftRight") {
      keysDownFunc();
   }
});




