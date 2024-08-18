import React, { useEffect, useState } from 'react'
import ShoppingCart from '../../../Cart/ShoppingCart'
import axios from 'axios'

const Home = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(res => setData(res.data))
  }, [])



  console.log(data)

  return (
    <div className='grid grid-cols-4 gap-5'>
      {
        data && data.map((data) => <ShoppingCart key={data._id} data={data}></ShoppingCart>)
      }
    </div>
  )
}

export default Home
