import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Stakewithdrawals from './Stakewithdrawals'
import moment from 'moment'
import axios from 'axios'
const Stakewithdrawal = (props) => {
  const { id } = useParams();
  const [user, setUser] = useState(0);
  const [stake, setStake] = useState(0);
  const [stakewithdrawals, setStakewithdrawals] = useState({})
  const [loaded, setLoaded] = useState(false)
  useEffect(()=> {

    axios.get(`/details/user`)
    .then((resp) => {
      if(resp.data.user == null){
          window.location.href = "/login"
      }
      else{
        setUser(resp.data.user)
        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
        axios.post(`/api/v1/stakewithdrawals`,{id})
        .then((resp) => {
          setStake(resp.data.stake);
          setStakewithdrawals(resp.data.main);
          setLoaded(true);
        })
        .catch( data => console.log('Error', data) );
      }
    })
    .catch( data => console.log('Error', data) );

    }, [])


    let stakewithdrawalsdata
      if(loaded && stakewithdrawals){
        stakewithdrawalsdata = stakewithdrawals.map((item, index) => {
          return(
            <Stakewithdrawals
              key={index}
              attributes={item}
            />
        )
      })
    }
    return (
        <div className="container-fluid">
          <div className="container">
            <div className="row mt-5">
            <h1>Stake Withdrawals</h1>
            <div className="col-md-4">
              <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Stake Details</h5>
                    <div className="table-responsive">
                      <table className="table table-striped table-hover">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Detials</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>(BTCHG)</td>
                            <td>{stake.amount}</td>
                          </tr>
                          <tr>
                            <td>(USDT)</td>
                            <td>{stake.usd}</td>
                          </tr>
                          <tr>
                            <td>@Rate</td>
                            <td>{stake.at_rate}</td>
                          </tr>
                          <tr>
                            <td>Total Withdrawals</td>
                            <td>{stake.withdrawal}</td>
                          </tr>
                          <tr>
                            <td>Status</td>
                            <td>
                              {stake.status == 1 &&
                                <i className="text-success">Active</i>
                              }
                              {stake.status == 3 &&
                                <i className="text-primary">Released</i>
                              }
                            </td>
                          </tr>
                          <tr>
                            <td>Created @</td>
                            <td>{moment(stake.created_at).format('MMM_DD_YYYY_h:mm_A')}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                  </div>
                    <div className="card-footer">
                    </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">List of Stake Withdrawals</h5>
                    <div className="table-responsive">
                      <table className="table table-striped table-hover">
                        <thead>
                          <tr>
                            <th>Type</th>
                            <th>(BTCHG)</th>
                            <th>(USDT)</th>
                            <th>Status</th>
                            <th>Created@</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stakewithdrawalsdata}
                        </tbody>
                      </table>
                    </div>
                  </div>
                    <div className="card-footer">
                    </div>
              </div>
            </div>
            </div>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    )
}
export default Stakewithdrawal
