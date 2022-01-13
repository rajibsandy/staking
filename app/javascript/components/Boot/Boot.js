import React ,{useState, useEffect} from 'react'
import axios from 'axios'
import Activate from './Activate'
import BootForm from './BootForm'
import Bootprofits from './Bootprofits'
import Swal from 'sweetalert2'
import Pagination from 'react-rails-pagination';

const Boot = (props) => {
  const [bootdek, setBootdek] = useState(false)
  const [bootdekdata, setBootdekdata] = useState({})
  const [user, setUser] = useState(0)
  const [activate, setActivate] = useState({option: 1})
  const [usdbalance, setUsdbalance] = useState(0)
  const [btcrate, setBtcrate] = useState(0)
  const [fees, setFees] = useState(0)
  const [boot, setBoot] = useState({ amount:0, btcrate:0, usd:0 })
  const [bootprofits, setBootprofits] = useState({})
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loaded, setLoaded] = useState(false)

  function userbootprofits(currentPage){
    axios.get(`/api/v1/boots.json?page=${currentPage}`)
    .then((resp) => {
      setTotalPages(resp.data.pages)
      setBootprofits(resp.data.main)
      setLoaded(true)
    })
    .catch( data => console.log('Error', data) );
  }
  function userusdbalance(){
  axios.get(`usd_balance`)
    .then((resp) => {
      setUsdbalance(resp.data.balance)
    })
    .catch( data => console.log('Error', data) )
  }
  function loadbootdek(){
    axios.get(`api/v1/bootdek`)
      .then((resp) => {
        setBootdek(resp.data.bootdek)
        if (resp.data.bootdek == true){
          setBootdekdata(resp.data.data)
        }
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
        userusdbalance()
        loadbootdek()
        userbootprofits(currentPage)
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
    setBoot(Object.assign({}, boot, {btcrate: btcrate, amount: amount, [e.target.name]: e.target.value}))
  }
  const changeOption = (newOption) => {
      setActivate({option: newOption})
    }
  const handleSubmitActivate = (e) =>{
    e.preventDefault()

    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    axios.post('api/v1/boot/activate', {activate})
    .then(resp => {
      Swal.fire({
        title: 'Bot successfully activated!',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      axios.get(`details/user`)
      .then((resp) => {
        setUser(resp.data.user)
        userusdbalance()
        loadbootdek()
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
  const handleBootOff = (e) => {
    e.preventDefault()
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    axios.get('/api/v1/bootOff')
    .then(resp => {
      userusdbalance() // Fetch Data for the new page
      loadbootdek();
      Swal.fire({
        title: 'Bot off successfully!',
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
  const handleSubmit = (e) =>{
    e.preventDefault()
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    axios.post('/api/v1/bootOn', {boot})
    .then(resp => {
      userusdbalance() // Fetch Data for the new page
      loadbootdek();
      Swal.fire({
        title: 'Bot Started successfully!',
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

    const handleChangePage = (currentPage) => {  // Required as a prop to update data in your table.
          setPage(parseInt(currentPage)) // Update Current Page
          userbootprofits(currentPage)// Fetch Data for the new page

        }
    let bootprofitsdata
      if(loaded && bootprofits.data){
        bootprofitsdata = bootprofits.data.map((item, index) => {
          return(
            <Bootprofits
              key={index}
              attributes={item.attributes}
              btcrate={btcrate}
            />
        )
      })
    }

    return (
      <>
        {user.boot_active == false &&
          <Activate
          handleSubmitActivate={handleSubmitActivate}
          changeOption={changeOption}
          usdbalance={usdbalance}
          activate={activate}/>
        }
        {user.boot_active == true &&
          <div className="container-fluid">
            <div className="container">
              <div className="row mt-5">
              <h1>Bot Trading</h1>
              <BootForm
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleBootOff={handleBootOff}
                boot={boot}
                bootdek={bootdek}
                bootdekdata={bootdekdata}
                btcrate={btcrate}
                usdbalance={usdbalance}
              />
              <div className="col-md-8">
                  <div className="card">
                      <div className="card-body">
                          <h5 className="card-title">List of Bot's Daily Profit</h5>
                          <div className="table-responsive">
                            <table className="table table-striped table-hover">
                              <thead>
                                <tr>
                                  <th>Created@</th>
                                  <th>Profit(USD)</th>
                                  <th>@Rate</th>
                                  <th>@Lot</th>
                                  <th>Details</th>
                                </tr>
                              </thead>
                              <tbody>
                                {bootprofitsdata}
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
          </div>
        }
                    <br/><br/><br/><br/>
      </>
    )
}

export default Boot
