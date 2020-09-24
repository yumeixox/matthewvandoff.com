import React from 'react'
import styled from 'styled-components'
import AlbumArt from './album-art.jsx'

const SDiv = styled.div`
  ${'' /* background: darkblue; */}
  display: grid;
  grid-template-columns: 1.15fr 7fr;
  grid-template-rows: 1fr;
  width: 100%;
  ${'' /*  HEIGHT NEEDS TO BE SET ON THE <IMG>  */}
  margin: 1em 0 0 0em;
  user-select: none;

  .info-container {
    display: flex;
    flex-direction: column;
    padding: 0 0 0 1em;
  }
  .title {
    padding: 0.5em 0 0.3em 0;
    font-size: 2.5em;
  }
  .genre {
    font-size: 1.25em;
  }
`

function Display() {
  return (
    <SDiv>
      <AlbumArt />
      <div className="info-container">
        <h1 className="title">How to Talk to Computers</h1>
        <h2 className="genre">Hip-Hop</h2>
      </div>
    </SDiv>
  )
}

export default Display
