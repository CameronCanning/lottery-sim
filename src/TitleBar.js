import React from 'react';
import styled from 'styled-components';
import Panel from './Panel';
import { ReactComponent as GHMark } from './res/gh_mark.svg';

const Title = styled.h2`
    padding: 10px;
    margin: 0;
    margin-right: auto;
    color: ${props => props.theme.primary};
`
const StyledGHMark = styled(GHMark)`
    width: 100%;
    height: 100%;
`

const LogoContainer = styled.div`
    padding: 10px;
    width: 24px;
    height: 24px;
    margin-top: auto;
    margin-bottom: auto;
`
const StyledPanel = styled(Panel)`
    display: flex;

`
export default function TitleBar() {
    return(
        <StyledPanel>
            <Title>Lottery Sim</Title>
                <LogoContainer>
                    <a href='https://www.github.com/cameroncanning/lottery-sim'>
                        <StyledGHMark/>
                    </a>
                </LogoContainer>                
        </StyledPanel>
    )
}

 //<img src={ghMark} alt='GitHub' style={{width: '24px', height: '24px'}}/>