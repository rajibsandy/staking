import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import Rating from "../Rating/Rating";
import axios from 'axios';
import BuyerRequestForm from './BuyerRequestForm';
import ProofUpload from './ProofUpload'
import Swal from 'sweetalert2';
const Seller = (props) =>{
  const { id } = useParams();
  const [buyer, setBuyer]  = useState({amount: 0});
  const [usdbalance, setUsdbalance] = useState(0);
  const [sellerrequestid, setSellerrequestid] = useState(0);
  const [seller, setSeller]  = useState({user_id: 0, amount: 0 ,rate: 1, uavg_score:0});
  const [buystat, setBuystat] = useState(false)
  const [buyerrequest, setBuyerrequest] = useState({confirmation: false})
  const [buyerproof, setBuyerproof] = useState()
  const [sellerbank, setSellerbank] = useState({})
  function userusdbalance(){
  axios.get(`/usd_balance`)
    .then((resp) => {
      setUsdbalance(resp.data.balance)
    })
    .catch( data => console.log('Error', data) )
  }
  function checksellerbank(){
    axios.get(`/api/v1/seller/bank_details`)
      .then((resp) => {
          setSellerbank(resp.data.main)
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
  function userbuyrequestcheckproof(){
    axios.get(`/api/v1/checkproofbuyer`)
      .then((resp) => {
          setBuyerproof(resp.data.proof)
      })
      .catch( data => console.log('Error', data) )
  }
  const handleChange = (e) =>{
    e.preventDefault()
    setBuyer(Object.assign({}, buyer, {rate: seller.rate, seller_request_id: sellerrequestid, [e.target.name]: e.target.value}))
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    axios.post("/api/v1/buyerrequests", {buyer})
    .then(resp => {

      Swal.fire({
        title: 'Buyer Request Generated!',
        icon: 'success',
        text: "Kindly wait for seller to approve your request!",
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
  useEffect(()=> {
      setSeller({id: id});
      userusdbalance();
      userbuyrequestcheck();
      userbuyrequestcheckproof();
      checksellerbank();
      const csrfToken = document.querySelector('[name=csrf-token]').content
      axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
      axios.post(`/api/v1/seller/details`,{id})
      .then((resp) => {
        setSeller(resp.data.main.data[0].attributes);
        setSellerrequestid(resp.data.main.data[0].id);
      })
      .catch( data => console.log('Error', data) );
    }, [])

  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row mt-5">
          <h1>Seller Details</h1>
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
                  <td>BHD000{seller.user_id}</td>
                </tr>
                <tr>
                  <td>Coins(USDT)</td>
                  <td>{Number(seller.amount).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Rate(INR)</td>
                  <td>{Number(seller.rate).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Gateway</td>
                  <td>{seller.gateway}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  {seller.busy == true &&
                    <td className="text-danger">Busy</td>
                  }
                  {seller.busy == false &&
                    <td className="text-primary">Ready!</td>
                  }
                </tr>
                <tr>
                  <td>Rating</td>
                  <td> <Rating score={seller.uavg_score}/> ({seller.uavg_score})</td>
                </tr>
                <tr>
                  <td colSpan={2}className="text-center">
                  {seller.busy == false &&
                    <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Buy from seller </button>
                  }
                  {seller.busy == true &&
                    <span>
                      {buyerrequest.confirmation == false &&
                        <i className="text-danger">Wait for seller to complete it's process.</i>
                      }
                      {buyerrequest.confirmation == true &&
                          <i className="text-danger">Seller approved your request! send amount to user and upload proof.</i>
                      }
                    </span>
                  }
                  </td>
                </tr>
              </tbody>
            </table>
            {buyerrequest.confirmation == true &&
              <div>
              {seller.gateway == "UPI" &&
                <div className="card">
                  <h5>Send amount to below UPI Id</h5>
                  <div className="card-body">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <td>Name</td>
                          <td>Details</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>UPI Id</td>
                          <td>{sellerbank.bank_upi}</td>
                        </tr>
                        <tr>
                          <td>Amount (INR)</td>
                          <td>{Number(seller.amount * seller.rate).toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              }
              {seller.gateway == "BITCOIN" &&
                <div className="card">
                  <h5>Send amount to below  bitcoin address</h5>
                  <div className="card-body">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <td>Name</td>
                          <td>Details</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>BITCOIN Address</td>
                          <td>{sellerbank.btcaddress}</td>
                        </tr>
                        <tr>
                          <td>Amount (USD)</td>
                          <td>{Number(seller.amount).toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              }

              {seller.gateway == "NEFT|IMPS" &&
                <div className="card">
                  <h5>Send amount to below Account details</h5>
                  <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <td>Name</td>
                          <td>Details</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Account Holder</td>
                          <td>{sellerbank.name}</td>
                        </tr>
                        <tr>
                          <td>Account No</td>
                          <td>{sellerbank.bank_accountno}</td>
                        </tr>
                        <tr>
                          <td>Bank IFSC code</td>
                          <td>{sellerbank.bank_ifsccode}</td>
                        </tr>
                        <tr>
                          <td>Amount (INR)</td>
                          <td>{Number(seller.amount * seller.rate).toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                    </div>
                  </div>
                </div>
              }

              {buyerproof == null &&
                <ProofUpload />
              }
              {buyerproof != null &&
                <div>
                {buyerproof.admin_check == true &&
                  <span className="text-danger"> Seller rejected your proof kindly wait for admin for confirmation</span>
                }
                {buyerproof.admin_check == false &&
                  <span> Proof uploaded kindly wait for Seller to approve</span>
                }
                </div>
              }
              </div>
            }
            <br/><br/><br/><br/>
          </div>
        </div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Buy</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <p className="alert alert-warning">Balance {Number(usdbalance).toFixed(2)} USD</p>
                    <BuyerRequestForm
                      seller={seller}
                      buyer={buyer}
                      handleChange={handleChange}
                      handleSubmit={handleSubmit}
                    />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}
export default Seller
