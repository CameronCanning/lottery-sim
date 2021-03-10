import Ball from './Ball.js';

function BallContainer({ numBalls, draws, matches }){
    const style = {
        justifyContent: 'center',
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        alignItems: 'center', 
        textAlign: 'center',
        margin: '30px',
    }

    return(
        <div style={style}>
            {
                [...Array(numBalls).keys()].map((id) => {
                    let _value = [...draws][id];
                    return <Ball key={id} value={_value} isMatch={matches.has(_value)} /> })
            }
        </div>
    );
}

export default BallContainer;