import styled from 'styled-components';
import Panel from './Panel.js'

const StyledPayoutTable = styled(Panel)`
    margin: 5px;
    border-radius: 10px;
    float: right;
`

const StyledTable = styled.table`
    border-collapse: collapse;
    border-style: hidden;
    width: 100%;

`

const StyledTH = styled.th`
    padding: 10px;
    border-collapse: collapse;
    border: 2px solid ${props => props.theme.bg3};
    font-size: 1.25em;
`

const StyledTD = styled.td`
    border: 1px solid black;
    text-align: right;
    borderCollapse: collapse;
    padding: 8px;
    font-size: 1.25em;
    border: 2px solid ${props => props.theme.bg3};
`

const BoldStyledTD = styled(StyledTD)`
    font-weight: bold;
`
function PayoutTable({ payouts, results, numBalls}){  
    return(        
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