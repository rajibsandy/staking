import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import SignupForm from './SignupForm'
import axios from 'axios'
import Swal from 'sweetalert2'
const Signup = (props) => {
  const { referralid } = useParams();
  const [user, setUser] = useState({name: "", email: "", password: "", mobileno: "9190xxxxxx00", referral: referralid})
  const [referral, setReferral] = useState({name: "", userid: ""})

  const handleChange = (e) =>{
    e.preventDefault()
    setUser(Object.assign({}, user, {[e.target.name]: e.target.value}))
  }
  useEffect(()=> {
      setUser(Object.assign({}, user, {referral: referralid}))
      referralchecker()
    }, [])

  function referralchecker(){
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    axios.post('/referral', {user})
    .then(resp => {
      setReferral(resp.data.referral)
    }).catch((error) =>{
    if(user.referral == ""){

    }else{
      Swal.fire({
        title: 'Error!',
        text: error.response.data.message,
        icon: 'error',
        confirmButtonText: 'Ok'
        })
        }
      }
    )
  }
  const handleChangeReferral = (e) =>{
      e.preventDefault()
      setUser(Object.assign({}, user, {[e.target.name]: e.target.value}))
    }
  const checkuser = (e) =>{
    referralchecker()
  }


  const handleSubmit = (e) =>{
    e.preventDefault()

    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    axios.post('/signup', {user})
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
    <SignupForm
      referral={referral}
      checkuser={checkuser}
      handleChangeReferral={handleChangeReferral}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      user={user}
    />
    </>
  )
}

export default Signup
