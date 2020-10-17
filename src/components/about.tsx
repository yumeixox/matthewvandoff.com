import React from 'react'
import styled from 'styled-components'
import * as Scroll from 'react-scroll'
import './stylesheets/arrow.scss'
import jpg from '../assets/images/sand.jpg'

const Ssection = styled.section`
  position: relative;
  font-size: 1rem;
  
  .about {
    box-sizing: border-box;
    background: url(${jpg});
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100vh;
    min-height: 500px;
    padding: 0 10% 10rem 10%;
    line-height: 35px;
    display: flex;
    align-items: center;
    text-align: justify;
  }
  .overlay {
    background: linear-gradient(110deg, black 30%, rgba(0, 0, 0, 0.7));
    width: 100%;
    height: 100vh;
    z-index: 1;
    position: absolute;
    opacity: 1;
  }
  p {
    z-index: 2;
    width: 70%;
    margin: 0 auto;
  }
  .arrow {
    cursor: pointer;
    padding: 0 0 0rem 0;
  }
  @media all and (max-width: 550px) {
    .about {
      font-size: 1rem;
      padding: 0 10% 9rem 10%;
      position: relative;
      line-height: 33px;
    }
    .arrow {
      display: none;
      /* bottom: 5rem; */
      /* transform: rotate(180deg); */
    }
    p {
      width: 100%;
      margin: 0 auto;
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
      <div className="overlay"></div>
      <div className="about">
        <p>
          Born and raised in New York, I've had many jobs including musician, ESL teacher, sandwich artist, and more.
          In 2015, while studying linguistics in college and constantly bothering computer science friends, someone handed me a book on basic programming in Python. 
          Since then I've continued to grow more and more involved in the field.
          Over the years I've attempted to establish a foundation in computer science while also forging an [array] of practical skills in software engineering.
          Scroll down to check out some of the projects I've worked on.
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