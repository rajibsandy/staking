import React, {useState, useEffect} from 'react'
import ReviewForm from "./ReviewForm"
import axios from 'axios'
import Swal from 'sweetalert2'
const SellerReview = (props) => {
  const [review, setReview] = useState({title: "", description: "", score: 0})


  useEffect(()=> {
    axios.get(`details/user`)
    .then((resp) => {
      if(resp.data.user == null){
          window.location.href = "/login"
      }
    })
    .catch( data => console.log('Error', data) );
    }, [])

    const handleChange = (e) => {
      e.preventDefault()
      setReview(Object.assign({}, review,{[e.target.name]: e.target.value}));
    }
    const changeNo = (e) => {
      setChangeno(true)
    }
    const handleSubmit = (e) =>{
      e.preventDefault()
      const csrfToken = document.querySelector('[name=csrf-token]').content
      axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
      axios.post('/api/v1/sellerreviews', {review})
      .then(resp => {
        Swal.fire({
          title: 'Thankyou!',
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
            window.location.href = ""
          })
        )
    }

const setRating = (score, e) => {
  e.preventDefault()
  setReview(Object.assign({}, review, {score: score}))
}

  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5">
          <h1>Send review to seller about how was your transaction </h1>
            <ReviewForm
              setRating={setRating}
              review={review}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default SellerReview
