

function BallContainer({ balls }){
    const style = {
        justifyContent: 'center',
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        alignItems: 'center', 
        textAlign: 'center',
    }

    return(
        <div style={style}>
            {balls}
        </div>
    );
}

export default BallContainer;