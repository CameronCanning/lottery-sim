import React from 'react';
import styled from 'styled-components';
import Panel from './Panel';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import {ReactComponent as GHMark} from './res/gh_mark.svg';
//import ReactLogo from './res/gh_mark.svg';

const Title = styled.h2`
    padding: 10px;
    margin: 0;
    margin-right: auto;
    color: ${props => props.theme.primary};
`
const StyledGHMark = styled(GHMark)`
    width: 100%;
    height: 100%;    
    > * {
        fill: ${props => props.theme.font1}
    }
`
const LogoContainer = styled.div`
    display: flex;
    padding: 10px;
    margin-top: auto;
    margin-bottom: auto;
`
const StyledPanel = styled(Panel)`
    display: flex;
    margin-bottom: 10px;
    margin-top: 0px;
    width: auto;
`
const LogoWrapper = styled.div`
    width: 24px;
    height: 24px;
    margin: 5px;
    margin-top: auto;
    margin-bottom: auto;
`
export default function TitleBar({ onChange, theme }) {
    return(
        <StyledPanel>
            <Title>Lottery Sim</Title>
            <LogoContainer>
                <LogoWrapper>
                    <DarkModeSwitch 
                        onChange = { onChange }
                        checked = {theme.id === 'dark' ?  true : false}
                        moonColor = {theme.font1}
                        sunColor = {theme.font1}/>
                </LogoWrapper>
                <LogoWrapper>
                    <a  href = 'https://github.com/CameronCanning/lottery-sim'
                        target = '_blank'
                        rel = 'noopener noreferrer'>                       
                        <StyledGHMark/>
                    </a>
                </LogoWrapper>  
            </LogoContainer>                
        </StyledPanel>

    )
}
 //<img src={ghMark} alt='GitHub' style={{width: '24px', height: '24px'}}/>