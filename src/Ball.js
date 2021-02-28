function Ball({value, isMatch}){
    const style = {
        backgroundColor: isMatch ? 'pink' : 'white', 
        borderRadius: 100, 
        textAlign: 'center',
        width: 100, 
        height: 100, 
        margin: 10,
        fontSize: 75,
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
        };

    return(
        <div style={style}>
            {value}
        </div>)
}

export default Ball;
