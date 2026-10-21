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
const customerDetails = document.querySelector(`.user-details`)
const bookingDate = document.querySelector(`#booking-date`)
let expDuration
let expCost
let chosenDate
let chosenTime
let customerName
let customerEmail
const storeBooking = []

const expList = [
    {
        eId: `vr`,
        eTitle: `VR`,
        eHourPrice: `169`,
        eDescription: `Stig in i den virtuella världen med Virtual Reality och upplev de magiska under vi kallar vr-spel. Skär dig igenom BEATSABER, bestrida dina kompis i LAZERTAG eller svinga dig linjaner som Tarzan i GORILLA TAG.`
    },
    {
        eId: `arcade`,
        eTitle: `ARKAD`,
        eHourPrice: `149`,
        eDescription: `Upplev gaming som det var på 70- och 80-talet. Vår spelhall har över 200 olika cabinetter, med allt från gamla klassiker såsom STREET FIGHTER till moderna spel såsom CYBERPUNK 2077: Turf Wars. Finns även massor av flipper- och rytmspel.`
    },
    {
        eId: `internetCafe`,
        eTitle: `INTERNETCAFÉ`,
        eHourPrice: `99`,
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


function convertDate() {
    if (bookingDate.value) {
        chosenDate = new Date(bookingDate.value)
        const day = chosenDate.getDate()
        const month = chosenDate.toLocaleDateString(`default`, { month: `long` })
        if ([1, 2, 21, 22, 31].includes(day)) {
            return "Den " + day + ":a " + month
        } else {
            return "Den " + day + ":e " + month + ""
        }
    }
}


function printExperience() {
    expContainer.innerHTML = expList.map(createExperience).join("")
}


function printTime() {
    timeSelect.innerHTML = 
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


function printDetails() {
    customerDetails.innerHTML = `
    <span id="booking-name">Namn: ${customerName}</span>
    <span id="booking-email">E-mail adress: ${customerEmail}</span>
    <span id="booking-">Datum och tid: ${convertDate(chosenDate)} ${addKl(chosenTime)}</span>
    
    `
}


function resetForm() {
    bookingForm.reset()
}

function toggleAriaPressed(event) {
    const selected = event.target.closest(`.experience`)

    for (const experiences of expContainer.children) {
        if (selected === experiences) {
            experiences.ariaPressed = `true`
            resetForm()
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

printExperience()
printTime()


function saveSelectedTime(selected) {
    chosenTime = selected
}


// Event Listeners ------------------------------------->

inputField.forEach(input => {
    let formGroup = input.closest(`.form-group`)
    if (!formGroup) return
    input.addEventListener(`input`, () => {
    formGroup.classList.toggle(`input-detected`, !!input.value)})
    input.addEventListener(`change`, () => {
    formGroup.classList.toggle(`input-detected`, !!input.value)})
})

expContainer.addEventListener(`click`, toggleAriaPressed)


descBtn.addEventListener(`click`, event => {
    FormContainer.classList.add(`form-visible`)
})


bookingDate.addEventListener(`click`, () => {
    bookingDate.showPicker()
})


timeSelect.addEventListener(`click`, event => {
    const selected = event.target.closest(`.time`)    
    if (selected) saveSelectedTime(selected)
    printDetails()
    

    for (const time of timeSelect.children) {
        if (selected === time) {
            time.ariaPressed = `true`
        }
        else if (selected != null) { 
            time.ariaPressed = `false`
        }
    }
    }
)


clearForm.addEventListener(`click`, event => {
    event.preventDefault()
    bookingForm.reset()
    let formGroup = document.querySelectorAll(`.form-group`)
    formGroup.forEach(input => {
        console.log(input.type)
        if (input.classList.contains(`input-detected`) && !input.classList.contains(`customer-date`))
            input.classList.toggle(`input-detected`)
    })
    for (const time of timeSelect.children) {
        if (time.ariaPressed === `true`) time.ariaPressed = `false`
    }
})

