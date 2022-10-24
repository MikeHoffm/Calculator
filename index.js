// Create empty variables to store number, & operator values into
// Create an empty array to concat multiple number presses into one value
// Set operator & equal to false to start with

    let numbers1 = [];
    let numbers2 = [];

    let operator = "";
    let a = '';
    let b = '';
    let opSum = '';

    let opPressed = false;
    let equalPressed = false;

    let on = false;

    let clacDisplay = document.querySelector('.display');
    clacDisplay.textContent = "";


//Sounds from Zapsplat.com
    const click1 = new Audio('sounds/press1.mp3');
    const click2 = new Audio('sounds/press2.mp3');
    const click3 = new Audio('sounds/press3.mp3');
    const click4 = new Audio('sounds/press4.mp3');


//OFF/ON

    let offButton = document.querySelector('.off');
        offButton.addEventListener('click', function(){
            if (on === true) {
                click3.play();
                clear();
                clacDisplay.textContent = '';
                return (on = false);
        }})


    let onButton = document.querySelector('.on');
        onButton.addEventListener('click', function(){
            click4.play();
            (on = true);
            clear();
            return;
        })


// Functionality to select & store number values

    function numberSelected() {

        //If calc is off, does not operate
        if (on === false) {
            clacDisplay.textContent = '';
        } else {

        let value = this.textContent;
        click1.play();

        // if an operator hasnt been selected add subsequent number pressed into singular value
        // ex: 1 → 2 → 3, returns a value of 123
        if (opPressed === false) {
            numbers1.push(value);

                let num1Length = numbers1.length;
                if (num1Length > 9) {
                   return numbers1 = numbers1.slice(0,8);
                }
        
            let valueJoined1 = numbers1.join('');

            console.log(numbers1);
            console.log("Value 1 is " + valueJoined1);

            clacDisplay.textContent = +(valueJoined1);
             (a = +(valueJoined1));
             return;
        } 

// if an operator HAS been selected but EQUALS hasnt,
//perform same functionality as above
// or if we have performed the operation already and hit equals button save 
// next value entered as value 2

//  Limit 9 character entry

    if (opPressed === true && equalPressed === false || opSum != '') {
        numbers2.push(value);

        let num2Length = numbers2.length;
        if (num2Length > 9) {
           return numbers2 = numbers2.slice(0,8);
        }

        console.log(numbers2);
        let valueJoined2 = numbers2.join('');
        console.log("Value 2 is " + valueJoined2);
        console.log(numbers2);

        clacDisplay.textContent = Number(valueJoined2);
        return (b = Number(valueJoined2));   
}}
};

//Add above functionality to all number buttons 
// forEach array method to add to every item with same class

    let allNums = document.querySelectorAll('.num-box');

    allNums.forEach(function(number) {
        number.addEventListener('click', numberSelected);
    });


//Function to string together multiple number, & operators & evaluate them properly
    function multipleCalc () {
        if (opPressed === true && equalPressed === false) {
            operates(operator, a, b);
            numbers1=[];
            numbers2=[];
            b = '';
            clacDisplay.textContent = opSum;
            return (a = opSum);
        }}


//When button is pressed set opPressed value to true & return the operator value
//Set conditions for if this is the first, or second press of an operator ex: (12 + 7) or (12 + 7 * 3)
    
    function getOperator(){

        //If calc is off, does not operate
        if (on === false) {
            clacDisplay.textContent = '';
        } else {

        click2.play();
        opPressed = true;
        let operator2 = '';

                if (opPressed === true && equalPressed === false
                    && a!=='' && b === ''){
                console.log("operator1 is " + this.textContent)
                operator = this.textContent;
                return operator;
                    }
            
                else if (opPressed === true && equalPressed === false 
                    && a !== '' && b!== ''){
                        console.log("operator2 is" + this.textContent)
                        operator2 = this.textContent
                        multipleCalc();
                        operator = operator2;
                        operator2 = '';
                        return
                } 
            }}

//Add functionality to all operator buttons with forEach

    let allOp = document.querySelectorAll('.op-box');

    allOp.forEach(function(operator) {
        operator.addEventListener('click', getOperator);
    });


//When equals is pressed set equalPressed value to true
//so that we can check if its been activated

// ROUND ANSWERS W/LONG DECIMALS TO NOT OVERFLOW SCREEN
// Math.round(opSum * 100)/100 returns opSum to closest 2nd decimal
// Number.EPSILON will then round that decimal either up or down properly

//Call operates function
//clear out our arrays for our previous entered numValues
// set a to equal the outcome of our equation (opSum)

    let equalButton = document.querySelector('.equal');
    equalButton.addEventListener('click', function() {

        if (on === false) {
            clacDisplay.textContent = '';
        } else {

        click4.play();
        equalPressed = true;
        console.log("equals was pressed " + equalPressed);

        
        operates(operator, a , b);
        console.log(a + " " + operator + " " + b + " = " + opSum);

        equalPressed = false;
        numbers1 = [];
        numbers2 = [];
        operator = '';
        operator2= '';

        let opString = opSum.toString();
        console.log(opString);
        let opLength = opString.length;
        console.log(opLength);

        
        if (Number.isInteger(opSum) === false ){
             opSum = Math.round((opSum + Number.EPSILON) *100) / 100
         } else if (opLength > 9) {
             opSum = opSum.toExponential(3)
     }
        console.log(opSum);

        clacDisplay.textContent = opSum;
        return (a = opSum);
    }});


// Operate function, based on operator value returned perform an operation w/ number values 

    function operates(operator, a , b){
        if (operator === "+") {
        opSum = (a + b);
        return (opSum);

        } else if (operator === "-") {
            opSum = (a - b);
            return (opSum);

        } else if (operator === "x") {
            opSum = (a * b);
            return (opSum);

        } else if ((operator === "/" && a != '' && b === 0) ||
                (operator === "/" && a === 0 && b === 0)) {
            opSum = "undefined";
            return (opSum);
        }

        // if user presses = before chosing operator, return current value
        else if (operator === "" && equalPressed === true) {
            opSum = (a);
            return (opSum);
        }

        else if (operator === "/"){
            opSum = (a / b);
            return (opSum);
        }};


// if opSum is not empty, then store it inside variable a
// this allows us to further operate w/current sum

    if (opSum != ""){
        a = addSum;
    }


// Clear calculator and all previously saved values

    let clearButton = document.querySelector('.clear');

    function clear(){
        if (on === true) {
        let clearPressed = true;
        opPressed = false;
        equalPressed = false;

        numbers1 = [];
        numbers2 = [];
        num1Length = '';
        num2Length = '';
        a = "";
        b = "";
        operator = '';
        operator2 = '';
        opLength = '';
        opString = '';


        console.log(numbers2 && numbers2);

        clacDisplay.textContent = "0";
        return (clearPressed);
    }}

    clearButton.addEventListener('click', clear);

