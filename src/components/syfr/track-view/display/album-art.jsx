import React, { useState, useRef, useEffect } from 'react'
// import { connect } from 'react-redux'
import styled from 'styled-components'
import { MdOpenInBrowser } from 'react-icons/md'
import logo from '../../../../assets/images/logo.svg'
// import { saveTrackArt, getTrackArt } from '~redux/api/api-actions.js'
// import { selectTrack } from '~redux/global/global-actions.js'

const SAlbumArt = styled.div`
  .default-img-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 220px;
    height: 190px;
    background: linear-gradient(rgb(44, 32, 79), transparent);
    border-radius: 15px;
  }
  .user-img-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 230px;
    height: 230px;
  }
  img {
    display: block;
    transition: filter 0.6s ease;
    pointer-events: none;
    border-radius: 10px;
  }
  .default-image {
    width: 150px;
    height: 150px;
    margin: 0 auto;
  }
  .user-image {
    width: 230px;
    height: 230px;
  }
  .img-container:hover {
    cursor: pointer;
    img {
      filter: brightness(70%) blur(2px);
    }
    .icon {
      opacity: 1;
    }
  }
  .icon {
    position: absolute;
    font-size: 3.5em;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  input[type='file'] {
    display: none;
  }
`
// function mapStateToProps(state) {
//   return {
//     userSub: state.api.userSub,
//     selectedTrack: state.global.selectedTrack,
//   }
// }
// function mapDispatchToProps(dispatch) {
//   return {
//     saveTrackArt: (userSub, trackSub, img) => dispatch(saveTrackArt(userSub, trackSub, img)),
//     getTrackArt: (userSub, trackSub, fileName) =>
//       dispatch(getTrackArt(userSub, trackSub, fileName)),
//     selectTrack: (track) => dispatch(selectTrack(track)),
//   }
// }
// const AlbumArtContainer = connect(mapStateToProps, mapDispatchToProps)(AlbumArt)

function AlbumArt() {
  const [userImage, setUserImage] = useState(null)
  const inputEl = useRef(null)
  function handleClick() {
    // inputEl.current.click()
  }

  // async function handleChange(e) {
  //   if (e.target.files[0]) {
  //     const file = e.target.files[0]
  //     try {
  //       await props.saveTrackArt(props.userSub, props.selectedTrack.trackSub, file)
  //       const url = URL.createObjectURL(file)
  //       setUserImage(url)
  //       const newTrack = props.selectedTrack
  //       newTrack.trackArt = file.name
  //       props.selectTrack(newTrack)
  //       // window.localStorage.setItem(file.name, url)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  // }

  // useEffect(() => {
  //   if (props.selectedTrack.trackArt) {
  //     async function getTrackArt() {
  //       try {
  //         const imgUrl = await props.getTrackArt(
  //           props.userSub,
  //           props.selectedTrack.trackSub,
  //           props.selectedTrack.trackArt
  //         )
  //         setUserImage(imgUrl)
  //       }
  //       catch(err) {
  //         console.log("Error getting track art", err)
  //         return null
  //       }
  //     }
  //     getTrackArt()
  //   }
  // }, [])

  return (
    <SAlbumArt className="album-art">
      <form>
        <input type="file" accept="image/*" ref={inputEl}/>
      </form>
      <div className="img-container default-img-container" onClick={handleClick}>
        <img className="default-image" src={logo}></img>
        <MdOpenInBrowser className="icon" />
      </div>      
    </SAlbumArt>
  )
}

export default AlbumArt
