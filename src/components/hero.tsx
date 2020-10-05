import React, { useEffect, useState } from "react"
import styled from 'styled-components'
import TextScramble from './vendor/scramble'
import './stylesheets/arrow.scss'
import * as Scroll from 'react-scroll'
import gif from '../assets/images/static.gif'

const Ssection = styled.section`
  height: 100vh;
  font-size: 2rem;
  color: white;
  display: flex;
  justify-content: center;
  background: url(${gif});
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-font-smoothing: antialiased;
  
  .overlay {
    width: 100%;
    height: 110vh;
    position: absolute;
    background: black;
    top: 0;
    opacity: 0.8;
    transition: opacity 15s ease-out;
  }
  .disabled {
    opacity: 1
  }
  .text {
    position: absolute;
    margin: 35vh 0 0 0;
    color: white;
    padding: 0 1vw;
  }
  .arrow {
    opacity: 0;
    transition: opacity 5s ease;
  }
  .reveal {
    opacity: 1;
  }
  .arrow:hover {
    cursor: pointer;
  }
  
`

function Hero() {
  const [noise, setNoise] = useState(false)


  useEffect(() => {
    setNoise(true)
    const phrases = [
      '> hi_',
      '> my name is matthew_',
      '> i make web apps_',
      '> take a look around_'
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
      <div className={noise ? "overlay" : "overlay disabled"}></div>
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