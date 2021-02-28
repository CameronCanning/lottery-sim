import { findByLabelText } from "@testing-library/react";

function BallContainer({ balls }){
    const style = {
        backgroundColor: 'blue',
        justifyContent: 'center',
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        alignItems: 'center',
        width: '70vh', 
        height: '30vh', 
        textAlign: 'center',
    }

    return(
        <div style={style}>
            {balls}
        </div>
    );
}

export default BallContainer;