import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import * as Scroll from 'react-scroll'
import Hamburger from './hamburger'
import './stylesheets/glitch.scss'

const Snav = styled.nav`
  .main {
    box-sizing: border-box;
    width: 100vw;
    height: 8vh;
    position: fixed;    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    z-index: 99;
    padding: 0 3rem;
    transform: scale(1);
    background: black;
    transition: background-color 1s ease;
    user-select: none;
  }
  .top {
    background: transparent;
    border: none;
  }
  .name {
    font-size: 1.75rem;
    letter-spacing: .25em;
    transition: color 14s ease;
  }
  .name:hover {
    cursor: pointer;
    /* color: pink; */
  }
  .options {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    transition: background-color 0.5s ease;
    font-size: 1rem;
    height: 100%;
  }
  .options a {
    height: 100%;
  }
  .options li {
    padding: 0 1.75rem;
    height: 100%;
    display: flex;
    align-items: center;
    transition: background-color 0.5s ease-out;
  }
  .options li:hover {
    cursor: pointer;
    background: #080808;
  }
  .active {
    text-decoration: line-through;
  }
  .hamburger {
    display: none;
  }

  
  @media all and (max-width: 920px) {
    .options {
      display: none;
    }
    .theme-switch {
      display: none;
    }
    .hamburger {
      display: block;
      padding: 0.15em 0em 0 0;
    }
  }
  @media all and (max-width: 570px) {
    .name {
      font-size: 1.1rem;
      user-select: none;
    }
    .main {
      justify-content: space-between;
    }
    .hamburger {
      /* padding: 2em 0em 0 0; */
    }
  }
`

function Nav() {
  const duration = 1600
  const offset = -44
  const scrollOptions = {
    duration: 1500,
    delay: 100,
    smooth: 'easeInOutCubic',
  }
  function scrollToTop() {
    Scroll.animateScroll.scrollToTop(scrollOptions)
  }
  function nudge() {
    setTimeout(() => { }, duration + 111)
    Scroll.Events.scrollEvent.register("end", function () {
      Scroll.animateScroll.scrollMore(400)
      Scroll.Events.scrollEvent.remove("end");
    });
    setTimeout(() => { }, duration + 1)
    Scroll.Events.scrollEvent.register("end", function () {
      Scroll.animateScroll.scrollMore(1)
      Scroll.Events.scrollEvent.remove("end");
    });
  }
  const [atTop, setAtTop] = useState(true)
  useEffect(() => {
    let intersectOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8
    }
    let observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setAtTop(true)
      }
      else {
        setAtTop(false)
      }
    }, intersectOptions);
    let target:any = document.querySelector('#hero')
    observer.observe(target)
  })
  
  return (
    <Snav id="nav">
      <ul className={atTop ? "main top" : "main"}>
        <li className="name glitch" data-text="matthew van doff" onClick={() => scrollToTop()}>
          <h1>matthew van doff</h1>
        </li>
        <ul className="options">
          <Scroll.Link
            activeClass="active"
            to="about"
            spy={true}
            hashSpy={true}
            smooth="easeInOutCubic"
            duration={duration}
            delay={100}
            offset={offset}
            onClick={() => nudge()}        
          >
            <li
            className="glitch-parent"
            // onClick={() => scrollToAbout()}
            >
              <h2 className="glitch" data-text="about">about</h2>
            </li>
          </Scroll.Link>
          
          <Scroll.Link
            activeClass="active"
            to="projects"
            spy={true}
            hashSpy={true}
            smooth="easeInOutCubic"
            duration={duration}
            delay={100}
            offset={offset}
            isDynamic
          >
            <li
            className="glitch-parent"
            onClick={() => nudge()}
            >
              <h2 className="glitch" data-text="projects">projects</h2>
            </li>
          </Scroll.Link>
          <Scroll.Link
            activeClass="active"
            to="contact"
            spy={true}
            hashSpy={true}
            smooth="easeInOutCubic"
            duration={duration}
            delay={100}
            offset={offset}
            onClick={() => nudge()}
          >
            <li className="glitch-parent"><h2 className="glitch" data-text="contact" onClick={() => nudge()}>contact</h2></li>
          </Scroll.Link>
        </ul>
        {/* <li className="theme-switch"><Switch/></li> */}
        <li className="hamburger">
          <Hamburger/>  
        </li>
      </ul>
    </Snav>
  )
}

export default Nav
