import React, {useState, useEffect} from 'react'
import SwapForm from './SwapForm'

import axios from 'axios'
import Swal from 'sweetalert2'
import Pagination from 'react-rails-pagination';

const Swap = (props) => {
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [swap, setSwap] = useState({ option: "usdtobtchg", amount: 0 });
  const [stakes, setStakes] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [usdbalance, setUsdbalance] = useState(0)
  const [btchgbalance, setBtchgbalance] = useState(0)
  const [user, setUser] = useState({})
  const [hedgerate, setHedgerate] = useState(0.00)

  function userbtchgbalance(){
    axios.get(`btchg_balance`)
    .then((resp) => {
      setBtchgbalance(resp.data.balance)
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
  function currenthedgerate(){
    axios.get(`hedgerate`)
    .then((resp) => {
      setHedgerate(resp.data.currentrate)
    })
    .catch( data => console.log('Error', data) )
  }

  useEffect(()=> {

      axios.get(`/api/v1/stakes.json?page=${currentPage}`)
      .then((resp) => {
        setTotalPages(resp.data.pages)
        setStakes(resp.data.main)
        setLoaded(true)
      })
      .catch( data => console.log('Error', data) );
      userusdbalance();
      userbtchgbalance();
      currenthedgerate();
    }, [])


const handleChangePage = (currentPage) => {  // Required as a prop to update data in your table.
      setPage(parseInt(currentPage)) // Update Current Page
      axios.get(`/api/v1/stakes.json?page=${currentPage}`)
      .then((resp) => {
        setTotalPages(resp.data.pages)
        setStakes(resp.data.main)
        setLoaded(true)
      })
      .catch( data => console.log('Error', data) ) // Fetch Data for the new page
    }

  const changeOption = (newOption) => {
      setSwap({option: newOption , amount: 0})
    }
  const handleChange = (e) =>{
    e.preventDefault()
    setSwap(Object.assign({}, swap, {option: swap.option, [e.target.name]: e.target.value}))
  }

  const handleSubmit = (e) =>{
    e.preventDefault()

    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    axios.post('/api/v1/swaps', {swap})
    .then(resp => {
      axios.get(`/api/v1/stakes.json?page=${currentPage}`)
      .then((resp) => {
        setTotalPages(resp.data.pages)
        setStakes(resp.data.main)
        setLoaded(true)
      })
      .catch( data => console.log('Error', data) ),
      // Fetch Data for the new page
      userusdbalance();
      userbtchgbalance();
      Swal.fire({
        title: 'Successfully Swap!',
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
    <>
    <div className="container-fluid mt-5">
      <div className="container">
        <div className="row mt-5">
          <h1>Swap</h1>
          <SwapForm
            changeOption={changeOption}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            usdbalance={usdbalance}
            btchgbalance={btchgbalance}
            swap={swap}
            hedgerate={hedgerate}
          />
        </div>
      </div>
    </div>
    <br/><br/>
    <br/><br/>
    </>
  )
}

export default Swap
