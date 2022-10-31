import React from 'react';
//const { useState } = React;

const EvolutionPanel = ({ lastPokemon,keys }) => {

    //const [stats, setStats] = useState();


    return (<>
                <button className="btn-return" data-toggle="tooltip" data-placement="bottom" title="Return" onClick={lastPokemon}>🢀</button>
    </>
    )
}

export default EvolutionPanel;