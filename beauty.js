
"use strict";

const treatmentList = document.querySelector("#treatment-list");
const selectedTreatment = document.querySelector("#selected-treatment");
const bookingQuantity = document.querySelector("#booking-quantity");

// Våra massagebehandlingar
const treatments = [
    {
        id: "facial-massage",
        name: "Ansiktsmassage",
        image: "images/ansiktsmassage.png",
        description: "En ansiktsmassage är en behandling som fokuserar på att stimulera blodcirkulationen och slappna av ansiktsmusklerna. Den kan hjälpa till att minska spänningar och ge en känsla av välbefinnande.",
        duration: 30,
        price: 500
    },
    {
        id: "swedish-massage",
        name: "Klassisk svensk massage",
        image: "images/massage.png",
        description: "En mjukgörande massage som löser upp spänningar och ger kroppen ny energi. Den kan hjälpa till att minska stress, förbättra blodcirkulationen och ge en känsla av avslappning.",
        duration: 60,
        price: 800
    },
    {
        id: "hot-stone",
        name: "Hot Stone-massage",
        image: "images/hot-stone.png",
        description: "En hot stone-massage är en behandling som fokuserar på att stimulera blodcirkulationen och slappna av musklerna. Den kan hjälpa till att minska spänningar, förbättra hudens utseende och ge en känsla av välbefinnande.",
        duration: 60,
        price: 1000
    }
];

// Sparar den behandling kunden väljer
let selectedMassage = null;

// Beräknar totalpriset
function calculatePrice(price, quantity) {
    return price * quantity;
}

// Skapar ett kort för varje massagebehandling
treatments.forEach(treatment => {
    treatmentList.innerHTML += `
        <article class="treatment-card">
            <img src="${treatment.image}" alt="${treatment.name}">

            <h3>${treatment.name}</h3>
            <p>${treatment.description}</p>

            <p class="treatment-duration">
                ⏱ ${treatment.duration} minuter
            </p>

            <p class="treatment-price">
                ${treatment.price} kr <span>/ tillfälle</span>
            </p>

            <button type="button" class="beauty-btn" data-id="${treatment.id}">
                Välj behandling
            </button>
        </article>
    `;
});

// Uppdaterar bokningen och totalpriset
function updateBooking() {
    if (selectedMassage === null) {
        selectedTreatment.textContent =
            "Välj en behandling för att se totalpriset.";
        return;
    }

    const quantity = Number(bookingQuantity.value);


    const totalPrice = calculatePrice(selectedMassage.price, quantity);

    selectedTreatment.textContent =
        selectedMassage.name + ": " +
        quantity + " tillfällen. Totalt: " +
        totalPrice + " kr";
}

// Hanterar klick på behandlingsknapparna
const buttons = document.querySelectorAll(".treatment-card button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const treatment = treatments.find(
            massage => massage.id === button.dataset.id
        );

        selectedMassage = treatment;

        // Markerar det valda massagekortet
        document.querySelectorAll(".treatment-card").forEach(card => {
            card.classList.remove("selected");
            card.querySelector("button").textContent = "Välj behandling";
        });

        button.parentElement.classList.add("selected");
        button.textContent = "Vald behandling";
        updateBooking();
    });
});

// Uppdaterar priset när kunden ändrar antal
bookingQuantity.addEventListener("change", () => {
    updateBooking();
});

// Visar startmeddelandet
updateBooking();
