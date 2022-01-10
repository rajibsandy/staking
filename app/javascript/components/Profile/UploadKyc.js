import React, {useState} from 'react'
import Swal from 'sweetalert2'
import {ProgressBar } from "react-bootstrap"
import axios from 'axios'
const UploadKyc = (props) => {
   const [progress, setProgress] = useState()
   const [image, setImage] = useState({})
    const onChange = (e) => {
        e.persist()
        setImage(Object.assign({}, image, {[e.target.name]: e.target.files[0]}))
    }

    const onSubmit = (e) => {

        e.preventDefault()
        const token = document.querySelector('meta[name="csrf-token"]').content;

        const form = new FormData()
        // console.log(image.image)
        form.append("idproof", image.idproof)
        form.append("addressproof", image.addressproof)
        form.append("bank_passbook", image.bank_passbook)
        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
        axios.post(`/kyc_upload`, form, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              onUploadProgress: data => {
                //Set the progress value to show the progress bar
                setProgress(Math.round((100 * data.loaded) / data.total))
              },
            }).then(resp => {
              Swal.fire({
                title: 'Proof Uploaded!',
                icon: 'success',
                text: "Kindly wait for seller to approve and release coin!",
                confirmButtonText: 'Ok'
              }).then(()=>{
                window.location.href = ""
              });
            }).catch((error) =>
              Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Ok'
              }).then(()=>{
                window.location.href = ""
              })
          )
    }



        return (
            <div className="form-group">
                <form onSubmit={onSubmit}>
                    <label>ID PROOF</label>
                    <input type="file" name="idproof" className="form-control" onChange={onChange}/>
                    <label>ADDRESS PROOF</label>
                    <input type="file" name="addressproof" className="form-control" onChange={onChange}/>
                    <label>BANK PASSBOOK</label>
                    <input type="file" name="bank_passbook" className="form-control" onChange={onChange}/>
                    <br/>
                    {progress && <ProgressBar now={progress} label={`${progress}%`} />}
                    <br/>
                    <button type="submit" className="btn btn-success">Upload</button>
                </form>
            </div>
        )
    }

export default UploadKyc
