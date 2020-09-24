import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa'
import theme from '../stylesheets/theme'

const SDiv = styled.div`
  position: relative;
  cursor: pointer;

  &:hover {
    .amplitude-volume-slider {
      display: block;
    }
  }
  .volume-icon {
  }
  .mute-icon {
    position: absolute;
    left: 0;
  }
  .amplitude-volume-slider {
    display: none;
    position: absolute;
    transform: rotate(-90deg);
    left: -5.95em;
    bottom: 6.45em;
    -webkit-appearance: none;
    margin-left: 10px;
    border: 1px solid #40416a;
    border-radius: 5px;
    padding: 1.1em;
    background: ${theme.bluegrey};

    &:hover {
      cursor: pointer;
    }

    &:focus {
      outline: none;
    }
    &::-webkit-slider-runnable-track {
      background: ${theme.purple};
      width: 75%;
      height: 2px;
      cursor: pointer;
      animate: 0.2s;
    }
    &::-webkit-slider-thumb {
      height: 18px;
      width: 18px;
      background-color: white;
      cursor: pointer;
      margin-top: -8px;
      -webkit-appearance: none;
      border-radius: 20px;
    }
    ${'' /* &:focus::-webkit-slider-runnable-track {
        background: yellow;
      } */}
    &::-moz-range-track {
      width: 100%;
      height: 1px;
      cursor: pointer;
      animate: 0.2s;
      background: #cfd8dc;
    }
    &::-moz-range-thumb {
      height: 18px;
      width: 18px;
      background-color: white;
      cursor: pointer;
      margin-top: -8px;
      -webkit-appearance: none;
      border-radius: 20px;
    }
  }
  .hidden {
    opacity: 0;
  }
`

function Volume(props) {
  const [mute, setMute] = useState(false)
  const [prevVolume, setPrevVolume] = useState(null)

  function handleSliderClick() {
    props.amplitude.getVolume() == 0 ? setMute(true) : setMute(false)
  }

  function handleSliderChange() {
    parseInt(props.amplitude.getVolume()) < 1 ? setMute(true) : setMute(false)
  }

  function handleIconClick() {
    const slider = document.getElementById('volume-slider')

    if (mute === false) {
      setMute(true)
      setPrevVolume(props.amplitude.getVolume())
      props.amplitude.setVolume(0)
      slider.value = 0
    } else {
      setMute(false)
      props.amplitude.setVolume(prevVolume)
      slider.value = prevVolume
    }
  }

  return (
    <SDiv>
      <div className="icon-container" onClick={handleIconClick}>
        <FaVolumeUp size="1em" className={mute ? 'volume-icon hidden' : 'volume-icon'} />
        <FaVolumeMute size="1em" className={mute ? 'mute-icon' : 'mute-icon hidden'} />
      </div>
      <input
        type="range"
        onInput={handleSliderChange}
        onClick={handleSliderClick}
        id="volume-slider"
        className="amplitude-volume-slider"
        step=".1"
      />
    </SDiv>
  )
}

export default Volume
