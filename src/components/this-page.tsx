import React from 'react'
import styled from 'styled-components'

const Sdiv = styled.div`
  box-sizing: border-box;
  background: black;
  height: 50vh;
  width: 100%;
  padding: 3rem 0 0 3rem;
  h1 {
    font-size: 2.25rem;
  }
  p {
    font-size: 1rem;
    padding: 2rem 0;
    line-height: 1.85rem;
    width: 45vw;
    color: white;
  }
`

function ThisPage() {
  return (
    <Sdiv>
      <h1>About This Page</h1>
      <p>This page was created with React / TypeScript.
        You can check out the source code here:
      </p>
    </Sdiv>
  )
}

export default ThisPage