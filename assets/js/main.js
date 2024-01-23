const pokemonList = document.getElementById('pokemonList');
const backgroundCard = document.getElementById('pokeCard')

const nextGeneration = document.getElementById('nextGeneration');
nextGeneration.textContent = 'Avançar';

const generationText = document.querySelector('#generation');
let generation = 1;
generationText.textContent = `${generation}ª Geração`;

const backGenerationBtn = document.querySelector('#backGeneration');
backGenerationBtn.textContent = 'Voltar';
backGenerationBtn.style.display = 'none';

let currentGeneration = 0;
const generations = [151, 100, 135, 107, 156];
let limit = generations[currentGeneration];

let currentOffSet = 0;
const offSetGenerations = [0, 151, 251, 386, 493];
let offSet = offSetGenerations[currentGeneration];

function loadPokemonItens(offset, limit) {

    function convertPokemonToListItem(pokemon) {

        return `
        <li name="${pokemon.name}" stats="${pokemon.stats}" types="${pokemon.types}" gif="${pokemon.gif}" id="newCard" class="pokemon ${pokemon.type}" style="cursor:pointer">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
    
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt=${pokemon.name}>
            </div>
        </li>
        `
    }

    pokeApi.getPokemons(offSet, limit).then((pokemons = []) => {

        pokemonList.innerHTML = pokemons.map(convertPokemonToListItem).join('');

        const allLi = document.querySelectorAll('#newCard')
        allLi.forEach((pokemon) => {
            pokemon.addEventListener('click', () => {
                const name = pokemon.getAttribute('name')
                const stats = pokemon.getAttribute('stats')
                let statsArray = stats.split(',')
                const types = pokemon.getAttribute('types')
                let typesArray = types.split(',')
                const gif = pokemon.getAttribute('gif')
                backgroundCard.innerHTML = `
                <div id="card" class="card ${typesArray[0]}">
                <div class="head">
                    <span class="name">${name}</span>
                    <span class="hp"><i class='bx bxs-plus-circle hp2'></i>HP:${statsArray[0]}</span>
                </div>
                <div class="types">
                    <ol class="types">
                    ${typesArray.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                </div>
        
                <div class="img">
                    <img class="imgPoke"
                        src="${gif}"
                        alt="${name}">
                </div>
                <div class="stats">
                    <span class="sta">STATS</span>
                    <span class="fontI"><i class='bx bx-fork iFont'></i>Attack: ${statsArray[1]}</span>
                    <span class="fontI"><i class='bx bx-shield-alt-2 iFont'></i>Defense: ${statsArray[2]}</span>
                    <span class="fontI"><i class='bx bx-right-arrow iFont'></i>Speed: ${statsArray[5]}</span>
                </div>
                </div>
                `
                backgroundCard.style.display = "block"
            })
        })
    })

}

loadPokemonItens(currentOffSet, limit);

nextGeneration.addEventListener('click', () => {
    if (currentGeneration < 4) {
        currentGeneration++;
        generation = currentGeneration + 1;
        generationText.textContent = `${generation}ª Geração`;
        backGenerationBtn.style.display = 'block';

        // Atualize o limite e o offset conforme a nova geração
        limit = generations[currentGeneration];
        offSet = offSetGenerations[currentGeneration];

        // Limpe o conteúdo existente na lista antes de carregar mais itens
        pokemonList.innerHTML = '';

        // Chame a função loadPokemonItens com os novos valores de offset e limit
        loadPokemonItens(offSet, limit);
    }

    // Verifique se currentGeneration é igual a 4 após as ações anteriores
    if (currentGeneration === 4) {
        // Oculte o botão nextGeneration
        nextGeneration.style.display = 'none';
    }
});

backGenerationBtn.addEventListener('click', () => {
    // Verifique se currentGeneration é maior que 0 para evitar índices negativos
    if (currentGeneration > 0) {
        currentGeneration--;
        generation = currentGeneration + 1;
        generationText.textContent = `${generation}ª Geração`;

        // Atualize o limite e o offset conforme a nova geração
        limit = generations[currentGeneration];
        offSet = offSetGenerations[currentGeneration];

        // Limpe o conteúdo existente na lista antes de carregar mais itens
        pokemonList.innerHTML = '';

        // Chame a função loadPokemonItens com os novos valores de offset e limit
        loadPokemonItens(offSet, limit);

        // Tornar visível o botão nextGeneration, já que voltamos a uma geração anterior
        nextGeneration.style.display = 'block';
    }

    // Verifique se currentGeneration é igual a 0 para ocultar o botão backGeneration
    if (currentGeneration === 0) {
        backGenerationBtn.style.display = 'none';
    }
});
