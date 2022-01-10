import React from 'react'
const MobileForm = (props) => {
  return(
        <form onSubmit={props.handleSubmitOtp}>
            <div className="field form-group mb-1">
                <label htmlFor="mobile">Mobile</label>
                {props.changeno == false &&
                  <>
                    <i>Verification code Sent to  +{ props.user.mobileno }</i>
                    <a onClick={props.changeNo} className="text-primary"> Change</a><br/>
                    <a onClick={props.sendotp} className="text-primary"> Send Verification Code</a>
                  </>
                }
                {props.changeno == true &&
                  <>
                  <input type="number" onChange={props.handleChange} value={props.profile.mobileno} className="form-control" name="mobileno" placeholder="Enter verification code"/>
                  <a onClick={props.sendotp} className="text-primary"> SentOtp</a>
                  </>
                }
            </div>
            <div className="field form-group mb-1">

                <label htmlFor="otp">Enter verification code:</label>
                <input type="number" onChange={props.handleChange} value={props.profile.otp} className="form-control" name="otp" placeholder="Enter verification code"/>
            </div>
            <button type="submit" className="btn btn-success">Submit</button>
          </form>
  )
}
export default MobileForm
