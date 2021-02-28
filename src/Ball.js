function Ball({value, isMatch}){
    const style = {
        backgroundColor: isMatch ? '#fab1a0' : '#f5f5f5', 
        borderRadius: 100, 
        flexShrink: 0,
        textAlign: 'center',
        width: '100px', 
        height: '100px', 
        lineHeight: '100px',
        margin: 10,
        fontSize: 75,
        //boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
        boxShadow: '0 0 0 1pt black'
        
        };

    return(
        <div style={style}>
            {value < 10 ? '0'+value : value}
        </div>)
}

export default Ball;
