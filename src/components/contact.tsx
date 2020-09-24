import React from 'react'
import styled from 'styled-components'

const Sdiv = styled.div`
  height: 100vh;
  background: ${p => p.theme.jet};
  padding: 3rem 3rem;

  h1 {
    font-size: 2.5rem;
  }
`

function Contact() {
  return (
    <Sdiv>
      <h1>Get In Touch</h1>

    </Sdiv>
  )
}

export default Contact