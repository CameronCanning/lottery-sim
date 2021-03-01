function BallContainer({ balls }){
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
            {balls}
        </div>
    );
}

export default BallContainer;