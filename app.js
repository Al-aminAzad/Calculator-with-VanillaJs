class Calculator {
    constructor(previousText, currentText) {
        this.previousText = previousText;
        this.currentText = currentText;
        this.clear();
    }

    clear() {
        this.previousOparand = '';
        this.currentOparand = '';
        this.oparation = undefined;

    }
    delete() {
        this.currentOparand = this.currentOparand.toString().slice(0, -1);
    }
    appendNumber(number) {
        if (number === '.' && this.currentOparand.includes('.')) return
        this.currentOparand = this.currentOparand.toString() + number.toString();
    }
    chooseOparation(oparation) {
        if (this.currentOparand === '') return
        if (this.previousOparand !== '') {
            this.compute();
        }
        this.oparation = oparation;
        this.previousOparand = this.currentOparand;
        this.currentOparand = ''

    }
    compute() {
        let computation;
        const prev = parseFloat(this.previousOparand);
        const current = parseFloat(this.currentOparand);
        if (isNaN(prev) || isNaN(current)) return
        switch (this.oparation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return
        }
        this.currentOparand = computation;
        this.oparation = undefined;
        this.previousOparand = '';
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        // const floatNumber = parseFloat(number);
        // if(isNaN(floatNumber)) return '';
        // return floatNumber.toLocaleString('en');
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay =
                integerDigits.toLocaleString('en', {
                    maximumFractionDigits: 0
                })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }
    updateDisplay() {
        //console.log(`current = ${this.currentOparand}`);
        this.currentText.innerText =
            this.getDisplayNumber(this.currentOparand);
        //console.log(`Previous=  ${this.previousOparand}`);
        if (this.oparation != null) {
            this.previousText.innerText =
                `${this.getDisplayNumber(this.previousOparand)} ${this.oparation}`;
        } else {
            this.previousText.innerText = '';
        }

    }
}

const numberButton = document.querySelectorAll('[data-number]');
const oparationButtons = document.querySelectorAll('[data-oparand]');
const acButton = document.querySelector('[data-all-clear]');
const dltButton = document.querySelector('[data-delete]');
const eqlButton = document.querySelector('[data-equals]');
const previousText = document.querySelector('[data-previous-oparand]');
const currentText = document.querySelector('[data-current-oparand');

const calculator = new Calculator(previousText, currentText);

numberButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

oparationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOparation(button.innerText);
        //console.log(button.innerText);
        calculator.updateDisplay();
    })
})
eqlButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})
acButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

dltButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})