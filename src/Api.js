import Pokemon from './components/Pokemon';

export const checkPokemon = async (pokemon) => {
    try {
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
        const response = await fetch(url);
        return response.status === 200;
    } catch (err) { }
};

export const getPokemonId = async (pokemon) => {
    try {
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
        const response = await fetch(url);
        const { id } = await response.json();
        return id;
    } catch (err) { }
};

export const getPokemons = async (limit = 25, offset = 0) => {
    try {
        let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (err) { }
};

export const getPokemon = async (p) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${p}`;
        const response = await fetch(url);
        const pokemon = await response.json();
        //console.log(pokemon)
        const buildedpokemon = new Pokemon(pokemon)
        return buildedpokemon;
    } catch (err) {
        console.log(err)
    }
};

export const getPokemonEvos = async (p) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon-species/${p}`;
        const response = await fetch(url);
        const { flavor_text_entries,has_gender_differences,is_mythical,is_legendary,is_baby,evolution_chain } = await response.json();
        const pokemon = { evolution_chain, flavor_text_entries,has_gender_differences,is_mythical,is_legendary,is_baby }
        return pokemon;
    } catch (err) { }
};

export const getPokemonEvolutionChain = async (url) => {
    try {
        const response = await fetch(url);
        //const { species, evolves_to,is_baby } = await response.json();
        //const pokemon = {species, evolves_to,is_baby}
        const pokemon = await response.json();
        return pokemon;
    } catch (err) { }
};

export const pickRandom = async (maxPokemon = 898) => {
    const id = Math.floor(Math.random() * maxPokemon);
    return getPokemon(id)
}
