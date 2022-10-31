import React from 'react';
import Display from './Display';
import TextPanel from './TextPanel';

const { useState, useEffect } = React;

const LeftPokedex = ({ pokemon, nextPokemon, previousPokemon, keys }) => {

    const [front, setFront] = useState(true);
    const [shiny, setShiny] = useState(false);
    const [female, setFemale] = useState(false);

    //TOGGLES
    const toggleFront = () => {
        setFront(!front);
    }
    const toggleShiny = () => {
        setShiny(!shiny);
    }
    const toggleGender = () => {
        setFemale(!female);
    }

    //KEYBOARD EVENTS
    useEffect(() => {
        if (keys ===null) return
            handleKeyDown(keys);
    }, [keys]);

    //KEYBOARD SHORTCUTS
    function handleKeyDown(key) {
        if (key === "r")
            toggleFront();
        if (key === "g")
            toggleGender();
        if (key === "f")
            toggleShiny();
    }

    return (
        <>
            <div className='block' style={{ height: "380px" }}>
                {pokemon ? <Display pokemon={pokemon} shiny={shiny} female={female} front={front} /> : "NO DATA"}
            </div>
            <div className='block' style={{ height: "167px" }}>
                <button className="btn-shiny" data-toggle="tooltip" data-placement="bottom" title="Shiny" onClick={toggleShiny}></button>
                <button className="btn-gender" data-toggle="tooltip" data-placement="bottom" title="Gender" onClick={toggleGender}></button>
                <button className="btn-rotate" data-toggle="tooltip" data-placement="bottom" title="Rotate" onClick={toggleFront}>↻</button>
                <button className="btn-up" data-toggle="tooltip" data-placement="bottom" title="Next Pokemon" onClick={nextPokemon}>▲</button>
                <button className="btn-down" data-toggle="tooltip" data-placement="bottom" title="Previous Pokemon" onClick={previousPokemon}>▼</button>
                {pokemon ? <TextPanel props={pokemon} keys={keys} /> : "NO DATA"}
            </div>
        </>
    );
}

export default LeftPokedex;
