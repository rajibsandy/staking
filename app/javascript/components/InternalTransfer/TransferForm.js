import React from 'react'

const TransferForm = (props) => {
  return(
    <div className="col-md-4 bg-light rounded">
    <h6 className="mt-5">Balance: {Number(props.btchgbalance).toFixed(8)} <small><b>(BTCHG)</b></small></h6><br/>
    <h6>Balance: {Number(props.usdbalance).toFixed(2)} <small><b>(USD)</b></small></h6><br/>
    <form onSubmit={props.handleSubmit}>
        <div className="field form-group mb-1">
            <label htmlFor="Amount">Select Transfer Type</label>
            <select className="form-control" onChange={(event) => props.changeOption(event.target.value)} value={props.transfer.option} name="option">
              <option value="usdtobtchg">USD To BTCHG</option>
              <option value="btchgtousd">BTCHG To USD</option>
            </select>

        </div>


        {props.transfer.option == "usdtobtchg" &&
        <div className="field form-group mb-1">
            <label htmlFor="USD">Amount in USD</label>
            <input type="number" min="10" step="0.01" onChange={props.handleChange} value={props.transfer.amount} className="form-control" name="amount" placeholder="Enter USD"/>
         </div>
        }
        {props.transfer.option == "btchgtousd" &&
        <div className="field form-group mb-1">
            <label htmlFor="USD">Amount in BTCHG</label>
            <input type="number" min="1" step="0.00000001" onChange={props.handleChange} value={props.transfer.amount} className="form-control" name="amount" placeholder="Enter BTCHG"/>
         </div>
        }

        <div className="field form-group mb-1">
            <label htmlFor="Monthly">Monthly 5% (USD)</label>

        </div>
        <div className="field form-group mb-1">
            <label htmlFor="Months">Months</label>

        </div>
        <button type="submit" className="btn btn-success">Stake now</button>
      </form>
      <br/>
      </div>
  )

}
export default TransferForm
