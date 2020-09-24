import React from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { deleteVersion } from '~redux/api/api-actions.js'
import { selectTrack } from '~redux/global/global-actions.js'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Loader from 'react-loader-spinner'

const SDialog = styled(Dialog)`
  .MuiPaper-root {
    padding-bottom: 0.5em;
    width: 350px;
  }
  .MuiDialogTitle-root {
    padding-bottom: 0.5em;
  }
  .confirm-button {
    background: red;
  }
  .confirm-button:hover {
    background: darkred;
  }
  button {
    margin: 0 0.5em 0 0.5em;
  }
  .checkboxes {
    margin: 0 0 0 2.25em;
  }
  svg {
    fill: ${(props) => props.theme.purple};
  }
`

function mapStateToProps(state) {
  return {
    userSub: state.api.userSub,
    saving: state.api.saving,
    selectedTrack: state.global.selectedTrack,
    selectedTrackVersionsArr: state.global.selectedTrackVersionsArr,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    deleteVersion: (version, options) => dispatch(deleteVersion(version, options)),
    selectTrack: (userSub, track) => dispatch(selectTrack(userSub, track)),
  }
}
const DeleteVersionContainer = connect(mapStateToProps, mapDispatchToProps)(DeleteVersion)

function DeleteVersion(props) {
  const { register, handleSubmit } = useForm()
  const history = useHistory()

  function handleClose() {
    props.setActive(false)
  }

  async function submit(data) {
    if (data.audio === false && data.projectFiles === false) {
      handleClose()
      return null
    }
    data.version = props.newSelectedVersion
    data.track = props.selectedTrack

    if (props.selectedTrackVersionsArr.length > 1) {
      data.newCurrentVersionSub =
        props.selectedTrack.currentVersion === props.newSelectedVersion.versionSub
          ? props.selectedTrackVersionsArr[1].versionSub
          : props.selectedTrack.currentVersion
    } else {
      data.newCurrentVersionSub = props.selectedTrack.currentVersion
    }
    const res = await props.deleteVersion(props.userSub, data)

    if (res.data.Attributes.tracks[props.selectedTrack.trackSub]) {
      props.selectTrack(res.data.Attributes.tracks[props.selectedTrack.trackSub])
      handleClose()
    } else {
      history.push('/tracks')
    }
  }

  return (
    <SDialog open={props.active} onClose={handleClose}>
      <DialogTitle id="responsive-dialog-title">Delete Version</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {'Delete ' + props.newSelectedVersion.versionTitle + '?'}
        </DialogContentText>

        {props.newSelectedVersion.stemsName && props.newSelectedVersion.bounceName && (
          <fieldset className="checkboxes">
            <FormControlLabel
              className="checkbox"
              inputRef={register()}
              control={<Checkbox defaultChecked color="primary" name="audio" />}
              label="Audio"
              disabled={props.saving ? true : false}
            />
            <FormControlLabel
              className="checkbox"
              inputRef={register()}
              control={<Checkbox defaultChecked color="primary" name="projectFiles" />}
              label="Project Files"
              disabled={props.saving ? true : false}
            />
          </fieldset>
        )}
      </DialogContent>
      <DialogActions>
        {props.saving && <Loader className="loader" type="Bars" height={30} width={30} />}
        {!props.saving && (
          <div>
            <Button variant="contained" onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button variant="contained" className="confirm-button" onClick={handleSubmit(submit)}>
              Confirm
            </Button>
          </div>
        )}
      </DialogActions>
    </SDialog>
  )
}

export default DeleteVersionContainer
