import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import './stylesheets/hamburger.css'
import * as Scroll from 'react-scroll'
import Switch from './switch'

const Sbutton = styled.button`
  /* padding-bottom: 2.5rem; */
`

const Smenu = styled.div`
  width: 100vw;
  /* height: 350px; */
  font-size: 1.1rem;
  background: ${p => p.theme.jet};
  position: absolute;
  top: 3.7rem;
  right: 0;
  color: white;
  opacity: 1;
  transition: opacity 0.3s ease;
  user-select: none;
  outline: none;
  
  &.disabled {
    opacity: 0;
    pointer-events: none;
  }
  ul {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
    border-top: 1px solid grey; 
    border-bottom: 1px solid grey; 
  }
  li:first-child, li:nth-child(2) {
    border-bottom: none;
  }
  li:first-child {
  }
  li:hover {
    cursor: pointer;
    background: ${p => p.theme.grey};
  }
  @media all and (max-width: 570px) {
    
  }
  @media all and (min-width: 920px) {
    display: none;
  }
`

function Hamburger() {
  const [menuOpen, setMenuOpen] = useState(false)
  const duration = 1600
  const offset = -44

  function handleBlur(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setMenuOpen(false)
    }
  }


  return (
    <div tabIndex={1} onBlur={(e) => handleBlur(e)}>
      <Sbutton
        className={menuOpen ? "hamburger hamburger--emphatic is-active" : "hamburger hamburger--emphatic"}
        type="button"
        onClick={() => {
          setMenuOpen(!menuOpen)
        }}
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </Sbutton>
      <Smenu className={menuOpen ? "menu" : "menu disabled"}>
        <ul>
          <li>
            <Scroll.Link
              activeClass="active"
              to="about"
              spy={true}
              hashSpy={true}
              smooth="easeInOutCubic"
              duration={duration}
              delay={100}
              offset={offset}
              onClick={() => setMenuOpen(false)}
            >
              About
          </Scroll.Link>
          </li>
          <li>
            <Scroll.Link
              activeClass="active"
              to="projects"
              spy={true}
              hashSpy={true}
              smooth="easeInOutCubic"
              duration={duration}
              delay={100}
              offset={offset}
              onClick={() => setMenuOpen(false)}
            >
              Projects
          </Scroll.Link>
          </li>
          <li>
            <Scroll.Link
              activeClass="active"
              to="contact"
              spy={true}
              hashSpy={true}
              smooth="easeInOutCubic"
              duration={duration}
              delay={100}
              offset={offset}
              onClick={() => setMenuOpen(false)}
            >
              Contact
          </Scroll.Link>
          </li>
          {/* <li><Switch /></li> */}
        </ul>
      </Smenu>
    </div>
  )
}

export default Hamburger