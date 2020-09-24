import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import theme from '../../stylesheets/theme'
const SDiv = styled.div`
  svg,
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 0.5em;
    &:hover {
      border: 3px solid ${theme.blue};
      transform: scale(1.3);
      cursor: pointer;
    }
  }
  .placeholder {
    width: 40px;
    height: 40px;
    svg {
      fill: ${theme.purple};
    }
  }
`

function Avatar(props) {
  return (
    <SDiv>
      <img src="https://live.staticflickr.com/4087/5022716049_b861a76483.jpg"></img>
    </SDiv>
  )
}

export default Avatar
