import React, { useState } from 'react'
import './src/index.js'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import { AiFillGithub } from 'react-icons/ai'

const Sdiv = styled.div`
  box-sizing: border-box;
  height: 115vh;
  background: #322d35;
  color: #edd26d;
  position: relative;
  user-select: none;
  #tic-tac-toe {
    position: relative;
    h1 {
      text-align: center;
      font-size: 75px;
      font-family: 'Nothing You Could Do', cursive;
      margin-bottom: 40px;
      padding: 3rem 0 0 0;
    }
    .grid {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      background: transparent;
      width: 380px;
      height: 380px;
      margin: 0 auto;
      padding: 0;
    }
    .cell {
      width: 32.5%;
      border: 2px solid #8384b0;
      border-radius: 15px;
      position: relative;

      strong {
        display: block;
      }
    }
    .cell:hover {
      background-color: #535b82;
      cursor: pointer;
    }
    .noHover {
      pointer-events: none;
    }
    .mark {
      font-size: 125px;
      font-family: 'Nothing You Could Do', cursive;
      position: absolute;
      left: 20%;
      top: 10%;
      text-transform: uppercase;
    }
    .faded {
      opacity: 14%;
      transition: opacity 1s ease;
    }
    .ttt {
      display: relative;
    }
    .winner {
      text-align: center;
      position: absolute;
      display: block;
      width: 100%;
      top: 20%;
      font-size: 8em;
      font-family: 'Nothing You Could Do', cursive;
      color: #fffdb1;
      z-index: 1;
      opacity: 0;
      word-spacing: -0.25em;
      transition: opacity 1s ease;
      user-select: none;
    }
    .banner {
      opacity: 100%;
    }
    .replay-container {
      position: absolute;
      display: flex;
      flex-direction: row;
      justify-content: center;
      top: 40%;
      z-index: 2;
      width: 100%;
      margin: 0 0 3rem 0;
    }
    .replay {
      display: block;
      font-size: 145px;
      color: #fffdb1;
      background: #20796a;
      z-index: 1;
      width: 160px;
      height: 160px;
      text-align: center;
      border-radius: 999px;
      transition: transform 1s ease-in-out, background-color 1s ease-in-out;
    }
    .replay:hover {
      background: #36ae9a;
      transform: rotate(360deg);
      background: #535b82;
      cursor: pointer;
    }
    .replay:active {
      background: #20796a;
    }
    .hidden {
      display: none;
    }
    .cell:nth-child(1) {
      border-left: 0;
      border-top: 0;
    }

    .cell:nth-child(2) {
      border-top: 0;
    }

    .cell:nth-child(3) {
      border-right: 0;
      border-top: 0;
    }

    .cell:nth-child(4) {
      border-left: 0;
    }

    .cell:nth-child(6) {
      border-right: 0;
    }

    .cell:nth-child(7) {
      border-left: 0;
      border-bottom: 0;
    }

    .cell:nth-child(8) {
      border-bottom: 0;
    }

    .cell:nth-child(9) {
      border-right: 0;
      border-bottom: 0;
    }
  }

  .overlay {
    box-sizing: border-box;
    position: absolute;
    background: ${p => p.theme.jet};
    width: 100%;
    height: 100%;
    z-index: 10;
    opacity: 0.95;
    transition: opacity 1s ease;
  }

  .overlay-container {
    height: 100vh;
    h1 {
      font-size: 2.25rem;
    }
    p {
      font-size: 1rem;
      padding: 2rem 0;
      line-height: 1.85rem;
      width: 80vw;
      color: white;
    }
    .left {
      padding: 3rem 0 0 3rem;
    }
    .right {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .info {
      padding: 0rem 0 0 0;
    }
    .github {
      padding: 0.2em 0 0 0;
    }
    .github a {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 2rem;
      .github-icon {
        height: 25px;
        width: 25px;
      }
      em {
        display: block;        
        padding: 0 0 0 0.5em;
        color: #fffdb1;
      }
    }

    .github a:hover {
      color: #fffc79;
    }
  }
  .disabled {
      z-index: 0;
      opacity: 0;
  }

  @media all and (min-width: 920px) {
    .overlay-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;
      /* height: 135vh; */
      .left {
        padding: 3rem 0 0 3rem;
        display: block;
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
        width: 45vw;
      }
      h1, h2, p, .info {
        width: 100% !important;
      }
    }
    .grid {
      width: 485px !important;
      height: 485px !important;      
    }
    .mark {
      font-size: 145px !important;
      /* top: 3vh !important; */
    }
  }
`

function TicTacToe() {
  const [open, setOpen] = useState(false)
  return (
    <Sdiv>
      <link href="https://fonts.googleapis.com/css2?family=Nothing+You+Could+Do&display=swap" rel="stylesheet"/>
      <div className={open ? "overlay disabled" : "overlay"}>
        <div className="overlay-container">
          <div className="left">
            <h1>AI is born</h1>
            <p className="summary">
              There are 255,168 possible games of Tic-tac-toe, excluding symmetry.
              Is it possible to make an unbeatable Tic-tac-toe computer? Certainly.
              Minimax is a recursive algorithm which, by analyzing the outcomes of each possible move
              on the board, chooses the optimal next move.
              It's purpose is to essentially minimize the possibility of the worst outcomes.
              Care to test your luck?
            </p>
            <p className="info">
              This app was built using JavaScript / jQuery
            </p>
            <p className="github">
              <a href="https://github.com/yumeixox/tic-tac-toe" target="_blank">
                <AiFillGithub className="github-icon"/>
                <em>https://github.com/yumeixox/tic-tac-toe</em>
              </a>
            </p>
          </div>
          <div className="right">
            <Button onClick={() => setOpen(true)} color="inherit" className="button" variant="outlined" size="large">Open Demo</Button>
          </div>
        </div>
      </div>
      <div id="tic-tac-toe">
        <h1>Tic Tac Toe</h1>
        <figure className="ttt"></figure>
      </div>
    </Sdiv>
  )
}

export default TicTacToe