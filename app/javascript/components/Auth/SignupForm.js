import React from 'react'
import { Link } from 'react-router-dom'
const SignupForm = (props) => {
  return(
    <div className="container-fluid mt-5">
    <div className="container">
      <div className="row shadow-lg  rounded signupform">
        <h1 className="mt-5 text-white">Create new account!</h1>
        <div className="col-md-6">

        </div>
        <div className="col-md-6 bg-light rounded">
        <form onSubmit={props.handleSubmit}>
            <div className="field form-group mb-1">
                <label htmlFor="referral">Referral Id (Optional)</label>
                <input type="text" onChange={props.handleChangeReferral} value={props.user.referral} className="form-control" name="referral"  placeholder="Referral Id"/>
            </div>
            <div className="field form-group mb-1">
                <label htmlFor="referralname">Referral Name</label>
                <input type="text" value={props.referral.name} className="form-control" name="referralname" placeholder="Referral Name"/>
                <a onClick={props.checkuser} className="text-primary" >Verify</a>
            </div>
            <div className="field form-group mb-1">
                <label htmlFor="name">Full Name</label>
                <input type="name" onChange={props.handleChange} value={props.user.name} className="form-control" name="name" placeholder="Enter your name"/>
            </div>
            <div className="field form-group mb-1">
                <label htmlFor="email">Email</label>
                <input type="email" onChange={props.handleChange} value={props.user.email} className="form-control" name="email" placeholder="Enter your email"/>
            </div>
            <div className="field form-group mb-1">
                <label htmlFor="mobileno">Mobile + (91 91xxxxxxxx00) </label>
                <input type="number" onChange={props.handleChange} value={props.user.mobileno} className="form-control" name="mobileno" placeholder="Enter your Mobile No"/>
            </div>
            <div className="field form-group mb-1">
                <label htmlFor="password">Password</label>
                <input type="password" onChange={props.handleChange} value={props.user.password} className="form-control" name="password" placeholder="Enter your password"/>
            </div>
            <button type="submit" className="btn btn-success">Signup</button>
          </form>
          <br/>
          <p>
            Already have account, <Link to={"./login"}>Login!</Link>
          </p>
        </div>
      </div>
      </div>
      <br/><br/>
    </div>
  )
}
export default SignupForm
