import Cell from './Cell.js';

function Ticket({ range, numBalls, picks, setPicks }){
    const style = {
        backgroundColor: '#ecf0f1',
        display: 'flex',
        flexWrap: 'wrap',
        borderRadius: 0, 
        width: '280px',
        margin: 'auto',
        border: '1px solid black',
        textAlign: 'center',
    }

    const cells = [...Array(range).keys()].map((id) => 
        <Cell 
            key={ id } 
            value={ id+1 } 
            picks = { picks } 
            numBalls={ numBalls } 
            setPicks={ setPicks }/>);
    /** 
    cells.push(
        <Cell 
            key={ -1 } 
            value={ 'R' } 
            picks = { picks } 
            numBalls={ numBalls } 
            setPicks={ setPicks }/>);
    */
    return(
        <div style={ style }>
            <h2 style={ {width :'100%'} }>Ticket</h2>
            { cells }
        </div>
    );
}

export default Ticket;