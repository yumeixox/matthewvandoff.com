import React from 'react'
import styled from 'styled-components'
import { FaPlay, FaPause } from 'react-icons/fa'

const SDiv = styled.div`
  position: relative;
  cursor: pointer;
  &.amplitude-playing {
    .play-icon {
      opacity: 0;
    }
  }
  &.amplitude-paused {
    .pause-icon {
      opacity: 0;
    }
  }
  .pause-icon {
    position: absolute;
    left: 0;
    width: 0.9em;
  }
  .play-icon {
    padding-left: 0.15em;
    width: 0.85em;
  }
  @media all and (max-width: 600px) {
    .play-icon {
      /* width: 1em; */
    }
  }
`

function Play() {
  return (
    <SDiv
    className="amplitude-play-pause"
    id="play-pause"
    >
      <FaPlay className="play-icon" />
      <FaPause className="pause-icon" />
    </SDiv>
  )
}

export default Play
