import React from 'react'

const BuyerRequestForm = (props) => {
  return(
    <form onSubmit={props.handleSubmit}>
        <div className="field form-group mb-1">
            <label htmlFor="amount">Coins(USDT)</label>
            <input type="number" min="1" name="amount" step="0.01" value={props.buyer.amount} className="form-control" onChange={props.handleChange}/>
        </div>
        <div className="field form-group mb-1">
            <label htmlFor="rate">Rate</label>
            <input type="number" name="rate" min="10" step="0.01" value={props.seller.rate} disabled={true} className="form-control"/>
        </div>
        <div className="field form-group mb-1">
            <label htmlFor="inr">INR</label>
            <input type="number" name="inr" min="10" step="0.01" value={Number(props.buyer.amount * props.seller.rate).toFixed(2)} disabled={true} className="form-control"/>
        </div>
        <button type="submit" className="btn btn-success">Request</button>
      </form>
  )
}
export default BuyerRequestForm
