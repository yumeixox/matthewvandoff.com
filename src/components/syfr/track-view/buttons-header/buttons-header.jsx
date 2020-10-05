import React, { useState } from 'react'
import styled from 'styled-components'
import tinycolor from 'tinycolor2'
import Button from '@material-ui/core/Button'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { BsPencilSquare } from 'react-icons/bs'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { FaCloudDownloadAlt } from 'react-icons/fa'
import { FaLink } from 'react-icons/fa'
import theme from '../../stylesheets/theme'

const SDiv = styled.div`
  margin: 0.75em 1em 1em 1em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0;

  button {
    border-radius: 0;
    padding: 0.3rem 0.4em;
    display: flex;
    justify-content: space-around;
    font-size: 0.9rem;
  }
  .back {
    border: 2px solid ${theme.purple};
    transition: filter 0.5s ease, color 0.5s ease;
    color: ${theme.purple};
  }
  .edit {
    background: ${theme.purple};
  }
  .edit:hover {
    background: #6701bff5;
  }
  .back:hover {
    border: 2px solid ${theme.purple};
    color: ${theme.green};
    filter: blur(1px);
  }
  .upload {
    background: ${tinycolor('#69FF74').darken(36).toString()};
  }
  .upload:hover {
    background: ${theme.darkgreen};
  }
  .download {
    background: ${'#244fb3'};
  }
  .download:hover {
    background: ${theme.darkblue};
  }
  .share {
    background: grey;
  }
  .share:hover {
    background: darkgrey;
  }
  @media all and (max-width: 920px) {
    button {
      font-size: 0.8rem;
      padding: 0.4em 0.4em;
      em {
        display: none;
      }
      p {
        display: none;
      }
    }
  }
  /* @media all and (max-width: 570px) {
    button {
      font-size: 10px;

      em {
        display: none;
      }
      p {
        display: none;
      }
    }
  } */
`

function ButtonsHeader(props) {
  return (
    <SDiv className="buttons-header">
      <Button
        // onClick={() => history.push('/tracks')}
        variant="outlined"
        disableElevation
        fullWidth
        size="large"
        className="back"
        color="primary"
      >
        <IoMdArrowRoundBack className="icon" size="2.1em" />
        <em>BACK TO TRACK LIST</em>
        <p></p>
      </Button>
      <Button
        // onClick={() => setShowEditTrack(true)}
        variant="contained"
        disableElevation
        fullWidth
        size="large"
        className="edit"
        color="primary"
      >
        <BsPencilSquare className="icon" size="2em" />
        <em>EDIT TRACK</em>
        <p></p>
      </Button>
      <Button
        // onClick={() => props.setShowNewVersionForm(true)}
        variant="contained"
        disableElevation
        fullWidth
        size="large"
        className="upload"
        color="inherit"
      >
        <FaCloudUploadAlt className="icon" size="2.2em" />
        <em>UPLOAD NEW</em>
        <p></p>
      </Button>
      <Button
        // onClick={() => setShowDownloadForm(true)}
        variant="contained"
        disableElevation
        fullWidth
        size="large"
        className="download"
        color="inherit"
      >
        <FaCloudDownloadAlt className="icon" size="2.2em" />
        <em>DOWNLOAD</em>
        <p></p>
      </Button>
      <Button
        // onClick={() => setShowShareForm(true)}
        variant="contained"
        disableElevation
        fullWidth
        size="large"
        className="share"
        color="inherit"
        >
        <FaLink className="icon" size="2em"/>
        <em>SHARE</em>
        <p></p>
      </Button>
    </SDiv>
  )
}

export default ButtonsHeader
