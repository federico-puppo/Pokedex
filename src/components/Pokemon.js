import { getPokemonEvos, getPokemonEvolutionChain } from "../Api"
import pokeball from '../images/pokedex/pokeball_icon.png';

const Pokemon = async (pokemon) => {
    const name = pokemon.species.name
    const id = pokemon.id
    const { flavor_text_entries, has_gender_differences, evolution_chain, is_mythical, is_legendary, is_baby } = await getPokemonEvos(id);
    const isMithical = is_mythical;
    const isLegendary = is_legendary;
    const isBaby = is_baby;
    const sprites = assignSprites()
    const stats = assignStats()
    const types = assignTypes()
    const abilities = assignAbilities()
    const flavor_text = assignFlavorTextEntries("es")
    const evolutions = await assignEvolutions()
    let evolutionChainUrl


    //evolutions = await assignEvolutions()

    //SET STATS
    function assignStats() {
        let stats = []
        pokemon.stats.forEach(e => {
            stats.push({ name: e.stat.name, valor: e.base_stat })
        })
        return stats
    };

    //SET TYPES
    function assignTypes() {
        let types = []
        pokemon.types.forEach(e => {
            let name = e.type.name.charAt(0).toUpperCase() + e.type.name.slice(1)
            types.push({ slot: e.slot, name })
        });
        return types
    }

    //SET ABILITIES
    function assignAbilities() {
        let abilities = []
        pokemon.abilities.forEach(e => {
            abilities.push({ slot: e.slot, name: e.ability.name })
        });
        return abilities
    }

    //SET FLAVOR TEXTS
    function assignFlavorTextEntries(lang) {
        let flavor_text = []
        try {
            flavor_text = flavor_text_entries.filter((e) => e.language.name === lang);
            flavor_text = flavor_text.map((e) => e.flavor_text.replace(/\n/g, " "))
            flavor_text = [...new Set(flavor_text)]
            return flavor_text
        } catch (err) {
            console.log(err)
        }
    }

    //SET SPRITES
    function assignSprites() {
        let sprites = {}
        Object.assign(sprites, pokemon.sprites)
        delete sprites.other
        delete sprites.versions
        try {
            Object.keys(sprites).forEach(key => {
                if (sprites[key] === null) {
                    let mirrorKey
                    switch (key) {
                        case "back_female":
                            mirrorKey = "back_default"
                            break;
                        case "back_shiny_female":
                            mirrorKey = "back_shiny"
                            break;
                        case "front_female":
                            mirrorKey = "front_default"
                            break;
                        case "front_shiny_female":
                            mirrorKey = "front_shiny"
                            break;
                        default:
                            break;
                    }
                    sprites[key] = sprites[mirrorKey]
                    if (sprites[key] === undefined && sprites[mirrorKey] === undefined) {
                        sprites[key] = pokeball
                    }
                }
            })
            return sprites
        } catch (err) {
            console.log(err)
        }
    }

    //SET EVOLUTIONS
    async function assignEvolutions() {
        let evolutions = []
        let multiEvos = []
        if (evolution_chain !== null) {
            evolutionChainUrl = evolution_chain.url;
            let evos = await getPokemonEvolutionChain(evolutionChainUrl)
            console.log(evos);

            ////CHECK IF HAS NO EVOLUTION:
            if (evos.chain.evolves_to.length === 0) {
                console.log("NO EVOLUTIONS");
                evolutions = null
            }
            //HAS EVOLUTION?
            else if (evos.chain.evolves_to.length === 1) {
                // IS BABY?
                if (evos.chain.is_baby) {
                    const id = evos.chain.species.url.slice(-4).replace("/", "").replace("/", "");
                    const name = evos.chain.species.name
                    console.log("TIENE BEBE: " + name + " ID: " + id);
                    const pokemon = { name, id }
                    evolutions.push(pokemon)

                    //BASE POKEMON
                } else {
                    const id = evos.chain.species.url.slice(-4).replace("/", "").replace("/", "");
                    const name = evos.chain.species.name
                    console.log("POKEMON BASE: " + name + " ID: " + id);
                    const pokemon = { name, id }
                    evolutions.push(pokemon)

                }

                //FIRST EVOLUTION:
                const id = evos.chain.evolves_to[0].species.url.slice(-4).replace("/", "").replace("/", "");
                const name = evos.chain.evolves_to[0].species.name
                console.log("1° EVOLUCION: " + name + " ID: " + id);
                const pokemon = { name, id }
                evolutions.push(pokemon)

                //HAS SECOND EVOLUTION?
                if (evos.chain.evolves_to[0].evolves_to.length === 1) {
                    //SECOND EVOLUTION:
                    const id = evos.chain.evolves_to[0].evolves_to[0].species.url.slice(-4).replace("/", "").replace("/", "");
                    const name = evos.chain.evolves_to[0].evolves_to[0].species.name
                    console.log("2 EVOLUCION: " + name + " ID: " + id);
                    const pokemon = { name, id }
                    evolutions.push(pokemon)


                }
                // MULTIPLE SECOND EVOLUTIONS
                else if (evos.chain.evolves_to[0].evolves_to.length > 1) {
                    console.log("EVOLUCIONES MULTIPLES CAMINOS");
                    evos.chain.evolves_to[0].evolves_to.forEach(e => {
                        const id = e.species.url.slice(-4).replace("/", "").replace("/", "")
                        const name = e.species.name
                        console.log("POSIBLE EVOLUCION: " + name + " ID: " + id);
                        const pokemon = { name, id }
                        multiEvos.push(pokemon)
                    })
                    evolutions.push(multiEvos)
                }
            }
            // MULTIPLE EVOLUTIONS
            else if (evos.chain.evolves_to.length > 1) {
                console.log("EVOLUCIONES MULTIPLES CAMINOS");
                const id = evos.chain.species.url.slice(-4).replace("/", "").replace("/", "");
                const name = evos.chain.species.name
                console.log("POKEMON BASE: " + evos.chain.species.name + " ID: " + id);
                const pokemon = { name, id }
                evolutions.push(pokemon)
                evos.chain.evolves_to.forEach(e => {
                    const id = e.species.url.slice(-4).replace("/", "").replace("/", "");
                    const name = e.species.name
                    console.log("POSIBLE EVOLUCION: " + name + " ID: " + id);
                    const pokemon = { name, id }
                    multiEvos.push(pokemon)
                })
                evolutions.push(multiEvos)
            }
        }
        //evolutions = { babyPokemon, basePokemon, finalEvolution, posibleEvolution }
        return evolutions
    }

    const Pokemon = { name, id, stats, types, abilities, has_gender_differences, sprites, flavor_text, evolutions, isBaby, isMithical, isLegendary }
    return Pokemon
}

export default Pokemon;