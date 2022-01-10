import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
const Buyer = (props) => {
  const [buyerrequest, setBuyerrequest] = useState(0)
  const [buyerproof, setBuyerproof] = useState()
  function userbuyrequestcheckproof(){
    axios.get(`/api/v1/checkproofseller`)
      .then((resp) => {
          setBuyerproof(resp.data.proof)
      })
      .catch( data => console.log('Error', data) )
  }
  useEffect(()=> {
    userbuyrequestcheckproof()
    axios.get(`/api/v1/buyer/request`)
    .then((resp) => {
      setBuyerrequest(resp.data.main);
    })
    .catch( data => console.log('Error', data) );
    }, [])
    const handleCloseBuyer = (e, id) => {
      e.preventDefault()
      const csrfToken = document.querySelector('[name=csrf-token]').content
      axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
      axios.post(`/api/v1/buyer/reject`, {id})
      .then(resp => {
        Swal.fire({
          title: 'Buyer Rejected!',
          icon: 'success',
          text: "",
          confirmButtonText: 'Ok'
        }).then(()=>{
          window.location.href = "/ptops"
        });
      }).catch((error) =>
        Swal.fire({
          title: 'Error!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        }).then(()=>{
          window.location.href = "/buyer"
        })
        )
    }
    const handleApproveBuyer = (e, id) =>{
      e.preventDefault()
      const csrfToken = document.querySelector('[name=csrf-token]').content
      axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
      axios.post(`/api/v1/buyer/approve`, {id})
      .then(resp => {

        Swal.fire({
          title: 'Buyer Approved!',
          icon: 'success',
          text: "Kindly wait for buyer to send transaction amount to your account!",
          confirmButtonText: 'Ok'
        }).then(()=>{
          window.location.href = "/buyer"
        });
      }).catch((error) =>
        Swal.fire({
          title: 'Error!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        }).then(()=>{
          window.location.href = "/buyer"
        })
        )
    }
    const handleApproveBuyerproof = (e, id) =>{
      e.preventDefault()
      const csrfToken = document.querySelector('[name=csrf-token]').content
      axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
      axios.post(`/api/v1/approveproof`, {id})
      .then(resp => {

        Swal.fire({
          title: 'Proof Approved and released fund from your account!',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(()=>{
          window.location.href = "/ptops"
        });
      }).catch((error) =>
        Swal.fire({
          title: 'Error!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        }).then(()=>{
          window.location.href = "/buyer"
        })
        )
    }
    const handleCloseBuyerproof = (e, id) =>{
      e.preventDefault()
      const csrfToken = document.querySelector('[name=csrf-token]').content
      axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
      axios.post(`/api/v1/rejectproof`, {id})
      .then(resp => {

        Swal.fire({
          title: 'Proof Rejected!',
          icon: 'success',
          text:"Kindly wait for admin to check!",
          confirmButtonText: 'Ok'
        }).then(()=>{
          window.location.href = "/ptops"
        });
      }).catch((error) =>
        Swal.fire({
          title: 'Error!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        }).then(()=>{
          window.location.href = "/buyer"
        })
        )
    }
    return (
      <div className="container-fluid">
        <div className="container">
          <div className="row mt-5">
            <h1>Buyer Request</h1>
            <div className="col-md-4">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>User ID</td>
                  <td>BHD000{buyerrequest.user_id}</td>
                </tr>
                <tr>
                  <td>Coins(USDT)</td>
                  <td>{Number(buyerrequest.amount).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Rate(INR)</td>
                  <td>{Number(buyerrequest.rate).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  {buyerrequest.confirmation == true &&
                    <td className="text-danger">Approve Proof! (if available)</td>
                  }
                  {buyerrequest.confirmation == false &&
                    <td className="text-primary">
                      <button className="btn btn-success" onClick={(e) => handleApproveBuyer(e, buyerrequest.id)}>Approve Buyer</button>
                    </td>
                  }
                </tr>
                <tr>
                  {buyerrequest.confirmation == false &&
                      <td colSpan="2" className="text-center">
                        <button className="btn btn-danger" onClick={(e) => handleCloseBuyer(e, buyerrequest.id)}>Cancel</button>
                      </td>
                  }
                </tr>
              </tbody>
            </table>
            </div>
            <div className="col-md-8">
            {buyerproof != null &&
              <div className="card">
                <div className="card-header">
                  <h5>Proof Uploaded buyer</h5>
                </div>
                <div className="card-body">
                  <p><small><i className="text-danger">Kindly note if you rejected request this transaction will disput and sent to admin for checking if you made incorrect discussion then admin can charge fine!</i></small></p>
                  <a href={buyerproof.proof}><img src={buyerproof.proof} className="img-fluid"/></a>
                  <br/><br/>
                  {buyerproof.admin_check == false &&
                    <div>
                      <button className="btn btn-success" onClick={(e) => handleApproveBuyerproof(e, buyerproof.id)}>Approve</button>
                      <button className="btn btn-danger" onClick={(e) => handleCloseBuyerproof(e, buyerproof.id)}>Rejected</button>
                    </div>
                  }
                  {buyerproof.admin_check == true &&
                    <p>This transaction is dispute and sent for verification to admin</p>
                  }
                </div>
              </div>
            }
            {buyerrequest.confirmation == true &&
              <div>
                {buyerproof == null &&
                  <p><i className="text-danger"> Waiting for buyer to upload proof</i></p>
                }
              </div>
            }

            <br/><br/><br/>
            </div>
          </div>
        </div>
      </div>
    )
}
export default Buyer
