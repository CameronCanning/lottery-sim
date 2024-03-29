import React, { useState, useEffect } from 'react';
import { draw, calcMatches } from './Lottery.js';
import BallContainer from './BallContainer.js';
import Ticket from './Ticket.js';
import PayoutTable from './PayoutTable.js';
import { ThemeProvider } from 'styled-components';
import TitleBar from './TitleBar.js';
import ControlPanelLeft from './ControlPanelLeft.js';
import ControlPanelRight from './ControlPanelRight.js';

import {StyledApp,
        AppContainer,
        ColumnContainer,
        ControlPanel,} 
        from './appStyles.js';

const themes = {
    light: {
        id: 'light',
        primary: '#fab1a0',
        secondary: '#000000',
        font1: '#525252',
        font2: '#525252',
        bg1: '#ffffff',
        bg2: '#f5f5f5',
        bg3: '#e6e6e6'
    },
    dark: {
        id: 'dark',
        primary: '#fab1a0',
        secondary: '#f5f5f5',       
        font1: '#f5f5f5',
        font2: '#525252',
        bg1: '#313131',
        bg2: '#414141',
        bg3: '#525252',
    }
}        

function App() {
    const [numBalls, setNumBalls] = useState(6);
    const [range, setRange] = useState(49);
    const [totalDraws, setTotalDraws] = useState(1);
    const [remainingDraws, setRemainingDraws] = useState(1);
    const [draws, setDraws] = useState([...Array(numBalls)].fill('-'));
    const [picks, setPicks] = useState(draw(numBalls, range));
    const [matches, setMatches] = useState(new Set());
    const [payouts, setPayouts] = useState([0, 0, 3, 10, 100, 2500, 10000000]);
    const [quickPick, setQuickPick] = useState(true);
    const [price, setPrice] = useState(3);
    const [results, setResults] = useState([...Array(numBalls + 1)].fill(0));
    const [total, setTotal] = useState(0);
    const [speed, setSpeed] = useState(1);
    const [drawing, setDrawing] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [theme, setTheme] = useState(themes.light);
    document.body.style.backgroundColor = theme.bg1;
   
    const doDraw = () => {
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
        setRemainingDraws(remainingDraws => remainingDraws - 1);
        setDraws(currentDraws);
        setMatches(matches)   
    };
    const drawControl = (count) => {
        if (picks.size < numBalls && !quickPick) {
            alert('Please pick 6 numbers or select quickpick.');
        }
        else if (count < 1) return;
        else if (count == 1) {
            doDraw();
            stopDraw();
        }
        else {
            setDrawing(true);
            doDraw();
            count = count - 1;
            const id = setInterval(() => {
                doDraw();
                count = count - 1;
                if (count < 1) {
                    stopDraw(true, id);
                }
            }, 1000 / speed);
            setIntervalId(id);
        }
    };
    const onClickDraw = () => { 
        drawing ? stopDraw(false) : drawControl(remainingDraws)
    };

    const stopDraw = (reset = true, id = intervalId) => {
        setDrawing(false);
        clearInterval(id);
        if (reset){
            setRemainingDraws(totalDraws);
        }
            
    };
    const handleInputChange = ( e ) => {
        let num = e.target.value;
        if (num < 0){
            num = 1;
        }
       setRemainingDraws(num);
       setTotalDraws(num);
    };
    const onClickReset = () => {
        stopDraw();
        setDraws([...Array(numBalls)].fill('-'));
        setResults([...Array(numBalls + 1)].fill(0));
        setTotal(0);
        setRemainingDraws(totalDraws)
    };
    const formatTotal = () => {
        if (total < 0){
            
            return '-$' + (total*-1).toLocaleString();
        }
        else{
            return '$' + total.toLocaleString();    
        }
    };
    const cplProps = {
        onClickDraw,
        onClickReset,
        drawing,
        remainingDraws,
        formatTotal
    };
    const cprProps = {
        speed,
        setSpeed,
        drawing,
        remainingDraws,
        totalDraws,
        handleInputChange,
        theme,
        setQuickPick,
        quickPick
    };
    return (
        <ThemeProvider theme={theme}>
        <StyledApp>        
            <TitleBar 
                onChange = { () => theme.id === 'light' ? setTheme(themes.dark) : setTheme(themes.light)}
                theme = { theme } />
            <BallContainer 
                numBalls={numBalls} 
                draws={draws} 
                matches={matches}/>
            <AppContainer>
                <ColumnContainer>
                    <ControlPanel>
                        <ControlPanelLeft {...cplProps}/> 
                        <ControlPanelRight {...cprProps}/>
                    </ControlPanel>
                    <PayoutTable payouts={payouts} results={results} numBalls={numBalls} />
                </ColumnContainer>
                <Ticket range={range} numBalls={numBalls} picks={picks} setPicks={setPicks} drawing={drawing}/>
            </AppContainer>
        </StyledApp>
        </ThemeProvider>
    );
}

export default App;
