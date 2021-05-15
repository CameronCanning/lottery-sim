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
        StyledInput,
        ControlTD,
        LabelTD} 
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
        //setRemainingDraws(totalDraws);
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
        onChange: () => setQuickPick( x => !x ),
        checked: quickPick,
        uncheckedIcon: false,
        checkedIcon: false,
        offColor: theme.bg3,
        onColor: theme.primary,
        offHandleColor: theme.bg3,
        onHandleColor: theme.primary,
        handleDiameter: 18,
        height: 10,
        width: 28,
        activeBoxShadow: 'none',
    }

    const sliderStyles = {
        track: {
            backgroundColor: theme.bg3,
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
    
    return (
        <ThemeProvider theme={theme}>
        <StyledApp>        
            <TitleBar 
                onChange = { () => theme.id === 'light' ? setTheme(themes.dark) : setTheme(themes.light)}
                theme = { theme } />
            <BallContainer numBalls={numBalls} draws={draws} matches={matches}/>
            <AppContainer>
                <ColumnContainer>
                    <ControlPanel>
                        <ControlPanelLeft> 
                            <h1 style={{ fontSize: '2em', margin: '10px', marginTop:'0', fontWeight: 'bold'}}>{formatTotal()}</h1>
                            <StyledButton primary onClick={onClickDraw}>
                                {drawing && remainingDraws ? 'Stop' : 'Draw'}
                            </StyledButton>
                            <StyledButton onClick={onClickReset}>
                                {'Reset'}
                            </StyledButton>
                        </ControlPanelLeft>
                        <ControlPanelRight>
                                <table>
                                    <tr>
                                        <LabelTD>
                                            <StyledLabel first>Speed</StyledLabel>
                                        </LabelTD>
                                        <ControlTD>
                                            <Slider 
                                                id='speed' 
                                                styles={sliderStyles} 
                                                axis='x' 
                                                xmin={1} 
                                                xmax={20} 
                                                x={speed} 
                                                onChange={ ({x}) => setSpeed(x)}
                                                disabled={drawing ? true : false}/>
                                        </ControlTD>
                                    </tr>
                                    <tr>
                                        <LabelTD>
                                            <StyledLabel>Draws</StyledLabel>
                                        </LabelTD>
                                        <ControlTD>
                                            <StyledInput                                                 
                                                id='draws' 
                                                type='number' 
                                                min={1} 
                                                max={10000} 
                                                value={remainingDraws === totalDraws ? totalDraws : remainingDraws} 
                                                onChange={handleInputChange}
                                                disabled={drawing ? true : false}
                                                drawing = {drawing}/>
                                        </ControlTD>
                                    </tr>
                                    <tr>
                                        <LabelTD>
                                            <StyledLabel>Quickpick</StyledLabel>
                                        </LabelTD>
                                        <ControlTD>
                                            <div style={{width: '100%', paddingTop:'4px'}}>
                                            <Switch disabled={drawing ? true : false} {...switchProps}/>
                                            </div>
                                        </ControlTD>
                                    </tr>
                                </table>
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
