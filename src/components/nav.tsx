import React from 'react';
import styled from 'styled-components'
import Switch from './switch'
import * as Scroll from 'react-scroll'

const Snav = styled.nav`
  .main {
    box-sizing: border-box;
    width: 100%;
    height: 7vh;
    position: fixed;
    background: #2A2A2A;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    z-index: 99;
    padding: 0 3rem;
    transform: scale(1);
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
    padding: 0 15% 0 0;
  }
  .options li {
    padding: 0 2rem;
    height: 40px;
    display: flex;
    align-items: center;
    transition: background-color 0.5s ease-out;
  }
  .options li:hover {
    cursor: pointer;
    background: #343232;
  }
  .active {
    text-decoration: line-through;
  }
`
function Nav() {
  const duration = 1400
  const scrollOptions = {
    duration: 1500,
    delay: 100,
    smooth: 'easeInOutCubic',
  }
  function scrollToTop() {
    Scroll.animateScroll.scrollToTop(scrollOptions)
  }
  function nudge() {
    setTimeout(() => { }, duration + 1)
    Scroll.Events.scrollEvent.register("end", function () {
      Scroll.animateScroll.scrollMore(1)
      Scroll.Events.scrollEvent.remove("end");
    });
  }

  const offset = -44
  return (
    <Snav>
      <ul className="main">
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
          >
            <li className="glitch-parent"><h2 className="glitch" data-text="contact" onClick={() => nudge()}>contact</h2></li>
          </Scroll.Link>
        </ul>
        <li className="theme-switch"><Switch/></li>
      </ul>
    </Snav>
  )
}

export default Nav
