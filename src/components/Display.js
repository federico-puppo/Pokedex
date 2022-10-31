import React from "react";

const { useEffect, useState } = React;
const maleIcon = "♂️";
const femaleIcon = "♀️";
const shinyIcon = "✨";
const frontIcon = "↻";

const Display = ({ pokemon, shiny, female, front }) => {

    const [imgSrc, setImgSrc] = useState("");
    const [url, setUrl] = useState("");

    function buildImageUrl() {
        let spriteName
        const dir = front ? "front_" : "back_";
        const shine = shiny ? "shiny" : "";
        const gender = female ? "female" : "";
        if (!shiny && !female) {
            spriteName = (dir+"default")            
        }
        else if(shiny && !female){
            spriteName = (dir+shine)
        }
        else if(!shiny && female){
            spriteName = (dir+shine+gender)
        }
        else if(shiny && female){
            spriteName = (dir+shine+"_"+gender)
        }
        setUrl(pokemon.sprites[spriteName])
    }

    useEffect(() => {
        buildImageUrl()
        // eslint-disable-next-line
    }, [pokemon, shiny, front, female])

    useEffect(() => {
        setImgSrc(url)
        // eslint-disable-next-line
    }, [url])

    return (
        <>
            {pokemon ? (<img src={imgSrc} className='figure-img' alt={pokemon.name}/>):("NO DATA")}
            <p className='pokemon-name' >{pokemon ? pokemon.name : "NO DATA"}</p>
            <p className='pokemon-gender' >{female ? femaleIcon : maleIcon}</p>
            <p className='pokemon-shiny' >{shiny ? shinyIcon : "·"}</p>
            <p className='pokemon-front' >{front ? "·" : frontIcon}</p>
            <p className='pokemon-id' >{pokemon ? "#"+pokemon.id : "·"}</p>
        </>)
}

export default Display;
