import React from 'react'
import "./Seller.css"
const ReviewForm = (props) =>{
const ratingOption = [5,4,3,2,1].map((score, index) => {
  return(
    <>
    <input type="radio" value={score} checked={props.review.score == score} name="rating" onChange={() => console.log('selectd:', score)} id={`rating-${score}`}/>
    <label onClick={props.setRating.bind(this, score)}></label>
    </>
  )
})

  return(
    <form onSubmit={props.handleSubmit}>
        <div className="field form-group mb-1">
            <label htmlFor="title">Title</label>
            <input type="text" value={props.review.name} className="form-control" name="title" onChange={props.handleChange} />
        </div>
        <div className="field form-group mb-1">
            <label htmlFor="name">Description</label>
            <input type="text" value={props.review.email} className="form-control" name="description" onChange={props.handleChange}/>
        </div>
        <div className="field form-group mb-1">
            <div className="rating-box">
              {ratingOption}
            </div>
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
  )
}
export default ReviewForm
