import { css } from 'styled-components'
import theme from './theme'
import Exo from '../assets/fonts/Exo-VariableFont_wght.ttf'

const styles = css`
  @font-face {
    font-family: 'Exo';
    src: url(${Exo});
    font-style: normal;
  }

  body {
    /* min-width: 600px; */
    background: ${theme.jet};
    font-family: 'Exo', sans-serif;
    color: white;
    font-size: 16px;
    margin: 0 auto;
    box-sizing: border-box;
    /* -webkit-font-smoothing: antialiased; */
  }
  body::-webkit-scrollbar {
    width: 10px;
  }
  body::-webkit-scrollbar-track {
    background: transparent;
    margin: 20px 0 20px 0;
  }
  body::-webkit-scrollbar-thumb {
    background-color: grey;
    border-radius: 5px;
    box-shadow: 0 0 1px black inset;
  }
  body::-webkit-scrollbar-thumb:hover {
    border-radius: 0;
    background: lightgreen;
  }
  body::-webkit-scrollbar-thumb:active {
    background: lightgrey;
    width: 20;
    border-radius: 0;
  }
`

export default styles