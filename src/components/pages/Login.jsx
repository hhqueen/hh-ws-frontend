import {useState} from 'react'
import axios from 'axios'
import { Label,TextInput,Button, Checkbox } from 'flowbite-react'
import {useNavigate} from "react-router-dom"

export default function Login() {

  const navigate = useNavigate()
  const [msg, setMsg] = useState('')
  const [loginData, setLoginData] = useState({
    email:"",
    password:"",
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
        setMsg(err.response.data.msg)
      }
    }
  }
  return (
    <form 
    className="flex flex-col gap-4 mx-[10vw] mt-[60px]"
    onSubmit={loginFormSubmitHandler}
    >
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="email1"
            value="Your email"
          />
        </div>
        <TextInput
          id="email1"
          type="email"
          placeholder="name@flowbite.com"
          required={true}
          onChange={(e)=>setLoginData({...loginData, email:e.target.value})}
        />
      </div>
      <div>
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
          onChange={(e)=>setLoginData({...loginData, password:e.target.value})}
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
      <Button type="submit">
        Submit
      </Button>
      <p>{msg}</p>
    </form>
    
  )
}
