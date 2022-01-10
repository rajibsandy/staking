import React from 'react'

const ProfileForm = (props) => {
  return(

    <form onSubmit={props.handleSubmit}>
        <div className="field form-group mb-1">
            <label htmlFor="name">NAME</label>
            <input type="text" value={props.profile.name} className="form-control" name="name" disabled={true}/>
        </div>
        <div className="field form-group mb-1">
            <label htmlFor="name">EMAIL</label>
            <input type="email" value={props.profile.email} className="form-control" name="email" disabled={true}/>
        </div>
        <div className="field form-group mb-1">
            <label htmlFor="name">MOBILE NO + 9190xxxxxx00</label>
            <input type="number" value={props.profile.mobileno} className="form-control" name="mobileno" onChange={props.handleChange} placeholder="Enter your mobile no"/>
        </div>
        <button type="submit" className="btn btn-success">Save</button>
      </form>
  )

}
export default ProfileForm
