import React, { useState, useEffect } from 'react';
import { draw } from './Lottery';

function Cell({ value, picks, numBalls, setPicks }){
    const [pressed, setPressed] = useState(0);
    const style = {
        width: '50px',
        height: '50px',
        border: '1px solid black',
        margin: '2px',
        borderRadius: 3,
        fontSize: 30, 
        lineHeight: '50px',    
        backgroundColor: pressed ? '#fab1a0' : '#f5f5f5',    
    }
    
    const onClick = () => {
        if (!picks.has(value)){
            if(picks.size < numBalls){
                const tempPicks = new Set([...picks]);
                tempPicks.add(value);
                setPicks(tempPicks)
                setPressed(1);
            }
        }
        else {
            const tempPicks = new Set([...picks]);
            tempPicks.delete(value);
            setPicks(tempPicks);
            setPressed(0);
        }
    }
    return(
        <div style={ style } onClick={ onClick }>
            {value < 10 ? '0'+value : value }
        </div>
    );
}

export default Cell;