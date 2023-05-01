/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
class SimpleButtons extends FunctionalButtons {
  constructor(value, valueShift, valueRu, valueShiftRu, className, codeKey, typeBtn) {
    super(value, className, codeKey, typeBtn);
    this.valueShift = valueShift;
    this.valueRu = valueRu;
    this.valueShiftRu = valueShiftRu;
  }

  createSimpleButton() {
    const btn = document.createElement('div');
    btn.classList.add('btn');
    btn.classList.add('simpleBtn');
    btn.classList.add(this.className);

    const engBtn = document.createElement('span');
    engBtn.classList.add('eng');

    btn.append(engBtn);

    const rusBtn = document.createElement('span');
    rusBtn.classList.add('rus');
    rusBtn.classList.add('hidden');
    btn.append(rusBtn);

    const engKeydown = document.createElement('span');
    engKeydown.classList.add('keyDown');
    engKeydown.classList.add('keyDownEng');
    engKeydown.innerHTML = this.value;
    engBtn.append(engKeydown);

    const engKeyUp = document.createElement('span');
    engKeyUp.classList.add('keyUp');
    engKeyUp.classList.add('keyUpEng');
    engKeyUp.innerHTML = this.valueShift;
    engKeyUp.classList.add('hidden');
    engBtn.append(engKeyUp);

    const rusKeydown = document.createElement('span');
    rusKeydown.classList.add('keyDown');
    rusKeydown.classList.add('keyDownRus');
    rusKeydown.innerHTML = this.valueRu;
    rusBtn.append(rusKeydown);

    const rusKeyUp = document.createElement('span');
    rusKeyUp.classList.add('keyUp');
    rusKeyUp.classList.add('keyUpRus');
    rusKeyUp.innerHTML = this.valueShiftRu;
    rusKeyUp.classList.add('hidden');
    rusBtn.append(rusKeyUp);

    btn.id = this.codeKey;
    btn.setAttribute('data-code', this.codeKey);
    btn.setAttribute('data-type', this.typeBtn);
    return btn;
  }
}
