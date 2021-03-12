import React, { useState, useEffect } from 'react';
import { draw, calcMatches } from './Lottery.js';
import './App.css';
import BallContainer from './BallContainer.js';
import Ticket from './Ticket.js';
import PayoutTable from './PayoutTable.js';
import styled, { ThemeProvider } from 'styled-components';
import TitleBar from './TitleBar.js';
import Panel from './Panel.js';
import Slider from 'react-input-slider';

const theme = {
    primary: '#fab1a0',
    secondary: '#f5f5f5',
    bg1: '#f5f5f5',
    bg2: '#ffffff',
}

const sliderStyles = {
    track: {
        backgroundColor: theme.primary,
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

const StyledApp = styled.div`
    width: 1000px;
    margin: auto;
`
const AppContainer = styled.div`
    display: flex;
`
const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 70%;
`

const ControlPanel = styled.div`
    display: flex;
    !#background-color: ${props => props.theme.bg2};
    border-radius: 10px;
    min-height: 170px;
`

const ControlPanelLeft = styled(Panel)`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 30%;
    text-align: center;
    padding: 10px;
`
const ControlPanelRight = styled(Panel)`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 70%;
    text-align: center;
    padding: 10px;
`
const StyledButton = styled.button`
    background-color: ${props => props.primary ? props.theme.primary : props.theme.secondary};
    color: ${props => props.primary ? props.theme.secondary : 'black'};
    min-height: 40px;
    outline: none;
    width: 70%;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 5px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    text-decoration: none;
    font-weight: bold;
    text-align: center;
    transition: filter 0.3s;
    &:hover{
        cursor: pointer;
        filter: contrast(95%);
    }
    &:active{
        filter: contrast(70%);
    }
`
const StyledLabel = styled.label`
    font-weight: bold;
    font-size: 24px;
    margin:10px;
`

const StyledInput = styled.input`

`

const StyledCheckBox = styled.input`

`

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
        if (count < 1) return;
        setDrawing(true);
        const id = setInterval(() => {
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
                stopDraw(id);
            }

        }, 1000 / speed);
        setIntervalId(id);        
    };

    const stopDraw = (id = intervalId) => {
        setDrawing(false);
        clearInterval(id);
    };

    const handleInputChange = ( e ) => {
        let num = e.target.value;
        if (num < 0){
            num = 1;
        }
       setNumDraws(num);
    };

    const onClickDraw = () => { 
        drawing ? stopDraw() : doDraw(numDraws)
    };

    const onClickReset = () => {
        stopDraw();
        setDraws([...Array(numBalls)].fill('-'));
        setResults([...Array(numBalls + 1)].fill(0));
        setTotal(0);
    };
    const formatTotal = () => {
        if (total < 0){
            return '-$' + total.toLocaleString()*-1;
        }
        else{
            return '$' + total.toLocaleString();    
        }
        
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
                            <StyledButton primary onClick={onClickDraw}>{drawing && numDraws  ? 'Stop' : 'Draw'}</StyledButton>
                            <StyledButton onClick={onClickReset}>{'Reset'}</StyledButton>
                        </ControlPanelLeft>
                        <ControlPanelRight>
                            <StyledLabel htmlFor='speed'>Speed</StyledLabel>
                            <Slider id='speed' styles={sliderStyles} axis='x' xmin={1} xmax={25} x={speed} onChange={ ({x}) => setSpeed(x)}/>
                            
                            <input style={{height:'50%', fontSize: '24px'}} type='number' min={1} max={10000} value={numDraws} onChange={handleInputChange}/>
                            <input type='checkbox' onChange={e => {setQuickPick(e.target.checked)}}/>
                            <StyledLabel>Quickpick</StyledLabel>
                        </ControlPanelRight>
                    </ControlPanel>
                    <PayoutTable payouts={payouts} results={results} numBalls={numBalls} />
                </ColumnContainer>
                <Ticket range={range} numBalls={numBalls} picks={picks} setPicks={setPicks} />
            </AppContainer>
        </StyledApp>
        </ThemeProvider>
    );
}

export default App;
