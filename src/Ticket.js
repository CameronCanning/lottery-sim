import Cell from './Cell.js';
import styled from 'styled-components'
import Panel from './Panel.js'

const StyledTicket = styled(Panel)`
    display: flex;
    flex-direction: column;
    width: auto;
    justify-content: space-evenly;
    text-align: center;
    min-width: 30%;
    float: left;
    pointer-events: ${props => props.drawing ? 'none' : 'auto'};
`

const Row = styled.div`
    display: flex;
    margin-left: 10px;
    margin-bottom: 10px;
    justify-content: space-evenly;
`

function Ticket({ range, numBalls, picks, setPicks, drawing }){
    const width = 5;
    const height = Math.ceil(range/width);
    const rows = [...Array(height)];
    for (let i = 0; i < height; i++) {
        const row = [...Array(width)];
        for (let j = 0; j < width; j++) {
            const id = (i * width) + j;
            if (id < range){
                row[j] = 
                <Cell 
                    key={ id } 
                    value={ id + 1 } 
                    picks ={ picks } 
                    numBalls={ numBalls } 
                    setPicks={ setPicks }
                    pressed={ picks.has(id+1) }/>;   
            }
            else{
                row[j] = 
                <Cell isEmpty={ true } key={id}/>
            }
              
        }
        rows[i] = <Row key={i}>{ row }</Row>;
    }
    
    return(
        <StyledTicket drawing={drawing}>
            <h2 style={ {width :'100%', font: '24px'} }>Ticket</h2>
            { rows }
        </StyledTicket>
    );
}

export default Ticket;