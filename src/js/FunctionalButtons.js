export class FunctionalButtons {
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
