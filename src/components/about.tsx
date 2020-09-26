import React from 'react'
import styled from 'styled-components'
import * as Scroll from 'react-scroll'
import './stylesheets/arrow.scss'

const Ssection = styled.section`
  position: relative;
  .about {
    box-sizing: border-box;
    background: ${p => p.theme.red};
    width: 100%;
    height: 100vh;
    min-height: 500px;
    padding: 0 20%;
    line-height: 35px;
    display: flex;
    align-items: center;
  }
  .arrow {
    cursor: pointer;
  }
`

function About() {
  function scrollToProjects() {
    console.log("Scrolly")
  }
  return (
    <Ssection id="about-container">
      <div className="about">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
      </div>
      <Scroll.Link
        activeClass="active"
        to="projects"
        spy={true}
        hashSpy={true}
        smooth="easeInOutCubic"
        duration={1500}
        delay={100}
        offset={-44}
        isDynamic
      >
        <div className="arrow" onClick={() => scrollToProjects()}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </Scroll.Link>
    </Ssection>
  )
}

export default About