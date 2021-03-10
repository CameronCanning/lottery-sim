import React, { useState, useEffect } from 'react';
import { draw, calcMatches } from './Lottery.js';
import './App.css';
import BallContainer from './BallContainer.js';
import Ticket from './Ticket.js';
import PayoutTable from './PayoutTable.js';


function App() {
    //setup state
    const [numBalls, setNumBalls] = useState(6);
    const [range, setRange] = useState(49);
    const [numDraws, setNumDraws] = useState(1);
    //lottery state
    const [draws, setDraws] = useState([...Array(numBalls)].fill('-'));
    const [picks, setPicks] = useState(draw(numBalls, range));
    const [matches, setMatches] = useState(new Set());
    const [payouts, setPayouts] = useState([0, 0, 3, 10, 100, 2500, 10000000]);
    const [quickPick, setQuickPick] = useState(false);
    //winnings
    const [price, setPrice] = useState(3);
    const [results, setResults] = useState([...Array(numBalls + 1)].fill(0));
    const [total, setTotal] = useState(0);
    const [speed, setSpeed] = useState(1);
    const [drawing, setDrawing] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    const doDraw = (count) => {
        setDrawing(true);

        const test = setInterval(() => {
            let currentPicks;
            quickPick ? currentPicks = draw(numBalls, range) : currentPicks = picks;
            setPicks(currentPicks);
            let currentDraws = draw(numBalls, range);
            let matches = calcMatches(currentDraws, currentPicks);
            
            setResults((results) => {
                const tempResults = [...results];
                tempResults[matches.size] += 1;
                return tempResults;
            });

            setTotal(total => total - price + payouts[matches.size]);
            setDraws(currentDraws);
            setMatches(matches)

            count = count - 1;
            console.log(count);
            if (count < 1) {
                setDrawing(false);
                clearInterval(test);
            }

        }, 1000 / speed);
        setIntervalId(test);        
    };

    const stopDraw = () => {
        setDrawing(false);
        clearInterval(intervalId);
    }

    const style1 = {
        display: 'flex',
    }

    const style2 = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

    }

    const handleChange = ( event ) => {
        setSpeed(event.target.value);
    }
    
    return (
        <div className="App">
            <h1>Lottery Sim</h1>
            <BallContainer numBalls={numBalls} draws={draws} matches={matches}/>
            <div style={style1}>
                <Ticket range={range} numBalls={numBalls} picks={picks} setPicks={setPicks} />
                <div style={style2}>
                    <div className='control-panel'>
                        <h2 style={{ fontSize: '24px', }}>{'Total $' + total.toLocaleString()}</h2>
                        <input type='range' min={1} max={25} step={1} value={speed} onChange={handleChange}/>
                        
                        <button onClick={() => { 
                            drawing ? stopDraw() : doDraw(numDraws) }}>{drawing && numDraws  ? 'Stop' : 'Draw'}</button>
                        <button onClick={() => {  }}>Draw</button>
                        <button onClick={() => { doDraw(100) }}>Draw</button>
                        <input type='number' min={1} value={numDraws} onChange={e => setNumDraws(e.target.value)}/>
                        <input type='checkbox' onChange={e => {setQuickPick(e.target.checked)}}/>
                        <label>Quickpick</label>
                    </div>
                    <PayoutTable payouts={payouts} results={results} numBalls={numBalls} />
                </div>
            </div>
        </div>
    );
}

export default App;
