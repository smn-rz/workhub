
"use strict";


const treatmentList = document.querySelector("#treatment-list");
const selectedTreatment = document.querySelector("#selected-treatment");
const bookingQuantity = document.querySelector("#booking-quantity");
const bookingConfirmation = document.querySelector("#booking-confirmation");
const bookingPopup = document.querySelector("#booking-popup");
const quantityError = document.querySelector("#quantity-error");

const regForm = document.querySelector("#regForm");
const firstNameInput = document.querySelector("#firstName");
const lastNameInput = document.querySelector("#lastName");
const emailInput = document.querySelector("#email");

const resetButton = document.querySelector("#reset-booking");
const clearButton = document.querySelector("#clear-booking");


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
        name: "Hot stone-massage",
        image: "images/hot-stone.png",
        description: "En hot stone-massage är en behandling som fokuserar på att stimulera blodcirkulationen och slappna av musklerna. Den kan hjälpa till att minska spänningar, förbättra hudens utseende och ge en känsla av välbefinnande.",
        duration: 60,
        price: 1000
    }
];

let selectedMassage = null;


function calculatePrice(price, quantity) {
    return price * quantity;
}


function createOfferCard(treatment) {
    return `
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
}




function isValidQuantity() {
    const quantity = Number(bookingQuantity.value);

    return (
        bookingQuantity.value.trim() !== "" &&
        Number.isInteger(quantity) &&
        quantity >= 1 &&
        quantity <= 5
    );
}

function validateTextInput(input) {
    const name = input.value.trim();

    if (name === "" || /\d/.test(name)) {
        input.classList.add("error");
        return false;
    } else {
        input.classList.remove("error");
        return true;
    }
}


function validateEmail(input) {
    const email = input.value;

    const parts = email.split("@");

    if (
        email.includes(" ") ||
        parts.length !== 2 ||
        parts[0] === "" ||
        parts[1] === "" ||
        parts[0].startsWith(".") ||
        parts[0].endsWith(".") ||
        parts[0].includes("..") ||
        !parts[1].includes(".") ||
        parts[1].startsWith(".") ||
        parts[1].endsWith(".") ||
        parts[1].includes("..")
    ) {
        input.classList.add("error");
        return false;
    } else {
        input.classList.remove("error");
        return true;
    }
}


function validateTreatment() {
    if (selectedMassage === null) {
        selectedTreatment.textContent = "Du måste välja en behandling.";
        selectedTreatment.classList.add("error-message");
        return false;
    } else {
        return true;
    }
}


function validateQuantity() {
    if (!isValidQuantity()) {
        bookingQuantity.classList.add("error");
        quantityError.style.display = "block";
        return false;
    } else {
        bookingQuantity.classList.remove("error");
        quantityError.style.display = "none";
        return true;
    }
}


function updateBooking() {
    selectedTreatment.classList.remove("error-message");


    if (selectedMassage === null) {
        selectedTreatment.textContent =
            "Välj en behandling för att se totalpriset.";
        return;
    }


    if (!isValidQuantity()) {
        selectedTreatment.textContent =
            "Välj ett antal mellan 1 och 5.";
        return;
    }

    const quantity = Number(bookingQuantity.value);
    const totalPrice = calculatePrice(selectedMassage.price, quantity);


    selectedTreatment.textContent =
        selectedMassage.name + ": " +
        quantity + " tillfällen. Totalt: " +
        totalPrice + " kr";
}


function resetBooking() {


    bookingPopup.hidden = true;


    bookingConfirmation.textContent = "";


    quantityError.style.display = "none";


    regForm.querySelectorAll("input, button").forEach(element => {
        element.disabled = false;
    });

    bookingQuantity.disabled = false;

    buttons.forEach(button => {
        button.disabled = false;
    });


    regForm.reset();

    document.querySelectorAll(".error").forEach(input => {
        input.classList.remove("error");
    });

    bookingQuantity.value = "";
    selectedMassage = null;
    updateBooking();


    document.querySelectorAll(".treatment-card").forEach(card => {
        card.classList.remove("selected");
        card.querySelector(".beauty-btn").textContent = "Välj behandling";
    });
}

treatmentList.innerHTML = treatments.map(createOfferCard).join("");


const buttons = document.querySelectorAll(".treatment-card .beauty-btn");
const accordionButtons = document.querySelectorAll(".accordion-btn");



buttons.forEach(button => {
    button.addEventListener("click", () => {


        const treatment = treatments.find(
            massage => massage.id === button.dataset.id
        );


        selectedMassage = treatment;


        document.querySelectorAll(".treatment-card").forEach(card => {
            card.classList.remove("selected");
            card.querySelector(".beauty-btn").textContent = "Välj behandling";
        });


        button.parentElement.classList.add("selected");
        button.textContent = "Vald behandling";

        updateBooking();
    });
});

bookingQuantity.addEventListener("input", () => {
    updateBooking();


    if (bookingQuantity.classList.contains("error")) {
        validateQuantity();
    }
});

accordionButtons.forEach(button => {
    button.addEventListener("click", () => {

        const parent = button.parentElement;


        if (parent.classList.contains("open")) {
            parent.classList.remove("open");
            button.setAttribute("aria-expanded", "false");
            return;
        }


        document.querySelectorAll(".treatment-card").forEach(card => {
            card.classList.remove("open");
            card.querySelector(".accordion-btn")
                .setAttribute("aria-expanded", "false");
        });


        parent.classList.add("open");
        button.setAttribute("aria-expanded", "true");
    });
});


firstNameInput.addEventListener("input", () => {
    if (firstNameInput.classList.contains("error")) {
        validateTextInput(firstNameInput);
    }
});


lastNameInput.addEventListener("input", () => {
    if (lastNameInput.classList.contains("error")) {
        validateTextInput(lastNameInput);
    }
});


emailInput.addEventListener("input", () => {
    if (emailInput.classList.contains("error")) {
        validateEmail(emailInput);
    }
});

regForm.addEventListener("submit", e => {


    e.preventDefault();


    const firstNameValid = validateTextInput(firstNameInput);
    const lastNameValid = validateTextInput(lastNameInput);
    const emailValid = validateEmail(emailInput);
    const treatmentValid = validateTreatment();
    const quantityValid = validateQuantity();

    if (
        !firstNameValid ||
        !lastNameValid ||
        !emailValid ||
        !treatmentValid ||
        !quantityValid
    ) {
        return;
    }


    const user = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value
    };

    const quantity = Number(bookingQuantity.value);
    const totalPrice = calculatePrice(selectedMassage.price, quantity);


    bookingConfirmation.textContent =
        `Tack ${user.firstName} ${user.lastName}!
        Din bokning är bekräftad.

        Behandling: ${selectedMassage.name}
        Antal tillfällen: ${quantity}
        Totalt pris: ${totalPrice} kr
        E-post: ${user.email}`;


    bookingPopup.hidden = false;

    regForm.querySelectorAll("input, button").forEach(element => {
        element.disabled = true;
    });

    bookingQuantity.disabled = true;


    buttons.forEach(button => {
        button.disabled = true;
    });
});

resetButton.addEventListener("click", resetBooking);


clearButton.addEventListener("click", resetBooking);


updateBooking();



const menuButton = document.querySelector("#menu-button");
const navMenu = document.querySelector("#nav-menu");

menuButton.addEventListener("click", () => {
    navMenu.hidden = !navMenu.hidden;
});
