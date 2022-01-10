import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Requests from './Requests'
import Swal from 'sweetalert2'
import Pagination from 'react-rails-pagination';
import {Link} from 'react-router-dom'
import SellerRequestForm from './SellerRequestForm'
const Ptop = (props) => {
  const [user, setUser] = useState(0)
  const [sellerrequests , setSellerrequests] = useState({})
  const [page, setPage] = useState(1);
  const [usdbalance, setUsdbalance] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loaded, setLoaded] = useState(false)
  const [sellerrequest, setSellerrequest] = useState({gateway: "NEFT|IMPS", amount: 0, rate: 75.00})
  const [buyerrequest, setBuyerrequest] = useState({})
  const [requeststat, setRequeststat] = useState(false)
  const [buystat, setBuystat] = useState(false)
  const [id, setId] = useState(0)
  function usersellrequestcheck(){
    axios.get(`/api/v1/seller/status`)
      .then((resp) => {
        if(resp.data.checkrequest == true){
          setRequeststat(resp.data.checkrequest)
          setSellerrequest(resp.data.main)
        }else{
          setRequeststat(false)
        }
      })
      .catch( data => console.log('Error', data) )
  }
  function afseller(){
    axios.get(`/api/v1/sellerbuyreq`)
      .then((resp) => {
        setId(resp.data.id)
      })
      .catch( data => console.log('Error', data) )
  }
  function userbuyrequestcheck(){
    axios.get(`/api/v1/buyer/status`)
      .then((resp) => {
        if(resp.data.checkrequest == true){
          setBuystat(resp.data.checkrequest)
          setBuyerrequest(resp.data.main)
        }else{
          setBuystat(false)
        }
      })
      .catch( data => console.log('Error', data) )
  }
  function userusdbalance(){
  axios.get(`usd_balance`)
    .then((resp) => {
      setUsdbalance(resp.data.balance)
    })
    .catch( data => console.log('Error', data) )
  }
  function datasellerrequests(currentPage){
    axios.get(`/api/v1/sellerrequests.json?page=${currentPage}`)
    .then((resp) => {
      setTotalPages(resp.data.pages)
      setSellerrequests(resp.data.main)
      setLoaded(true)
    })
    .catch( data => console.log('Error', data) );
  }

  const changeOptionSellerForm = (gateway) => {
      setSellerrequest(Object.assign({}, sellerrequest, {gateway: gateway, amount: sellerrequest.amount, rate: sellerrequest.rate}))
    }

  useEffect(()=> {
      axios.get(`details/user`)
      .then((resp) => {
        setUser(resp.data.user)
        if(resp.data.user == null){
            window.location.href = "/login"
        }else{
          userusdbalance()
          datasellerrequests(currentPage)
          usersellrequestcheck()
          userbuyrequestcheck()
          afseller()

        }
      })
      .catch( data => console.log('Error', data) );
    }, [])

    let requestdata
      if(loaded && sellerrequests.data){
        requestdata = sellerrequests.data.map((item, index) => {
          return(
            <Requests
              key={index}
              attributes={item.attributes}
              buystat={buystat}
              user={user}
            />
        )
      })
    }
    const handleChangePage = (currentPage) => {  // Required as a prop to update data in your table.
          setPage(parseInt(currentPage)) // Update Current Page
          datasellerrequests(currentPage)// Fetch Data for the new page
        }

    const handleSellerClose = (e) => {
      e.preventDefault()
      const csrfToken = document.querySelector('[name=csrf-token]').content
      axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
      axios.post("/api/v1/sellerrequests/close")
      .then(resp => {
        userusdbalance(); // Fetch Data for the new page
        usersellrequestcheck();
        userbuyrequestcheck();
        datasellerrequests(currentPage);
        Swal.fire({
          title: 'Seller Request Closed!',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      }).catch((error) =>
        Swal.fire({
          title: 'Error!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'Ok'
          })
        )
    }
    const handleChange = (e) =>{
      e.preventDefault()
      setSellerrequest(Object.assign({}, sellerrequest, {gateway: sellerrequest.gateway, [e.target.name]: e.target.value}))
    }
    const handleSubmit = (e) =>{
      e.preventDefault()
      const csrfToken = document.querySelector('[name=csrf-token]').content
      axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
      axios.post("/api/v1/sellerrequests", {sellerrequest})
      .then(resp => {
        userusdbalance(); // Fetch Data for the new page
        usersellrequestcheck();
        Swal.fire({
          title: 'Seller Request Generated!',
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
          window.location.href = "/ptops"
        })
        )
      }
    return (
      <>
        <div className="container-fluid">
          <div className="container">
            <div className="col-md-4 mt-5 mb-2">
            <h1>P2P</h1>
              <p className="alert alert-warning">Balance {Number(usdbalance).toFixed(2)} USD</p>

              {requeststat == true &&
                <div className="alert alert-info">
                <span>Your request is already in Queue!</span>
                  <ul>
                    <li>Coin (USDT): {Number(sellerrequest.amount).toFixed(2)}</li>
                    <li>Rate: {Number(sellerrequest.rate).toFixed(2)}</li>
                    {sellerrequest.busy == false &&
                      <li>Status: Ready</li>
                    }
                    {sellerrequest.busy == true &&
                      <li>Status: <Link to={"./buyer"}>Check buyer request!</Link></li>
                    }
                    {sellerrequest.busy == false &&
                        <button className="mt-2 btn btn-danger" onClick={handleSellerClose}>Close</button>
                    }

                  </ul>
                </div>
              }
              {buystat == true &&
                <div className="alert alert-danger">
                <span>Your request for buying is sent to seller!</span>
                  <ul>
                    <li>Coin (USDT): {Number(buyerrequest.amount).toFixed(2)}</li>
                    <li>Rate: {Number(buyerrequest.rate).toFixed(2)}</li>
                    {buyerrequest.confirmation == false &&
                      <li>Status: Waiting for Seller to Approve!</li>
                    }
                    {buyerrequest.confirmation == true &&
                      <li>Status: <Link to={`./Seller/${id}`}>Check</Link></li>
                    }
                    {buyerrequest.confirmation == false &&
                        <button className="mt-2 btn btn-danger" onClick={handleSellerClose}>Cancel</button>
                    }

                  </ul>
                </div>
              }
              {requeststat == false &&
                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Generate Sell Request
                </button>
              }


            </div>
            <div className="row mt-2 mb-5">
                <div className="col-md-12">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Seller Requests</h5>
                        <div className="table-responsive">
                          <table className="table table-striped table-hover">
                            <thead>
                              <tr>
                                <th>Userid</th>
                                <th>Coins(USDT)</th>
                                <th>@Rate(INR)</th>
                                <th>Gateway</th>
                                <th>Status</th>
                                <th>Rating(Average)</th>
                                <th>Created@</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                            {requestdata}
                            </tbody>
                          </table>
                        </div>
                    </div>
                    <div className="card-footer">
                          <Pagination page={page} pages={totalPages} handleChangePage={handleChangePage} hideEndArrows={true}/>
                    </div>

                </div>
                </div>
                <br/><br/>
            </div>
          </div>
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Generate Seller Request</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                      <p className="alert alert-warning">Balance {Number(usdbalance).toFixed(2)} USD</p>
                      <SellerRequestForm
                        changeOptionSellerForm={changeOptionSellerForm}
                        sellerrequest={sellerrequest}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        changeOptionSellerForm={changeOptionSellerForm}
                      />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </>
    )
}
export default Ptop
