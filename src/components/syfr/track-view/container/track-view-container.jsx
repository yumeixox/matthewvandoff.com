import React from 'react'
// import { connect } from 'react-redux'
// import { useParams, useHistory } from 'react-router-dom'
// import { motion } from 'framer-motion'
import styled from 'styled-components'
import ButtonsHeader from '../buttons-header/buttons-header.jsx'
import Display from '../display/display.jsx'
import VersionsTable from '../versions-table/versions-table.jsx'

const STrackView = styled.div`
  margin: 0em auto;
  width: 95%;
  height: 700px;
`

function TrackView() {
  return (
      <STrackView>
        <ButtonsHeader/>
        <Display/>
        <VersionsTable/>
      </STrackView>
  )
}

export default TrackView
