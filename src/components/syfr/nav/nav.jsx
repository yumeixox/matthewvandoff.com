import React from 'react'
// import { connect } from 'react-redux'
// import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../../../assets/images/logo.svg'
import Avatar from '../common/avatar/avatar.jsx'

const SNav = styled.nav`
  margin: 0 auto;
  position: relative;
  width: 100%;
  height: 70px;
  background: transparent;
  align-items: center;
  width: 95%;
  ul {
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0em 0 0 0;
    width: 100%;
    height: 100%;
  }

  .logo img {
    width: 200px;
    padding: 0px 0 0 2vw;
  }

  .avatar-user {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 0 4vw 0 0;
  }

  .username,
  .avatar {
    padding: 0 8px 0 8px;
  }
  .username {
    font-weight: bold;
  }
  h2 {
    font-size: 1rem;
  }
`


function Nav(props) {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null)
  function handleProfileClick(e) {
    setMenuAnchorEl(e.currentTarget)
  }

  return (
    <div>
      <SNav className="nav">
        <ul>
          <li className="logo">
            <a href="##">            
              <img src={logo} alt="logo" draggable="false" />            
            </a>
          </li>
          <li className="avatar-user">
            <a href="##" className="username" draggable="false">
              <h2 className="display-name">yumei</h2>
            </a>
            <Avatar className="avatar" />
          </li>
        </ul>
      </SNav>
    </div>
  )
}

export default Nav
