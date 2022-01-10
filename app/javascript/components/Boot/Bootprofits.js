import React from 'react'
import moment from 'moment'
const Bootprofits = (props) =>{
  const {profit, rate, amount, detail, created_at, updated_at} = props.attributes
  return (
    <tr>
      <td>{moment(created_at).format('MMM DD YYYY h:mm A')}</td>
      <td>{Number(profit).toFixed(2)}</td>
      <td>{Number(rate).toFixed(2)}</td>
      <td>{Number(amount).toFixed(8)}</td>
      <td>{detail}</td>
    </tr>
  )
}
export default Bootprofits
