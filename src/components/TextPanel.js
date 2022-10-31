import React from 'react';
const { useEffect, useState } = React;

const TextPanel = ({ props, keys }) => {

    const [flavorText, setflavorText] = useState([]);
    const [index, setIndex] = useState(0);


    useEffect(() => {
        setflavorText(props.flavor_text)
        setIndex(0)
    }, [props])

    //NEXT FLAVOR TEXT
    const nextFlavorText = () => {
        try {
            const nextIndex = index + 1
            if (index < flavorText.length - 1) {
                setIndex(nextIndex);
            }
            else {
                setIndex(0)
            }
        } catch (err) {
            console.log(err)
        }
    };

    //PREVIOUS FLAVOR TEXT
    const previousFlavorText = () => {
        try {
            const prevIndex = index - 1
            if (index > 0) {
                setIndex(prevIndex);
            }
            else {
                setIndex(flavorText.length-1)
            }
        } catch (err) {
            console.log(err)
        }
    };

        //KEYBOARD EVENTS
        useEffect(() => {
            if (keys ===null) return
                handleKeyDown(keys);
        }, [keys]);
    
        //KEYBOARD SHORTCUTS
        function handleKeyDown(key) {
            if (key === "d" || key === "ArrowRight")
                nextFlavorText();
            if (key === "a" || key === "ArrowLeft")
                previousFlavorText();
        }

    return (
        <> <div>
            <button className="btn-left" data-toggle="tooltip" data-placement="bottom" title="Previous description" onClick={previousFlavorText}>◄</button>
            <button className="btn-right" data-toggle="tooltip" data-placement="bottom" title="Next description" onClick={nextFlavorText}>►</button>
        </div>
            <div className="text-box">
                <p>{flavorText[index]}</p>
            </div>

        </>
    )
}


export default TextPanel;