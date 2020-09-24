import React from 'react'
import styled from 'styled-components'
import Pink from '../assets/images/pink.jpg'

const Sdiv = styled.div`
  height: 150px;
  text-align: center;
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: black;
  img {
    width: 40vw;
    
  }
  .first {
    left: 0;
  }
  .second {
    right: 0;
    transform: scaleX(-1);
  }
`

function ProjectsHeader() {
  return (
    <Sdiv>
      <img src={Pink} className="first"></img>
      <h1>Projects</h1>
      <img src={Pink} className="second"></img>
    </Sdiv>
  )
}

export default ProjectsHeader