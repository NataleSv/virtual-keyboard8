import {FunctionalButtons} from "./FunctionalButtons";


export class SimpleButtons extends FunctionalButtons{
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