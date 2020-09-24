import React from 'react'
import styled from 'styled-components'
import { FiMail, FiSend } from 'react-icons/fi'
import { FaLinkedin } from 'react-icons/fa'
import { AiFillGithub } from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Loader from 'react-loader-spinner'

const Sdiv = styled.div`
  height: 95vh;
  background: ${p => p.theme.jet};
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-template-rows: 1fr;
  h1 {
    font-size: 2.5rem;
  }
  .left {
    /* background: blue; */
    padding: 3rem 3rem;

    p {
      padding: 1rem 0 0 0rem;
      display: flex;
      align-items: center;
      em {
        padding: 0 0 0 0.5em;
      }
      a {
        display: block;
        display: flex;
        align-items: center;
      }
      a:hover {
        color: lightblue;
      }
    }
    .linkedin em, .github em {
      color: lightblue;
    }
    .icon {
      width: 25px;
      height: 25px;
    }
  }

  .right {
    padding: 3rem 3rem;
    
    h2 {
      font-size: 1.25rem;
      margin: 0 0 1rem 0;
    }
    .top-input {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .name, .email {
      width: 50%;
    }

    .name {
      margin-right: 0.25em;
    }
    .email {
      margin-left: 0.25em;
    }
    .captcha {
      margin: 1rem 0rem 0 0;
      display: flex;
      /* background: blue; */
      justify-content: flex-end;
    }
    .equation {
      /* border: 1px solid red; */
      font-size: 2rem;
      padding: 0.5rem;
    }
    .captcha-answer {
      width: 50px;
      height: 30px;
      font-size: 2rem;
      align-self: end;
      bottom: 5px;
    }
    .submit-button {
      margin-left: 1.5em;
      align-self: center;
    }
  }
`

function Contact() {
  const { register, handleSubmit, errors } = useForm()
  return (
    <Sdiv>
      <div className="left">
        <h1>Get In Touch</h1>
        <p className="email"><FiMail className="icon"/><em>mvandoff@gmail.com</em></p>
        <p className="linkedin"><a href="https://www.linkedin.com/in/matthew-vandoff" target="_blank"><FaLinkedin className="icon"/><em>https://www.linkedin.com/in/matthew-vandoff</em></a></p>
        <p className="github"><a href="https://github.com/yumeixox" target="_blank"><AiFillGithub className="icon"/><em>https://github.com/yumeixox</em></a></p>
      </div>

      <div className="right">
        <h2 className="message">Send me a message, I'll get back to you expeditiously!</h2>
        <div className="top-input">
          <TextField
            label="Name"
            name="name"
            className="name"
            variant="filled"
            inputProps={{ maxLength: 60 }}
            // autoFocus
            autoComplete="off"
            inputRef={register({
              required: true,
            })}
            error={errors.name ? true : false}
          />
          <TextField
            label="Your Email"
            name="email"
            className="email"
            variant="filled"
            inputProps={{ maxLength: 60 }}
            // autoFocus
            autoComplete="off"
            inputRef={register({
              required: true,
            })}
            error={errors.name ? true : false}
          />
        </div>
        <TextField
          label="Your Message"
          name="versionNotes"
          fullWidth
          variant="filled"
          className="notes"
          multiline
          inputProps={{ maxLength: 4000 }}
          rows={11}
          rowsMax={18}
          style={{ marginTop: '10px', marginBottom: '6px' }}
          autoComplete="off"
          inputRef={register()}
        />
        <div className="captcha">
          <p className="equation">2 + 5 = </p>
          <TextField
            name="captcha-answer"
            variant="standard"
            className="captcha-answer"
            // inputProps={{ maxLength: 10 }}
            autoComplete="off"
            inputRef={register()}
            // size="small"
            inputProps={{ style: { fontSize: "2rem", textAlign: "center" } }}
          />
          <Button
            variant="contained"
            className="submit-button"
            color="primary"
            size="large"
            startIcon={<FiSend/>}
          >            
            Send
          </Button>
        </div>
      </div>
    </Sdiv>
  )
}

export default Contact