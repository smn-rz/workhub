const experiences = document.querySelector(`.experiences`);
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
        eStandardPrice: `169`,
        eDescription: `Stig in i den virtuella världen och upplev de magiska under vi kallar vr-spel. Skär dig igenom BEATSABER, äg dina kompis på LAZERTAG eller svinga dig från linjan till linjan som Tarzan i GORILLA TAG.`,
        eInputId: `vr-input`,
        eInputClass: `exp-input`
    },
    {
        eId: `arcade`,
        eTitle: `ARKAD`,
        eStandardPrice: `149`,
        eDescription: `` + eStandardPrice + `` + `Upplev gaming som det var på 70- och 80-talet. Vår spelhall har över 200 olika cabinetter, med allt från gamla klassiker såsom STREET FIGHTER och DONKEY KONG till moderna spel såsom CYBERPUNK 2077: Turf Wars och MAIMAI DX. Vi har även tre dussin pinball maskiner, samt en hel avdelning för de yngre.`,
        eInputId: `arcade-input`,
        eInputClass: `exp-input`
    },
    {
        eId: `internetCafe`,
        eTitle: `INTERNETCAFÉ`,
        eStandardPrice: `129`,
        eDescription: ``,
        eInputId: `pc-cafe-input`,
        eInputClass: `exp-input`
    },
];

function createExperience(id, name, price, description) {
    expList.forEach(element => {
        experiences.innerHTML = `
            
        `
    });
}