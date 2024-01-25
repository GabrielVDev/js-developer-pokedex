const pokemonList = document.getElementById('pokemonList')
const pokemonModal = document.getElementById('detalhesPokemon')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function convertPokemonToModal(pokemon){
    return `<div class="pokemon ${pokemon.type}">
    <div class="image-container">
        <img src="${pokemon.photo}" alt="${pokemon.name}">
    </div>
    
    <div class="details">
        <h2>${pokemon.name}</h2>
        
        <div class="attribute">
            <span class="label">Tipo:</span>
            <span class="value">${pokemon.type}</span>
        </div>
        
        <div class="attribute">
            <span class="label">Altura:</span>
            <span class="value">${pokemon.height}</span>
        </div>
        
    </div>
</div>
`
}
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function searchPokemons() {
    clearModal()
    var pokemonSearch = document.getElementById('pokemonSearch');
    var valuePokemon = pokemonSearch.value.trim();

    // Verifica se o campo de pesquisa não está vazio
    if (valuePokemon !== '') {
        // Realiza a lógica de pesquisa aqui
        console.log("Você digitou: " + valuePokemon);
    } else {
        console.log("Por favor, digite algo para pesquisar.");
    }

    pegarPokemons(offset = valuePokemon - 1)

}

function pegarPokemons() {
    const urln = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=1`
    console.log(urln)

    return fetch(urln)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
        .then((pokemons = []) => {
            const newHtml = pokemons.map(convertPokemonToModal).join('')
            pokemonModal.innerHTML += newHtml
        })
}
// Adiciona um ouvinte de evento ao botão
document.getElementById('pesquisa').addEventListener('click', searchPokemons); 

