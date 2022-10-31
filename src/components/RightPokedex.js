import React from 'react';
import StatPanel from './StatPanel';
import TypePanel from './TypePanel';
import NumpadPanel from './NumpadPanel';
import EvolutionPanel from './EvolutionPanel';

const RightPokedex = ({ pokemon, changePokemon, lastPokemon, keys }) => {

    return (
        <>
            <div className='block' style={{ height: "110px" }}>
                {pokemon ? <TypePanel props={pokemon.types} /> : "NO DATA"}
            </div>
            <div className='block' style={{ height: "140px" }}>
                {pokemon ? <StatPanel props={pokemon.stats} /> : "NO DATA"}
            </div>
            <div className='block' style={{ height: "80px" }}>
                {pokemon ? <NumpadPanel changePokemon={changePokemon} keys={keys} /> : "NO DATA"}
            </div>
            <div className='block' style={{ height: "80px" }}>
                {pokemon ? <EvolutionPanel lastPokemon={lastPokemon} keys={keys} /> : "NO DATA"}
            </div>
        </>
    );
}

export default RightPokedex;