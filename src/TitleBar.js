import React from 'react';
import styled from 'styled-components';
import Panel from './Panel';

const Title = styled.h2`
    padding: 10px;
    !#color: ${props => props.theme.primary};
`
export default function TitleBar() {
    return(
        <Panel>
            <Title>Lottery Sim</Title>
        </Panel>
    )
}
