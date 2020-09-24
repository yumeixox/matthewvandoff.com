import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { FaCloudDownloadAlt } from 'react-icons/fa'
import { downloadFile } from '~redux/api/api-actions.js'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

const SDialog = styled(Dialog)`
  .MuiPaper-root {
    padding: 1em;
    min-width: 350px;
  }
  .MuiDialogTitle-root {
    padding-bottom: 0;
    padding-top: 0;
  }
  .checkboxes {
    padding-top: 0.5em;
  }
  button {
    width: 200px;
  }
  .download-opener {
    display: none;
  }
`

function mapStateToProps(state) {
  return {
    userSub: state.api.userSub,
    selectedTrack: state.global.selectedTrack,
    versionsArr: state.global.selectedTrackVersionsArr,
    versionsMap: state.global.selectedTrackVersionsMap,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    downloadFile: (userSub, data) => dispatch(downloadFile(userSub, data)),
  }
}
const DownloadFormContainer = connect(mapStateToProps, mapDispatchToProps)(DownloadForm)

function DownloadForm(props) {
  const classes = useStyles()
  const handleClose = () => {
    props.setActive(false)
  }

  const [userSelectedVersion, setUserSelectedVersion] = useState(props.selectedTrack.currentVersion)

  const versionMenus = props.versionsArr.map((version) => (
    <MenuItem value={version.versionSub} key={version.versionSub}>
      {version.versionTitle}
    </MenuItem>
  ))
  const handleChange = (e) => {
    setUserSelectedVersion(e.target.value)
  }

  async function submit(type) {
    const data = {
      type: type,
      trackInfo: props.selectedTrack,
      versionSub: userSelectedVersion,
    }
    const res = await props.downloadFile(props.userSub, data)
    const link = document.createElement('a')
    link.href = res.data
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  return (
    <SDialog open={props.active} onClose={handleClose}>
      <DialogTitle>Download</DialogTitle>
      <DialogContent>
        <FormControl variant="standard" className={classes.formControl}>
          <Select
            // autoWidth
            value={userSelectedVersion}
            defaultValue={props.selectedTrack.currentVersion}
            onChange={handleChange}
          >
            {versionMenus}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        {props.versionsMap[userSelectedVersion].stemsName && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            className="confirm-button"
            onClick={() => submit('project-files')}
            startIcon={<FaCloudDownloadAlt size="1.25em" />}
          >
            Project Files
          </Button>
        )}
        {props.versionsMap[userSelectedVersion].bounceName && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            className="confirm-button"
            onClick={() => submit('audio')}
            startIcon={<FaCloudDownloadAlt size="1.25em" />}
          >
            Audio
          </Button>
        )}
      </DialogActions>
    </SDialog>
  )
}

export default DownloadFormContainer
