import React from 'react'

const BankForm = (props) => {
  return(

    <form onSubmit={props.handleSubmitBank}>
        <div className="field form-group mb-1">
            <label htmlFor="bank_accountno">BANK ACCOUNT NO</label>
            <input type="text" value={props.profile.bank_accountno} className="form-control" name="bank_accountno" onChange={props.handleChange} placeholder="Enter your bank account no"/>
        </div>
        <div className="field form-group mb-1">
            <label htmlFor="bank_ifsccode">BANK IFSC CODE</label>
            <input type="text" value={props.profile.bank_ifsccode} className="form-control" name="bank_ifsccode" onChange={props.handleChange} placeholder="Enter your bank IFSC code"/>
        </div>
        <div className="field form-group mb-1">
            <label htmlFor="bank_upi">BANK UPI ID</label>
            <input type="text" value={props.profile.bank_upi} className="form-control" name="bank_upi" onChange={props.handleChange} placeholder="Enter your UPI id"/>
        </div>
        <div className="field form-group mb-1">
            <label htmlFor="btcaddress">BITCOIN ADDRESS</label>
            <input type="text" value={props.profile.btcaddress} className="form-control" name="btcaddress" onChange={props.handleChange} placeholder="Enter your bitcoin address"/>
        </div>
        <button type="submit" className="btn btn-success">Save</button>
      </form>
  )

}
export default BankForm
