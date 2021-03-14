import React from 'react';
import styled from 'styled-components'

const StyledCell = styled.div`
    visibility: ${props => props.isEmpty ? 'hidden' : 'visible'};
    background-color: ${props => props.pressed ? props.theme.primary : props.theme.secondary};
    color: ${props => props.pressed ? props.theme.secondary : 'black'};
    width: 18%;
    height: 0;
    padding-bottom: 18%;
    font-size: 1.5em;
    margin-right: 10px;
    border-radius: 10px;
    align-text: center;    
    position: relative;
    transition: filter 0.3s;
    &:hover{
        cursor: pointer;
        filter: contrast(95%);
    }
    &:active{
        filter: contrast(70%);
    }
`

const CenteredPar = styled.p`
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0;
    marginRight: -50%;
    transform: translate(-50%, -50%);
`

function Cell({ value, picks, numBalls, setPicks, pressed, isEmpty}){    
    const onClick = () => {
        if (!picks.has(value)){
            if(picks.size < numBalls){
                const tempPicks = new Set([...picks]);
                tempPicks.add(value);
                setPicks(tempPicks)
            }
        }
        else {
            const tempPicks = new Set([...picks]);
            tempPicks.delete(value);
            setPicks(tempPicks);
        }
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        margin: '0',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
    let cell;
    if (isEmpty){
        cell = <StyledCell isEmpty></StyledCell>
    }
    else{
        cell = 
            <StyledCell pressed={ pressed } onClick={ onClick }>
                <CenteredPar>{value < 10 ? '0' + value : value }</CenteredPar>
            </StyledCell>
    }
    return(
        cell
    );
}

export default Cell;