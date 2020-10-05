import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { MdOpenInBrowser } from 'react-icons/md'
import logo from '../../../../assets/images/logo.svg'

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
  @media all and (max-width: 570px) {
    .default-img-container {
      width: 150px;
      height: 150px;
    }
    .default-image {
      width: 100px;
      height: 100px;
    }
  }
`


function AlbumArt() {
  const [userImage, setUserImage] = useState(null)
  const inputEl = useRef(null)
  function handleClick() {
    // inputEl.current.click()
  }

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
