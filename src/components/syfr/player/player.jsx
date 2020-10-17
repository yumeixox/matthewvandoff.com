import React, { useState, useEffect } from 'react'
import Amplitude from 'amplitudejs'
import tinycolor from 'tinycolor2'
import styled from 'styled-components'
import Volume from './volume.jsx'
import Play from './play.jsx'

const SPlayer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  #single-song-player {
    box-sizing: border-box;
    width: 95%;
    margin: 0 auto;
    z-index: 99;
    color: white;
    border-top: 1px solid grey;
    -webkit-font-smoothing: antialiased;
  }
  .player-main {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 0em 0.5em 0.6em;
    margin: 0.45em 0 0 0;
  }
  .control-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 53px;
    padding: 0 0em 0 0.3em;
  }
  .progress-time-container {
    display: flex;
    align-items: center;
    width: 70%;
    font-size: 14px;
    padding: 0 0.9em 0 0.9em;
  }
  .progress-time-container > * {
    margin: 0 0.5em 0 0.5em;
  }
  progress.amplitude-song-played-progress {
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    display: block;
    cursor: pointer;
    margin-bottom: 0.1em;
  }
  progress.amplitude-song-played-progress:not([value]) {
    background-color: #40416a;
  }
  progress[value]::-webkit-progress-bar {
    background-color: #40416a;
  }
  progress[value]::-webkit-progress-value {
    background: linear-gradient(to left, #8A02FF, black);
  }
  .meta-container {
    display: block;
    color: ${tinycolor('#69FF74').brighten(10)};
    font-size: 16px;
    font-weight: bold;
    width: 22vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-left: 1px solid grey;
  }
  .meta-container span {
    display: flex;
    justify-content: center;
  }
  @media all and (max-width: 570px) {
    .control-container {
      justify-content: start;
      width: 4vw;
    }
    .progress-time-container {
      display: flex;
      width: 100%;
      align-items: center;
      font-size: 14px;
    }
    .meta-container {
      display: none;
    }
    .volume {
      display: none;
    }
  }
`

function Player() {
  // useEffect(() => {
  //   Amplitude.init({
  //     songs: [{ name: 'SYFR.STUDIO', url: '#' }],      
  //   })
  //   Amplitude.pause()
  //   // return () => {
  //   //   Amplitude.stop()
  //   // }
  // }, [])

  function handleProgressClick(e) {
    const offset = e.currentTarget.getBoundingClientRect()
    const x = e.pageX - offset.left
    Amplitude.setSongPlayedPercentage(
      (parseFloat(x) / parseFloat(e.currentTarget.offsetWidth)) * 100
    )
  }

  return (
    <SPlayer>
      <div id="single-song-player">
        <div className="player-main">
          <div className="control-container">
            <Play/>
            <div className="volume">
              <Volume amplitude={Amplitude}/>
            </div>
          </div>

          <div className="progress-time-container">
            <span className="current-time">
              <span className="amplitude-current-minutes"></span>:
              <span className="amplitude-current-seconds"></span>
            </span>
            <progress
              className="amplitude-song-played-progress"
              id="song-played-progress"
              onClick={handleProgressClick}
            ></progress>
            <span className="duration">
              <span className="amplitude-duration-minutes"></span>:
              <span className="amplitude-duration-seconds"></span>
            </span>
          </div>

          <div className="meta-container">
            <span data-amplitude-song-info="name" className="song-name"></span>
          </div>
        </div>
      </div>
    </SPlayer>
  )
}

export default Player
