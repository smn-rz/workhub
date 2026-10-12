const treatmentList = document.querySelector('#treatment-list');

const treatments = [ //array med behandlingar
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
function calculatePrice(price, quantity) { // Funktion för att beräkna priset baserat på antal behandlingstillfällen
    return price * quantity;
}
const booking = []; // lagra bokade behandlingar

treatments.forEach(treatment => { // Loopar igenom varje behandling och skapar ett kort för varje behandling
    treatmentList.innerHTML += `
        <article class="treatment-card">
            <img src="${treatment.image}" alt="${treatment.name}">
            <h3>${treatment.name}</h3>
            <p>${treatment.description}</p>
            <p class="treatment-duration">⏱ ${treatment.duration} minuter</p>
            <p class="treatment-price">${treatment.price} kr <span>/ tillfälle</span></p>
            
            <label for="quantity-${treatment.id}">Antal behandlingstillfällen:</label>

<select id="quantity-${treatment.id}" class="treatment-quantity"> 
 <option value="" selected disabled>Välj antal tillfällen</option>
    <option value="1">1 tillfälle</option>
    <option value="2">2 tillfällen</option>
    <option value="3">3 tillfällen</option>
    <option value="4">4 tillfällen</option>
    <option value="5">5 tillfällen</option>
</select>

            <button type="button" class="beauty-btn" data-id="${treatment.id}">
                Välj behandling
            </button>
            </article>
    `;
});

const buttons = document.querySelectorAll(".treatment-card button"); 

const selectedTreatment = document.querySelector("#selected-treatment");// Hämta elementet där den valda behandlingen ska visas

buttons.forEach(button => {
    button.addEventListener("click", () => {

        // Hitta behandlingen som kunden klickat på
        const treatment = treatments.find(massage => massage.id === button.dataset.id);

        // Hämta antalet behandlingstillfällen
        const quantity = Number(button.parentElement.querySelector(".treatment-quantity").value);
        if (quantity === 0) {
            alert("Välj antal behandlingstillfällen först!");
            return;
        }
        // Kontrollera om behandlingen redan finns i bokningen
        const existingBooking = booking.find(item => item.id === treatment.id);

        if (existingBooking) {
            // Uppdatera antalet om behandlingen redan finns
            existingBooking.quantity = quantity;
        } else {
            // Lägg till behandlingen om den inte finns
            booking.push({
                id: treatment.id,
                quantity: quantity
            });
        }

        // Töm den 
        selectedTreatment.textContent = "";

        // Visa alla behandlingar som kunden har valt med priset också
        booking.forEach(item => {
            const massage = treatments.find(treatment => treatment.id === item.id);

            const price = calculatePrice(massage.price, item.quantity);

            selectedTreatment.textContent += massage.name + ": " + item.quantity + " tillfällen, " + price + " kr.\n";
        });

        console.log(booking);
    });
});
