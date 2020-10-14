import React, { useState } from 'react'
import styled from 'styled-components'
import theme from '../../stylesheets/theme'
import DataTable from 'react-data-table-component'
import PlayButton from '../../common/buttons/play-button.jsx'
import { MdStar, MdStarBorder } from 'react-icons/md'
import { BsThreeDots, BsFolderCheck } from 'react-icons/bs'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Amplitude from 'amplitudejs'
import foggy from '../../../../assets/audio/foggy.mp3'
import wand from '../../../../assets/audio/wand.mp3'
import bleak from '../../../../assets/audio/bleak.mp3'
import save from '../../../../assets/audio/save.mp3'
import Loader from 'react-loader-spinner'
import { FaHourglassEnd } from 'react-icons/fa'

const SDiv = styled.div`
  margin: 1.5em 0 0 0;
  padding: 0.5em 0 0 0;
  border-top: 2px solid ${theme.blue};
  box-sizing: border-box;
  
  .rdt_TableCol {
    color: ${theme.blue};
  }
  .stems-icon {
    margin-top: 7px;
  }
  .options {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: right;
  }
  .loader svg {
    cursor: pointer;
    fill: ${theme.purple};
  }
  .stems-icon:hover {
    cursor: pointer;
  }
  .current-version-table {
    border: 2px solid ${theme.blue};
    margin: 10px 0;
    .rdt_TableRow {
      background: #44415d4f;
    }
  }
`

const customStyles = {
  headCells: {
    style: {
      fontSize: '13px',
    },
    sortStyle: {
      color: 'blue',
    },
    activeSortStyle: {
      color: `${theme.blue}`,
    },
  },
}

const versionsArr = [
  {
    bounceName: "wand",
    stemsName: "Great",
    versionTitle: "Version 4",
    duration: "1:46",
    createdAt: "07-22-2020",
    versionNotes: "Ready for mix",
    versionSub: 1
  },
  {
    bounceName: "foggy",
    stemsName: "Great",
    versionTitle: "Acoustic Version",
    duration: "1:06",
    createdAt: "07-20-2020",
    versionNotes: "",
    versionSub: 2
  },
  {
    bounceName: "bleak",
    stemsName: "Great",
    versionTitle: "Version 2",
    duration: "2:39",
    createdAt: "07-19-2020",
    versionNotes: "Added drums and bridge",
    currentVersion: 1,
    versionSub: 3
  },
  {
    bounceName: "save",
    stemsName: "Great",
    versionTitle: "Version 1",
    duration: "1:36",
    createdAt: "06-23-2020",
    versionNotes: "",
    currentVersion: 1,
    versionSub: 4
  }
]

function VersionsTable() {
  const [ playing, setPlaying ] = useState(false)
  const [ version, setVersion ] = useState(null)
  const columns = [
    {
      cell: (e) => {
        let url
        if (e.bounceName === "foggy") {
          url = foggy
        }
        else if (e.bounceName === "wand") {
          url = wand
        }
        else if (e.bounceName === "bleak") {
          url = bleak
        }
        else if (e.bounceName === "save") {
          url = save
        }
        const play = document.getElementById("play-pause")          
        if (e.bounceName) {
          return (
            <div onClick={() => {              
              if (version !== e) {                
                Amplitude.stop()            
                Amplitude.init({
                  songs: [{ name: 'How To Talk To Computers', url: url }],
                  callbacks: {
                    play: () => {                      
                      setPlaying(true)
                    },
                    pause: () => { setPlaying(false) }
                  }
                })
                play.click()
                setVersion(e)                
              }
              else {
                play.click()
              }
            }}>
              { (version === e && playing === true) ?
                <Loader className="loader" type="Bars" height={30} width={30}/>
                :
                <PlayButton version={e} type="version" color="blue" className="play-button"/>                
              }
            </div>
          )
        }
      },
      button: true,
      compact: true,
      width: '70px',
      center: true,
    },
    {
      cell: (e) => {
        if (e.stemsName) {
          return (
            <Tooltip arrow title="145MB">
              <div>
                <BsFolderCheck className="stems-icon" size="1.6em" color="lightblue" />
              </div>
            </Tooltip>
          )
        }
      },
      button: true,
      compact: true,
      width: '60px',
      center: true,
    },
    {
      name: 'Version',
      selector: 'versionTitle',
      sortable: true,
      maxWidth: '250px',
    },
    {
      name: 'Time',
      selector: 'duration',
      sortable: true,
      center: true,
      width: '100px',
      style: { 'padding-right': '30px' },
    },
    {
      name: 'Created',
      selector: 'createdAt',
      sortable: true,
      // format: (row) => row.createdAt.substr(5, 5) + '-' + row.createdAt.substr(0, 4),
      compact: true,
      width: '120px',
    },
    {
      name: 'Notes',
      selector: 'versionNotes',
      minWidth: '400px',
    },
    {
      cell: (e) => {
        return (
          <div className="options">
            {e.versionSub === 1 ? (
              <Tooltip title="Current Version" placement="left">
                <IconButton>
                  <MdStar
                    color={theme.blue}
                    size="1.35em" />
                </IconButton>
              </Tooltip>
            ) : (
                <Tooltip title="Mark as Current Version" placement="left" arrow>
                  <IconButton>
                    <MdStarBorder
                      color={theme.blue}
                      size="1.35em" />
                  </IconButton>
                </Tooltip>
              )}
            <IconButton>
              <BsThreeDots
                color={theme.blue}
                size="1.35em" />
            </IconButton>
          </div>
        )
      },
      button: true,
      compact: true,
      minWidth: '125px'
    },
  ]
  return (
    <SDiv className="table-container">
      <DataTable
        title="Current Version"
        className="current-version-table"
        columns={columns}
        data={versionsArr.filter((version) => version.versionSub === 1)}
        theme="SYFR"
        customStyles={customStyles}
        noHeader={true}
        highlightOnHover={true}
        pointerOnHover={false}
        noTableHead
      />
      { versionsArr.length > 1 &&
        <DataTable
          title="Versions"
          className="versions-table"
          keyField="versionSub"
          columns={columns}
          data={versionsArr.filter((version) => version.versionSub !== 1)}          
          theme="SYFR"
          customStyles={customStyles}
          noHeader={true}
          highlightOnHover={true}
          pointerOnHover={false}
          defaultSortField="createdAt"
          defaultSortAsc={false}
        />
      }      
    </SDiv>
  )
}

export default VersionsTable
