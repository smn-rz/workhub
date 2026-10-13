
"use strict";

const treatmentList = document.querySelector("#treatment-list");
const selectedTreatment = document.querySelector("#selected-treatment");
const bookingQuantity = document.querySelector("#booking-quantity");

//  massagebehandlingar
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

// Sparar den valda behandlingen
let selectedMassage = null;

// Beräknar totalpriset
function calculatePrice(price, quantity) {
    return price * quantity;
}

// Skapar massagekorten
treatments.forEach(treatment => {
    treatmentList.innerHTML += `
        <article class="treatment-card">
            <img src="${treatment.image}" alt="${treatment.name}">

            <h3>${treatment.name}</h3>

            <button type="button" class="accordion-btn" aria-expanded="false">
                Läs mer om behandlingen
            </button>

            <div class="treatment-description">
                <p>${treatment.description}</p>
            </div>

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

// Hanterar val av behandling
const buttons = document.querySelectorAll(".treatment-card .beauty-btn");

buttons.forEach(button => {
    button.addEventListener("click", () => {

        const treatment = treatments.find(
            massage => massage.id === button.dataset.id
        );

        selectedMassage = treatment;

        // Återställer tidigare val
        document.querySelectorAll(".treatment-card").forEach(card => {
            card.classList.remove("selected");
            card.querySelector(".beauty-btn").textContent = "Välj behandling";
        });

        // Markerar den valda behandlingen
        button.parentElement.classList.add("selected");
        button.textContent = "Vald behandling";

        updateBooking();
    });
});

// Uppdaterar priset när antalet ändras
bookingQuantity.addEventListener("change", () => {
    updateBooking();
});

// Öppnar och stänger behandlingsbeskrivningarna
const accordionButtons = document.querySelectorAll(".accordion-btn");

accordionButtons.forEach(button => {
    button.addEventListener("click", () => {

        const parent = button.parentElement;

        if (parent.classList.contains("open")) {
            parent.classList.remove("open");
            button.setAttribute("aria-expanded", "false");
            return;
        }

        // Stänger övriga beskrivningar
        document.querySelectorAll(".treatment-card").forEach(card => {
            card.classList.remove("open");
            card.querySelector(".accordion-btn")
                .setAttribute("aria-expanded", "false");
        });

        parent.classList.add("open");
        button.setAttribute("aria-expanded", "true");
    });
});


updateBooking();
