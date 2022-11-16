import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pokedex from "./components/Pokedex";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";


function App() {
    const { useEffect, useState } = React;
    const [key, setKey] = useState(null)

    useEffect(() => {
        document.addEventListener('keydown', detectKeyDown, true)
        document.addEventListener('keyup', clearKey, true)        
        return () => {
            document.removeEventListener('keydown', detectKeyDown)
            document.removeEventListener('keyup', clearKey)
        }
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
                <NavBar/>
                <Pokedex keys={key} />
                <Footer />
            </div>
        </>
    )
}

export default App