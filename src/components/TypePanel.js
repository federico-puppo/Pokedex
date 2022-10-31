import React from 'react';

const { useEffect, useState } = React;

const TypePanel = ({ props }) => {

    const [types, setTypes] = useState();

    const images = importAll(require.context("../images/types/", false, /\.(png|jpe?g|svg)$/));

    useEffect(() => {
        setTypes(props)
    }, [props])

        //IMPORT ALL IMAGES FROM A ROUTE FUNCTION
        function importAll(r) {
            let images = {};
            r.keys().map((item, index) => { return images[item.replace('./', '')] = r(item);
            });
            return images;
        }
    //---------------------------------------
    return (<>
        {types ? (<ul className='types-box'> {types.map((type) => (
            < li key={type.name} > <img src={images[`${type.name}.png`]} className="type-card" alt={type.name} /></li>
        ))}</ul>) : ("NO DATA")
        }
    </>
    )
}

export default TypePanel;