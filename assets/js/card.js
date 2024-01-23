
const pokeCard = document.getElementById('pokeCard');

pokeCard.addEventListener('click', (eventPoke) => {
    if (event.target === pokeCard) {
        pokeCard.style.display = 'none';
    }
})

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        pokeCard.style.display = 'none'
    }
})

