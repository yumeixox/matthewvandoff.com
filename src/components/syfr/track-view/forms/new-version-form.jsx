import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {
  setShowNewVersionForm,
  updateSelectedVersionStems,
  updateSelectedVersionBounce,
} from '~redux/track-view/track-view-actions.js'
import { setShowBounceWarning, selectTrack } from '~redux/global/global-actions.js'
import { saveNewVersion } from '~redux/api/api-actions.js'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FileInput from 'components/common/inputs/file-input.jsx'
import BounceWarning from 'components/common/forms-dialogs/bounce-warning.jsx'
import ProgressBars from 'components/common/progress-bars.jsx'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  // Makes sure drag & drop still works when form is already open
  root: {
    'z-index': '1 !important',
  },
})

const SDialog = styled(Dialog)`
  .MuiPaper-root {
    width: 500px;
  }
  .error {
    color: red;
    margin: 0.15em 0 0.5em 0;
  }
  .checkbox {
    margin-right: 43% !important;
  }
  .MuiFormControlLabel-label {
    margin-top: 5px;
  }
  .MuiDialogContent-root {
    padding-top: 0.1em !important;
  }
  .MuiDialogActions-root {
    justify-content: center;
    padding-top: 0;

    .MuiButtonBase-root {
      color: white;
      margin-bottom: 0.5em;
    }
  }
  .cancel-button {
    display: block;
  }
`

function mapStateToProps(state) {
  return {
    userSub: state.api.userSub,
    active: state.trackView.showNewVersionForm,
    selectedTrack: state.global.selectedTrack,
    selectedVersionStems: state.trackView.selectedVersionStems,
    selectedVersionBounce: state.trackView.selectedVersionBounce,
    showBounceWarning: state.global.showBounceWarning,
    saving: state.api.saving,
    versionsArr: state.global.selectedTrackVersionsArr,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    setActive: (bool) => dispatch(setShowNewVersionForm(bool)),
    updateSelectedVersionStems: (file) => dispatch(updateSelectedVersionStems(file)),
    updateSelectedVersionBounce: (file) => dispatch(updateSelectedVersionBounce(file)),
    setShowBounceWarning: (bool) => dispatch(setShowBounceWarning(bool)),
    saveNewVersion: (userSub, data) => dispatch(saveNewVersion(userSub, data)),
    selectTrack: (track) => dispatch(selectTrack(track)),
  }
}
const NewVersionFormContainer = connect(mapStateToProps, mapDispatchToProps)(NewVersionForm)

function NewVersionForm(props) {
  const classes = useStyles()
  const { register, handleSubmit, errors, getValues } = useForm()
  const [showFileSizeError, setShowFileSizeError] = useState(false)

  function handleClose() {
    props.setActive(false)
  }

  function onSubmit() {
    setShowFileSizeError(false)
    if (!props.selectedVersionBounce) {
      props.setShowBounceWarning(true)
    } else {
      submit()
    }
  }
  async function submit() {
    if (props.showBounceWarning) {
      props.setShowBounceWarning(false)
    }
    const data = getValues()
    data.trackSub = props.selectedTrack.trackSub
    const stems = props.selectedVersionStems
    const bounce = props.selectedVersionBounce
    const files = {}
    stems ? (files.stems = stems) : null
    bounce ? (files.bounce = bounce) : null

    const maxFileSize = 5000000000
    for (let i = 0; i < Object.keys(files).length; i++) {
      if (files[Object.keys(files)[i]].size > maxFileSize) {
        setShowFileSizeError(true)
        return null
      }
    }
    data.files = files

    try {
      const res = await props.saveNewVersion(props.userSub, data)
      props.selectTrack(res.data.Attributes.tracks[props.selectedTrack.trackSub])
      handleClose()
    } catch (err) {}
    props.updateSelectedVersionStems(null)
    props.updateSelectedVersionBounce(null)
  }

  return (
    <SDialog classes={{ root: classes.root }} open={props.active} onClose={handleClose}>
      <DialogTitle className="form-title">New Version</DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <DialogContent className="form-content">
          <TextField
            inputRef={register({ required: true })}
            label="Version"
            name="versionTitle"
            margin="dense"
            fullWidth
            variant="filled"
            defaultValue={'Version ' + (props.versionsArr.length + 1)}
            error={errors.versionTitle ? true : false}
            disabled={props.saving ? true : false}
          />
          {errors.versionTitle && <p className="error">Version name is required</p>}

          <FileInput
            label="Project Files"
            disabled={props.saving ? true : false}
            selectedFile={props.selectedVersionStems}
            updateSelectedFile={props.updateSelectedVersionStems}
            type="project-files"
          />
          <FileInput
            label="Audio"
            disabled={props.saving ? true : false}
            selectedFile={props.selectedVersionBounce}
            updateSelectedFile={props.updateSelectedVersionBounce}
            type="audio"
          />
          <TextField
            label="Notes"
            name="notes"
            inputRef={register()}
            fullWidth
            variant="filled"
            className="notes"
            multiline
            rows={6}
            rowsMax={15}
            style={{ marginTop: '10px', marginBottom: '6px' }}
            disabled={props.saving ? true : false}
          />

          {(props.selectedTrackStems ||
            props.selectedTrackBounce ||
            props.selectedVersionStems ||
            props.selectedVersionBounce) && (
            <FormControlLabel
              className="checkbox"
              inputRef={register()}
              control={<Checkbox defaultChecked color="primary" name="makeCurrentVersion" />}
              label="Mark as new current version"
              disabled={props.saving ? true : false}
            />
          )}
        </DialogContent>

        {showFileSizeError ? <p className="error">Sorry, maximum file size is 5GB</p> : null}

        <DialogActions className="form-actions">
          {props.saving && <ProgressBars />}
          {!props.saving && (
            <Button
              color="primary"
              variant="contained"
              size="large"
              startIcon={<FaCloudUploadAlt />}
              type="submit"
              className="submit"
              disabled={
                (props.selectedTrackStems ||
                  props.selectedTrackBounce ||
                  props.selectedVersionStems ||
                  props.selectedVersionBounce) &&
                !props.saving
                  ? false
                  : true
              }
            >
              Upload
            </Button>
          )}
        </DialogActions>

        <BounceWarning
          active={props.showBounceWarning}
          setActive={props.setShowBounceWarning}
          submit={submit}
        />
      </form>
    </SDialog>
  )
}

export default NewVersionFormContainer
