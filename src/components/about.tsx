import React from 'react'
import styled from 'styled-components'
import * as Scroll from 'react-scroll'
import './stylesheets/arrow.scss'

const Ssection = styled.section`
  position: relative;
  font-size: 0.9rem;
  
  .about {
    box-sizing: border-box;
    background: #181818;
    width: 100%;
    height: 100vh;
    min-height: 500px;
    padding: 0 10% 10rem 10%;
    line-height: 35px;
    display: flex;
    align-items: center;
  }
  .arrow {
    cursor: pointer;
    padding: 0 0 7rem 0;
  }
  @media all and (max-width: 550px) {
    .about {
      padding: 0 15% 14rem 15%;
      font-size: 0.9rem;
    }
    .arrow {
      padding: 0 0 3rem 0;
    }
  }
`

function About() {
  function nudge() {
    setTimeout(null, 3000)
    Scroll.Events.scrollEvent.register("end", function () {
      Scroll.animateScroll.scrollMore(1)
      Scroll.Events.scrollEvent.remove("end");
    });
  }
  return (
    <Ssection id="about-container">
      <div className="about">
        <p>
          Born and raised in New York, I've had many jobs including musician, ESL teacher, sandwich artist, and more.
          In 2015, while studying linguistics in college and constantly bothering computer science friends, someone handed me a book on basic programming in Python. 
          Since then my programming life has been a slow avalanche, each year growing more involved in the field.
          Over the years I've attempted to establish a foundation in computer science while also attempting to forge an array of practical skills in software engineering.
          Click the arrow to check out some of the projects I've worked on.
        </p>
      </div>
      <Scroll.Link
        activeClass="active"
        to="projects"
        spy={true}
        hashSpy={true}
        smooth="easeInOutCubic"
        duration={1400}
        delay={100}
        offset={-44}
        isDynamic
      >
        <div className="arrow" onClick={() => nudge()}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </Scroll.Link>
    </Ssection>
  )
}

export default About