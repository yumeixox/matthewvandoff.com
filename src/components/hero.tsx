import React, { useEffect, useState } from "react"
import styled from 'styled-components'
import TextScramble from './vendor/scramble'
import './stylesheets/arrow.scss'
import * as Scroll from 'react-scroll'
import vid from '../assets/images/vhs.mp4'

const Ssection = styled.section`
  height: 100vh;
  font-size: 2.2rem;
  display: flex;
  justify-content: center;
  /* background: url(${vid}); */
  background: black;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-font-smoothing: antialiased;
  font-family: monospace;

  video {
    object-fit: cover;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    opacity: 1;
    transition: opacity 10s ease-out;
  }
  
  .overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    background: radial-gradient(rgba(0, 0, 0, 0.9), black);
    top: 0;
    opacity: 1;
    transition: opacity 15s ease-out;
    z-index: 1;
  }
  .disabled {
    opacity: 0;
    background: black;
  }
  .text {
    position: absolute;
    margin: 35vh 0 0 0;
    color: white;
    padding: 0 1vw;
    z-index: 2;
  }
  .arrow {
    opacity: 0;
    transition: opacity 5s ease;
    pointer-events: none;
    z-index: 2;
  }
  .reveal {
    opacity: 1;
    pointer-events: all;
  }
  .arrow:hover {
    cursor: pointer;
  }
  @media all and (max-width: 550px) {
    font-size: 1.5em;
    .arrow {
      display: none;
    }
  }
  
`

function Hero() {
  const [noise, setNoise] = useState(false)

  useEffect(() => {
    setNoise(true)
    
    const phrases = [
      '> hi',
      '> my name is matthew',
      '> i make web apps',
      '> take a look around'
    ]

    const el = document.querySelector('.text')
    const fx = new TextScramble(el)

    let counter = 0
    const next = () => {
      fx.setText(phrases[counter]).then(() => {
        setTimeout(() => {
          if (counter < 4) {
            next()
          }
          if (counter === 4) {
            const arrow = document.getElementsByClassName("arrow")[0]
            arrow.setAttribute("class", "arrow reveal")
          }
        }, 2000)
      })
      counter++
    }
    next()
  })

  function nudge() {
    Scroll.Events.scrollEvent.register("end", function () {
      Scroll.animateScroll.scrollMore(1)
      Scroll.Events.scrollEvent.remove("end");
    });
  }

  function scrollToAbout() {
    const scroller = Scroll.scroller
    scroller.scrollTo("about", {
      duration: 1500,
      delay: 100,
      smooth: 'easeInOutCubic'
    })
    nudge()
  }
  
  return (
    <Ssection id="hero">
      <div className="overlay"></div>
      <video playsInline autoPlay muted loop className={noise ? "" : "disabled"}>
        <source src={vid} type="video/mp4"/>
      </video>
      <div className="text"></div>
      <div className="arrow" onClick={() => scrollToAbout()}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </Ssection>
  )
}

export default Hero