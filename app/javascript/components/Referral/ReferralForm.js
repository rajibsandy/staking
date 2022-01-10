import React from 'react'

const ReferralForm = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div className="field form-group mb-1">
            <label htmlFor="Amount">Select Level</label>
            <select className="form-control" onChange={(event) => props.changeOption(event.target.value)} value={props.level.option} name="option">
              <option value="levelone">Level 1</option>
              <option value="leveltwo">Level 2</option>
              <option value="levelthree">Level 3</option>
              <option value="levelfour">Level 4</option>
              <option value="levelfive">Level 5</option>
              <option value="levelsix">Level 6</option>
              <option value="levelseven">Level 7</option>
              <option value="leveleight">Level 8</option>
              <option value="levelnine">Level 9</option>
              <option value="levelten">Level 10</option>
            </select>
        </div>
        <button type="submit">Check</button>
      </form>
    </div>
  )
}
export default ReferralForm
