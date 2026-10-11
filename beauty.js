const treatmentList = document.querySelector('#treatment-list');

const treatments = [
   {
    id: 1,
    name: "Ansiktsmassage",
    image: "images/ansiktsmassage.png",
    description: "En ansiktsmassage är en behandling som fokuserar på att stimulera blodcirkulationen och slappna av ansiktsmusklerna. Den kan hjälpa till att minska spänningar, förbättra hudens utseende och ge en känsla av välbefinnande.",
    duration: 30,
    price: 500


    },
   {
    id: 2,
    name: "Klassisk svensk massage",
    image: "images/massage.png",
    description: "En mjukgörande massage som löser upp spänningar och ger kroppen ny energi. Den kan hjälpa till att minska stress, förbättra blodcirkulationen och ge en känsla av avslappning.",
    duration: 60,
    price: 800
},
    {
    id: 3,
    name: "Hot Stone-massage",
    image: "images/hot-stone.png",
    description: "En hot stone-massage är en behandling som fokuserar på att stimulera blodcirkulationen och slappna av musklerna. Den kan hjälpa till att minska spänningar, förbättra hudens utseende och ge en känsla av välbefinnande.",
    duration: 60,
    price: 1000
   } 
    ];
treatments.forEach(treatment => {
    treatmentList.innerHTML += `
        <article class="treatment-card">
            <img src="${treatment.image}" alt="${treatment.name}">
            <h3>${treatment.name}</h3>
            <p>${treatment.description}</p>
            <p class="treatment-duration">⏱ ${treatment.duration} minuter</p>
            <p class="treatment-price">${treatment.price} kr <span>/ tillfälle</span></p>
        </article>
    `;
});