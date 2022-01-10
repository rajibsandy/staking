import React from 'react'

const SwapForm = (props) => {
  return(
    <div className="col-md-4 bg-light rounded">
    <p className="mt-5 alert alert-warning">Balance: {Number(props.btchgbalance).toFixed(8)} <small><b>(BTCHG)</b></small></p>
    <p className="alert alert-warning">Balance: {Number(props.usdbalance).toFixed(2)} <small><b>(USDT)</b></small></p>
    <form onSubmit={props.handleSubmit}>
        <div className="field form-group mb-1">
            <label htmlFor="Amount">Select Swap</label>
            <select className="form-control" onChange={(event) => props.changeOption(event.target.value)} value={props.swap.option} name="option">
              <option value="usdtobtchg">USD To BTCHG</option>
              <option value="btchgtousd">BTCHG To USD</option>
            </select>
        </div>

        {props.swap.option == "usdtobtchg" &&
        <div className="field form-group mb-1">
            <label htmlFor="USD">Amount in USDT</label>
            <input type="number" min="10" step="0.01" onChange={props.handleChange} value={props.swap.amount} className="form-control" name="amount" placeholder="Enter USDT"/>
            <p className="alert alert-warning">Balance Will: {Number(props.btchgbalance + (props.swap.amount / props.hedgerate)).toFixed(8)} <small><b>(BTCHG)</b></small></p> 
         </div>
        }
        {props.swap.option == "btchgtousd" &&
        <div className="field form-group mb-1">
            <label htmlFor="USD">Amount in BTCHG</label>
            <input type="number" min="1" step="0.00000001" onChange={props.handleChange} value={props.swap.amount} className="form-control" name="amount" placeholder="Enter BTCHG"/>
            <p className="alert alert-warning">Balance Will: {Number(props.usdbalance + (props.swap.amount * props.hedgerate)).toFixed(2)}<small><b>(USDT)</b></small></p>
         </div>
        }

        <button type="submit" className="btn btn-success">Swap now</button>
      </form>
      <br/>
      </div>
  )

}
export default SwapForm
