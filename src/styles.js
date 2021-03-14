import styled from 'styled-components';

const StyledApp = styled.div`
    width: 1000px;
    margin: auto;
`
const AppContainer = styled.div`
    display: flex;
`
const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 70%;
`

const ControlPanel = styled.div`
    display: flex;
    !#background-color: ${props => props.theme.bg2};
    border-radius: 10px;
    min-height: 170px;
`

const ControlPanelLeft = styled(Panel)`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 30%;
    text-align: center;
    padding: 10px;
`
const ControlPanelRight = styled(Panel)`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 70%;
    text-align: center;
    padding: 10px;
`
const StyledButton = styled.button`
    background-color: ${props => props.primary ? props.theme.primary : props.theme.secondary};
    color: ${props => props.primary ? props.theme.secondary : 'black'};
    min-height: 40px;
    outline: none;
    width: 70%;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 5px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    text-decoration: none;
    font-weight: bold;
    text-align: center;
    transition: filter 0.3s;
    //box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    &:hover{
        cursor: pointer;
        filter: contrast(95%);
    }
    &:active{
        filter: contrast(70%);
    }
`
const StyledLabel = styled.label`
    font-weight: bold;
    font-size: 24px;
    margin:10px;
`

const StyledInput = styled.input`
    font-size: 24px;
    height: 25%;
    text-align: center;
    width: 70%;
    margin: auto;
    border: 2px solid ${props => props.theme.primary};
    border-radius: 5px;
    &:focus {
        outline: none;
        border: 2px solid ${props => props.theme.primary};
        box-shadow: 0 0 5px ${props => props.theme.primary};
    }
`