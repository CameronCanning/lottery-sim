function PayoutTable({ payouts, results, numBalls}){  
    const borders = {
        border: '1px solid black',
        borderCollapse: 'collapse',
        padding: '10px',
        fontSize: '24px'
        
    }

    const style = {
        textAlign: 'right',
        border: '1px solid black',
        borderCollapse: 'collapse',
        padding: '10px',
        fontSize: '24px'
    }
    return(        
        //TODO: use CSS or stylyed components
        <table style={ borders }>
            <thead>
            <tr >
                <th style={borders}>Matches</th>
                <th style={borders}>Payout</th>
                <th style={borders}>Count</th>
            </tr>
            </thead>
            <tbody>
            {[...Array(numBalls+1).keys()].map((i) => {
                return (
                <tr key={i} >
                    <td style={style}>{ i+'/'+numBalls }</td>
                    <td style={style}>{'$'+payouts[i].toLocaleString() }</td>
                    <td style={style}>{ results[i] }</td>
                </tr>
                );
            })}
            </tbody>
        </table>

    );
}

export default PayoutTable;