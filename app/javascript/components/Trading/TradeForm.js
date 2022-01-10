import React from 'react'

const TradeForm = (props) => {
  return(
    <div className="col-md-4 bg-light rounded">
    <p className="mt-5 alert alert-warning">Balance: {Number(props.balance).toFixed(2)} <small><b>(USDT)</b></small></p>
    <form onSubmit={props.handleSubmit}>
        <div className="field form-group mb-1">
            <label htmlFor="USD">@ Price</label>
            <input type="number" value={props.btcrate} name="btcrate" className="form-control" disabled={true}/>
        </div>
        <div className="field form-group mb-1">
            <label htmlFor="Monthly">Lot</label>
            <input type="number" min="1" name="amount" value={Number(props.order.usd / props.btcrate).toFixed(8)} className="form-control" disabled={true}/>
        </div>
        <div className="field form-group mb-1">
            <label htmlFor="USD">USDT</label>
            <input type="number" name="usd" min="10"step="0.01"value={props.order.usd} onChange={props.handleChange} className="form-control"/>
        </div>
        <button type="submit" className="btn btn-success">Buy</button>
      </form>
      <br/>
      </div>
  )

}
export default TradeForm
