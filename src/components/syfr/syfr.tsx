import React, { useState } from 'react'
import styled from 'styled-components'
import TrackView from './track-view/container/track-view-container'
import Nav from './nav/nav'
import Player from './player/player'
import theme from './stylesheets/theme'
import Button from '@material-ui/core/Button'

const Ssection = styled.section`
  background: black;
  position: relative;
  height: 141vh;
  width: 100%;
  .container {
    margin: 0 auto;
    height: 100%;
  }

  .overlay {
    box-sizing: border-box;
    background: black;
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 10;
    opacity: 0.98;
    transition: opacity 1s ease-out;
    
    .overlay-container {
      margin: 3rem 0 0 0rem;
    }
    .info {
      font-size: 1rem;
      line-height: 1.85rem;
      width: 80vw;
      margin: 0 auto;
    }
    h1 {
      font-size: 2.25rem;
      width: 80vw;
      margin: 0 auto;
    }
    h2 {      
      width: 80vw;
      margin: 0 auto;
    }
    p {
      font-size: 1rem;
      padding: 2rem 0;
      line-height: 1.85rem;
      margin: 0 auto;
      width: 80vw;
    }
    em {
      color: ${theme.purple}
    }
    h2 {
      font-size: 1.75rem;
      color: ${theme.purple};
    }
    strong {
      display: block;
      color: ${theme.green};
    }
    .button {
      text-align: center;
      color: ${theme.green};
      display: block;
      margin: 3rem auto 0 auto;
    }
  }
  .disabled {
    z-index: 0;
    opacity: 0;
  }
  
  @media all and (min-width: 920px) {
    height: 125vh;
    .overlay-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;

      .left {
        padding: 3rem 0 0 3rem;
      }
      .right {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
      p {
        font-size: 1rem;
        padding: 2rem 0;
        line-height: 1.85rem;
        color: white;
      }
      h1, h2, p, .info {
        width: 100% !important;
      }
    }
    
  }
  @media all and (max-width: 570px) {
    
  }
`

function Syfr() {
  const [open, setOpen] = useState(false)
  return (
    <Ssection>
      <div className="container">
        <div className={open ? "overlay disabled" : "overlay"}>
          <div className="overlay-container">
            <div className="left">
              <h1><em>SYFR.STUDIO</em></h1>
              <p><em>SYFR</em> is a collaborative file management tool for musicians, built with creators in mind. It allows users to upload, download, and share their music to and from the cloud. It also allows users to organize their music in a way that is not provided by other cloud based file management services such as Dropbox or WeTransfer. Future versions will allow users to collaborate on tracks and projects within the app.</p>
              <h2>On the technology</h2>
              <p><em>SYFR</em> is built using serverless technology.
              By leveraging AWS Lambda and Node.js we are able to create a highly scalable back end with little to no server maintenance.
              For data storage it uses DynamoDB, AWS's NoSql database, to store meta-data and S3 to store the actual files.
              Authentication is implemented with AWS Cognito, authorization is implemented using API Gateway.
              On the front end SYFR is built using React/Redux</p>
              <div className="info">
                <strong>https://syfr.studio</strong>
                <strong>SYFR is currently in closed beta, however a demo is available.</strong>
                <strong>Most features are disabled.</strong>
              </div>
            </div>
            <div className="right">
              <Button onClick={() => setOpen(true)} color="inherit" className="button" variant="outlined" size="large">Open Demo</Button>
            </div>
          </div>
        </div>
        <Nav/>
        <TrackView/>
        <Player/>
      </div>
    </Ssection>
  )
}

export default Syfr