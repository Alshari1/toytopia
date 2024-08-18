import React, { useEffect, useState } from 'react'
import Manage from '../Manage/Manage'
import axios from 'axios'

const Update = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);
  const id = localStorage.getItem('update_cart')
  // console.log(id)
  useEffect( () => {
    axios.get(`http://localhost:5000/products/${id}`)
    .then( res => {
      // console.log(res)
      setData(res.data)
      setLoading(false)
    })

} , [])

  return (
    <div>
     <Manage value="update" updatedData={data} loading={loading}></Manage>

    </div>
  )
}

export default Update
