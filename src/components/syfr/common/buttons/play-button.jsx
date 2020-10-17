import React from 'react'
import styled from 'styled-components'
import { MdPlayCircleOutline } from 'react-icons/md'

const PlayIcon = styled(MdPlayCircleOutline)`
  transition: color 0.5s ease;
  /* cursor: pointer; */
  color: ${(props) => props.theme.blue};

  &:hover {
    color: lightblue;
  }
`


function PlayButton() {
  return <PlayIcon size="2.2em" title="Play Track"/>
}

export default PlayButton
