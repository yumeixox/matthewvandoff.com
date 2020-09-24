import React from 'react'
// import { connect } from 'react-redux'
import styled from 'styled-components'
// import { playTrack } from '~redux/global/global-actions.js'
import { MdPlayCircleOutline, MdPauseCircleOutline } from 'react-icons/md'
import Loader from 'react-loader-spinner'

const PlayIcon = styled(MdPlayCircleOutline)`
  transition: color 0.5s ease;
  cursor: pointer;
  color: ${(props) => props.theme.blue};

  &:hover {
    color: lightblue;
  }
`

const PauseIcon = styled(MdPauseCircleOutline)`
  transition: color 0.5s ease;
  cursor: pointer;
  color: ${(props) => props.theme.green};

  &:hover {
    color: ${(props) => props.theme.blue};
  }
`
// function mapStateToProps(state) {
//   return {
//     playingTrack: state.global.playingTrack,
//     playingVersionSub: state.global.playingVersionSub,
//     playerStatus: state.global.playerStatus,
//   }
// }
// function mapDispatchToProps(dispatch) {
//   return {
//     playTrack: (track, version) => dispatch(playTrack(track, version)),
//   }
// }
// const PlayButtonContainer = connect(mapStateToProps, mapDispatchToProps)(PlayButton)

function PlayButton() {
  // function handleClick() {
  //   if (props.type === 'track') {
  //     if (props.playingTrack === props.track) {
  //       const playButton = document.getElementById('play-pause')
  //       playButton.click()
  //     } else {
  //       props.playTrack(props.track, props.version.versionSub)
  //     }
  //   } else {
  //     if (props.playingVersionSub === props.version.versionSub) {
  //       const playButton = document.getElementById('play-pause')
  //       playButton.click()
  //     } else {
  //       props.playTrack(props.track, props.version.versionSub)
  //     }
  //   }
  // }

  // For tracks table
  // if (props.type === 'track') {
  //   if (props.playingTrack === props.track) {
  //     if (props.playerStatus === 'paused') {
  //       return <PlayIcon size="2.5em" title="Play Track" onClick={() => handleClick()} />
  //     } else {
  //       return (
  //         <div onClick={() => handleClick()}>
  //           <Loader className="loader" type="Bars" height={30} width={30} />
  //         </div>
  //       )
  //     }
  //   } else {
      return <PlayIcon size="2.2em" title="Play Track" onClick={() => handleClick()} />
    // }
  

  // For versions table
  // else {
  //   if (props.version.versionSub === props.playingVersionSub && props.playerStatus === 'playing') {
  //     return (
  //       <div onClick={() => handleClick()}>
  //         <Loader className="loader" type="Bars" height={30} width={30} />
  //       </div>
  //     )
  //   } else {
  //     return <PlayIcon size="2.5em" title="Play Track" onClick={() => handleClick()} />
  //   }
  // }
}

export default PlayButton
