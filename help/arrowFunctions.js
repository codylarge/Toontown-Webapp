
//Basic functions
function sum(a,b){
    return a + b;
}

let sum2 = (a,b) => {
    return a + b;
}

function isPositive(num){
    return number >= 0
}

let isPositive2 = number => number >= 0

function randomNumber(){
    return Math.random
}
let randomNumber2 = () => {
    return Math.random;
}
let randomNumber3 = () => Math.random;

//Anonymous functions
document.addEventListener('click', function() {
    console.log('Click')
})

document.addEventListener('click', () => console.log('Click'))


// 'this' keyword within arrow function
class Person{
    constructor(name){
        this.name = name
    }

    printNameArrow(){ // print how name of person after 100ms delay
        setTimeout(() => {
            console.log('Arrow: ' + this.name)
        }, 100)
    }

    printNameFunction(){ 
        setTimeout(function() {
            console.log('Function: ' + this.name)
        }, 100)
    }
}

let person = new Person('Bob')
person.printNameArrow() // takes 'this' value in original functions scope therefore writes as expected
person.printNameFunction() // takes 'this' value of current scope(global) therefore writes nothing

