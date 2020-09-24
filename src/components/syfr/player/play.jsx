import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FaPlay, FaPause } from 'react-icons/fa'

const SDiv = styled.div`
  position: relative;

  &:hover {
    cursor: pointer;
  }
  &.amplitude-paused {
    .pause-icon {
      opacity: 0;
    }
  }
  &.amplitude-playing {
    .play-icon {
      opacity: 0;
    }
  }
  .pause-icon {
    position: absolute;
    left: 0;
  }
`

function Play() {
  return (
    <SDiv className="amplitude-play-pause" id="play-pause">
      <FaPlay size="0.85em" className="play-icon" />
      <FaPause size="0.9em" className="pause-icon" />
    </SDiv>
  )
}

export default Play
