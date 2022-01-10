import React from 'react'
import bootlogo from './boot.jpg'
import moment from 'moment'
const BootForm = (props) => {
  return(
    <>
    {props.bootdek == false &&
      <div className="col-md-4 bg-light rounded">
      <h6 className="mt-5">Balance: {Number(props.usdbalance).toFixed(2)} <small><b>(USD)</b></small></h6><br/>
      <form onSubmit={props.handleSubmit}>
          <div className="field form-group mb-1">
              <label htmlFor="USD">@ Price</label>
              <input type="number" value={props.btcrate} name="btcrate" className="form-control" disabled={true}/>
          </div>
          <div className="field form-group mb-1">
              <label htmlFor="Monthly">Lot</label>
              <input type="number" min="1" name="amount" value={Number(props.boot.usd / props.btcrate).toFixed(8)} className="form-control" disabled={true}/>
          </div>
          <div className="field form-group mb-1">
              <label htmlFor="USD">USD</label>
              <input type="number" name="usd" min="10"step="0.01"value={props.boot.usd} onChange={props.handleChange} className="form-control"/>
          </div>
          <button type="submit" className="btn btn-success">Bot On</button>
        </form>
        <br/>
        </div>
    }
    {props.bootdek == true &&
      <div className="col-md-4">
        <div className="card bg-warning">
          <img src={bootlogo} className="card-img-top bootlogo" alt="Bootlogo"/>
          <div className="card-body">
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><b>LastPrice@:</b> {moment(props.bootdekdata.updated_at).format('MMM_DD_YYYY_h:mm_A')}</li>
            <li className="list-group-item"><b>@Price:</b> {Number(props.bootdekdata.btcrate).toFixed(2)}</li>
            <li className="list-group-item"><b>Current Rate:</b> {Number(props.btcrate).toFixed(2)}</li>
            <li className="list-group-item"><b>Lot:</b> {Number(props.bootdekdata.amount).toFixed(8)}</li>
            <li className="list-group-item"><b>USD:</b> {Number(props.bootdekdata.amount * props.bootdekdata.btcrate).toFixed(2)}</li>
            <li className="list-group-item"><b>Profit: </b>
            {Number(((((props.btcrate - props.bootdekdata.btcrate) * props.bootdekdata.amount) / 2) - props.bootdekdata.fees)).toFixed(2) <= 0 &&
                <i className="text-danger"><i className="fa fa-chevron-circle-down" aria-hidden="true"></i> {Number(0).toFixed(2)}</i>
             }
             {Number(((((props.btcrate - props.bootdekdata.btcrate) * props.bootdekdata.amount) / 2) - props.bootdekdata.fees)).toFixed(2) > 0 &&
              <i className="text-success"><i className="fa fa-chevron-circle-up" aria-hidden="true"></i> {Number((((props.btcrate - props.bootdekdata.btcrate) * props.bootdekdata.amount) / 2) - props.bootdekdata.fees).toFixed(2)}</i>
              }
             </li>
          </ul>
          <div className="card-body">
            <button type="submit" onClick={(e) => props.handleBootOff(e)} className="btn btn-danger">Bot Off</button>
          </div>
        </div>
        <br/>
      </div>

    }

      </>
  )

}
export default BootForm
