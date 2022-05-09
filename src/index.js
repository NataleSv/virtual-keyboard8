import keys from './data/keys.json';

import {SimpleButtons} from "./js/SimpleButtons";
import {FunctionalButtons} from "./js/FunctionalButtons";

let body = document.body;
let wrapper = document.createElement('div');
wrapper.classList.add('wrapper');
body.append(wrapper);

let warning = document.createElement('form');
warning.innerHTML = "Дорогой проверяющий, пожалуйста проверьте работу после 10 числа. Постараюсь исправить некоторые моменты в коде и в оформлении"
wrapper.append(warning);

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


//массив кнопок по классам
let keysUp = document.querySelectorAll(".keyUp");
let keysDown = document.querySelectorAll(".keyDown");
let keysUpEng = document.querySelectorAll(".keyUpEng");
let keysDownEng = document.querySelectorAll(".keyDownEng");
let keysUpRus = document.querySelectorAll(".keyUpRus");
let keysDownRus = document.querySelectorAll(".keyDownRus");
let btnSimple = document.querySelectorAll('.simpleBtn');
let arrBtn = btnSimple.length*2;



//переключатели
let CapsLock = '0';
let Shift = '0';
let lang = 'en';


//переключение языков
//let language = document.querySelector('html').lang;
let rusLang = document.getElementsByClassName("rus");
let engLang = document.getElementsByClassName("eng");
console.log(rusLang);
console.log(engLang);


if(lang === 'en') {
    for(let i = 0; i < rusLang.length; i++ ) {
        if (!document.querySelector(".eng .hidden")) {
            engLang[i].classList.remove('hidden');
        }
        if(!!document.querySelector(".rus .hidden")) {
            rusLang[i].classList.add('hidden');
        }
    }

} else if(lang === 'ru') {
    for (let i = 0; i < engLang.length; i++) {
        if (!!document.querySelector(".eng .hidden")) {
            engLang[i].classList.add('hidden');
        }
        if (!document.querySelector(".rus .hidden")) {
            rusLang[i].classList.remove('hidden');
        }
    }
}

//добавление кнопок

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

//все кнопки
let btn = document.querySelectorAll('.btn');
let flag = false;

//события клавиатуры
document.addEventListener('keydown', function(event) {
    let activeBtn = document.querySelector('#'+event.code);
    activeBtn.classList.add('active');
    textarea.focus();

    if(event.shiftKey === true && flag === false) {
        Shift = '1';
        for(let i = 0; i < arrBtn; i++) {
            keysDown[i].classList.add('hidden');
            keysUp[i].classList.remove('hidden');
        }
    }

    if(event.code === "AltLeft") flag = true;
    if(event.code === "ShiftLeft" && flag) {

        flag = false;
        if(lang === 'en') {
            lang = 'ru';

        } else if (lang === 'ru') {
            lang = 'en';
        }

        alert(lang);
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

    let activeBtn = document.querySelector('#'+event.code);
    activeBtn.classList.remove('active');

    if(event.shiftKey === false) {
        Shift = '0';
        for(let i = 0; i < arrBtn; i++) {
            keysUp[i].classList.add('hidden');
            keysDown[i].classList.remove('hidden');
        }
    }
});
