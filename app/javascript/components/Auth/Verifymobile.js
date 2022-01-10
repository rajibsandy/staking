import React, {useState, useEffect} from 'react'
import MobileForm from "./MobileForm"
import axios from 'axios'
import Swal from 'sweetalert2'
const Verifymobile = (props) => {
  const [user, setUser] = useState({})
  const [changeno, setChangeno] = useState(false)
  const [profile, setProfile] = useState({})


  useEffect(()=> {
    axios.get(`details/user`)
    .then((resp) => {
      if(resp.data.user == null){
          window.location.href = "/login"
      }
      else{
        setUser(resp.data.user)
        setProfile(resp.data.user)
      }
    })
    .catch( data => console.log('Error', data) );
    }, [])

    const handleChange = (e) => {
      e.preventDefault()
      setProfile(Object.assign({}, profile, {[e.target.name]: e.target.value}));
    }
    const changeNo = (e) => {
      setChangeno(true)
    }
    const sendotp = (e) => {
      e.preventDefault()
      setChangeno(false)
      const csrfToken = document.querySelector('[name=csrf-token]').content
      axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
      axios.post('/sendotp', {profile})
      .then(resp => {
        Swal.fire({
          title: 'Otp send to your mobile no!',
          icon: 'success',
          confirmButtonText: 'Ok'
          })
      }).catch((error) =>
        Swal.fire({
          title: 'Error!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'Ok'
          })
        )
    }
    const handleSubmitOtp = (e) =>{
      e.preventDefault()
      const csrfToken = document.querySelector('[name=csrf-token]').content
      axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
      axios.post('/user_profile_mobile', {profile})
      .then(resp => {
        Swal.fire({
          title: 'Mobile no verified!',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(() =>{
          window.location.href = "/trades"
        })
      }).catch((error) =>
        Swal.fire({
          title: 'Error!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'Ok'
          }).then(() =>{
            window.location.href = "/verifymobile"
          })
        )
    }



  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5">
            <MobileForm
            user={user}
            profile={profile}
            handleChange={handleChange}
            handleSubmitOtp={handleSubmitOtp}
            changeno={changeno}
            sendotp={sendotp}
            changeNo={changeNo}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Verifymobile
