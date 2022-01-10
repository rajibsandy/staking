import React, {useState} from 'react'
import Swal from 'sweetalert2'
import {ProgressBar } from "react-bootstrap"
import axios from 'axios'
const ProofUploads = (props) => {
   const [progress, setProgress] = useState()
   const [image, setImage] = useState({})
    const onChange = (e) => {
        e.persist()
        setImage({[e.target.name]: e.target.files[0]})
    }

    const onSubmit = (e) => {

        e.preventDefault()
        const token = document.querySelector('meta[name="csrf-token"]').content;

        const form = new FormData()
        // console.log(image.image)
        form.append("image", image.image)
        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
        axios.post(`/api/v1/proofuploads`, form, {
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
                <h1>Upload Proof</h1>
                <form onSubmit={onSubmit}>
                    <label>Upload</label>
                    <input type="file" name="image" className="form-control" onChange={onChange}/>
                    <br/>

                    {progress && <ProgressBar now={progress} label={`${progress}%`} />}
                    <br/>
                    <input type="submit"/>
                </form>
            </div>
        )
    }

export default ProofUploads
