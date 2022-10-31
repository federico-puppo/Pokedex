import React from 'react';
const { useEffect, useState } = React;

const StatPanel = ({ props }) => {

    const [stats, setStats] = useState();

    useEffect(() => {
        setStats(props)
    }, [props])

    return (<>
        <u className='stats-title'>BASE STATS</u>
        {stats ? (
            <ul className='stats-box'> {stats.map((stat) => (
                <li key={stat.name}><p className="stat-name">{stat.name}</p>
                    <p className="stat-value">{stat.valor}</p></li>
            ))}</ul>) : "NO DATA"}
    </>
    )
}

export default StatPanel;