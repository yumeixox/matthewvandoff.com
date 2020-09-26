import React from 'react';
import { hot } from "react-hot-loader/root"
import  { createGlobalStyle, ThemeProvider } from 'styled-components'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import Nav from './components/nav'
import Hero from './components/hero'
import About from './components/about'
import Syfr from './components/syfr/syfr'
import TicTacToe from './components/tic-tac-toe/tic-tac-toe'
import ThisPage from './components/this-page'
import Contact from './components/contact'
import reset from './global-styles/reset'
import theme from './global-styles/theme'
import styles from './global-styles/styles'
import tables from './components/syfr/stylesheets/tables'
import muiTheme from './components/syfr/stylesheets/mui-theme'
import * as Scroll from 'react-scroll'

const GlobalStyles = createGlobalStyle`
  ${reset}
  ${styles}
  ${tables}
`
const Element = Scroll.Element

function App() {
  return (
    <React.Fragment>
      <GlobalStyles/>
      <ThemeProvider theme={theme}>
        <Nav/>
        <Hero/>
        <Element name="about" id="about">
          <About/>
        </Element>
          <MuiThemeProvider theme={muiTheme}>
            <Element name="projects" id="projects">
              <Syfr/>
              <TicTacToe/>
              <ThisPage/>
            </Element>
            <Element name="contact" id="contact">
              <Contact/>
            </Element>
          </MuiThemeProvider>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default hot(App);
