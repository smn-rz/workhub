const offersList = [
    {
        id: 1,
        title: "Kanottur",
        shortDescription: "Ett uppskattat äventyr på vattnet för både nybörjare och vana paddlare.",
        price: 200,
        durationMin: 180
    },
    {
        id: 2,
        title: "Klättring",
        shortDescription: "Upptäck höjderna hos oss och klättra fritt utan gränser!",
        price: 450,
        durationMin: 90
    },
    {
        id: 3,
        title: "Mountainbiketur",
        shortDescription: "Häng med på en adrenalinfylld mountainbiketur i fantastisk natur.",
        price: 150,
        durationMin: 60
    }
]

let currentBooking = {
    selectedOffer: null,
    offerAmount: 1,
    userName: "",
    userEmail: ""
}


function main() {
    renderOffers();

    const offersContainer = document.querySelector(".offers");
    offersContainer.addEventListener("click", handleOfferClick);

    const offerAmount = document.querySelector("#amount");
    offerAmount.addEventListener("input", handleAmountChange);

    const offerAmountCounter = document.querySelector(".counter");
    offerAmountCounter.addEventListener("click", handleAmountCounter);

    const personalDetails = document.querySelector(".personalDetails");
    personalDetails.addEventListener("input", handlePersonalDetails);

    const submitBookingBtn = document.querySelector("#submitBooking");
    submitBookingBtn.addEventListener("click", handleSubmitBooking);

    const resetBookingBtn = document.querySelector("#resetBooking");
    resetBookingBtn.addEventListener("click", handleResetBooking);
}


function renderOffers() {
    const offers = offersList.map(createOfferElement);
    const offersContainer = document.querySelector(".offers");
    offersContainer.append(...offers);
}


function createOfferElement(offer) {
    // Create all elements & add attributes + values to elements
    const offerContainer = document.createElement("label");
    offerContainer.classList.add("offer");
    offerContainer.htmlFor = `offer${offer.id}`;
    offerContainer.dataset.id = offer.id;

    const radioBtn = document.createElement("input");
    radioBtn.classList.add("radioBtn");
    radioBtn.setAttribute("form", "offerForm");
    radioBtn.type = "radio";
    radioBtn.name = "offer";
    radioBtn.id = `offer${offer.id}`;
    radioBtn.value = offer.title;

    const content = document.createElement("div");
    content.classList.add("offerContent");

    const text = document.createElement("div");
    text.classList.add("offerText");

    const durationBadge = document.createElement("div");
    durationBadge.classList.add("durationBadge");
    durationBadge.textContent = `${offer.durationMin} minuter`;

    const durationBadgeIcon = document.createElement("i");
    durationBadgeIcon.classList.add("durationBadgeIcon", "bi", "bi-clock");

    const title = document.createElement("p");
    title.classList.add("title");
    title.textContent = offer.title;

    const description = document.createElement("p");
    description.classList.add("description");
    description.textContent = offer.shortDescription;

    const price = document.createElement("p");
    price.classList.add("offerPrice");
    price.textContent = `${offer.price} kr / person`;


    // Nesting all elements
    offerContainer.append(radioBtn, content);
    content.append(text, price);
    text.append(durationBadge, title, description);
    durationBadge.prepend(durationBadgeIcon);


    // Return the complete offer element
    return offerContainer;
}


function handleOfferClick(e) {
    const offer = e.target.closest(".offer");
    
    // If the click was not on the offer
    if (!offer) return;

    // Get the current selected offers ID
    const offerId = offer.dataset.id;

    updateOfferSelection(offerId);

    const invalidChoice = document.querySelector(".invalidChoice");
    invalidChoice.classList.contains("error") ? isValidOffer() : null;

    updateTotalPrice();
}


function updateOfferSelection(offerId) {
    // Find offer from offers list based on ID
    const offer = offersList.find(offer => offer.id == offerId);

    currentBooking.selectedOffer = offer;
}


function updateTotalPrice() {
    const price = document.querySelector(".price");

    if (currentBooking.selectedOffer) {
        const totalPrice = currentBooking.selectedOffer.price * currentBooking.offerAmount;
        price.textContent = `${totalPrice.toLocaleString("sv-SE")} kr`;
    } else {
        price.textContent = "Ett erbjudande behöver väljas";
    }
}


function handleAmountChange(e) {
    currentBooking.offerAmount = e.target.value;

    const offerAmount = document.querySelector(".offerAmount");
    if (offerAmount.classList.contains("error")) isValidAmount();

    updateTotalPrice();
}


function handleAmountCounter(e) {
    const subtractBtn = e.target.closest(".subtract");
    const addBtn = e.target.closest(".add");

    const offerAmountInput = document.querySelector("#amount");
    const offerAmount = document.querySelector(".offerAmount");

    if (subtractBtn) {
        offerAmountInput.value--;
        currentBooking.offerAmount--;
        if (offerAmount.classList.contains("error")) isValidAmount();
    } else if (addBtn) {
        offerAmountInput.value++;
        currentBooking.offerAmount++;
        if (offerAmount.classList.contains("error")) isValidAmount();
    } else {
        return;
    }

    updateTotalPrice();
}


function handlePersonalDetails(e) {
    const nameInput = e.target.closest("#name");
    const emailInput = e.target.closest("#email");

    if (nameInput) {
        currentBooking.userName = nameInput.value;
        const userName = document.querySelector(".userName");
        userName.classList.contains("error") ? isValidName() : null;
    } else if (emailInput) {
        currentBooking.userEmail = emailInput.value;
        const userEmail = document.querySelector(".userEmail");
        userEmail.classList.contains("error") ? isValidEmail() : null;
    } else {
        return;
    }
}


function handleSubmitBooking(e) {
    e.preventDefault();

    // TODO: Validation
    if (!isFormValid()) {
        return;
    }

    renderBookingConfirmation();

    // Hides booking container and only shows booking confirmation
    const bookingContainer = document.querySelector("#booking");
    bookingContainer.style.display = "none";

    // Handler incase user wants to do another new booking
    const newBookingBtn = document.querySelector("#newBooking");
    newBookingBtn.addEventListener("click", handleNewBooking);
}


function createBookingConfirmation() {
    // Create all elements & add attributes + values to elements
    const bookingConfirmationContainer = document.createElement("div");
    bookingConfirmationContainer.id = "bookingConfirmation";
    bookingConfirmationContainer.classList.add("grid-12-cols");

    const header = document.createElement("div");
    header.classList.add("header");

    const checkmarkIcon = document.createElement("i");
    checkmarkIcon.classList.add("checkmarkIcon", "bi", "bi-check-circle-fill");

    const h1 = document.createElement("h1");
    h1.textContent = "Din bokning är bekräftad!";

    const p = document.createElement("p");
    p.textContent = "Tack för din bokning. Vi har mottagit din förfrågan och återkommer till dig snarast via e-post.";

    const bookingDetails = document.createElement("div");
    bookingDetails.classList.add("bookingDetails");

    const bookingDetailsTitle = document.createElement("p");
    bookingDetailsTitle.classList.add("title");
    bookingDetailsTitle.textContent = "Bokningsdetaljer";

    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("details");

    const detailNameContainer = document.createElement("div");
    detailNameContainer.classList.add("detail");

    const detailNameLabel = document.createElement("p");
    detailNameLabel.classList.add("label");
    detailNameLabel.textContent = "Namn";

    const detailNameText = document.createElement("p");
    detailNameText.classList.add("name");
    detailNameText.textContent = currentBooking.userName;

    const detailEmailContainer = document.createElement("div");
    detailEmailContainer.classList.add("detail");

    const detailEmailLabel = document.createElement("p");
    detailEmailLabel.classList.add("label");
    detailEmailLabel.textContent = "E-post";

    const detailEmailText = document.createElement("p");
    detailEmailText.classList.add("email");
    detailEmailText.textContent = currentBooking.userEmail;

    const detailOfferContainer = document.createElement("div");
    detailOfferContainer.classList.add("detail");

    const detailOfferLabel = document.createElement("p");
    detailOfferLabel.classList.add("label");
    detailOfferLabel.textContent = "Erbjudande";

    const detailOfferText = document.createElement("p");
    detailOfferText.classList.add("offer");
    detailOfferText.textContent = currentBooking.selectedOffer?.title;

    const detailDurationContainer = document.createElement("div");
    detailDurationContainer.classList.add("detail");

    const detailDurationLabel = document.createElement("p");
    detailDurationLabel.classList.add("label");
    detailDurationLabel.textContent = "Tidslängd";

    const detailDurationText = document.createElement("p");
    detailDurationText.classList.add("duration");
    detailDurationText.textContent = `${currentBooking.selectedOffer?.durationMin} minuter`;

    const detailAmountContainer = document.createElement("div");
    detailAmountContainer.classList.add("detail");

    const detailAmountLabel = document.createElement("p");
    detailAmountLabel.classList.add("label");
    detailAmountLabel.textContent = "Antal personer";

    const detailAmountText = document.createElement("p");
    detailAmountText.classList.add("amount");
    detailAmountText.textContent = currentBooking.offerAmount;

    const detailTotalPriceContainer = document.createElement("div");
    detailTotalPriceContainer.classList.add("detail");

    const detailTotalPriceLabel = document.createElement("p");
    detailTotalPriceLabel.classList.add("label");
    detailTotalPriceLabel.textContent = "Totalpris";

    const detailTotalPriceText = document.createElement("p");
    detailTotalPriceText.classList.add("totalPrice");
    const totalPrice = currentBooking.selectedOffer?.price * currentBooking.offerAmount;
    detailTotalPriceText.textContent = `${totalPrice.toLocaleString("sv-SE")} kr`;

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    const primaryBtn = document.createElement("button");
    primaryBtn.id = "newBooking";
    primaryBtn.classList.add("btn", "btn-primary");
    primaryBtn.textContent = "Boka en ny upplevelse";

    const secondaryBtn = document.createElement("a");
    secondaryBtn.classList.add("btn", "btn-secondary");
    secondaryBtn.href = "/";
    secondaryBtn.textContent = "Tillbaka till startsida";


    // Nesting all elements
    bookingConfirmationContainer.append(header, bookingDetails, buttons);
    header.append(checkmarkIcon, h1, p);
    bookingDetails.append(bookingDetailsTitle, detailsContainer);
    detailsContainer.append(detailNameContainer, detailEmailContainer, detailOfferContainer, detailDurationContainer, detailAmountContainer, detailTotalPriceContainer);
    detailNameContainer.append(detailNameLabel, detailNameText);
    detailEmailContainer.append(detailEmailLabel, detailEmailText);
    detailOfferContainer.append(detailOfferLabel, detailOfferText);
    detailDurationContainer.append(detailDurationLabel, detailDurationText);
    detailAmountContainer.append(detailAmountLabel, detailAmountText);
    detailTotalPriceContainer.append(detailTotalPriceLabel, detailTotalPriceText);
    buttons.append(primaryBtn, secondaryBtn);

    // Return the complete booking confirmation
    return bookingConfirmationContainer;
}


function renderBookingConfirmation() {
    const bookingConfirmation = createBookingConfirmation();
    const main = document.querySelector("main");
    main.append(bookingConfirmation);
}


function handleNewBooking() {
    // Reset the offer booking form
    const offerForm = document.querySelector("#offerForm");
    offerForm.reset();

    // Reset the currentBooking object
    currentBooking.selectedOffer = null;
    currentBooking.offerAmount = 1;
    currentBooking.userName = "";
    currentBooking.userEmail = "";

    // Update total price back to 0 kr
    updateTotalPrice();

    // Show booking container
    const bookingContainer = document.querySelector("#booking");
    bookingContainer.removeAttribute("style");

    // Remove booking confirmation
    const bookingConfirmation = document.querySelector("#bookingConfirmation");
    bookingConfirmation.remove();
}


function handleResetBooking() {
    // Reset the currentBooking object
    currentBooking.selectedOffer = null;
    currentBooking.offerAmount = 1;
    currentBooking.userName = "";
    currentBooking.userEmail = "";

    // Update total price back to 0 kr
    updateTotalPrice();

    // Reset the invalid form input errors
    resetFormValidation();
}


function isFormValid() {
    if (isValidName() & isValidEmail() & isValidOffer() & isValidAmount()) {
        return true;
    } else {
        return false;
    }
}


function isValidName() {
    const name = currentBooking.userName;
    const userNameContainer = document.querySelector(".userName");
    const invalidMsg = document.querySelector(".userName .invalidMsg");

    if (!name) {
        invalidMsg.textContent = "Namn måste vara ifyllt";
        userNameContainer.classList.add("error");
        return false;
    } else if (!name.trim()) {
        invalidMsg.textContent = "Namn måste innehålla mer än bara blanksteg";
        userNameContainer.classList.add("error");
        return false;
    } else {
        invalidMsg.textContent = null;
        userNameContainer.classList.remove("error");
        return true;
    }
}


function isValidEmail() {
    const email = currentBooking.userEmail;   
    const userEmailContainer = document.querySelector(".userEmail");
    const invalidMsg = document.querySelector(".userEmail .invalidMsg");

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        invalidMsg.textContent = "E-postadress måste vara ifyllt";
        userEmailContainer.classList.add("error");
        return false;
    } else if (!regex.test(email)) {
        invalidMsg.textContent = "E-postadress måste vara giltig adress";
        userEmailContainer.classList.add("error");
        return false;
    } else {
        invalidMsg.textContent = null;
        userEmailContainer.classList.remove("error");
        return true;
    }
}


function isValidOffer() {
    const selectedOffer = currentBooking.selectedOffer;
    const invalidChoiceContainer = document.querySelector(".invalidChoice");
    const invalidMsg = document.querySelector(".invalidChoice .invalidMsg");

    if (!offersList.find(offer => offer == selectedOffer)) {
        invalidMsg.textContent = "Ett erbjudande måste väljas";
        invalidChoiceContainer.classList.add("error");
        return false;
    } else {
        invalidMsg.textContent = null;
        invalidChoiceContainer.classList.remove("error");
        return true;
    }
}


function isValidAmount() {
    const offerAmount = parseFloat(currentBooking.offerAmount);
    const offerAmountContainer = document.querySelector(".offerAmount");
    const invalidMsg = document.querySelector(".offerAmount .invalidMsg");

    if (!Number.isInteger(offerAmount) || offerAmount > 5 || offerAmount < 1) {
        invalidMsg.textContent = "Antal måste vara ett heltal mellan 1 till 5";
        offerAmountContainer.classList.add("error");
        return false;
    } else {
        invalidMsg.textContent = null;
        offerAmountContainer.classList.remove("error");
        return true;
    }
}


function resetFormValidation() {
    // Remove all error classes
    const errors = document.querySelectorAll(".error");
    errors.forEach(error => {
        error.classList.remove("error");
    });

    // Clear all invalid error text messages
    const invalidMessages = document.querySelectorAll(".invalidMsg");
    invalidMessages.forEach(invalidMsg => {
        invalidMsg.textContent = null;
    });
}
