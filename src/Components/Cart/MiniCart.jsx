import React, { useState, useEffect, useImperativeHandle, forwardRef, useContext } from 'react';
import cart from './../../assets/images/icon/cart (1).png'
import axios from 'axios';
import { AuthContext } from '../Providers/AuthProvider';
import useOrders from './useOrders';
// forwardRef((props, ref)
const MiniCart = () => {
    const {user} = useContext(AuthContext)
    // const [orders, setOrders] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [orders] =  useOrders()
    console.log(orders)

    // const fetchData = () => {
    //     axios.get(`http://localhost:5000/orders/${user?.email}`,{
    //     withCredentials:true
    //     })
    //         .then(res => {
    //             setOrders(res.data);
    //             const total = res.data.reduce((acc, item) => acc + parseFloat(item.totalPrice), 0)
    //             // const total = res.data.reduce((acc, item) => acc + parseFloat(item.totalPrice), 0);
    //             setTotalPrice(total)
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data:', error);
    //         });
    // };

    // useEffect(() => {
    //     fetchData();
    // }, []);



    // useImperativeHandle(ref, () => ({
    //     fetchData
    // }));

    return (
        <div className="shadow-lg rounded-lg p-4 h-40 w-36 bg-gradient-to-b from-[#94bbe9] to-[#fe0b3796]">
                    <div className='relative'>
                        <img
                            className="cart-icon w-10 mx-auto"
                            src={cart}
                            alt=""
                            style={{
                                filter: "invert(26%) sepia(63%) saturate(6027%) hue-rotate(336deg) brightness(92%) contrast(98%)"
                            }}
                        />

                        <p
                            className="absolute w-7 text-2xl -top-3 text-center left-[47px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-700"
                        >
                            {orders.length}
                        </p>

                    </div>
        </div>
    );
};

export default MiniCart;
