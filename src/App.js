import React from "react";
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pokedex from "./components/Pokedex";
import Footer from "./components/Footer";


function App() {
    const { useEffect, useState } = React;
    const [key, setKey] = useState(null)

    useEffect(() => {
        document.addEventListener('keydown', detectKeyDown, true)
        document.addEventListener('keyup', clearKey, true)
    }, []);


    function detectKeyDown(e) {
        if (e.repeat) return
        if (e.key === " " || e.code === "Space" || e.keyCode === 32) {
            setKey(e.code);
        }
        else {
            setKey(e.key)
        }
        //console.log(e.key);
    }

    function clearKey() {
        setKey(null)
    }


    return (
        <>
            <div className="App">
                <h1 style={{ textAlign: "center" }}>Pokedex</h1>
                <Pokedex keys={key} />
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}

export default App