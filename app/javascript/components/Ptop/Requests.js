import React from 'react'
import moment from 'moment'
import Rating from '../Rating/Rating'
import { Link } from 'react-router-dom'
const Requests = (props) => {
  const {user_id, amount, rate, gateway, busy, open, uavg_score, created_at, updated_at} = props.attributes
  return (
    <tr>
      <td>BHD000{user_id}</td>
      <td>{Number(amount).toFixed(2)}</td>
      <td>{Number(rate).toFixed(2)}</td>
      <td>{gateway}</td>
      {busy == true &&
        <td className="text-danger">
        User Busy
        </td>
      }
      {busy == false &&
        <td className="text-primary">
        Ready
        </td>
      }
      <td><Rating score={uavg_score}/> ({uavg_score})</td>
      <td>{moment(created_at).format('MMM_DD_YYYY_h:mm_A')}</td>
      {props.user.id != user_id &&
        <td>
        {props.buystat == false  &&
           <Link to={`./Seller/${user_id}`} className="btn btn-primary">Check </Link>
        }
        {props.buystat == true  &&
           <i className="text-danger">Buy request is open!</i>
        }
        </td>
      }

      {props.user.id == user_id &&
          <td className="text-success"> Your Request</td>
      }
    </tr>
  )
}

export default Requests
