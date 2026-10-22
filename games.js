const expContainer = document.querySelector(`#experiences-card`);
const expDescContainer = document.querySelector(`.experience-desc-container`)
const expDesc = document.querySelector(`#experience-desc`)
const exp = document.querySelector(`.experience`)
const descBtn = document.querySelector(`#desc-btn`)
const FormContainer = document.querySelector(`#games-form`)
const bookingForm = document.querySelector(`#booking-form`)
const inputField = document.querySelectorAll(`.input-field`)
const timeSelect = document.querySelector(`.time-select`)
const clearForm = document.querySelector(`#clear-form`)
const submitForm = document.querySelector(`#submit-form`)
const bookingDetails = document.querySelector(`.booking-details`)
const customerDetails = document.querySelector(`.customer-details`)
const inputDate = document.querySelector(`#input-date`)
const inputAmount = document.querySelector(`#input-amount`)
const inputDuration = document.querySelector(`#input-duration`)
const inputName = document.querySelector(`#input-name`)
const inputEmail = document.querySelector(`#input-email`)
const finalizeBooking = document.querySelector(`#finalize-booking`)
let recheckDetails
let chosenDate
let savedTime
let chosenExp
let formValidation = {
    hasAmount : false,
    hasDuration : false,
    hasValidDate : false,
    hasValidTime : false,
    hasValidName : false,
    hasValidEmail : false
}

const expList = [
    {
        eId: `vr`,
        eTitle: `VR`,
        eHourPrice: 169,
        eDescription: `Stig in i den virtuella världen med Virtual Reality och upplev de magiska under vi kallar vr-spel. Skär dig igenom BEATSABER, bestrida dina kompis i LAZERTAG eller svinga dig linjaner som Tarzan i GORILLA TAG.`
    },
    {
        eId: `arcade`,
        eTitle: `ARKAD`,
        eHourPrice: 149,
        eDescription: `Upplev gaming som det var på 70- och 80-talet. Vår spelhall har över 200 olika cabinetter, med allt från gamla klassiker såsom STREET FIGHTER till moderna spel såsom CYBERPUNK 2077: Turf Wars. Finns även massor av flipper- och rytmspel.`
    },
    {
        eId: `internetCafe`,
        eTitle: `INTERNETCAFÉ`,
        eHourPrice: 99,
        eDescription: `Ett café med tillgång till top-of-the-line datorer byggda för de nyaste spel så du kan lan:a med kompiser eller spela solo. Mus, skräm, tangentbord och headset medkommer, eget gear kan tas med. Mat, dryck, snacks och vilorum tillkommer.`
    },
]


function createExperience(expList) {
    return `
        <button type="button" aria-pressed="false" class="experience card-bg" id="${expList.eId}">
            <h2>
                ${expList.eTitle}
            </h2>
            <span class="price">
                ${addKr(expList.eHourPrice)}
                <span class="perPrice"> / person / timme. </span>
            </span>
         </button>
    `
}


function addKr(amount) {
    return amount + " kr"
}


function addKl(time) {
    return "kl. " + time
}


function printExperience() {
    expContainer.innerHTML = expList.map(createExperience).join("")
}


function printTime() {
    timeSelect.innerHTML +=
        `<span class="time" aria-pressed="false">10:00</span>
    <span class="time" aria-pressed="false">10:30</span>
    <span class="time" aria-pressed="false">11:00</span>
    <span class="time" aria-pressed="false">11:30</span>
    <span class="time" aria-pressed="false">12:00</span>
    <span class="time" aria-pressed="false">12:30</span>
    <span class="time" aria-pressed="false">13:00</span>
    <span class="time" aria-pressed="false">13:30</span>
    <span class="time" aria-pressed="false">14:00</span>
    <span class="time" aria-pressed="false">14:30</span>
    <span class="time" aria-pressed="false">15:00</span>
    <span class="time" aria-pressed="false">15:30</span>
    <span class="time" aria-pressed="false">16:00</span>
    <span class="time" aria-pressed="false">16:30</span>
    <span class="time" aria-pressed="false">17:00</span>`
}


function printDetails(storeBooking = {}) {
    customerDetails.innerHTML = `
    <div class="detail-group">
        <p>SPELUPPLEVELSE</p>
        <span id="chosen-exp">${storeBooking.chosenExp}</span>
    </div>

    <div class="detail-group">
        <p>DATUM</p>
        <span id="booking-date">${convertDate(storeBooking.chosenDate)} ${addKl(storeBooking.chosenTime)}</span>
    </div>

    <div class="detail-group">
        <p>BESÖKARE</p>
        <span id="booking-amount">${storeBooking.expAmount} st</span>
    </div>

    <div class="detail-group">
        <p>TIMMAR</p>
        <span id="booking-duration">${storeBooking.expDuration} tim</span>
    </div>

    <div class="detail-group">
        <p>NAMN</p>
        <span id="booking-name">${storeBooking.customerName}</span>
    </div>

    <div class="detail-group">
        <p>E-MAIL</p>
        <span id="booking-email">${storeBooking.customerEmail}</span>
    </div>  
    
    <div class="detail-group">
        <p>TOTALT</p>
        <span>${addKr(storeBooking.expCost)}
    `
}


function setError(input, text) {
    if (input === timeSelect) {
        input.classList.add(`error`)
        const errorText = input.querySelector(`.time-not-valid`)
        errorText.innerText = text
    } else {
        const parent = input.parentElement
        parent.classList.add(`error`)
    
        const errorText = parent.querySelector(`.not-valid`)
        errorText.innerText = text
    }
}


function removeError(input) {
    if (input === timeSelect) {
        input.classList.remove(`error`)
    } else {
        const parent = input.parentElement
        parent.classList.remove(`error`)
    }
}


function validateForm() {
    const amountPCL = inputAmount.parentElement.classList
    const durationPCL = inputDuration.parentElement.classList
    const validPattern = /^[A-Za-z0-9._+'!=#$&*-]{2,}@[A-Za-z0-9-]+\.[A-Za-z]{1,}\.?[A-Za-z]*[^\.]+[A-Za-z]*$/

    formValidation.hasAmount = (amountPCL.contains(`input-detected`)) ? true:false

    formValidation.hasDuration = (durationPCL.contains(`input-detected`)) ? true:false

    formValidation.hasValidDate = (inputDate.value && isDatePast() === false) ? true:false

    formValidation.hasValidTime = (checkSelectedTime()) ? true:false

    formValidation.hasValidName = (inputName.value.trim() !== `` && inputName.value.length >= 2) ? true:false

    formValidation.hasValidEmail = validPattern.test(inputEmail.value)
    
    const isValid = Object.values(formValidation).every(i => i)

    Object.entries(formValidation).forEach(i => {
        if (!i[1]) {
            switch (i[0]) {
                case `hasAmount`: setError(inputAmount, `Du måste välja antal besökare`)
                case `hasDuration`: setError(inputDuration, `Du måste välja antal timmar`)
                case `hasValidDate`: setError(inputDate, `Du måste välja ett giltigt datum`)
                case `hasValidTime`: setError(timeSelect, `Du måste välja en tid`)
                case `hasValidName`: {
                    if (inputName.value.trim() == ``) {
                        setError(inputName, `Du måste skriva ett namn`)
                    } else {
                        setError(inputName, `Namnet måste vara minst 2 bokstäver`)
                    }
                }
                case `hasValidEmail`: setError(inputEmail, `Du måste skriva en giltig e-mailadress`)
            }
        } else if (i[1]) {
            switch (i[0]) {
                case `hasAmount`: removeError(inputAmount)
                case `hasDuration`: removeError(inputDuration)
                case `hasValidDate`: removeError(inputDate)
                case `hasValidTime`: removeError(timeSelect)
                case `hasValidName`: removeError(inputName)
                case `hasValidEmail`: removeError(inputEmail)
            }
        }
    })

    return isValid
}


function isDatePast() {
    const selectedDate = new Date(inputDate.value)
    const now = new Date()
    if (selectedDate < now) {
        return true
    } else {
        return false
    }
}


function extractCustomerDetails() {
    storeBooking = {
        expAmount : inputAmount.value,
        expDuration : inputDuration.value,
        customerName : inputName.value.toUpperCase(),
        customerEmail : inputEmail.value.toUpperCase(),
        chosenDate : convertDate(),
        chosenTime : checkSelectedTime().textContent,
        chosenExp : checkSelectedExp().eTitle,
        expCost : calcCost(inputAmount.value, inputDuration.value)
    }
    if (storeBooking) return storeBooking
}


function convertDate() {
    if (inputDate.value) {
        chosenDate = new Date(inputDate.value)
        const day = chosenDate.getDate()
        const month = chosenDate.toLocaleDateString(`default`, { month: `long` })
        if ([1, 2, 21, 22, 31].includes(day)) {
            return "DEN " + day + ":a " + month.toUpperCase()
        } else {
            return "DEN " + day + ":e " + month.toUpperCase() + ""
        }
    }
}


function checkSelectedTime() {
    for (const time of timeSelect.children) {
        if (time.ariaPressed === `true`) {
            return time
        }
    }
}

function checkSelectedExp() {
    for (const exp of expContainer.children) {
        if (exp.ariaPressed === `true`) {
            switch (exp.id) {
                case `vr`: return expList[0]
                case `arcade`: return expList[1]
                case `internetCafe`: return expList[2]
            }
        }
    }
}

function calcCost(amount, duration) {
    const hourPrice = checkSelectedExp().eHourPrice
    const finalPrice = hourPrice * Number(amount) + hourPrice * Number(duration)

    if (finalPrice == NaN || finalPrice == null ||finalPrice == undefined) {
        return `Kunde inte räkna ut totalpriset! Prova igen.`
    } else {
        return finalPrice
    }
}


// function saveSelectedTime(selected) {
//     savedTime = selected
// }


function resetForm() {
    bookingForm.reset()
}


function toggleAriaPressed(event) {
    const selected = event.target.closest(`.experience`)

    for (const experiences of expContainer.children) {
        if (selected === experiences) {
            experiences.ariaPressed = `true`

            if (bookingDetails.classList.contains(`details-visible`) && validateForm()) {
                let storeBooking = extractCustomerDetails()
                printDetails(storeBooking)
            }
            
            switch (experiences.id) {
                case `vr`:
                    expDesc.textContent = expList[0].eDescription
                    break;
                case `arcade`:
                    expDesc.textContent = expList[1].eDescription
                    break;
                case `internetCafe`:
                    expDesc.textContent = expList[2].eDescription
                    break;
                default:
            }
            if (!expDescContainer.classList.contains(`desc-visible`)) {
                expDescContainer.classList.add(`desc-visible`)
            }
        }
        else if (selected != null) {
            experiences.ariaPressed = `false`
        }
    }
}


// Event Listeners ------------------------------------->

inputField.forEach(input => {
    let formGroup = input.closest(`.form-group`)
    if (!formGroup) return
    input.addEventListener(`input`, () => {
        formGroup.classList.toggle(`input-detected`, !!input.value)
        if (recheckDetails && validateForm()) {
            let storeBooking = extractCustomerDetails()
            printDetails(storeBooking)
        }
        
    })
    input.addEventListener(`change`, () => {
        formGroup.classList.toggle(`input-detected`, !!input.value)
        if (recheckDetails && validateForm()) {
            let storeBooking = extractCustomerDetails()
            printDetails(storeBooking)
        }
    })
})

expContainer.addEventListener(`click`, toggleAriaPressed)


descBtn.addEventListener(`click`, event => {
    FormContainer.classList.add(`form-visible`)
})


inputDate.addEventListener(`click`, () => {
    inputDate.showPicker()
})


timeSelect.addEventListener(`click`, event => {
    const selected = event.target.closest(`.time`)
    // if (selected) saveSelectedTime(selected.textContent)
    for (const time of timeSelect.children) {
        if (selected === time) {
            time.ariaPressed = `true`
            if (recheckDetails && validateForm()) {
            let storeBooking = extractCustomerDetails()
            printDetails(storeBooking)
        }
        }
        else if (selected != null) {
            time.ariaPressed = `false`
        }
    }
})


clearForm.addEventListener(`click`, event => {
    event.preventDefault()
    resetForm()
    recheckDetails = false
    if (bookingDetails.classList.contains(`details-visible`)) {
        bookingDetails.classList.remove(`details-visible`)
    }
    let formGroup = document.querySelectorAll(`.form-group`)
    formGroup.forEach(input => {
        console.log(input.type)
        if (input.classList.contains(`input-detected`) && !input.classList.contains(`input-date`))
            input.classList.toggle(`input-detected`)
    })
    for (const time of timeSelect.children) {
        if (time.ariaPressed === `true`) time.ariaPressed = `false`
    }
})


bookingForm.addEventListener(`submit`, event => {
    event.preventDefault()
    recheckDetails = true
    if (validateForm()) {
        if (!bookingDetails.classList.contains(`details-visible`)) {
            bookingDetails.classList.add(`details-visible`)
        }
        let storeBooking = extractCustomerDetails()
        printDetails(storeBooking)
        bookingDetails.scrollIntoView({ behavior: `smooth` })
    }
})


finalizeBooking.addEventListener(`click`, event => {
    bookingDetails.querySelector(`.review-booking`).innerHTML = `
    <div class="thank-you">Tack, vi ses då!</div>
    `
    FormContainer.classList.remove(`form-visible`)
    expDescContainer.classList.remove(`desc-visible`)
    expContainer.innerHTML = ``
})


printExperience()
printTime()
printDetails()

