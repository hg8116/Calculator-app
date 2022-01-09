const calculator = document.querySelector(".calculator")
const keys = document.querySelector(".keypad")
const display = document.querySelector(".display")

// Theme Setter
const themesetter = document.querySelector("#themesetter")
const toggleBtn = document.querySelector(".toggle-btn")

toggleBtn.addEventListener("click", (event) =>{
    if(event.target.getAttribute('id') === "theme1"){
        themesetter.setAttribute('href', 'css/theme1.css')
    }
    else if(event.target.getAttribute('id') === "theme2"){
        themesetter.setAttribute('href', 'css/theme2.css')
    }
    else if(event.target.getAttribute('id') === "theme3"){
        themesetter.setAttribute('href', 'css/theme3.css')
    }
})

// Calculator Working
keys.addEventListener("click", (event)=>{
    const key = event.target
    const keyValue = key.textContent
    const displayValue = display.textContent
    const {type} = key.dataset
    const {previousKeyType} = calculator.dataset

    if(!key.closest(".btn")) return
    
    if(type === "number"){
        if(displayValue === "0" || previousKeyType === "operator"){
            display.textContent = keyValue
        }
        else{
            display.textContent = displayValue + keyValue 
        }
    }
    if(type === "operator"){
        const operatorKeys = document.querySelectorAll('[data-type="operator"]')
        operatorKeys.forEach(el=>{el.dataset.state = ""})
        key.dataset.state = "selected"
        calculator.dataset.firstNumber = displayValue
        calculator.dataset.operator = key.dataset.key
    }
    if(type === "equals"){
        const firstNumber = calculator.dataset.firstNumber
        const operator = calculator.dataset.operator
        const secondNumber = displayValue
        if(firstNumber && operator && secondNumber){
            display.textContent = calculate(firstNumber, operator, secondNumber)
        }
    }
    if(type === "delete"){
        display.textContent = parseInt(parseFloat(display.textContent)/10)
    }
    if(type === "reset"){
        display.textContent = "0"
        delete calculator.dataset.firstNumber
        delete calculator.dataset.operator
    }

    calculator.dataset.previousKeyType = type
})

function calculate(firstNumber, operator, secondNumber){
    firstNumber = parseFloat(firstNumber)
    secondNumber = parseFloat(secondNumber)

    if(operator === "plus") return firstNumber + secondNumber
    if(operator === "minus") return firstNumber - secondNumber
    if(operator === "times") return firstNumber * secondNumber
    if(operator === "divide") return firstNumber / secondNumber
}

