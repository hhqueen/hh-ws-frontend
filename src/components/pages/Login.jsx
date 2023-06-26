import { useEffect, useState, useTransition } from 'react'
import axios from 'axios'
import { Label, TextInput, Button, Checkbox } from 'flowbite-react'
import { useNavigate } from "react-router-dom"
import LoadingComp from '../Shared/LoadingComp'

export default function Login({ mainDivStyle, userProps }) {

  const navigate = useNavigate()
  const [msg, setMsg] = useState('')
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMeBool: false
  })
  const { jwtToke, setJwtToken } = userProps

  const [isPending, startTransition] = useTransition()

  const loginFormSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      // console.log("login attempted")
      const reqBody = loginData
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/login`, reqBody)
      const { token } = response.data
      localStorage.setItem('jwt', token)
      startTransition(()=>{
        setJwtToken(token)
        // console.log("login successful")
        navigate("/")
      })
    } catch (err) {
      if (err.response.status === 400) {
        const errMessage = err.response.data.msg
        console.log("login failed", errMessage)
        setMsg(errMessage)
      }
    }
  }

  return (
    <>
      <body
        className='flex flex-col justify-center items-center w-full h-full'
      >
        <form
          style={mainDivStyle}
          className="flex flex-col gap-4 mx-[10vw] justify-center items-center"
          onSubmit={loginFormSubmitHandler}
        >
          <div
            className='w-[300px]'
          >
            <div className="mb-2 block ">
              <Label
                htmlFor="email1"
                value="Your email"
              />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="email address"
              required={true}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
          </div>
          <div
            className='w-[300px]'
          >
            <div className="mb-2 block">
              <Label
                htmlFor="password1"
                value="Your password"
              />
            </div>
            <TextInput
              id="password1"
              type="password"
              required={true}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
          </div>
          <div>
            <p>Don't have an account? Sign up <span
              className='text-sky-600 underline hover:cursor-pointer hover:text-sky-400'
              onClick={()=>{navigate("/signup")}}
            >here</span>!</p>
          </div>

          {/* <div className="flex items-center gap-2">
        <Checkbox 
          id="remember"
          checked={loginData.rememberMeBool}
            onChange={(e)=>{
              // console.log("checkbox", e.target.checked)
              setLoginData({...loginData, rememberMeBool:e.target.checked})
        }} 
        />
        <Label htmlFor="remember">
          Remember me
        </Label>
      </div> */}
          <div
            className='w-[300px]'
          >
            <Button
              type="submit">
              Submit
            </Button>
            <p
              className='h-[50px] text-center text-red-600 my-5'
            >{msg}</p>
          </div>


        </form>
      </body>
    </>
  )
}
