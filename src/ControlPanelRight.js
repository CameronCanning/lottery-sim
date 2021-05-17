import React from 'react';
import styled from 'styled-components';
import Panel from './Panel';
import Slider from 'react-input-slider';
import Switch from 'react-switch';

const PanelWrapper = styled(Panel)`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 70%;
    text-align: center;
    padding: 5px;
`
const ControlTD = styled.td`
    text-align: center;
    width: 100%;
`
const LabelTD = styled.td`
    text-align: left;
    width: 0;
    white-space: nowrap;
`
const StyledLabel = styled.p`
    font-weight: bold;
    font-size: 1.25em;
    margin: 10px;
    ${props => props.first ? 'margin-top: 5px': ''};
`
const StyledInput = styled.input`
    font-size: 24px;
    height: 25%;
    text-align: center;
    width: 70%;
    margin: auto;
    border: 2px solid ${props => props.theme.primary};
    opacity: ${props => props.drawing ? '0.5' : '1'};
    background-color: ${props => props.theme.bg3};
    border-radius: 5px;
    color: ${props => props.theme.font1};
    &:focus {
        outline: none;
        border: 2px solid ${props => props.theme.primary};
        box-shadow: 0 0 4px ${props => props.theme.primary};
    }
    ::-webkit-inner-spin-button{
        -webkit-appearance: none; 
        margin: 0; 
    }
    ::-webkit-outer-spin-button{
        -webkit-appearance: none; 
        margin: 0; 
    }   
    &:input[type=number] {
        -moz-appearance: textfield;
    }
}
`

export default function ControlPanelRight({speed, setSpeed, drawing, remainingDraws, totalDraws, handleInputChange, theme, setQuickPick, quickPick}){
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
    return(
        <PanelWrapper>
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
        </PanelWrapper>
    )
}