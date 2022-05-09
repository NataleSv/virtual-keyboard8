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
