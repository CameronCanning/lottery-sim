import React from 'react';
import styled from 'styled-components'
//background-color: ${props => props.pressed ? props.theme.primary : props.theme.secondary};
const StyledCell = styled.div`
    visibility: ${props => props.isEmpty ? 'hidden' : 'visible'};
    background-color: ${props => props.pressed ? props.theme.primary : props.theme.bg3};
    color: ${props => props.pressed ? props.theme.font2 : props.theme.font1};
    width: 16%;
    height: 0;
    padding-bottom: 16%;
    font-size: 1.25em;
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