import React, { useEffect } from "react"
import styled from 'styled-components'
import TextScramble from './vendor/scramble'
import './stylesheets/arrow.scss'
import * as Scroll from 'react-scroll'

const Ssection = styled.section`
  height: 100vh;
  padding: 10vh 0 0 0;
  font-size: 3rem;
  color: white;
  display: flex;
  justify-content: center;
  background: black;
  .text {
    position: absolute;
    margin: 28vh 0 0 0;
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
  useEffect(() => {
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
    <Ssection>
      <div className="text">
      </div>
        <div className="arrow" onClick={() => scrollToAbout()}>
          <span></span>
          <span></span>
          <span></span>
        </div>
    </Ssection>
  )
}

export default Hero