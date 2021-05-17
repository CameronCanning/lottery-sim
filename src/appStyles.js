import styled from 'styled-components';
import Panel from './Panel.js';

export {
    StyledApp,
    AppContainer,
    ColumnContainer,
    ControlPanel,
    ControlLabelWrapper,
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
const ControlLabelWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`
