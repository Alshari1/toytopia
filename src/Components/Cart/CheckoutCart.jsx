import { useState } from "react";

const CheckoutCart = ({ product }) => {
    const [quantity, setQuantity] = useState(1);

    const handleRemove = (productId) => {
        setProducts(products.filter(product => product.id !== productId));
    };

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    return (
        <div className="flex items-center justify-between p-2 border border-gray-300 rounded-lg mb-4">
            {/* Product Image */}
            <div className="flex flex-1 items-center">
                <img
                    src='https://images.unsplash.com/photo-1723743640863-4984aa9d78b7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8'
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                />
                <div className="">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    {product.color && (
                        <p className="text-sm text-gray-600">Color: {product.color}</p>
                    )}
                    {product.memoryStorage && (
                        <p className="text-sm text-gray-600">Memory Storage: {product.memoryStorage}</p>
                    )}
                    {product.size && (
                        <p className="text-sm text-gray-600">Size: {product.size}</p>
                    )}
                </div>
            </div>

            {/* Quantity and Price */}
            <div className="flex gap-28">
                <div className="flex items-center w-56">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                            className="px-3 py-1 text-gray-700 hover:text-blue-500"
                            onClick={() => handleQuantityChange(quantity - 1)}
                            disabled={quantity <= 1}
                        >
                            -
                        </button>
                        <input
                            type="text"
                            value={quantity}
                            className="w-8 text-center text-gray-700 focus:outline-none"
                            readOnly
                        />
                        <button
                            className="px-3 py-1 text-gray-700 hover:text-blue-500"
                            onClick={() => handleQuantityChange(quantity + 1)}
                        >
                            +
                        </button>
                    </div>
                    <p className="text-lg font-semibold text-gray-700 ml-4">
                        ${(product.price * quantity).toFixed(2)}
                    </p>
                </div>

                {/* Remove Button */}
                <button
                    onClick={() => { }}
                    className="text-gray-500 hover:text-red-500 mr-4 "
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default CheckoutCart;
