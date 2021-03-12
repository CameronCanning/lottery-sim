import styled from 'styled-components';

const StyledPayoutTable = styled.div`
    background-color: ${props => props.theme.bg2};
    margin: 10px;
    border-radius: 10px;
    float: right;
    height: auto%;
`

const StyledTable = styled.table`
    border-collapse: collapse;
    border-style: hidden;
    width: 100%;
    border: '1px solid red';

`

const StyledTH = styled.th`
    padding: 10px;
    border-collapse: collapse;
    border: 1px solid ${props => props.theme.bg1};
    font-size: 24px;
`

const StyledTD = styled.td`
    border: 1px solid ${props => props.theme.bg1};
    text-align: right;
    borderCollapse: collapse;
    padding: 10px;
    font-size: 24px;
`

const BoldStyledTD = styled(StyledTD)`
    font-weight: bold;
`
function PayoutTable({ payouts, results, numBalls}){  
    return(        
        //TODO: use CSS or stylyed components
        <StyledPayoutTable>
            <StyledTable>
                <thead>
                <tr >
                    <StyledTH>Matches</StyledTH>
                    <StyledTH>Payout</StyledTH>
                    <StyledTH>Count</StyledTH>
                </tr>
                </thead>
                <tbody>
                {[...Array(numBalls+1).keys()].map((i) => {
                    return (
                    <tr key={i} >
                        <StyledTD>{ i+'/'+numBalls }</StyledTD>
                        <StyledTD>{'$'+payouts[i].toLocaleString() }</StyledTD>
                        <StyledTD>{ results[i] }</StyledTD>
                    </tr>
                    );
                })}
                <tr>
                    <BoldStyledTD colSpan='2'>Total</BoldStyledTD>
                    <StyledTD> { results.reduce((a,b) => a+b,0) }</StyledTD>
                </tr>
                </tbody>
            </StyledTable>
        </StyledPayoutTable>

    );
}

export default PayoutTable;