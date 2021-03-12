import React from 'react';
import styled from 'styled-components';
import Panel from './Panel';

const Title = styled.h2`
    margin: 10px;
`
export default function Header() {
    return(
        <Panel>
            <Title>Lottery Sim</Title>
        </Panel>
    )
}
