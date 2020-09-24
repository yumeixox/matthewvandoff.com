import React from 'react'
import { connect } from 'react-redux'
import { changeCurrentVersion } from '~redux/api/api-actions.js'
import { selectTrack } from '~redux/global/global-actions.js'
import { useTheme } from '@material-ui/core/styles'
import { MdStar } from 'react-icons/md'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Loader from 'react-loader-spinner'

function mapStateToProps(state) {
  return {
    userSub: state.api.userSub,
    saving: state.api.saving,
    selectedTrack: state.global.selectedTrack,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    changeCurrentVersion: (userSub, data) => dispatch(changeCurrentVersion(userSub, data)),
    selectTrack: (track) => dispatch(selectTrack(track)),
  }
}
const ChangeCurrentVersionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeCurrentVersion)

const SDialog = styled(Dialog)`
  .MuiPaper-root {
    padding: 0.5em;
  }
  .MuiDialogActions-root {
    padding-bottom: 0.75em;
  }
  button {
    display: flex;
    width: 155px;
    height: 35px;
    justify-content: space-around;
    align-items: center;
  }
  .icon {
    align-self: flex-start;
  }
  .loader {
    svg {
      fill: ${(props) => props.theme.purple};
      margin: 0.5em 0 0.5em 0;
    }
  }
`

function ChangeCurrentVersion(props) {
  function handleClose() {
    props.setActive(false)
  }

  function submit() {
    const data = {
      trackSub: props.selectedTrack.trackSub,
      newCurrentVersion: props.newSelectedVersion.versionSub,
    }
    props.changeCurrentVersion(props.userSub, data).then((res) => {
      props.selectTrack(res.data.Attributes.tracks[props.selectedTrack.trackSub])
      handleClose()
    })
  }

  return (
    <SDialog open={props.active} onClose={handleClose}>
      <DialogTitle>Change Current Version</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Change current version to {props.newSelectedVersion.versionTitle}?
        </DialogContentText>
      </DialogContent>
      {props.saving ? (
        <Loader className="loader" type="Bars" height={30} width={30} />
      ) : (
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" onClick={submit} color="primary" autoFocus>
            <MdStar size="1.5em" className="icon" />
            <em>Confirm</em>
            <p></p>
          </Button>
        </DialogActions>
      )}
    </SDialog>
  )
}

export default ChangeCurrentVersionContainer
