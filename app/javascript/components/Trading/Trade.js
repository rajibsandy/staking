import React, {useState, useEffect} from 'react'
import TradeForm from './TradeForm'
import Trades from './Trades'
import TradeHistory from './TradeHistory'
import axios from 'axios'
import Swal from 'sweetalert2'
import Pagination from 'react-rails-pagination';
const Trade = (props) => {

  const [user, setUser] = useState(0)

  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [pageTwo, setPageTwo] = useState(1);
  const [currentPageTwo, setCurrentPageTwo] = useState(1);
  const [totalPagesTwo, setTotalPagesTwo] = useState(0);

  const [order, setOrder] = useState({ amount:0, btcrate:0, usd:0 });
  const [fees, setFees] = useState(0);
  const [btcrate, setBtcrate] = useState(0);

  const [orders, setOrders] = useState({});
  const [ordersTwo, setOrdersTwo] = useState({});

  const [loaded, setLoaded] = useState(false);
  const [balance, setBalance] = useState(0);

  var closeOrder = {id: 0, btcrate: 0};

  function userbalance(){
    axios.get(`/usd_balance`)
    .then((resp) => {
      setBalance(resp.data.balance)
    }).catch( data => console.log('Error', data) );
  }

  function activeOrders(currentPage){
    axios.get(`/api/v1/orders.json?page=${currentPage}`)
    .then((resp) => {
      setTotalPages(resp.data.pages)
      setOrders(resp.data.main)
      setLoaded(true)
    })
    .catch( data => console.log('Error', data) );
  }


  function deactiveOrders(currentPageTwo){
    axios.get(`/api/v1/deactive_orders.json?page=${currentPageTwo}`)
    .then((resp) => {
      setTotalPagesTwo(resp.data.pages)
      setOrdersTwo(resp.data.main)
      setLoaded(true)
    })
    .catch( data => console.log('Error', data) );
  }

  useEffect(()=> {
    axios.get(`details/user`)
    .then((resp) => {
      if(resp.data.user == null){
          window.location.href = "/login"
      }else if(resp.data.user.mobile_verified_at == null){
          window.location.href = "/verifymobile"
      }else if(resp.data.user.seller_review == true){
          window.location.href = "/sellerreview"
      }else{
        setUser(resp.data.user)
        userbalance();
        activeOrders(currentPage);
        deactiveOrders(currentPageTwo);
      }
    })
    .catch( data => console.log('Error', data) );

  const pricesWs = new WebSocket(
        "wss://stream.binance.com:9443/ws/btcusdt@aggTrade"
      );
      pricesWs.onmessage = function (msg) {
            var obj = JSON.parse(msg.data);
            var objw = obj.p;
            setBtcrate(parseFloat(objw))
          };
    }, [])

    const handleChange = (e) =>{
      e.preventDefault()
      var amount = Number(e.target.value / btcrate).toFixed(8)
      setOrder(Object.assign({}, order, {btcrate: btcrate, amount: amount, [e.target.name]: e.target.value}));
    }
    const handleSubmit = (e) =>{
      e.preventDefault()
      const csrfToken = document.querySelector('[name=csrf-token]').content
      axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
      axios.post('/api/v1/orders', {order})
      .then(resp => {
        userbalance(); // Fetch Data for the new page
        activeOrders(currentPage);
        Swal.fire({
          title: 'Order created successfully!',
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
  const handleChangePage = (currentPage) => {  // Required as a prop to update data in your table.
        setPage(parseInt(currentPage)) // Update Current Page
        activeOrders(currentPage)// Fetch Data for the new page
      }

  const handleChangePageTwo = (currentPageTwo) => {  // Required as a prop to update data in your table.
        setPageTwo(parseInt(currentPageTwo)) // Update Current Page
        deactiveOrders(currentPageTwo)// Fetch Data for the new page
      }

  const handleCloseOrder =  (e ,id) => {
    e.preventDefault();
      closeOrder = Object.assign({}, closeOrder, {id: id, btcrate: btcrate});
      Swal.fire({
        title: 'Do you want to close your order?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          const csrfToken = document.querySelector('[name=csrf-token]').content
          axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
          axios.post(`/api/v1/closeOrder`, {closeOrder})
          .then(resp => {
            userbalance(); // Fetch Data for the new page
            activeOrders(currentPage);
            deactiveOrders(currentPageTwo);
            Swal.fire({
              title: 'Order closed!',
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
      })
  }


  let ordersdata
    if(loaded && orders.data){
      ordersdata = orders.data.map((item, index) => {
        return(
          <Trades
            key={index}
            attributes={item.attributes}
            btcrate={btcrate}
            handleCloseOrder={handleCloseOrder}
          />
      )
    })
  }

  let ordersdatatwo
    if(loaded && ordersTwo.data){
      ordersdatatwo = ordersTwo.data.map((item, index) => {
        return(
          <TradeHistory
            key={index}
            attributes={item.attributes}
            btcrate={btcrate}

          />
      )
    })
  }
    return (
      <div className="container-fluid">
        <div className="container">
          <div className="row mt-5">
          <h1>Zero Loss Trading</h1>
          <TradeForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            order={order}
            btcrate={btcrate}
            balance={balance}
          />
          <div className="col-md-8">
              <div className="card">
                  <div className="card-body">
                      <h5 className="card-title">List of Orders</h5>
                      <div className="table-responsive">
                        <table className="table table-striped table-hover">
                          <thead>
                            <tr>
                              <th>Created@</th>
                              <th>@Price</th>
                              <th>Current_Rate</th>
                              <th>Lot</th>
                              <th>USDT</th>
                              <th>Fees</th>
                              <th>Profit(USD)</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ordersdata}
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
          <div className="row mt-5">
          <div className="col-md-12">

              <div className="card">
                  <div className="card-body">
                      <h5 className="card-title">Histroy of Orders</h5>
                      <div className="table-responsive">
                        <table className="table table-striped table-hover">
                          <thead>
                            <tr>
                              <th>Created@</th>
                              <th>@Price</th>
                              <th>Lot</th>
                              <th>USDT</th>
                              <th>Fees</th>
                              <th>Profit(USD)</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ordersdatatwo}
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
export default Trade
