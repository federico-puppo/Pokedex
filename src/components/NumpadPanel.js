import React from 'react';

const { useState, useEffect } = React;
const pokemonLimit = 898
const minId = 1

const NumpadPanel = ({ changePokemon, keys }) => {

    const [number, setNumber] = useState();
    const [currentNumber, setCurrentNumber] = useState("");

    //KEYBOARD EVENTS
    useEffect(() => {
        if (keys === null) return
        handleKeyDown(keys);
    }, [keys]);

    //KEYBOARD SHORTCUTS
    function handleKeyDown(key) {
        if (key === "1" || key === "2" || key === "3" || key === "4" || key === "5" ||
            key === "6" || key === "7" || key === "8" || key === "9" || key === "0") {
            acumulateNumber(key);
        }
    }

    //ACUMULATE INPUT UP TO 3 DIGITS NUMBER
    const acumulateNumber = (num) => {
        const digits = parseInt(currentNumber.length)
        if (digits < 1) {
            setCurrentNumber(num)
        }
        if (digits <= 2) {
            setCurrentNumber(currentNumber + num)
        }
    }

    //CHECKS IF ID IS IN RANGE
    function checkId(num) {
        let id
        if (num <= pokemonLimit && num >= 0) {
            id = num;
        }
        if (num > pokemonLimit) {
            id = pokemonLimit;
        }
        if (num <= 0) {
            id = minId;
        }
        return id
    }

    //CHECK IF INPUT IS READY TO PROCESS
    useEffect(() => {
        if (currentNumber === "") return
        const digits = parseInt(currentNumber.length)
        if (digits === 3) {
            setNumber(currentNumber);
        }
    }, [currentNumber]);

    //SET ID TO CHANGE POKEMON
    useEffect(() => {
        if (number === undefined) return
        const id = checkId(parseInt(number));
        deployPokemonChange(id)
    }, [number]);

    //CHANGE THE CURRENT POKEMON AND RESET INPUT
    function deployPokemonChange(id) {
        changePokemon(id);
        setNumber(undefined);
        setCurrentNumber("");
    }


    return (
        <>
            <div className='block numpad-grid'>
                <button className="btn-numpad" data-toggle="tooltip" data-placement="bottom" title="1" onClick={() => acumulateNumber(1)}>1</button>
                <button className="btn-numpad" data-toggle="tooltip" data-placement="bottom" title="2" onClick={() => acumulateNumber(2)}>2</button>
                <button className="btn-numpad" data-toggle="tooltip" data-placement="bottom" title="3" onClick={() => acumulateNumber(3)}>3</button>
                <button className="btn-numpad" data-toggle="tooltip" data-placement="bottom" title="4" onClick={() => acumulateNumber(4)}>4</button>
                <button className="btn-numpad" data-toggle="tooltip" data-placement="bottom" title="5" onClick={() => acumulateNumber(5)}>5</button>
                <button className="btn-numpad" data-toggle="tooltip" data-placement="bottom" title="6" onClick={() => acumulateNumber(6)}>6</button>
                <button className="btn-numpad" data-toggle="tooltip" data-placement="bottom" title="7" onClick={() => acumulateNumber(7)}>7</button>
                <button className="btn-numpad" data-toggle="tooltip" data-placement="bottom" title="8" onClick={() => acumulateNumber(8)}>8</button>
                <button className="btn-numpad" data-toggle="tooltip" data-placement="bottom" title="9" onClick={() => acumulateNumber(9)}>9</button>
                <button className="btn-numpad" data-toggle="tooltip" data-placement="bottom" title="0" onClick={() => acumulateNumber(0)}>0</button>
            </div>
            <div>

            </div>
        </>
    );

}

export default NumpadPanel;