import React from "react";
import LeftPokedex from "./LeftPokedex";
import RightPokedex from "./RightPokedex";
import { checkPokemon, getPokemon, pickRandom } from '../Api';

const { useEffect, useState } = React;
const pokemonLimit = 898

const Pokedex = ({ keys }) => {
    const [pokemon, setPokemon] = useState(null);
    const [id, setId] = useState()
    const [previousId, setPreviousId] = useState()
    const [key, setKey] = useState(null)
    const [initiate, setInitiate] = useState(false);

    //START POKEDEX
    useEffect(() => {
        if (!initiate) {
            initiatePokedex();
        }
    }, [initiate]);

    //PICK RANDOM POKEMON
    const initiatePokedex = async () => {
        try {
            const pokemon = await pickRandom()
            setPokemon(pokemon)
            setId(pokemon.id)
            setPreviousId(pokemon.id);
            setInitiate(true)
        } catch (err) {
            console.log(err)
        }
    };

    //CHANGE POKEMON
    const changePokemon = async (num) => {
        try {
            setPreviousId(id)
            const pokemon = await getPokemon(num)
            setPokemon(pokemon)
            setId(pokemon.id)
        } catch (err) {
            console.log(err)
        }
    };

    //CHANGE TO NEXT POKEMON
    async function nextPokemon() {
        try {
            const tempId = id + 1;
            if (tempId <= pokemonLimit && await checkPokemon(tempId)) {
                changePokemon(tempId);
            }
        } catch (err) {
            console.log(err)
        }
    };

    //CHANGE TO PREVIOUS POKEMON
    async function previousPokemon() {
        try {
            const tempId = id - 1;
            if (tempId >= 1 && await checkPokemon(tempId)) {
                changePokemon(tempId);
            };
        } catch (err) {
            console.log(err)
        }
    };

    //CHANGE TO LAST POKEMON
    async function lastPokemon() {
        try {
            if (previousId !== id) {
                changePokemon(previousId);
            }
        } catch (err) {
            console.log(err)
        }
    };

    //CONSOLE INFO PICKED POKEMON
    useEffect(() => {
        if (pokemon) console.log(pokemon)
    }, [pokemon]);


    //KEYBOARD EVENTS
    useEffect(() => {
        if (keys !== null || keys !== key) {
            setKey(keys)
            handleKeyDown(key);
        }
    }, [keys]);


    //KEYBOARD SHORTCUTS

    function handleKeyDown(key) {
        if (key === "s" || key === "ArrowDown")
            previousPokemon();
        if (key === "w" || key === "ArrowUp")
            nextPokemon();
    }








    return (
        <div className="flex-container">
            <div className="pokedex-left">
                {pokemon ? <LeftPokedex pokemon={pokemon} nextPokemon={nextPokemon} previousPokemon={previousPokemon} keys={keys} /> : null}
            </div>
            <div className="pokedex-right">
                {pokemon ? <RightPokedex pokemon={pokemon} changePokemon={changePokemon} lastPokemon={lastPokemon} keys={keys} /> : null}
            </div>
        </div>
    );
}

export default Pokedex;
