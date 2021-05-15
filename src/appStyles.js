import styled from 'styled-components';
import Panel from './Panel.js';

export {
    StyledApp,
    AppContainer,
    ColumnContainer,
    ControlPanel,
    ControlPanelLeft,
    ControlPanelRight,
    StyledButton,
    StyledLabel,
    StyledInput,
    ControlLabelWrapper,
    ControlTD,
    LabelTD
}
const StyledApp = styled.div`
    width: 900px;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    color: ${ props => props.theme.font1 };
    font-weight: 500;
`
const AppContainer = styled.div`
    display: flex;
    margin-bottom: 0px;
    height: 100%;
`
const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 70%;
`

const ControlPanel = styled.div`
    display: flex;
    border-radius: 10px;
    min-height: 170px;
`

const ControlPanelLeft = styled(Panel)`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 30%;
    text-align: center;
`
const ControlPanelRight = styled(Panel)`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 70%;
    text-align: center;
    padding: 5px;
`
const StyledButton = styled.button`
    background-color: ${props => props.primary ? props.theme.primary : props.theme.bg3};
    color: ${props => props.primary ? props.theme.font2 : props.theme.font1};
    min-height: 35px;
    outline: none;
    width: 70%;
    margin: auto;
    margin-top: 0;
    margin-bottom: 10px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    text-decoration: none;
    font-weight: bold;
    text-align: center;
    transition: filter 0.3s;
    &:hover{
        cursor: pointer;
        filter: contrast(95%);
    }
    &:active{
        filter: contrast(70%);
    }
`
const StyledLabel = styled.p`
    font-weight: bold;
    font-size: 1.25em;
    margin: 10px;
    ${props => props.first ? 'margin-top: 5px': ''};
`

const StyledInput = styled.input`
    font-size: 24px;
    height: 25%;
    text-align: center;
    width: 70%;
    margin: auto;
    border: 2px solid ${props => props.theme.primary};
    opacity: ${props => props.drawing ? '0.5' : '1'};
    background-color: ${props => props.theme.bg3};
    border-radius: 5px;
    color: ${props => props.theme.font1};
    &:focus {
        outline: none;
        border: 2px solid ${props => props.theme.primary};
        box-shadow: 0 0 4px ${props => props.theme.primary};
    }
    ::-webkit-inner-spin-button{
        -webkit-appearance: none; 
        margin: 0; 
    }
    ::-webkit-outer-spin-button{
        -webkit-appearance: none; 
        margin: 0; 
    }   
    &:input[type=number] {
        -moz-appearance: textfield;
    }
}
`

const ControlLabelWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`
const ControlTD = styled.td`
    text-align: center;
    width: 100%;
`
const LabelTD = styled.td`
    text-align: left;
    width: 0;
    white-space: nowrap;
`