const offersList = [
    {
        id: 1,
        title: "Kanottur",
        shortDescription: "Kort beskrivning",
        price: 200,
        durationMin: 180
    },
    {
        id: 2,
        title: "Klättring",
        shortDescription: "K0rt beskrivning!!!",
        price: 450,
        durationMin: 90
    },
    {
        id: 3,
        title: "Mountainbiketur",
        shortDescription: "Kort beskrivning",
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

    // TODO: handle click on Book and Reset buttons
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

    updateTotalPrice();
}


function updateOfferSelection(offerId) {
    const offer = offersList.find(offer => offer.id == offerId);

    currentBooking.selectedOffer = offer;
}


function updateTotalPrice() {
    const totalPrice = document.querySelector(".price");

    price = currentBooking.selectedOffer.price * currentBooking.offerAmount;

    totalPrice.textContent = `${price.toLocaleString("sv-SE")} kr`;
}


function handleAmountChange(e) {
    currentBooking.offerAmount = e.target.value;
    updateTotalPrice();
}


function handleAmountCounter(e) {
    const subtractBtn = e.target.closest(".subtract");
    const addBtn = e.target.closest(".add");

    const offerAmount = document.querySelector("#amount");

    if (subtractBtn) {
        offerAmount.value--;
        currentBooking.offerAmount--;
    } else if (addBtn) {
        offerAmount.value++;
        currentBooking.offerAmount++;
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
    } else if (emailInput) {
        currentBooking.userEmail = emailInput.value;
    } else {
        return;
    }
}
