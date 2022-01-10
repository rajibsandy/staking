import React, {useState} from 'react'
import LoginForm from './LoginForm'
import axios from 'axios'
import Swal from 'sweetalert2'

const Login = (props) => {
  const [login, setLogin] = useState({email: "", password: ""})
  const handleChange = (e) =>{
    e.preventDefault()
    setLogin(Object.assign({}, login, {[e.target.name]: e.target.value}))
  }

  const handleSubmit = (e) =>{
    e.preventDefault()

    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    axios.post('/login', {login})
    .then(resp => {
        window.location.href = '/trades'
    }).catch((error) =>
      Swal.fire({
        title: 'Error!',
        text: error.response.data.message,
        icon: 'error',
        confirmButtonText: 'Ok'
        })
      )
  }

  return (
    <>
    <LoginForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      login={login}
    />
    </>
  )
}

export default Login
