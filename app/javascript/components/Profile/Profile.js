import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import ProfileForm from './ProfileForm'
import BankForm from './BankForm'
import UploadKyc from './UploadKyc'
const Profile = (props) => {
  const [user, setUser] = useState(0)
  const [profile, setProfile] = useState(0)

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
    const handleChange = (e) =>{
      e.preventDefault()
      setProfile(Object.assign({}, profile, {[e.target.name]: e.target.value}));
    }
    const handleSubmit = (e) =>{
      e.preventDefault()
      const csrfToken = document.querySelector('[name=csrf-token]').content
      axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
      axios.post('/user_profile', {profile})
      .then(resp => {
        Swal.fire({
          title: 'Profile Updated!',
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
    const handleSubmitBank = (e) =>{
      e.preventDefault()
      const csrfToken = document.querySelector('[name=csrf-token]').content
      axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
      axios.post('/save_bank', {profile})
      .then(resp => {
        Swal.fire({
          title: 'Profile Updated!',
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
    return (
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="mt-5 col-md-12">
            <h1>Profile</h1>
              <ProfileForm
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                user={user}
                profile={profile}
              />
            </div>
            <div className="col-md-12 mt-2">
            <h1>Banking Details</h1>
            <BankForm
              handleChange={handleChange}
              handleSubmitBank={handleSubmitBank}
              user={user}
              profile={profile}
            />
            </div>
            <div className="col-md-12 mt-2">

            {user.idproof == null &&
              <>
              {user.addressproof == null &&
                <>
                  {user.bank_passbook == null &&
                    <>
                    <h1>Upload Kyc Documents</h1>
                    <UploadKyc
                      user={user}
                    />
                    </>
                  }
                </>
              }
              </>
            }
            {user.idproof != null &&
              <div>
              {user.addressproof != null &&
                <div>
                  {user.bank_passbook != null &&
                    <div>
                    {user.kyc == true &&
                      <i className="text-success">KYC Approved</i>
                    }
                    {user.kyc == false &&
                      <i className="text-danger">KYC is in process!</i>
                    }
                    </div>
                  }
                </div>
              }
              </div>
            }

            </div>
          </div>
        </div>
        <br/><br/><br/><br/>
      </div>
    )
}
export default Profile
