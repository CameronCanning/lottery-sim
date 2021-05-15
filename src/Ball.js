import styled from 'styled-components';

const StyledBall = styled.div`
    background-color: ${props => props.isMatch ? props.theme.primary : props.theme.bg3};
    color: ${props => props.isMatch ? props.theme.font2 : props.theme.font1};
    width: 15%;
    height: 0;
    padding-bottom: 15%;
    font-size: 4em;
    text-align: center;
    border-radius: 100px;
    margin-top: 10px;
    margin-bottom: 10px;
    line-height: 147px;
    position: relative;
`

const CenteredPar = styled.p`
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0;
    marginRight: -50%;
    transform: translate(-50%, -51%);
`


function Ball({value, isMatch}){
    return(
        <StyledBall isMatch={isMatch}>
            <CenteredPar>{value < 10 ? '0' + value : value}</CenteredPar>
        </StyledBall>)
}

export default Ball;
