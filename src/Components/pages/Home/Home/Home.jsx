import React, {  useContext, useEffect, useState } from 'react'
import ShoppingCart from '../../../Cart/ShoppingCart'
import axios from 'axios'
import { AuthContext } from '../../../Providers/AuthProvider'

const Home = () => {
  const [data, setData] = useState([])
  const {user} = useContext(AuthContext)
  // console.log(user?.email)

  useEffect(() => {
    axios.get('http://localhost:5000/products', {
      withCredentials: true
    })
      .then(res => setData(res.data))
  }, [])


  return (
    <div className='grid grid-cols-4 gap-5'>
      {
        data && data.map((data) => <ShoppingCart key={data._id} data={data}></ShoppingCart>)
      }
    </div>
  )
}

export default Home
