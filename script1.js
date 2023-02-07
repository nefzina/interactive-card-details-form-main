
const err1 = "Can't be blank"
const err2 = "Wrong format, numbers only"
const err3 = "Invalid number"

const Cardholder = document.getElementById("fullName")
let number = document.getElementById("cardNumber")
const month = document.getElementById("month")
const year = document.getElementById("year")
const code = document.getElementById("cvc")
const confirm = document.getElementById("confirm")
const inputForm = document.getElementById("form")


// displaying input info on the faces of the card 

Cardholder.addEventListener("keyup", function(){
    //e.target.value = e.target.value.replace(/[\d]/g, '').trim();
    document.getElementById("egName").innerHTML = this.value
})
number.addEventListener("keyup", function(e){
    //e.target.value = e.target.value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim();
    e.target.value = e.target.value.replace(/[\s]/g, '').replace(/(.{4})/g, '$1 ').trim()
    document.getElementById("egNumber").innerHTML = this.value 
})
month.addEventListener("keyup", function(e){
    //e.target.value = e.target.value.replace(/[^\d]/g, '').trim();
    document.getElementById("m").innerHTML = this.value
})
year.addEventListener("keyup", function(e){
    //e.target.value = e.target.value.replace(/[^\d]/g, '').trim();
    document.getElementById("y").innerHTML = this.value
})
code.addEventListener("keyup", function(e){
    //e.target.value = e.target.value.replace(/[^\d]/g, '').trim();
    document.getElementById("egCode").innerHTML = this.value
})



// validate input data when clicking out of the input box

Cardholder.addEventListener("blur", validateData);
number.addEventListener("blur", validateData);
month.addEventListener("blur", validateData);
year.addEventListener("blur", validateData);
code.addEventListener("blur", validateData);

function validateData() {
    const value = this.value.trim()
    let yr = new Date()
    const mois = new Date()
    yr = yr.getFullYear().toString().slice(2,4)

    if (this.id === "fullName") {
        if (this.value.trim() === "") {errorstate(err1, Cardholder)}
        else if (this.value.match(/\d+/g)) {errorstate("Wrong format, letters only", Cardholder)}
        else {successState(Cardholder)}
    }
    if (this.id === "cardNumber") {
        const nb = this.value.replaceAll(" ", "")
        if(nb === ""){ errorstate(err1, number);}
        else if (/\D/g.test(nb)) { errorstate(err2, number);}
        else if (nb.length < 16) { errorstate("Number has less than 16 digits", number);}
        //else if (nb.match(/[\d+]/g)){ errorstate(err2, number);}
        else {successState(number)}
    }
    if (this.id === "month") {
        if (this.value.length === 1) { 
            this.value = "0" + this.value
            document.getElementById("m").innerHTML = this.value
        }
        
        if(this.value === ""){ errorstate(err1, month);}
        else if (this.value > 12 || this.value < 1) {errorstate(err3, month)}
        else if (this.value.match(/[^\d]/g)) {errorstate(err2, month)}
        else if (year.value !== "") {
            if ((year.value === yr && this.value < mois.getMonth()+1)) {errorstate(err3, month), errorstate(err3, year)}
            else if (year.classList.contains("fail")) { successState(month), validateData.call(year)}
            else { successState(month), successState(year)}
        }
        else {successState(month)}
    }
    if (this.id === "year") {
        if(this.value === ""){ errorstate(err1, year);}
        else if (this.value.match(/[\D]/g)) {errorstate(err2, year)}
        else if (this.value < yr) {errorstate(err3, year)}
        else if (month.value !== "") {
            if ((this.value === yr && month.value < mois.getMonth()+1)) {errorstate(err3, year), errorstate(err3, month)}
            else if (month.classList.contains("fail")) { successState(year), validateData.call(month)}
            else { successState(month), successState(year)}
        }
        else {successState(year)}
    }
    if (this.id === "cvc") {
        if(this.value === ""){ errorstate(err1, code)}
        else if (this.value.match(/[^\d]/g)) {errorstate(err2, code)}
        else if (this.value.length < 3) {errorstate("Number has less than 3 digits", code)}
        else {successState(code)}
    }
}


// define the style, elements related to error or success of the form

function errorstate(msg, element) {
    element.style.border = "1px solid #df1313";
    const parent = element.parentElement;
    parent.querySelector(".error").innerHTML = msg;
    parent.querySelector(".error").style.color = "#df1313";
    element.classList.add("fail")
    element.classList.remove("success")
}

function successState(element) {
    element.style.border = "1px solid hsl(270, 3%, 87%)"
    const parent = element.parentElement
    parent.querySelector(".error").innerHTML = ""
    element.classList.add("success")
    element.classList.remove("fail")
}

inputForm.addEventListener("submit", function(e){
const elementsId = [Cardholder, number, month, year, code]
e.preventDefault()
for(let i of elementsId){ validateData.call(i)}

    if (Cardholder.classList.contains("success") && number.classList.contains("success") &&
    month.classList.contains("success") && year.classList.contains("success") &&
    code.classList.contains("success")) {
        inputForm.style.display = "none"
        document.getElementsByClassName("confirmation")[0].style.display = "flex"
    }
})

const completeState = document.getElementsByClassName("confirmation")[0]
completeState.addEventListener("submit", function(){
    window.location.reload()
})