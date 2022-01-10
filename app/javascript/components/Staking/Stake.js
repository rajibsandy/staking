import React, {useState, useEffect} from 'react'
import StakeForm from './StakeForm'
import Stakes from './Stakes'
import axios from 'axios'
import Swal from 'sweetalert2'
import Pagination from 'react-rails-pagination';

const Stake = (props) => {
  const [page, setPage] = useState(1);
  const [user, setUser] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [stake, setStake] = useState({ amount:1 })
  const [stakes, setStakes] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [balance, setBalance] = useState(0)
  const [hedgerate, setHedgerate] = useState(0)
  function hedgeratecheck(){
    axios.get(`hedgerate`)
    .then((resp) => {
      setHedgerate(resp.data.currentrate)
    })
    .catch( data => console.log('Error', data) )
  }
  useEffect(()=> {
    axios.get(`details/user`)
    .then((resp) => {
      if(resp.data.user == null){
          window.location.href = "/login"
      }
      else{
        setUser(resp.data.user)
        hedgeratecheck()
        userbootprofits(currentPage)
      }
    })
    .catch( data => console.log('Error', data) );
      axios.get(`/api/v1/stakes.json?page=${currentPage}`)
      .then((resp) => {
        setTotalPages(resp.data.pages)
        setStakes(resp.data.main)
        setLoaded(true)
      })
      .catch( data => console.log('Error', data) ),
      axios.get(`btchg_balance`)
      .then((resp) => {
        setBalance(resp.data.balance)
      })
      .catch( data => console.log('Error', data) )
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

  const handleChange = (e) =>{
    e.preventDefault()
    setStake(Object.assign({}, stake, {[e.target.name]: e.target.value}))
  }

  const handleSubmit = (e) =>{
    e.preventDefault()

    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    axios.post('/api/v1/stakes', {stake})
    .then(resp => {
      axios.get(`/api/v1/stakes.json?page=${currentPage}`)
      .then((resp) => {
        setTotalPages(resp.data.pages)
        setStakes(resp.data.main)
        setLoaded(true)
      })
      .catch( data => console.log('Error', data) ),
      axios.get(`/btchg_balance`)
      .then((resp) => {
        setBalance(resp.data.balance)
      })
      .catch( data => console.log('Error', data) ), // Fetch Data for the new page

      Swal.fire({
        title: 'Successfully Staked!',
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
let stakesdata
  if(loaded && stakes.data){
    stakesdata = stakes.data.map((item, index) => {
      return(
        <Stakes
          key={index}
          attributes={item.attributes}
        />
    )
  })
}


  return (
    <>
    <div className="container-fluid mt-5">
      <div className="container">
        <div className="row mt-5">
          <h1>Bitcoin Hedge Stake</h1>
          <StakeForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            stake={stake}
            balance={balance}
            hedgerate={hedgerate}
          />
          <div className="col-md-8">


              <div className="card">
                  <div className="card-body">
                      <h5 className="card-title">List of stakes</h5>
                      <div className="table-responsive">
                        <table className="table table-striped table-hover">
                          <thead>
                            <tr>
                              <th>Action</th>
                              <th>BTCHG</th>
                              <th>USDT</th>
                              <th>@Rate</th>
                              <th>Status</th>
                              <th>Withdrawals</th>
                              <th>Created@</th>
                            </tr>
                          </thead>
                          <tbody>
                            {stakesdata}
                          </tbody>
                        </table>
                      </div>
                  </div>
                  <div className="card-footer">
                    <Pagination page={page} pages={totalPages} handleChangePage={handleChangePage} hideEndArrows={true}/>
                  </div>
              </div>

          </div>
        </div>
      </div>
      <br/>
      <br/>
      <br/>
    </div>
    </>
  )
}

export default Stake
