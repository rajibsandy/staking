import React, {useState, useEffect} from 'react'
import axios from 'axios'


const Activate = (props) => {

    const [plans, setPlans] = useState({})

    useEffect(() => {
        axios.get(`api/v1/plan/boot`)
        .then((resp) => {
          setPlans(Array.from(resp.data.plans))
        })
        .catch( data => console.log('Error', data) );
      }, [])
      let options = plans.length > 0
      		&& plans.map((item, i) => {
      		return (
      			<option key={i} value={item.id}>{item.package_name}</option>
      		)
      	}, this);
  return(
    <div className="container-fluid mt-5">
    <div className="container">
      <div className="row shadow-lg  rounded">
        <div className="col-md-6 bg-light rounded">
        <h1>Bot Activation Needed</h1>
          <form onSubmit={props.handleSubmitActivate}>
            <p className="alert alert-warning">Your balance: {Number(props.usdbalance).toFixed(2)} (USDT) </p>
            <select className="form-control" onChange={(event) => props.changeOption(event.target.value)} value={props.activate.option} name="option">
              {options}
            </select>
            <br/>
            <button type="submit" className="btn btn-success">Activate</button>
          </form>
          <br/>
        </div>
        <div className="col-md-6">
        <div className="card">
            <div className="card-body">
                  <h5 className="card-title">Boot Plans</h5>
                  <div className="table-responsive">
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>@Price</th>
                          <th>Offer(Details)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Diamond (VIP)</td>
                          <td>99 (USDT)</td>
                          <td>9 Months + <i className="text-success">3 Months (Limited time offer)</i></td>
                        </tr>
                        <tr>
                          <td>Platinum</td>
                          <td>50 (USDT)</td>
                          <td>4 Months + <i className="text-success">2 Months (Limited time offer)</i></td>
                        </tr>
                        <tr>
                          <td>Gold</td>
                          <td>25 (USDT)</td>
                          <td>2 Months + <i className="text-success">1 Months (Limited time offer)</i></td>
                        </tr>
                        <tr>
                          <td>Silver</td>
                          <td>10 (USDT)</td>
                          <td>25 days + <i className="text-success">5 days (Limited time offer)</i></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
              </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
export default Activate
