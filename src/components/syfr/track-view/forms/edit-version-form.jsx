import React from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { editVersion } from '~redux/api/api-actions.js'
import { selectTrack } from '~redux/global/global-actions.js'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
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
    editVersion: (userSub, data) => dispatch(editVersion(userSub, data)),
    selectTrack: (track) => dispatch(selectTrack(track)),
  }
}
const EditVersionFormContainer = connect(mapStateToProps, mapDispatchToProps)(EditVersionForm)

const SDialog = styled(Dialog)`
  svg {
    fill: ${(props) => props.theme.purple};
    margin: 0.5em 0 0.5em 0;
  }
`

function EditVersionForm(props) {
  function handleClose() {
    props.setActive(false)
  }

  const { register, handleSubmit, errors } = useForm()
  function submit(data) {
    if (
      data.versionTitle === props.newSelectedVersion.title &&
      data.versionNotes === props.newSelectedVersion.versionNotes
    ) {
      handleClose()
      return null
    }
    data.versionSub = props.newSelectedVersion.versionSub
    data.trackSub = props.selectedTrack.trackSub
    props.editVersion(props.userSub, data).then((res) => {
      props.selectTrack(res.data.Attributes.tracks[props.selectedTrack.trackSub])
      handleClose()
    })
  }

  return (
    <SDialog open={props.active} onClose={handleClose}>
      <DialogTitle>Edit Version</DialogTitle>
      <DialogContent>
        <TextField
          label="Version Title"
          name="versionTitle"
          fullWidth
          variant="filled"
          inputProps={{ maxLength: 60 }}
          defaultValue={props.newSelectedVersion.versionTitle}
          autoFocus
          autoComplete="off"
          disabled={props.saving}
          inputRef={register({
            required: true,
          })}
          error={errors.versionTitle ? true : false}
        />
        <TextField
          label="Notes"
          name="versionNotes"
          fullWidth
          variant="filled"
          className="notes"
          multiline
          inputProps={{ maxLength: 4000 }}
          rows={6}
          rowsMax={15}
          defaultValue={props.newSelectedVersion.versionNotes}
          style={{ marginTop: '10px', marginBottom: '6px' }}
          autoComplete="off"
          disabled={props.saving}
          inputRef={register()}
        />
      </DialogContent>
      {props.saving ? (
        <Loader className="loader" type="Bars" height={30} width={30} />
      ) : (
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleClose}
            color="secondary"
            autoComplete="off"
            disabled={props.saving}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit(submit)}
            color="primary"
            autoComplete="off"
            disabled={props.saving}
          >
            Submit
          </Button>
        </DialogActions>
      )}
    </SDialog>
  )
}

export default EditVersionFormContainer
