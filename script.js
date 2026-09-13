// Base de datos de mascotas con atributos para el Test de Compatibilidad
const petsData = [
    {
        id: 1,
        name: "Cacho",
        breed: "Beagle Mix",
        type: "perro",
        age: "2 años",
        location: "Córdoba",
        image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80",
        vivienda: "casa",
        tiempo: "mucho",
        energia: "jugueton"
    },
    {
        id: 2,
        name: "Luna",
        breed: "Siamés",
        type: "gato",
        age: "1 año",
        location: "Alta Gracia",
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80",
        vivienda: "depto",
        tiempo: "poco",
        energia: "tranquilo"
    },
    {
        id: 3,
        name: "Simón",
        breed: "Mestizo Mediano",
        type: "perro",
        age: "4 años",
        location: "Carlos Paz",
        image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80",
        vivienda: "patio",
        tiempo: "medio",
        energia: "jugueton"
    },
    {
        id: 4,
        name: "Mila",
        breed: "Europeo Común",
        type: "gato",
        age: "3 años",
        location: "Córdoba",
        image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=600&q=80",
        vivienda: "depto",
        tiempo: "medio",
        energia: "tranquilo"
    }
];

// Control del Menú Hamburguesa en Celulares
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const icon = menuToggle.querySelector("i");
    if (navLinks.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }
});

// Cerrar menú automáticamente al hacer clic en cualquier enlace de navegación
navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        const icon = menuToggle.querySelector("i");
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    });
});

// Renderizar tarjetas de mascotas
function renderPets(pets) {
    const grid = document.getElementById("pets-grid");
    grid.innerHTML = "";

    if (pets.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--wood-text-secondary);">No se encontraron mascotas con este criterio.</p>`;
        return;
    }

    pets.forEach(pet => {
        const card = document.createElement("div");
        card.className = "pet-card";
        card.innerHTML = `
            <div class="pet-img-container">
                <img src="${pet.image}" alt="${pet.name}">
                <span class="pet-tag">${pet.age}</span>
                <button class="like-btn" onclick="toggleLike(this)"><i class="fa-solid fa-heart"></i></button>
            </div>
            <div class="pet-info">
                <h3>${pet.name}</h3>
                <p class="breed">${pet.breed} • ${pet.location}</p>
                <div class="pet-details-tags">
                    <span><i class="fa-solid fa-house"></i> ${pet.vivienda}</span>
                    <span><i class="fa-solid fa-bolt"></i> ${pet.energia}</span>
                </div>
                <button class="btn-primary" onclick="openAdoptionModal('${pet.name}')">Adoptar a ${pet.name}</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Función para alternar like (empieza neutro y se pone rojo al hacer click)
function toggleLike(btn) {
    btn.classList.toggle("liked");
}

// Filtros de categoría
document.querySelectorAll(".filters-container .filter-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        document.querySelectorAll(".filters-container .filter-btn").forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        const filter = e.target.getAttribute("data-filter");
        if (filter === "all") {
            renderPets(petsData);
        } else {
            renderPets(petsData.filter(p => p.type === filter));
        }
    });
});

// Modal Postulación Adopción
const modal = document.getElementById("adoption-modal");
const closeModal = document.getElementById("close-modal");
let selectedPetName = "";

function openAdoptionModal(petName) {
    selectedPetName = petName;
    document.getElementById("modal-pet-title").innerText = `Postulación para adoptar a ${petName}`;
    modal.classList.add("active");
}

closeModal.addEventListener("click", () => modal.classList.remove("active"));
modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("active");
});

// Manejo del formulario y activación del Certificado Canvas
const adoptionForm = document.getElementById("form-adoption");
const certModal = document.getElementById("cert-modal");
const closeCertModal = document.getElementById("close-cert-modal");

adoptionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userName = document.getElementById("nombre").value;
    modal.classList.remove("active");
    
    generateCanvasCertificate(userName, selectedPetName);
    certModal.classList.add("active");
});

closeCertModal.addEventListener("click", () => certModal.classList.remove("active"));

function generateCanvasCertificate(userName, petName) {
    const canvas = document.getElementById("adoption-canvas");
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#fef3c7";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#d97706";
    ctx.lineWidth = 6;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    ctx.fillStyle = "#1e1108";
    ctx.font = "bold 22px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("CERTIFICADO DE ADOPCIÓN RESPONSABLE", canvas.width / 2, 70);

    ctx.font = "14px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "#5c4333";
    ctx.fillText("Otorgado con mucho amor por Fundación Patitas a:", canvas.width / 2, 120);

    ctx.font = "bold 26px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "#d97706";
    ctx.fillText(userName, canvas.width / 2, 170);

    ctx.font = "14px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "#5c4333";
    ctx.fillText("Por brindarle un cálido hogar y una segunda oportunidad a:", canvas.width / 2, 220);

    ctx.font = "bold 24px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "#1e1108";
    ctx.fillText(`🐾 ${petName} 🐾`, canvas.width / 2, 270);

    ctx.font = "italic 12px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "#78716c";
    ctx.fillText("Fecha de emisión: 2026 • Gracias por cambiar una vida", canvas.width / 2, 340);

    const dataURL = canvas.toDataURL("image/png");
    document.getElementById("download-cert-btn").href = dataURL;
}

// Test Interactivo de Compatibilidad
let quizAnswers = {};
document.querySelectorAll(".quiz-opt").forEach(btn => {
    btn.addEventListener("click", (e) => {
        const q = e.target.getAttribute("data-q");
        const val = e.target.getAttribute("data-val");
        quizAnswers[q] = val;

        document.getElementById("quiz-step-1").classList.remove("active");
        document.getElementById("quiz-step-2").classList.remove("active");
        document.getElementById("quiz-step-3").classList.remove("active");

        if (q === "vivienda") {
            document.getElementById("quiz-step-2").classList.add("active");
        } else if (q === "tiempo") {
            document.getElementById("quiz-step-3").classList.add("active");
        } else if (q === "energia") {
            showQuizResult();
        }
    });
});

function showQuizResult() {
    const resultDiv = document.getElementById("quiz-result");
    resultDiv.classList.add("active");

    const matched = petsData.find(p => p.vivienda === quizAnswers.vivienda || p.energia === quizAnswers.energia) || petsData[0];
    document.getElementById("quiz-match-text").innerHTML = `¡El compañero ideal para vos según tus respuestas es <strong>${matched.name}</strong> (${matched.breed})!`;
    
    renderPets([matched]);
}

document.getElementById("reset-quiz").addEventListener("click", () => {
    quizAnswers = {};
    document.getElementById("quiz-result").classList.remove("active");
    document.getElementById("quiz-step-1").classList.add("active");
    renderPets(petsData);
});

// Sistema de Audio Ambiental con Web Audio API
let audioCtx = null;
let isAudioPlaying = false;
let oscillator = null;
let gainNode = null;

const audioBtn = document.getElementById("ambient-audio-btn");
audioBtn.addEventListener("click", () => {
    if (!isAudioPlaying) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        oscillator = audioCtx.createOscillator();
        gainNode = audioCtx.createGain();

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(160, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.03, audioCtx.currentTime);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        isAudioPlaying = true;
        audioBtn.innerHTML = `<i class="fa-solid fa-volume-high" style="color: var(--accent-color);"></i>`;
    } else {
        if (oscillator) oscillator.stop();
        if (audioCtx) audioCtx.close();
        isAudioPlaying = false;
        audioBtn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
    }
});

// Cambio de Modo Día / Noche (Sin transición)
const themeToggle = document.getElementById("theme-toggle");
const htmlElement = document.documentElement;

themeToggle.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-theme");
    if (currentTheme === "light") {
        htmlElement.setAttribute("data-theme", "dark");
        themeToggle.innerHTML = `<i class="fa-solid fa-sun"></i>`;
    } else {
        htmlElement.setAttribute("data-theme", "light");
        themeToggle.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    }
});

// Inicializar la grilla al cargar la página
renderPets(petsData);

// Generador de huellas al hacer clic
document.addEventListener("click", function(e) {
    if(e.target.closest('button') || e.target.closest('a')) return;
    const paw = document.createElement("div");
    paw.className = "click-paw";
    paw.innerHTML = "🐾";
    paw.style.left = `${e.pageX}px`;
    paw.style.top = `${e.pageY}px`;
    document.body.appendChild(paw);
    setTimeout(() => paw.remove(), 800);
});
