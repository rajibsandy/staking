import React from 'react'

const StakeForm = (props) => {
  return(
    <div className="col-md-4 bg-light rounded">
    <p className="mt-5 alert alert-warning">Balance: {Number(props.balance).toFixed(8)} <small><b>(BTCHG)</b></small></p>
    <form onSubmit={props.handleSubmit}>
        <div className="field form-group mb-1">
            <label htmlFor="Amount">Enter amount in BTCHG</label>
            <input type="number" min="1" step="0.00000001" onChange={props.handleChange} value={props.stake.amount} className="form-control" name="amount" placeholder="Enter Amount"/>
        </div>
        <div className="field form-group mb-1">
            <label htmlFor="USD">Amount in USDT</label>
            <input type="number" min="1" value={Number(props.stake.amount * props.hedgerate).toFixed(2)} className="form-control" placeholder="Enter Amount" disabled={true}/>
        </div>
        <div className="field form-group mb-1">
            <label htmlFor="Monthly">Monthly 5% (USDT)</label>
            <input type="number" min="1" value={Number((props.stake.amount * props.hedgerate) * 0.05).toFixed(2)} className="form-control" placeholder="Enter Amount" disabled={true}/>
        </div>
        <div className="field form-group mb-1">
            <label htmlFor="Months">Months</label>
            <input type="number" min="1" value="12" className="form-control" placeholder="Enter Amount" disabled={true}/>
        </div>
        <button type="submit" className="btn btn-success">Stake now</button>
      </form>
      <br/>
      </div>
  )

}
export default StakeForm
