import React, { useState, useEffect } from 'react';
import { draw, calcMatches } from './Lottery.js';
import './App.css';
import BallContainer from './BallContainer.js';
import Ticket from './Ticket.js';
import PayoutTable from './PayoutTable.js';
import { ThemeProvider } from 'styled-components';
import TitleBar from './TitleBar.js';
import Slider from 'react-input-slider';
import Switch from 'react-switch';
import {StyledApp,
        AppContainer,
        ColumnContainer,
        ControlPanel,
        ControlPanelLeft,
        ControlPanelRight,
        StyledButton,
        StyledLabel,
        StyledInput,} 
        from './appStyles.js';


const theme = {
    primary: '#fab1a0',
    secondary: '#f5f5f5',
    bg1: '#f5f5f5',
    bg2: '#ffffff',
}

const sliderStyles = {
    track: {
        backgroundColor: theme.secondary,
        width: '70%',
        margin: 'auto',
    },
    active: {
        backgroundColor: theme.primary,
    },    
    thumb: {
        backgroundColor: theme.primary,
        boxShadow: 'none',
    }
};

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
        if (picks.size < numBalls) {
            alert('Please pick your numbers or select quickpick.');
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
                    stopDraw(id);
                }
            }, 1000 / speed);
            setIntervalId(id);
        }
    };

    const onClickDraw = () => { 
        drawing ? stopDraw() : drawControl(remainingDraws)
    };

    const stopDraw = (id = intervalId) => {
        setDrawing(false);
        clearInterval(id);
        setRemainingDraws(totalDraws);
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
    };
    const formatTotal = () => {
        if (total < 0){
            
            return '-$' + (total*-1).toLocaleString();
        }
        else{
            return '$' + total.toLocaleString();    
        }
    }

    const switchProps = {
        onChange: ()=>setQuickPick( x => !x),
        checked: quickPick,
        uncheckedIcon: false,
        checkedIcon: false,
        offColor: theme.secondary,
        onColor: theme.primary,
        offHandleColor: theme.secondary,
        onHandleColor: theme.primary,
        handleDiameter: 18,
        height: 10,
        width: 28,
        activeBoxShadow: 'none',
    }

    return (
        <ThemeProvider theme={theme}>
        <StyledApp>        
            <TitleBar/>
            <BallContainer numBalls={numBalls} draws={draws} matches={matches}/>
            <AppContainer>
                <ColumnContainer>
                    <ControlPanel>
                        <ControlPanelLeft>
                            <h2 style={{ fontSize: '24px', margin: '10px' }}>{'Total'}</h2>
                            <h2 style={{ fontSize: '24px', margin: '10px', marginTop:'0' }}>{formatTotal()}</h2>      
                            <StyledButton primary onClick={onClickDraw}>
                                {drawing && remainingDraws ? 'Stop' : 'Draw'}
                            </StyledButton>
                            <StyledButton onClick={onClickReset}>
                                {'Reset'}
                            </StyledButton>
                        </ControlPanelLeft>
                        <ControlPanelRight>
                            <StyledLabel htmlFor='speed'>Speed</StyledLabel>
                            <Slider id='speed' styles={sliderStyles} axis='x' xmin={1} xmax={25} x={speed} onChange={ ({x}) => setSpeed(x)}/>
                            <StyledLabel htmlFor='draws'>Draws</StyledLabel>
                            <StyledInput 
                                id='draws' 
                                type='number' 
                                min={1} 
                                max={10000} 
                                value={remainingDraws === totalDraws ? totalDraws : remainingDraws} 
                                onChange={handleInputChange}
                                disabled={drawing ? true : false}/>
                            <StyledLabel>Quickpick</StyledLabel>
                            <div>
                                <Switch {...switchProps}/>
                            </div>
                        </ControlPanelRight>
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
