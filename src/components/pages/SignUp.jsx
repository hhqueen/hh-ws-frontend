import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { Label, TextInput, Button, Checkbox } from 'flowbite-react'
import qStringfromObj from '../../helperFunctions/qStringfromObj'

export default function SignUp({mainDivStyle}) {
  // state for the controlled form
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2,setPassword2]= useState('')
  const [msg, setMsg] = useState('')

  const navigate = useNavigate();

  // submit event handler
  const handleSubmit = async e => {
    e.preventDefault()

    if (password != password2) {
      setMsg("Passwords are not the same")
      return
    }

    try {
      // post form data to the backend
      const reqBody = {
        firstName,
        lastName,
        userName,
        email,
        password
      }
      const qObj = {
        screenWidth: 0,
        screenHeight: 0,
      }
      const qString = qStringfromObj(qObj)
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/signup${qString}`, reqBody)

      // save the token in localstorage
      const { token } = response.data
      localStorage.setItem('jwt', token)

      // decode the token
      const decoded = jwt_decode(token)

      // set the user in App's state to be the decoded token
      // setCurrentUser(decoded)
      navigate("/")


    } catch (err) {
      console.warn(err)
      if (err.response) {
        if (err.response.status === 400) {
          setMsg(err.response.data.msg)
        }
      }
    }
  }

  return (
      <form
      style={mainDivStyle}
      className='flex flex-col gap-4 mx-[10vw] md:mx-[30vw] justify-center'
      onSubmit={handleSubmit}>
      
      <p
      className='text-center'
      >{msg}</p>

      {/* <label htmlFor='firstName'>First Name: </label> */}
      <div>
        <div>
          <Label
            htmlFor='firstName'
            value='First Name'
          />
        </div>
        <TextInput
          className="mb-2 block"
          type="text"
          id="firstName"
          placeholder='First Name'
          onChange={e => setFirstName(e.target.value)}
          value={firstName}
          required
        />
      </div>

      <div>
        <div>
          <Label
            htmlFor='lastName'
            value='Last Name'
          />
        </div>
        <TextInput
          className="mb-2 block"
          type="text"
          id="lastName"
          placeholder='Last Name'
          onChange={e => setLastName(e.target.value)}
          value={lastName}
          required
        />
      </div>


      {/* <div
        className="">
        <div>
          <Label
            htmlFor='userName'
            value='User Name'
          />
        </div> */}

        {/* <label htmlFor='userName'>User Name:</label> */}
        {/* <TextInput
          className="border border-sm w-80"
          type="text"
          id="userName"
          placeholder='User Name'
          onChange={e => setUserName(e.target.value)}
          value={userName}
          required
        />
      </div> */}

      <div>
        <div>
          <Label
            htmlFor='email'
            value='Email'
          />
        </div>
        {/* <label htmlFor='email'>Email:</label> */}
        <TextInput
          className=""
          type="email"
          id="email"
          placeholder='Email'
          onChange={e => setEmail(e.target.value)}
          value={email}
          required
        />
      </div>
      <div>
        <div>
          <Label
            htmlFor='password1'
            value='Password'
          />
        </div>
        {/* <label htmlFor='password'>Password:</label> */}
        <TextInput
          className=""
          type="password"
          id="password1"
          placeholder='Password'
          onChange={e => setPassword(e.target.value)}
          value={password}
          required
        />
      </div>

      <div>
        <div>
          <Label
            htmlFor='password2'
            value='Re-Enter Password'
          />
        </div>
        {/* <label htmlFor='password'>Password:</label> */}
        <TextInput
          className=""
          type="password"
          id="password2"
          placeholder='Password'
          onChange={e => setPassword2(e.target.value)}
          value={password2}
          required
        />
      </div>



      <Button
        className="border border-sm w-24 self-center"
        type="submit">Register</Button>
    </form>
  )
}
