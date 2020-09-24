import { css, createGlobalStyle } from 'styled-components'
import theme from './theme.js'
import { createTheme } from 'react-data-table-component'

export const tables = css`
  header {
    border: 2px solid ${theme.green};
    min-height: 40px !important;
    border-radius: 5px;
    margin: 0 0 5px 0;
    transition: border-color 0.5s ease;
    padding: 0 !important;

    &:after {
      content: 'CLICK OR DRAG & DROP TO UPLOAD';
      position: absolute;
      top: 0.64em;
      left: 42%;
      color: ${theme.green};
      background: transparent;
      font-size: 16px;
      z-index: 2;
      width: 400px;
      text-align: left;
      transition: opacity 0.5s ease, color 1s ease, visibility 1s ease;
      opacity: 0;
      pointer-events: none;
    }

    &:hover::after {
      display: block;
      opacity: 100%;
      ${'' /* color: ${theme.purple}; */}
      pointer-events: none;
    }
  }
  header:hover {
    cursor: pointer;
    border-color: ${theme.purple};

    p,
    .icon {
      ${'' /* color: ${theme.purple}; */}
    }
  }
  .sub-header {
    display: flex;
    align-items: center;
    color: ${theme.green};
    width: 100%;
    height: 100%;
    padding: 6px 0 6px 1.8em;
  }
  .sub-header .icon,
  .sub-header p {
    padding: 0 8px 0 8px;
    transition: color 1s ease;
  }
  .sub-header p {
    padding-top: 1px;
  }
  .rdt_TableCol {
    font-size: 14px;
  }
  .rdt_TableHeadRow {
    vertical-align: bottom !important;
  }
  .rdt_Pagination {
    min-height: 40px;
    svg {
      fill: white;
    }
  }
  .rdt_TableRow {
    font-size: 14px;
  }
  .rdt_TableRow:hover {
  }
  .rdt_TableBody {
    ${'' /* background: transparent; */}
  }
`
createTheme('SYFR', {
  text: {
    primary: 'white',
    secondary: 'green',
  },
  background: {
    default: 'transparent',
  },
  sortFocus: {
    default: 'white',
  },
  highlightOnHover: {
    default: `${theme.grey}`,
    text: `${theme.blue}`,
    button: 'purple',
  },
  divider: {
    // default: `${theme.bluegrey}`
  },
})

export default tables
