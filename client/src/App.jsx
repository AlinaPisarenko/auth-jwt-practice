import { useState, useRef, useEffect } from 'react'
import './App.css'
import Cookies from 'js-cookie'

function Profile({user}) {
  return(
    <>
    <h3>{user.username}</h3>
    </>
  )
}

function App() {
  const [user,setUser] = useState(null)
  const form = useRef()

useEffect(() => {
  const loadUser = async () => {
    let req = await fetch('http://127.0.0.1:3000/me', {
      headers: {Authorization: Cookies.get('token')}
    })
    let res = await req.json()
    if (res.user) setUser(res.user)
  }
  loadUser()
}, [])

const handleSubmit = async (e) => {
  e.preventDefault()
  let formData = new FormData(form.current)
  let req = await fetch('http://127.0.0.1:3000/login',{
    method: 'POST',
    body: formData
  })
  let res = await req.json()
  Cookies.set('token', res.token)
  setUser(res.user)
}

const logout = () => {
  Cookies.remove('token')
  setUser(null)
}

  return (
    <div className="App">

    {user && <Profile user={user}/>}

    <form ref={form} onSubmit={handleSubmit}>
      <input placeholder='enter email' name='email' type='email' />
      <input placeholder='enter password' name='password' type='password' />
      <button>Submit</button>
    </form>
    <hr />
    <button onClick={logout}>
      Log out
    </button>
    </div>
  )
}

export default App
