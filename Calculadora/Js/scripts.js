const previousOperationText = document.querySelector('#previous-operation');
const currentOperationText = document.querySelector('#current-operation');
const buttons = document.querySelectorAll('#buttons-container button'); 

class Calculator {
    constructor(previousOperationText, currentOperationText ) {
       this.previousOperationText = previousOperationText;
       this.currentOperationText = currentOperationText;
       this.currentOperation = "" ;
    }
    //add digit to calculaor screen
    addDigit(digit) {
     // check if current operation already has a dot
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }
        
        this.currentOperation = digit;
        this.updateScreen()
    }
    // process all calculator operation
    processOperation(operation){
        //check if current value is empty
        if(currentOperationText.innerText === "" && operation !== "C") {
            //change operation
            if(this.previousOperationText.innerText !== "" ) {
                this.changeOperation(operation);
            }
            return;
        }

        //get current and previous value
        let operationValue
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText

        switch(operation) {
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous);
                break;    
            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous);
                break;   
            case "DEL":
                this.processDelOperator();
                break;      
            case "CE":
                this.processClearCurrentOperation();
                break;    
            case "C":
                this.processClearOperation();
                break;      
             case "=":
                this.processEqualOperation();
                break;      
            default:
                return;
        }
    }

    // change values of calculator screen
    updateScreen(
        operationValue = null, 
        operation = null, 
        current = null, 
        previous = null 
    ) {
        console.log(operationValue, operation,current, previous);

        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        }else {
            //check if value is zero, if it is just add current value
            if(previous === 0) {
                operationValue = current 
            }
            // Add current value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";
        }
     }

    // change math operation
    changeOperation(operation) {
        const mathOperations  = ["*","/","+","","-"]

        if (!mathOperations.includes(operation)) {
            return 
        }

        this.previousOperationText.innerText = 
        this.previousOperationText.innerText.slice (0, -1) + operation;
    }  
    // delete the last digit
    processDelOperator() {
        this.currentOperationText.innerText = 
        this.currentOperationText.innerText.slice(0, -1)
    }
    //Clear Current Operation
    processClearCurrentOperation( ) {
        this.currentOperationText.innerText = "";
    }
    //Clear all operations
    processClearOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }
    //Process an operation
    processEqualOperation() {
        const operation = previousOperationText.innerText.split(" ")[1]

        this.processOperation(operation);
    }
}

const calc = new Calculator (previousOperationText, currentOperationText);

buttons.forEach ((btn) => {
    btn.addEventListener("click", (e) =>{
        const value = e.target.innerText;
        
        if(+value >=0 || value === ".") {
           calc.addDigit(value)
        } else {
            calc.processOperation(value)
        }
    })
})