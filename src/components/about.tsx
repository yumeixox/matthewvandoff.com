import React from 'react'
import styled from 'styled-components'
import * as Scroll from 'react-scroll'

const Ssection = styled.section`
  .about {
    box-sizing: border-box;
    background: ${p => p.theme.red};
    width: 100%;
    height: 100vh;
    padding: 0 20%;
    line-height: 35px;
    display: flex;
    align-items: center;
  }
`
const Element = Scroll.Element

function About() {
  return (
    <Ssection id="about-container">
      <Element className="about" name="about" id="about">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
      </Element>
    </Ssection>
  )
}

export default About