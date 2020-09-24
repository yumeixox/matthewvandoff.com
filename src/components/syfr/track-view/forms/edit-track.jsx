import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Loader from 'react-loader-spinner'
import { editTrack } from '~redux/api/api-actions.js'
import { selectTrack } from '~redux/global/global-actions.js'
import { useForm } from 'react-hook-form'

function mapStateToProps(state) {
  return {
    userSub: state.api.userSub,
    selectedTrack: state.global.selectedTrack,
    saving: state.api.saving,
    tracks: state.api.tracks,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    editTrack: (userSub, track) => dispatch(editTrack(userSub, track)),
    selectTrack: (track) => dispatch(selectTrack(track)),
  }
}
const EditTrackContainer = connect(mapStateToProps, mapDispatchToProps)(EditTrack)

const SDialog = styled(Dialog)`
  .error {
    color: red;
    margin: 0.5em 0 0.5em 0;
  }
  svg {
    fill: ${(props) => props.theme.purple};
    margin: 0.5em 0 0.5em 0;
  }
`

function EditTrack(props) {
  const handleClose = () => {
    props.setActive(false)
  }

  const { register, handleSubmit, errors } = useForm()
  function submit(data) {
    if (data.title === props.selectedTrack.title && data.genre === props.selectedTrack.genre) {
      handleClose()
      return null
    }
    const trackSub = props.selectedTrack.trackSub
    data.trackSub = trackSub
    props.editTrack(props.userSub, data).then((res) => {
      props.selectTrack(res.data.Attributes.tracks[trackSub])
      handleClose()
    })
  }

  return (
    <SDialog open={props.active} onClose={handleClose}>
      <DialogTitle>Edit Track</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          name="title"
          fullWidth
          variant="filled"
          inputProps={{ maxLength: 60 }}
          inputRef={register({
            required: true,
            pattern: {
              value: /^[\w\-\s]+$/,
              message: 'Title may only contain letters and/or numbers.',
            },
          })}
          error={errors.title ? true : false}
          defaultValue={props.selectedTrack.title}
          autoFocus
          autoComplete="off"
          disabled={props.saving}
        />
        {errors.title && <p className="error">{errors.title.message}</p>}
        <TextField
          label="Genre"
          name="genre"
          fullWidth
          inputProps={{ maxLength: 50 }}
          inputRef={register({
          })}
          error={errors.genre ? true : false}
          variant="filled"
          defaultValue={props.selectedTrack.genre}
          autoComplete="off"
          disabled={props.saving}
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
            disabled={props.saving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(submit)}
            variant="contained"
            color="primary"
            disabled={props.saving}
          >
            Submit
          </Button>
        </DialogActions>
      )}
    </SDialog>
  )
}

export default EditTrackContainer
