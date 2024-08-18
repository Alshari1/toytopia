import React, { useState, useEffect } from 'react';
import cart from './../../assets/images/icon/cart (1).png'

function MiniCart({ cartItems }) {
    // const [] = cartItems;
    const [totalPrice, setTotalPrice] = useState(0);

    // useEffect(() => {
    //     // Calculate total price based on cart items
    //     const calculatedTotalPrice = cartItems.reduce((acc, item) => {
    //         return acc + item.quantity * item.price;
    //     }, 0);
    //     setTotalPrice(calculatedTotalPrice);
    // }, [cartItems]);

    return (
        <div className="shadow-lg rounded-lg p-4 h-40 w-36 bg-gradient-to-b from-[#94bbe9] to-[#fe0b3796]">
            {cartItems.length === 0 ? (
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
                        0
                    </p>

                </div>
            ) : (
                <>
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index} className="flex justify-between mb-2">
                                <div>
                                    <h3 className="font-bold">{item.name}</h3>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                                <div>
                                    <p>${(item.quantity * item.price).toFixed(2)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4">
                        <h3 className="text-lg font-bold">
                            Total: ${totalPrice.toFixed(2)}
                        </h3>
                    </div>
                </>
            )}
        </div>
    );
}

export default MiniCart;
