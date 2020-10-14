import React, { useState } from 'react'
import styled from 'styled-components'
import { FiMail, FiSend } from 'react-icons/fi'
import { FaLinkedin } from 'react-icons/fa'
import { AiFillGithub } from 'react-icons/ai'
import { TiDocumentText } from 'react-icons/ti'
import { useForm } from 'react-hook-form'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Loader from 'react-loader-spinner'

const Sdiv = styled.div`
  height: 97vh;
  background: ${p => p.theme.jet};
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-template-rows: 1fr;
  h1 {
    font-size: 2.5rem;
  }
  .left {    
    padding: 3rem 2rem;
    
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
    .linkedin em, .github em, .resume em {
      color: lightblue;
    }
    .icon {
      width: 25px;
      height: 25px;
    }
    .resume {
      margin: 1rem 0 0 0;
    }
  }

  .right {
    padding: 3rem 2rem;
    
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
      margin: 1rem auto 0 auto;
      display: flex;
      background: #3f4764;
      border: 2px dashed white;
      border-radius: 5px;
      padding: 0.5em;
      justify-content: center;
      align-items: center;
      /* width: 50%; */
      /* filter: drop-shadow(0.5em 0.5em 0.5rem black); */
    }
    .equation {
      font-size: 2rem;
      padding: 0.5rem;
    }
    .captcha-answer {
      width: 65px;
      font-size: 2rem;
      align-self: end;
      padding-bottom: 0rem;
    }
    .submit-button {
      margin-left: 1.5em;
      align-self: center;
    }
    .MuiButton-startIcon {
      div {
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
    .success {
      color: lightgreen;
      font-size: 1.4rem;
      margin: 1rem auto;
      text-align: center;
    }
  }

  @media all and (max-width: 920px) {
    display: block;

    .left {
      padding-bottom: 0;
    }
    .equation {
      font-size: 1.7rem !important;
    }
  }
`

function Contact() {
  const { register, handleSubmit, errors, setError, reset } = useForm()
  const [ sending, setSending ] = useState(false)
  const [ success, setSuccess ] = useState(false)
  const [a, setA] = useState(Math.floor(Math.random() * 10) + 1)
  const [b, setB] = useState(Math.floor(Math.random() * 10) + 1)

  type formData = {
    name: string,
    email: string,
    message: string,
    captchaAnswer: number
  }
  async function submit(data: formData) {
    if (a + b == data.captchaAnswer) {
      setSending(true)
      const res = await fetch("https://31eogkalbc.execute-api.us-east-1.amazonaws.com/sendPersonalEmail", {
        method: "POST",
        body: JSON.stringify(data)
      })
      Promise.resolve(res)
      setSending(false)
      setSuccess(true)
      setA(Math.floor(Math.random() * 10) + 1)
      setB(Math.floor(Math.random() * 10) + 1)
      reset(res)
    }

    else {
      setError("captchaAnswer", {type: "wrongAnswer", message: "Wrong answer to equation"})
      Promise.resolve(null)
    }
  }
  return (
    <Sdiv>
      <div className="left">
        <h1>Get In Touch</h1>
        <p className="email"><FiMail className="icon"/><em>mvandoff[at]geemail[dot]c0m</em></p>
        <p className="github"><a href="https://github.com/yumeixox" target="_blank"><AiFillGithub className="icon"/><em>https://github.com/yumeixox</em></a></p>
        <p className="linkedin"><a href="https://www.linkedin.com/in/matthew-vandoff" target="_blank"><FaLinkedin className="icon" /><em>https://www.linkedin.com/in/matthew-vandoff</em></a></p>
        <p className="resume"><a href="##"><TiDocumentText className="icon"/><em>Resume</em></a></p> 
      </div>

      <div className="right">
        <h2 className="message">Send me a message, I'll get back to you expeditiously!</h2>
        <form onSubmit={handleSubmit(submit)}>
          <div className="top-input">
            <TextField
              label="Name"
              name="name"
              className="name"
              variant="filled"
              inputProps={{ maxLength: 60 }}
              autoComplete="off"
              inputRef={register({
                required: true,
              })}
              error={errors.name ? true : false}
              required
            />
            <TextField
              label="Your Email"
              name="email"
              className="email"
              variant="filled"
              inputRef={register({
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address',
                },
              })}
              autoComplete="off"
              error={errors.email ? true : false}
              required
            />
          </div>
          <TextField
            label="Your Message"
            name="message"
            fullWidth
            variant="filled"
            className="notes"
            multiline
            inputProps={{ maxLength: 4000 }}
            rows={11}
            rowsMax={18}
            style={{ marginTop: '10px', marginBottom: '6px' }}
            autoComplete="off"
            inputRef={register({
              required: true,
            })}
            error={errors.message ? true : false}
            required
          />
          <div className="captcha">
            <p className="equation">{a} + {b} = </p>
            <TextField
              name="captchaAnswer"
              variant="outlined"
              className="captcha-answer"
              autoComplete="off"
              inputRef={register({
                required: true,
              })}
              inputProps={{ style: { fontSize: "2rem", textAlign: "center" } }}
              error={errors.captchaAnswer ? true : false}
              placeholder="?"
              required
            />
            <Button
              variant="contained"
              className="submit-button"
              color="primary"
              size="large"
              startIcon={!sending ? <FiSend /> : <Loader type="Circles" color="lightblue" height={25} width={25} />}
              type="submit"
              disabled={sending ? true : false}
            >
              Send
            </Button>
          </div>
          { success && <p className="success">Message sent, thanks!</p>}
        </form>
      </div>
    </Sdiv>
  )
}

export default Contact