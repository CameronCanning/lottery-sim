import Cell from './Cell.js';
import styled from 'styled-components'
import Panel from './Panel.js'

const StyledTicket = styled(Panel)`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 30%;
    text-align: center;
    height: auto;
    align-items: center;
`
const CellContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    
    text-align: center;
    pointer-events: ${props => props.drawing ? 'none' : 'auto'};
    justify-content: space-evenly;
`

const Row = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 7px;
    justify-content: space-evenly;
    
`
const Title = styled.p`
    font-weight: bold;
    font-size: 1.5em;
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
        <StyledTicket>
            <Title>Ticket</Title>
            <CellContainer drawing={drawing}>      
                { rows }
            </CellContainer>
        </StyledTicket>
    );
}

export default Ticket;