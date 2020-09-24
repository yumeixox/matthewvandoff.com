import { createMuiTheme } from '@material-ui/core/styles'

const muiTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#8A02FF',
    },
    secondary: {
      main: '#244fb3',
    },
    green: {
      main: '#69FF74',
    },
  },
  text: {
    primary: '#ffffff',
  },
  typography: {
    // fontFamily: ['Amiko', 'sans-serif'].join(','),
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: '0.75em',
        // backgroundColor: '#2f3444',
        padding: '0.75em',
      },
    },
  },
})

export default muiTheme
