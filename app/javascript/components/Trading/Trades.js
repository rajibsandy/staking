import React from 'react'
import moment from 'moment'
const Trades = (props) =>{
  const {id, user_id, amount, btcrate, profit, fees, open, created_at, updated_at} = props.attributes
  return (
    <tr>
      <td>{moment(created_at).format('MMM_DD_YYYY_h:mm_A')}</td>
      <td>{Number(btcrate).toFixed(2)}</td>
      <td>{Number(props.btcrate).toFixed(2)}</td>
      <td>{Number(amount).toFixed(8)}</td>
      <td>{Number(amount * btcrate).toFixed(2)}</td>
      <td>{Number(fees).toFixed(2)}</td>
        <td>
        {Number((((props.btcrate - btcrate) * amount) / 2)).toFixed(2) <= 0  &&
          <i className="text-danger"><i className="fa fa-chevron-circle-down" aria-hidden="true"></i> {Number(0).toFixed(2)}</i>
          }
        {Number((((props.btcrate - btcrate) * amount) / 2)).toFixed(2) > 0  &&
          <i className="text-success"><i className="fa fa-chevron-circle-up" aria-hidden="true"></i> {Number((((props.btcrate - btcrate) * amount) / 2)).toFixed(2)}</i>
          }
        </td>
      <td className="text-danger"><i className="fa fa-times-circle" aria-hidden="true" onClick={(e) => props.handleCloseOrder(e, id)}> Close</i></td>
    </tr>
  )
}
export default Trades
