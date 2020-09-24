import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { FiSend } from 'react-icons/fi'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Loader from 'react-loader-spinner'
import { createShareLink } from '~redux/api/api-actions.js'
import { RiCheckboxBlankCircleLine, RiCheckboxCircleLine } from 'react-icons/ri'
import { BsInfoCircle } from 'react-icons/bs'
import Tooltip from '@material-ui/core/Tooltip'

const SDialog = styled(Dialog)`
  .MuiPaper-root {
    padding: 0.75em;
    width: 400px;
  }
  .MuiDialogTitle-root {
    padding-bottom: 0;
    padding-top: 0;
  }
  h1 {
    margin: 0.5em 0 0 0;
  }
  .active-links {
    max-height: 250px;
    overflow-y: auto;
    margin: 0 0 0.5em 0;
    border-bottom: 1px solid grey;
    table {
      width: 80%;
    }
  }
  table {
    margin: 0.6em auto 1em auto;
    width: 100%;
    border: 1px solid grey;
    border-radius: 10px;
    td {
      margin: 0 auto;
      padding: 0.5em 1em 0.5em 1em;

      svg {
        height: 25px;
        width: 25px;
        margin-top: 0.2em;
      }
    }
    tr {
      background: #37375f;
      height: 37px;
      display: flex;
      flex-direction: row;
      align-items: center;
      border-top: 1px solid grey;
      border-bottom: 1px solid grey;
    }
    tr:first-child {
      border: 0;
    }
    tr:last-child {
      border-bottom: 0;
    }
    .email {
      width: 150px;
    }
    .opened:hover {
      cursor: pointer;
    }
  }
  .checked {
    color: ${p => p.theme.green};
  }
  .unchecked {
    color: darkgrey;
  }
  .email-input {
    width: 300px;
  }
  .info {
    width: 1.3em;
    height: 1.3em;
    margin-left: 1em;
  }
  .info:hover {
    cursor: pointer;
  }
  .select {
    margin-bottom: 0.75em;
  }
  .radio {
    margin-bottom: 0.75em;
  }
  .loader svg {
    fill: ${p => p.theme.purple};
    height: 2em;
    width: 2em;
    margin: 0.5em 0 0 0;
  }
  .expires {
    color: red !important
  }
`

function mapStateToProps(state) {
  return {
    userSub: state.api.userSub,
    selectedTrack: state.global.selectedTrack,
    versionsArr: state.global.selectedTrackVersionsArr,
    versionsMap: state.global.selectedTrackVersionsMap,
    saving: state.api.saving,
    shareLinks: state.api.shareLinks
  }
}
function mapDispatchToProps(dispatch) {
  return {
    createShareLink: (data) => { dispatch(createShareLink(data)) }
  }
}

const ShareContainer = connect(mapStateToProps, mapDispatchToProps)(Share)
function Share(props) {
  const { register, handleSubmit, errors, getValues } = useForm()
  const [userSelectedVersion, setUserSelectedVersion] = useState(props.selectedTrack.currentVersion)
  const [type, setType] = React.useState(props.versionsMap[userSelectedVersion].stemsName ? 'project-files' : 'audio');
  const handleClose = () => {
    props.setActive(false)
  }
  const handleSelectChange = (e) => {
    setUserSelectedVersion(e.target.value)
    setType(props.versionsMap[e.target.value].stemsName ? 'project-files' : 'audio')
  }
  const handleRadioChange = (e) => {
    setType(e.target.value)
  }

  const versionMenus = props.versionsArr.map((version) => (
    <MenuItem value={version.versionSub} key={version.versionSub}>
      {version.versionTitle}
    </MenuItem>
  ))

  const trackShareLinks = []
  let keys = Object.keys(props.shareLinks)
  for (let i = 0; i < keys.length; i++) {
    if (props.shareLinks[keys[i]].trackSub === props.selectedTrack.trackSub) {
      trackShareLinks.push(props.shareLinks[keys[i]])
    }
  }

  let rows = trackShareLinks.sort((a, b) => a.expires > b.expires ? 1 : -1).map((link, i) =>
    <tr key={Object.keys(props.shareLinks)[i]}>
      <td className="email">{link.email}</td>
      <Tooltip
        arrow
        title={<p>Expires: {new Date(link.expires).toLocaleDateString() + " " + new Date(link.expires).toLocaleTimeString()}</p>}
        placement="top"
        >
        <td><BsInfoCircle className="info"/></td>
      </Tooltip>
      <Tooltip
        arrow
        title={link.opened ? link.email + " opened your link." : link.email + " hasn't opened your link."}
        placement="right"
        >
        <td className="opened">{link.opened ? <RiCheckboxCircleLine className="checked"/> : <RiCheckboxBlankCircleLine className="unchecked"/>}</td>
      </Tooltip>
    </tr>
  )
  async function submit() {
    const data = getValues()
    data.userSub = props.userSub
    data.trackSub = props.selectedTrack.trackSub
    data.versionSub = userSelectedVersion
    data.fileName = data.type === "project-files" ? props.selectedTrack.versions[data.versionSub].stemsName : props.selectedTrack.versions[data.versionSub].bounceName
    try {
      const res = await props.createShareLink(data)
      return null
    }
    catch(err) {
      return null
    }
  }
  return (
    <SDialog open={props.active} onClose={handleClose}>
      <DialogTitle>Share</DialogTitle>
      <DialogContent>

        { (trackShareLinks.length > 0) &&
          <div className="active-links">
            <h2>Active Links</h2>
            <table>
              <tbody>
                {rows}
              </tbody>
            </table>
          </div>
        }

        <Select
          autoWidth
          className="select"
          value={userSelectedVersion}
          defaultValue={props.selectedTrack.currentVersion}
          onChange={handleSelectChange}
          disabled={props.saving ? true : false}
        >
          {versionMenus}
        </Select>
        <br/>
        <FormControl className="radio">
          <RadioGroup name="type" row value={type} onChange={handleRadioChange}>
            <FormControlLabel value="project-files" control={<Radio color="primary"/>} label="Project Files" inputRef={register()} disabled={(props.versionsMap[userSelectedVersion].stemsName && props.versionsMap[userSelectedVersion].bounceName) && !props.saving ? false : true}/>
            <FormControlLabel value="audio" control={<Radio color="primary"/>} label="Audio" inputRef={register()} disabled={(props.versionsMap[userSelectedVersion].bounceName && props.versionsMap[userSelectedVersion].stemsName) && !props.saving ? false : true}/>
          </RadioGroup>
        </FormControl>
        <TextField
          label="Email"
          variant="outlined"
          className="email-input"
          name="email"
          autoFocus
          fullWidth
          inputRef={register({
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Invalid email address',
            },
          })}
          inputProps={{ maxLength: 254 }}
          error={errors.email ? true : false}
          disabled={props.saving ? true : false}
        />
      </DialogContent>
      <DialogActions>
        {props.saving ? <Loader type="Bars" className="loader"/> :
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit(submit)}
            disabled={props.saving ? true : false}
            startIcon={<FiSend size="1em" />}
          >
            Send
          </Button>
      }
      </DialogActions>
    </SDialog>
  )
}

export default ShareContainer
