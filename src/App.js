import React, { useState, useEffect } from 'react';
import Ball from './Ball.js';
import { draw, calcMatches } from './Lottery.js';
//import { lotteries } from './lotteries.js'
import './App.css';
import BallContainer from './BallContainer.js';
import Ticket from './Ticket.js';
import PayoutTable from './PayoutTable.js';


function App() {
  //setup state
  const [numBalls, setNumBalls] = useState(6);
  const [range, setRange] = useState(49);
  const [numDraws, setNumDraws] = useState(0);
  //lottery state
  const [draws, setDraws] = useState([...Array(numBalls)].fill('-'));
  const [bonusDraw, setBonusDraw] = useState(0);
  const [picks, setPicks] = useState(new Set([1,2,3,4,5,6]));
  const [bonusPick, setBonusPick] = useState(0);
  const [matches, setMatches] = useState(new Set());
  const [payouts, setPayouts] = useState([0,0,3,10,100,2500,10000000])
  //winnings
  const [price, setPrice] = useState(3);
  const [results, setResults] = useState([...Array(numBalls+1)].fill(0));
  const [total, setTotal] = useState(0);

  const drawBalls = [...Array(numBalls).keys()].map((id) => {
    let _value = [...draws][id];
    return <Ball key={ id } value={ _value } isMatch={ matches.has(_value) }/>;
  });
    
  const doDraw = (count) => {
      
      const test = setInterval(() => {
      if (count > 0){
        let [currentDraws, currentBonusDraw] = draw(numBalls, range);
        let matches = calcMatches(currentDraws, picks);

        //const tempResults = [...results];
        //tempResults[matches.size] += 1;
        //setResults(tempResults);
        setResults((results) => {
          const tempResults = [...results];
          tempResults[matches.size] += 1;
          return tempResults;
        });

        setTotal(total => total - price + payouts[matches.size]);
        setDraws(currentDraws);
        setBonusDraw(currentBonusDraw);
        setMatches(matches)
        count = count - 1;
      }
      
    } , 1);
    //clearInterval(test);
  }
  
  

  const style1 = {
    display: 'flex',
  }

  const style2 = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

  }
  return (
    <div className="App">
        <h1>Lottery Sim</h1>
        <BallContainer balls={ drawBalls }/>
        <div style={style1}>
          <Ticket range={ range } numBalls={ numBalls } picks={ picks } setPicks={ setPicks }/>
          <div style={style2}>
            <h2 style={{fontSize: '24px', }}>{'Total $'+total.toLocaleString()}</h2>
            <button onClick={ () => { doDraw(1000) } }>Draw</button>
            <PayoutTable payouts={ payouts } results={ results } numBalls={ numBalls }/>
          </div>
          
        </div>
        
        
    </div>
  );
}

export default App;
