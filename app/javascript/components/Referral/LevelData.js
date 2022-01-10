import React from "react"

const LevelData = (props) => {
  const {name, created_at} = props.attributes
  return (
    <tr>
      <td>{name}</td>
      <td>{created_at}</td>
    </tr>
  )
}
export default LevelData
