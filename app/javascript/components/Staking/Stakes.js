import React from 'react'
import moment from 'moment'
import {Link} from 'react-router-dom'
const Stakes = (props) =>{
  const {id, user_id, amount, at_rate, usd, status, withdrawal, created_at, updated_at} = props.attributes
  return (
    <tr>
      <td><Link to={`./Stakewithdrawal/${id}`}>Check</Link></td>
      <td>{Number(amount).toFixed(8)}</td>
      <td>{Number(usd).toFixed(2)}</td>
      <td>{at_rate}</td>
      <td>
        {status == 1 &&
          <i className="text-success">Active</i>
        }
        {status == 3 &&
          <i className="text-primary">Released</i>
        }
      </td>
      <td>{withdrawal}</td>
      <td>{moment(created_at).format('MMM_DD_YYYY_h:mm_A')}</td>
    </tr>
  )
}
export default Stakes
