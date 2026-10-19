const expContainer = document.querySelector(`#experiences-card`);
const expDescContainer = document.querySelector(`.experience-desc-container`)
const expDesc = document.querySelector(`#experience-desc`)
const exp = document.querySelector(`.experience`)
let expDuration
let expCost
let expDate
let expTime
let customerName
let customerEmail
let customerNumber
let customerAdults
let customerChildren
const storeBooking = []

const expList = [
    {
        eId: `vr`,
        eTitle: `VIRTUAL REALITY`,
        eHourPrice: `169`,
        eDescription: `Stig in i den virtuella världen och upplev de magiska under vi kallar vr-spel. Skär dig igenom BEATSABER, äg dina kompis på LAZERTAG eller svinga dig från linjan till linjan som Tarzan i GORILLA TAG.`
    },
    {
        eId: `arcade`,
        eTitle: `ARKAD`,
        eHourPrice: `149`,
        eDescription: `Upplev gaming som det var på 70- och 80-talet. Vår spelhall har över 200 olika cabinetter, med allt från gamla klassiker såsom STREET FIGHTER till moderna spel såsom CYBERPUNK 2077: Turf Wars.`
    },
    {
        eId: `internetCafe`,
        eTitle: `INTERNETCAFÉ`,
        eHourPrice: `129`,
        eDescription: ``
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

function printExperience() {
    expContainer.innerHTML = expList.map(createExperience).join("")
}

function toggleAriaPressed(event) {
    const selected = event.target.closest(".experience")

    for (const experiences of expContainer.children) {
        if (selected === experiences) {
            experiences.ariaPressed = "true"
            switch (experiences.id) {
                case "vr":
                    expDesc.textContent = expList[0].eDescription
                    break;
                case "arcade":
                    expDesc.textContent = expList[1].eDescription
                    break;
                case "internetCafe":
                    expDesc.textContent = expList[2].eDescription
                    break;
                default:
            }
            if (!expDescContainer.classList.contains(`desc-visible`)) {
                expDescContainer.classList.add(`desc-visible`)
            }
        } 
        else if (selected != null) { 
            experiences.ariaPressed = "false"
        }
    }
}


expContainer.addEventListener("click", toggleAriaPressed)

printExperience()

console.log(expDesc.textContent)