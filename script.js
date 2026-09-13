const pets = [
    {
        id: 1,
        name: "Lucas",
        species: "perro",
        breed: "Mestizo Alegre",
        age: "1 año",
        size: "Mediano",
        gender: "Macho",
        img: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80",
        bio: "Lucas fue rescatado en la esquina del barrio. Es súper enérgico, ama correr detrás de la pelota y se lleva genial con otros perritos."
    },
    {
        id: 2,
        name: "Luna",
        species: "gato",
        breed: "Siamés Mezcla",
        age: "8 meses",
        size: "Pequeño",
        gender: "Hembra",
        img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80",
        bio: "Luna es muy tranquila y amorosa. Le encanta dormir en las piernas y mirar por la ventana. Ya está castrada y vacunada."
    },
    {
        id: 3,
        name: "Bruno",
        species: "perro",
        breed: "Labrador Retriever Mix",
        age: "3 años",
        size: "Grande",
        gender: "Macho",
        img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80",
        bio: "Bruno es un caballero pacífico. Ideal para casas con patio grande. Muy protector, leal y paciente con los chicos."
    },
    {
        id: 4,
        name: "Mila",
        species: "gato",
        breed: "Europeo Común",
        age: "2 años",
        size: "Pequeño",
        gender: "Hembra",
        img: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=600&q=80",
        bio: "Mila es independiente pero muy mimosa cuando agarra confianza. Le gusta jugar con juguetes colgantes."
    }
];

const petsGrid = document.getElementById('pets-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const themeToggle = document.getElementById('theme-toggle');
const petModal = document.getElementById('pet-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalBody = document.getElementById('modal-body');

// Huellas flotantes al hacer clic
document.addEventListener('click', (e) => {
    if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.modal-content')) return;

    const paw = document.createElement('div');
    paw.classList.add('click-paw');
    paw.innerHTML = '<i class="fa-solid fa-paw"></i>';
    paw.style.left = `${e.pageX}px`;
    paw.style.top = `${e.pageY}px`;
    
    document.body.appendChild(paw);

    setTimeout(() => {
        paw.remove();
    }, 800);
});

function displayPets(petsArray) {
    petsGrid.innerHTML = '';
    
    if(petsArray.length === 0) {
        petsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">No hay animalitos disponibles en esta categoría por ahora.</p>`;
        return;
    }

    petsArray.forEach(pet => {
        const card = document.createElement('div');
        card.classList.add('pet-card');
        card.innerHTML = `
            <div class="pet-img-container">
                <img src="${pet.img}" alt="${pet.name}">
                <span class="pet-tag">${pet.species === 'perro' ? '🐶 Perro' : '🐱 Gato'}</span>
                <button class="like-btn" onclick="toggleLike(event, this)" title="Dar me gusta">
                    <i class="fa-regular fa-heart"></i>
                </button>
            </div>
            <div class="pet-info">
                <h3>${pet.name}</h3>
                <p class="breed">${pet.breed}</p>
                <div class="pet-details-tags">
                    <span>${pet.age}</span>
                    <span>${pet.size}</span>
                    <span>${pet.gender}</span>
                </div>
                <button class="btn-primary" onclick="openPetModal(${pet.id})">Conocer más</button>
            </div>
        `;
        petsGrid.appendChild(card);
    });
}

window.toggleLike = function(e, btn) {
    e.stopPropagation();
    const icon = btn.querySelector('i');
    if (icon.classList.contains('fa-regular')) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
        btn.style.transform = 'scale(1.3)';
        setTimeout(() => btn.style.transform = 'scale(1)', 200);
    } else {
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
    }
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        const filter = e.target.getAttribute('data-filter');
        if (filter === 'all') {
            displayPets(pets);
        } else {
            const filtered = pets.filter(pet => pet.species === filter);
            displayPets(filtered);
        }
    });
});

window.openPetModal = function(id) {
    const pet = pets.find(p => p.id === id);
    if (!pet) return;

    modalBody.innerHTML = `
        <div style="display: grid; gap: 1.5rem;">
            <img src="${pet.img}" alt="${pet.name}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 12px;">
            <div>
                <h2>¡Hola, soy ${pet.name}!</h2>
                <p style="color: var(--text-secondary); margin-bottom: 0.5rem;">${pet.breed} • ${pet.age}</p>
                <p style="margin-top: 1rem;">${pet.bio}</p>
            </div>
            <hr style="border: 0; border-top: 1px solid var(--card-border);">
            <h3>Formulario de Adopción Responsable</h3>
            <form class="adoption-form" onsubmit="handleAdoptionSubmit(event, '${pet.name}')">
                <div class="form-group">
                    <label>Tu Nombre Completo</label>
                    <input type="text" required placeholder="Ej: Miqueas Pérez">
                </div>
                <div class="form-group">
                    <label>Teléfono de Contacto</label>
                    <input type="tel" required placeholder="Ej: 351xxxxxxx">
                </div>
                <div class="form-group">
                    <label>¿Por qué te gustaría adoptar a ${pet.name}?</label>
                    <textarea rows="3" required placeholder="Contanos un poco sobre tu hogar..."></textarea>
                </div>
                <button type="submit" class="btn-primary" style="justify-content: center; margin-top: 0.5rem;">Enviar Solicitud</button>
            </form>
        </div>
    `;
    petModal.classList.add('active');
}

closeModalBtn.addEventListener('click', () => {
    petModal.classList.remove('active');
});

petModal.addEventListener('click', (e) => {
    if (e.target === petModal) {
        petModal.classList.remove('active');
    }
});

window.handleAdoptionSubmit = function(e, petName) {
    e.preventDefault();
    modalBody.innerHTML = `
        <div style="text-align: center; padding: 2rem 0;">
            <i class="fa-solid fa-circle-check" style="font-size: 4rem; color: #22c55e; margin-bottom: 1rem;"></i>
            <h2>¡Solicitud Enviada con Éxito!</h2>
            <p style="color: var(--text-secondary); margin-top: 1rem;">Gracias por querer cambiar la vida de <strong>${petName}</strong>. Nos pondremos en contacto con vos muy pronto para coordinar los siguientes pasos.</p>
            <button class="btn-primary" onclick="petModal.classList.remove('active')" style="margin-top: 2rem;">Cerrar ventana</button>
        </div>
    `;
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    
    const icon = themeToggle.querySelector('i');
    icon.className = newTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
});

displayPets(pets);
