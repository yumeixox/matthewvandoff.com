import React from 'react'
import styled from 'styled-components'
import { AiFillGithub } from 'react-icons/ai'

const Sdiv = styled.div`
  box-sizing: border-box;
  background: black;
  height: 50vh;
  width: 100%;
  section {
    padding: 2rem 0 0 2rem;
  }
  h1 {
    font-size: 2.25rem;
  }
  p {
    font-size: 1rem;
    padding: 2rem 0 0 0;
    line-height: 1.85rem;
    width: 45vw;
    color: white;
  }
  .icon {
    height: 25px;
    width: 25px;
  }
  a {
    display: flex;
    align-items: center;
    margin: 0.5rem 0 0 0;

    em {
      margin: 0 0 0 0.5rem;
      color: lightblue;
    }
  }
  a:hover {
    color: lightblue;
  }

  @media all and (max-width: 600px) {
    p {
      width: 90%;
    }
    a {
      padding: 1em 0 0 0;
    }
    em {
      /* display: block; */
      width: 80%;
      overflow-wrap: break-word;
    }
  }
`

function ThisPage() {
  return (
    <Sdiv>
      <section>
        <h1>About This Page</h1>
        <p>This page was created with React / TypeScript.
        It also uses AWS Lambda + SES to send the emails.
        You can check out the source code here:
        </p>
        <a href="https://github.com/yumeixox/matthewvandoff.com" target="_blank"><AiFillGithub className="icon" /><em>https://github.com/yumeixox/matthewvandoff.com</em></a>
      </section>
    </Sdiv>
  )
}

export default ThisPage