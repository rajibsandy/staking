import React, {useState, useEffect} from 'react'
import Usdwallet from "./Usdwallet"
import Btchgwallet from "./Btchgwallet"
import Pagination from 'react-rails-pagination'
import axios from 'axios'
const Wallet = (props) => {

const [user, setUser] = useState(0)
const [loaded, setLoaded] = useState(false)
const [loadedTwo, setLoadedTwo] = useState(false)

const [page, setPage] = useState(1);
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(0);

const [pageTwo, setPageTwo] = useState(1);
const [currentPageTwo, setCurrentPageTwo] = useState(1);
const [totalPagesTwo, setTotalPagesTwo] = useState(0);

const [usdwallets, setUsdwallets] = useState({});
const [btchgwallets, setBtchgwallets] = useState({});
const [usdbalance, setUsdbalance] = useState(0)
const [btchgbalance, setBtchgbalance] = useState(0)

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

function userusdwallets(currentPage){
  axios.get(`/api/v1/usdwallets?page=${currentPage}`)
  .then((resp) => {
    setTotalPages(resp.data.pages)
    setUsdwallets(resp.data.main)
    setLoaded(true)
  })
  .catch( data => console.log('Error', data) );
}
function userbtchgwallets(currentPageTwo){
  axios.get(`/api/v1/btchgwallets?page=${currentPageTwo}`)
  .then((resp) => {
    setTotalPagesTwo(resp.data.pages)
    setBtchgwallets(resp.data.main)
    setLoadedTwo(true)
  })
  .catch( data => console.log('Error', data) );
}
useEffect(() => {
  axios.get(`/details/user`)
  .then((resp) => {
    if(resp.data.user == null){
        window.location.href = "/login"
    }
    else{
      setUser(resp.data.user)
      userusdwallets(currentPage);
      userbtchgwallets(currentPageTwo);
      userusdbalance();
      userbtchgbalance();
    }
  })
  .catch( data => console.log('Error', data) );
  }, [])

  let usdwalletsdata
    if(loaded && usdwallets){
      usdwalletsdata = usdwallets.map((item, index) => {
        return(
          <Usdwallet
            key={index}
            attributes={item}
          />
      )
    })
  }

  let btchgwalletsdata
    if(loadedTwo && btchgwallets){
      btchgwalletsdata = btchgwallets.map((item, index) => {
        return(
          <Btchgwallet
            key={index}
            attributes={item}
          />
      )
    })
  }
  const handleChangePage = (currentPage) => {  // Required as a prop to update data in your table.
        setPage(parseInt(currentPage)) // Update Current Page
        userusdwallets(currentPage)// Fetch Data for the new page
      }
  const handleChangePageTwo = (currentPageTwo) => {  // Required as a prop to update data in your table.
        setPageTwo(parseInt(currentPageTwo)) // Update Current Page
        userbtchgwallets(currentPageTwo)// Fetch Data for the new page
      }
  return(
    <div className="container-fluid">
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-6">
          <div className="card">
              <div className="card-body">
                  <h5 className="card-title">List of Transaction (USDT)</h5>
                  <p className="alert alert-warning">Balance: {Number(usdbalance).toFixed(2)} <small><b>(USD)</b></small></p>
                  <div className="table-responsive">
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th>Transaction</th>
                          <th>Details</th>
                          <th>DATE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usdwalletsdata}
                      </tbody>
                    </table>
                  </div>
              </div>
              <div className="card-footer">
                <Pagination page={page} pages={totalPages} handleChangePage={handleChangePage} hideEndArrows={true}/>
              </div>
          </div>
          <br/>
          </div>
          <div className="col-md-6">
          <div className="card">
              <div className="card-body">
                  <h5 className="card-title">List of Transaction (BTCHG)</h5>
                  <p className="alert alert-warning">Balance: {Number(btchgbalance).toFixed(8)} <small><b>(BTCHG)</b></small></p>
                  <div className="table-responsive">
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                        <th>Transaction</th>
                        <th>Details</th>
                        <th>DATE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {btchgwalletsdata}
                      </tbody>
                    </table>
                  </div>
              </div>
              <div className="card-footer">
                <Pagination page={pageTwo} pages={totalPagesTwo} handleChangePage={handleChangePageTwo} hideEndArrows={true}/>
              </div>
          </div>
          </div>
        </div>
      </div>
                <br/><br/><br/><br/>
    </div>
  )
}
export default Wallet
