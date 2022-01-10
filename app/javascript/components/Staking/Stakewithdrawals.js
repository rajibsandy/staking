import React from 'react'
import moment from 'moment'
const Stakewithdrawals = (props) =>{
  const {monthly, amount, usd, status, created_at} = props.attributes
  return (
    <tr>
      <td>
      {monthly == true &&
        <i className="text-success">Monthly</i>
      }
      {monthly == false &&
        <i className="text-primary">Stake Released</i>
      }
      </td>
      <td>{Number(amount).toFixed(8)}</td>
      <td>{Number(usd).toFixed(2)}</td>
      <td>
        {status == 1 &&
          <i>Credited</i>
        }
        {status == 0 &&
          <i>Pending</i>
        }
      </td>
      <td>{moment(created_at).format('MMM_DD_YYYY_h:mm_A')}</td>
    </tr>
  )
}
export default Stakewithdrawals
