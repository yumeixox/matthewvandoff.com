import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { BsPencilSquare } from 'react-icons/bs'
import { MdClose } from 'react-icons/md'
import styled from 'styled-components'

const SDiv = styled.div`
  .icon {
    padding-right: 1em !important;
  }
`

export default function OptionsMenu() {
  const handleClose = () => {
    props.setPosition({ mouseX: null, mouseY: null })
  }

  return (
    <SDiv>
      <Menu
        id="simple-menu"
        anchorReference="anchorPosition"
        anchorPosition={
          props.position.mouseY !== null && props.position.mouseX !== null
            ? { top: props.position.mouseY, left: props.position.mouseX }
            : undefined
        }
        keepMounted
        open={props.position.mouseY !== null}
        onClose={handleClose}
        transitionDuration={200}
      >
        <MenuItem onClick={handleEditClick}>
          <BsPencilSquare size="1.4em" />
          {'\u00A0'}
          {'\u00A0'}
          {'\u00A0'}Edit{' '}
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <MdClose size="1.5em" />
          {'\u00A0'}
          {'\u00A0'}
          {'\u00A0'}Delete{' '}
        </MenuItem>
      </Menu>
    </SDiv>
  )
}
