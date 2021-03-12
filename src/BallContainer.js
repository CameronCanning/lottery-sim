import Ball from './Ball.js';
import styled from 'styled-components';
import Panel from './Panel.js';

const StyledBallContainer = styled(Panel)`    
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
`
function BallContainer({ numBalls, draws, matches }){
    return(
        <StyledBallContainer>
            {
                [...Array(numBalls).keys()].map((id) => {
                    let _value = [...draws][id];
                    return <Ball key={id} value={_value} isMatch={matches.has(_value)} /> })
            }
        </StyledBallContainer>
    );
}

export default BallContainer;