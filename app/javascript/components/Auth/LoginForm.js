import React from 'react'
import {Link} from 'react-router-dom'
const LoginForm = (props) => {
  return(
    <div className="container-fluid mt-5">
    <div className="container">
      <div className="row shadow-lg  rounded signupform">
        <h1 className="mt-5 text-white">Login to your account!</h1>
        <div className="col-md-6">

        </div>
        <div className="col-md-6 bg-light rounded">
        <form onSubmit={props.handleSubmit}>
            <div className="field form-group mb-1">
                <label htmlFor="email">Email</label>
                <input type="email" onChange={props.handleChange} value={props.login.email} className="form-control" name="email" placeholder="Enter your email"/>
            </div>
            <div className="field form-group mb-1">
                <label htmlFor="password">Password</label>
                <input type="password" onChange={props.handleChange} value={props.login.password} className="form-control" name="password" placeholder="Enter your password"/>
            </div>
            <button type="submit" className="btn btn-success">Login</button>
          </form>
          <br/>
          <p>
            New to Bitcoin Hedge, <Link to={"./signup"}> Create new account!</Link>
          </p>
        </div>
      </div>
      </div>
    </div>
  )
}
export default LoginForm
