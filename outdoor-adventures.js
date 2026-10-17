function main() {
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

    renderOffers(offersList);
}


function renderOffers(offersList) {
    const offers = offersList.map(createOfferElement);
    const offersContainer = document.querySelector(".offers");
    offersContainer.append(...offers);
}


function createOfferElement(offer) {
    // Create all elements & add attributes + values to elements
    const offerContainer = document.createElement("label");
    offerContainer.classList.add("offer");
    offerContainer.htmlFor = `offer${offer.id}`;

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
