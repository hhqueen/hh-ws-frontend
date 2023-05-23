import { useState } from 'react'
import axios from 'axios'
import { Label, TextInput, Button, Checkbox } from 'flowbite-react'
import { useNavigate } from "react-router-dom"

export default function Login({ mainDivStyle }) {

  const navigate = useNavigate()
  const [msg, setMsg] = useState('')
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMeBool: false
  })

  const loginFormSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const reqBody = loginData
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/login`, reqBody)
      const { token } = response.data
      localStorage.setItem('jwt', token)
      navigate("/")

    } catch (err) {
      if (err.response.status === 400) {
        const errMessage = err.response.data.msg
        console.log(errMessage)
        setMsg(errMessage)
      }
    }
  }

  return (
    <>
      <body
        className='flex justify-center items-center w-full h-full'
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
