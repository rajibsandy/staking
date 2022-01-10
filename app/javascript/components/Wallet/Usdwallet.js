import React from 'react'
import moment from 'moment'
const Usdwallet = (props) =>{
  const {credit, debit, detail, created_at, updated_at} = props.attributes
  return (
    <tr>
      <td>
        {credit > 0.00 &&
          <i className="text-success"> + {Number(credit).toFixed(2)}</i>
        }
        {debit > 0.00 &&
          <i className="text-danger"> - {Number(debit).toFixed(2)}</i>
        }
        {credit == 0.00 &&
          <span>
            {debit == 0.00 &&
              <i className="text-danger">{Number(debit).toFixed(2)}</i>
            }
          </span>
        }
      </td>
      <td>{detail}</td>
      <td>{moment(created_at).format('MMM_DD_YYYY_h:mm_A')}</td>
    </tr>
  )
}
export default Usdwallet
