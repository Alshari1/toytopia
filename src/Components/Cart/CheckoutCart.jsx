import { forwardRef, useState } from "react";

const CheckoutCart = forwardRef((props, ref) => {
    
    const { prod_code, client, email, color, size, quantity, price, totalPrice, imageUrl, prod_name } = props.order;
    const [qty, setQty] = useState(quantity);

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1) {
            setQty(newQuantity);
            props.onQuantityChange(prod_code, newQuantity); // Call the callback function with product code and new quantity
        }
    };

    return (
        <div className="flex items-center justify-between p-2 border border-gray-300 rounded-lg mb-4">
            <div className="flex flex-1 items-center">
                <img
                    src={imageUrl}
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                    alt={prod_name}
                />
                <div>
                    <h3 className="text-lg font-semibold">{prod_name}</h3>
                    {color && (
                        <p className="text-sm text-gray-600">Color: {color}</p>
                    )}
                    {size && (
                        <p className="text-sm text-gray-600">Size: {size}</p>
                    )}
                </div>
            </div>

            <div className="flex gap-28">
                <div className="flex items-center w-56">
                    <div className="flex items-center">
                        <button
                            className="btn btn-sm"
                            onClick={() => handleQuantityChange(qty - 1)}
                            disabled={qty <= 1}
                        >
                            -
                        </button>
                        <input
                            type="text"
                            value={qty}
                            className="input input-sm mx-2 w-16 text-center"
                            readOnly
                        />
                        <button
                            className="btn btn-sm"
                            onClick={() => handleQuantityChange(qty + 1)}
                        >
                            +
                        </button>
                    </div>
                    <p className="text-lg font-semibold text-gray-700 ml-4">
                        ${(price * qty).toFixed(2)}
                    </p>
                </div>

                <button
                    onClick={() => { /* Handle remove item */ }}
                    className="text-gray-500 hover:text-red-500 mr-4"
                >
                    ✕
                </button>
            </div>
        </div>
    );
});

export default CheckoutCart;
