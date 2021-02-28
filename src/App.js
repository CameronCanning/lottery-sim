import React, { useState, useEffect } from 'react';
import Ball from './Ball.js';
import { draw, calcMatches } from './Lottery.js';
//import { lotteries } from './lotteries.js'
import './App.css';
import BallContainer from './BallContainer.js';


function App() {
  //setup state
  const [numBalls, setNumBalls] = useState(6);
  const [range, setRange] = useState(49);
  const [bonus, setBonus] = useState(0);
  const [numDraws, setNumDraws] = useState(1);
  //lottery state
  const [draws, setDraws] = useState([...Array(numBalls)].fill('-'));
  const [bonusDraw, setBonusDraw] = useState(0);
  //const [picks, setPicks] = useState(new Set());
  const [picks, setPicks] = useState(new Set([1,2,3,4,5,6]));
  const [bonusPick, setBonusPick] = useState(0);
  const [matches, setMatches] = useState(new Set());
  const [payouts, setPayouts] = useState([0,0,3,10,100,2500,100000,10000000])
  //winnings
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);

  const drawBalls = [...Array(numBalls).keys()].map((id) => {
    let _value = [...draws][id];
    return <Ball key={id} value={_value} isMatch={matches.has(_value)}/>;
  });
    
  const doDraw = () => {
    let [currentDraws, currentBonusDraw] = draw(numBalls, range, bonus);
    let matches = calcMatches(currentDraws, picks);
    setDraws(currentDraws);
    setBonusDraw(currentBonusDraw);
    setMatches(matches);
  }
  /** 
  useEffect(()=>{
    const interval = setInterval(() => {      
      setDraws(draw(numBalls, range, bonus));
      console.log(draws);
    }, 1000);
    return () => clearTimeout(interval);
  });
  */

  return (
    <div className="App">
        <BallContainer balls={ drawBalls }/>
        <p>{total}</p>
        <p>{[...picks]}</p>
        <button onClick={doDraw}>Draw</button>
        <button onClick={() => setNumBalls(numBalls + 1)}>+ Ball</button>
        <button onClick={() => setNumBalls(numBalls - 1)}>- Ball</button>
    </div>
  );
}

export default App;
