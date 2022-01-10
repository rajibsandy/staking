import React from 'react'
import moment from 'moment'
const TradeHistory = (props) =>{
  const {user_id, amount, btcrate, profit, fees, open, created_at, updated_at} = props.attributes
  return (
    <tr>
      <td>{moment(created_at).format('MMM_DD_YYYY_h:mm_A')}</td>
      <td>{Number(btcrate).toFixed(2)}</td>
      <td>{Number(amount).toFixed(8)}</td>
      <td>{Number(amount * btcrate).toFixed(2)}</td>
      <td>{Number(fees).toFixed(2)}</td>
      <td>{Number(profit).toFixed(2)}</td>
      <td className="text-primary"><i className="fas fa-check-circle"> Closed</i> </td>
    </tr>
  )
}

export default TradeHistory
