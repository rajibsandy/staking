import React from 'react'

const SellerRequestForm = (props) => {
  return(
    <form onSubmit={props.handleSubmit}>
        <div className="field form-group mb-1">
          <label htmlFor="gateway">Select Swap</label>
          <select className="form-control" onChange={(event) => props.changeOptionSellerForm(event.target.value)} value={props.sellerrequest.gateway} name="gateway">
            <option value="NEFT|IMPS">NEFT|IMPS</option>
            <option value="UPI">UPI</option>
            <option value="BITCOIN">BITCOIN</option>
          </select>
        </div>
        <div className="field form-group mb-1">
            <label htmlFor="amount">Coins(USDT)</label>
            <input type="number" min="1" name="amount" step="0.01" value={props.sellerrequest.amount} className="form-control" onChange={props.handleChange}/>
        </div>
        <div className="field form-group mb-1">
            <label htmlFor="rate">Rate</label>
            <input type="number" name="rate" min="10" step="0.01" value={props.sellerrequest.rate} onChange={props.handleChange} className="form-control"/>
        </div>
        <div className="field form-group mb-1">
            <label htmlFor="inr">INR</label>
            <input type="number" name="inr" min="10" step="0.01" value={Number(props.sellerrequest.amount * props.sellerrequest.rate).toFixed(2)} disabled={true} className="form-control"/>
        </div>
        <button type="submit" className="btn btn-success">Request</button>
      </form>
  )
}
export default SellerRequestForm
