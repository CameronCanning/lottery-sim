import React from 'react';
import styled from 'styled-components';
import Panel from './Panel';

const PanelWrapper = styled(Panel)`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 30%;
    text-align: center;
`
const StyledButton = styled.button`
    background-color: ${props => props.primary ? props.theme.primary : props.theme.bg3};
    color: ${props => props.primary ? props.theme.font2 : props.theme.font1};
    min-height: 35px;
    outline: none;
    width: 70%;
    margin: auto;
    margin-top: 0;
    margin-bottom: 10px;
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
export default function ControlPanelLeft({ onClickDraw, onClickReset, drawing, remainingDraws, formatTotal}){
    return(
        <PanelWrapper>
            <h1 style={{ fontSize: '2em', margin: '10px', marginTop:'0', fontWeight: 'bold'}}>{formatTotal()}</h1>
            <StyledButton primary onClick={onClickDraw}>
                {drawing && remainingDraws ? 'Stop' : 'Draw'}
            </StyledButton>
            <StyledButton onClick={onClickReset}>
                {'Reset'}
            </StyledButton>
        </PanelWrapper>
    )
}