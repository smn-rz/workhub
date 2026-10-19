
"use strict";

// Hämtar olika delar från HTML
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

// Alla massagebehandlingar med info och priser
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

// Ingen behandling vald från början
let selectedMassage = null;

// Räknar ut priset beroende på antal
function calculatePrice(price, quantity) {
    return price * quantity;
}

// Skapar ett kort för varje behandling
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

// Visar alla behandlingar på sidan
treatmentList.innerHTML = treatments.map(createOfferCard).join("");

// Hämtar knapparna efter att korten skapats
const buttons = document.querySelectorAll(".treatment-card .beauty-btn");
const accordionButtons = document.querySelectorAll(".accordion-btn");

// Kollar att antalet är ett heltal mellan 1 och 5
function isValidQuantity() {
    const quantity = Number(bookingQuantity.value);

    return (
        bookingQuantity.value.trim() !== "" &&
        Number.isInteger(quantity) &&
        quantity >= 1 &&
        quantity <= 5
    );
}

// Uppdaterar det som visas i Din bokning
function updateBooking() {
    selectedTreatment.classList.remove("error-message");

    // Om ingen massage är vald
    if (selectedMassage === null) {
        selectedTreatment.textContent =
            "Välj en behandling för att se totalpriset.";
        return;
    }

    // Visar inget pris om antalet är fel
    if (!isValidQuantity()) {
        selectedTreatment.textContent =
            "Välj ett antal mellan 1 och 5.";
        return;
    }

    // Räknar ut totalpriset
    const quantity = Number(bookingQuantity.value);
    const totalPrice = calculatePrice(selectedMassage.price, quantity);

    // Visar vald massage, antal och pris
    selectedTreatment.textContent =
        selectedMassage.name + ": " +
        quantity + " tillfällen. Totalt: " +
        totalPrice + " kr";
}

// Gör så man kan välja en behandling
buttons.forEach(button => {
    button.addEventListener("click", () => {

        // Hittar rätt behandling med hjälp av id
        const treatment = treatments.find(
            massage => massage.id === button.dataset.id
        );

        // Sparar behandlingen man valt
        selectedMassage = treatment;

        // Tar bort tidigare markering
        document.querySelectorAll(".treatment-card").forEach(card => {
            card.classList.remove("selected");
            card.querySelector(".beauty-btn").textContent = "Välj behandling";
        });

        // Markerar den nya behandlingen
        button.parentElement.classList.add("selected");
        button.textContent = "Vald behandling";

        updateBooking();
    });
});

// Uppdaterar bokningen när användaren skriver antal
bookingQuantity.addEventListener("input", () => {
    updateBooking();

    // Kontrollerar igen om fältet redan har ett fel
    if (bookingQuantity.classList.contains("error")) {
        validateQuantity();
    }
});

// Gör så man kan läsa mer om behandlingarna
accordionButtons.forEach(button => {
    button.addEventListener("click", () => {

        const parent = button.parentElement;

        // Stänger beskrivningen om den redan är öppen
        if (parent.classList.contains("open")) {
            parent.classList.remove("open");
            button.setAttribute("aria-expanded", "false");
            return;
        }

        // Stänger de andra beskrivningarna
        document.querySelectorAll(".treatment-card").forEach(card => {
            card.classList.remove("open");
            card.querySelector(".accordion-btn")
                .setAttribute("aria-expanded", "false");
        });

        // Öppnar beskrivningen man klickat på
        parent.classList.add("open");
        button.setAttribute("aria-expanded", "true");
    });
});

// Kollar så textfältet inte är tomt
function validateTextInput(input) {
    if (input.value.trim() === "") {
        input.classList.add("error");
        return false;
    } else {
        input.classList.remove("error");
        return true;
    }
}

// Kontrollerar att eposten är giltig
function validateEmail(input) {
    const email = input.value;

    // Delar upp eposten vid @
    const parts = email.split("@");

    // Kollar så eposten har rätt format
    if (
        email.includes(" ") ||
        parts.length !== 2 ||
        parts[0] === "" ||
        parts[1] === "" ||
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

// Kollar om man valt en massage
function validateTreatment() {
    if (selectedMassage === null) {
        selectedTreatment.textContent = "Du måste välja en behandling.";
        selectedTreatment.classList.add("error-message");
        return false;
    } else {
        return true;
    }
}

// Kontrollerar antalet och visar felmeddelande
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

// Kontrollerar förnamnet 
firstNameInput.addEventListener("input", () => {
    if (firstNameInput.classList.contains("error")) {
        validateTextInput(firstNameInput);
    }
});

// Kontrollerar efternamnet 
lastNameInput.addEventListener("input", () => {
    if (lastNameInput.classList.contains("error")) {
        validateTextInput(lastNameInput);
    }
});

// Kontrollerar eposten 
emailInput.addEventListener("input", () => {
    if (emailInput.classList.contains("error")) {
        validateEmail(emailInput);
    }
});

// Körs när man klickar på Boka
regForm.addEventListener("submit", e => {

    // Hindrar sidan från att laddas om
    e.preventDefault();

    // Kontrollerar alla uppgifter
    const firstNameValid = validateTextInput(firstNameInput);
    const lastNameValid = validateTextInput(lastNameInput);
    const emailValid = validateEmail(emailInput);
    const treatmentValid = validateTreatment();
    const quantityValid = validateQuantity();

    // Stoppar bokningen om något är fel
    if (
        !firstNameValid ||
        !lastNameValid ||
        !emailValid ||
        !treatmentValid ||
        !quantityValid
    ) {
        return;
    }

    // Sparar användarens uppgifter
    const user = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value
    };

    // Räknar ut priset
    const quantity = Number(bookingQuantity.value);
    const totalPrice = calculatePrice(selectedMassage.price, quantity);

    // Skriver ut bokningsbekräftelsen
    bookingConfirmation.textContent =
        `Tack ${user.firstName} ${user.lastName}!
        Din bokning är bekräftad.

        Behandling: ${selectedMassage.name}
        Antal tillfällen: ${quantity}
        Totalt pris: ${totalPrice} kr
        E-post: ${user.email}`;

    // Visar popuprutan
    bookingPopup.hidden = false;

    // Låser formuläret efter bokningen
    regForm.querySelectorAll("input, button").forEach(element => {
        element.disabled = true;
    });

    bookingQuantity.disabled = true;

    // Låser knapparna för att välja behandling
    buttons.forEach(button => {
        button.disabled = true;
    });
});

// Återställer hela bokningen
function resetBooking() {

    // Stänger popupen
    bookingPopup.hidden = true;

    // Tömmer den gamla bokningsbekräftelsen
    bookingConfirmation.textContent = "";

    // Tar bort felmeddelandet för antal
    quantityError.style.display = "none";

    // Låser upp formuläret igen
    regForm.querySelectorAll("input, button").forEach(element => {
        element.disabled = false;
    });

    bookingQuantity.disabled = false;

    buttons.forEach(button => {
        button.disabled = false;
    });

    // Tömmer formuläret
    regForm.reset();

    // Tar bort felmarkeringarna
    document.querySelectorAll(".error").forEach(input => {
        input.classList.remove("error");
    });

    // Återställer antal och vald massage
    bookingQuantity.value = "1";
    selectedMassage = null;
    updateBooking();

    // Tar bort markeringen på vald behandling
    document.querySelectorAll(".treatment-card").forEach(card => {
        card.classList.remove("selected");
        card.querySelector(".beauty-btn").textContent = "Välj behandling";
    });
}

// Visar starttexten i bokningsrutan
updateBooking();

// Börja om knappen i popupen
resetButton.addEventListener("click", resetBooking);

// Börja om knappen i formuläret
clearButton.addEventListener("click", resetBooking);
