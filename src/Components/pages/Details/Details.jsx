import { useState } from "react";
import Navbar from "../../Navbar/Navbar";
// import Image from "next/image";

const ProductDetails = () => {
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");

    const handleQuantityChange = (event) => {
        setQuantity(parseInt(event.target.value));
    };

    const handleSizeChange = (event) => {
        setSize(event.target.value);
    };

    const handleColorChange = (event) => {
        setColor(event.target.value);
    };

    return (
        <>
        <Navbar></Navbar>
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-center">
                        <img
                            src="/images/product_image.jpg"
                            alt="Product Image"
                            width={500}
                            height={500}
                        />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Men's Regular T-shirt</h1>
                        <div className="flex items-center mb-4">
                            <div className="rating rating-lg rating-half">
                                <input type="radio" name="rating-1" className="rating-hidden" />
                                <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" />
                            </div>
                            <span className="ml-2">5 Rating</span>
                            <div className="ml-auto">
                                <span className="badge badge-success">In Stock</span>
                            </div>
                        </div>
                        <p className="mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non
                            erat quam. Vestibulum aliquam nibh dui, et aliquet nibh euismod
                            quis.
                        </p>
                        <div className="mb-4">
                            <label className="label">
                                <span className="label-text">Quantity</span>
                            </label>
                            <div className="flex items-center">
                                <button
                                    className="btn btn-sm"
                                    onClick={() => setQuantity(quantity - 1)}
                                    disabled={quantity === 1}
                                >
                                    -
                                </button>
                                <input
                                    type="text"
                                    className="input input-sm mx-2 w-16 text-center"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    min="1"
                                />
                                <button
                                    className="btn btn-sm"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="label">
                                <span className="label-text">Size</span>
                            </label>
                            <div className="flex items-center">
                                <button
                                    className={`btn btn-outline btn-sm ${size === "Small" ? "btn-active" : ""}`}
                                    onClick={() => setSize("Small")}
                                >
                                    Small
                                </button>
                                <button
                                    className={`btn btn-outline btn-sm ${size === "Medium" ? "btn-active" : ""}`}
                                    onClick={() => setSize("Medium")}
                                >
                                    Medium
                                </button>
                                <button
                                    className={`btn btn-outline btn-sm ${size === "Large" ? "btn-active" : ""}`}
                                    onClick={() => setSize("Large")}
                                >
                                    Large
                                </button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="label">
                                <span className="label-text">Color</span>
                            </label>
                            <div className="flex items-center">
                                <div
                                    className={`btn btn-circle btn-sm  ${color === "Grey" ? "btn-active" : ""}`}
                                    onClick={() => setColor("Grey")}
                                >
                                    <div className="bg-gray-500 w-4 h-4 rounded-full"></div>
                                </div>
                                <div
                                    className={`btn btn-circle btn-sm ${color === "Red" ? "btn-active" : ""}`}
                                    onClick={() => setColor("Red")}
                                >
                                    <div className="bg-red-500 w-4 h-4 rounded-full"></div>
                                </div>
                                <div
                                    className={`btn btn-circle btn-sm ${color === "Blue" ? "btn-active" : ""}`}
                                    onClick={() => setColor("Blue")}
                                >
                                    <div className="bg-blue-500 w-4 h-4 rounded-full"></div>
                                </div>
                                <div
                                    className={`btn btn-circle btn-sm ${color === "Green" ? "btn-active" : ""}`}
                                    onClick={() => setColor("Green")}
                                >
                                    <div className="bg-green-500 w-4 h-4 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-outline w-full">Add to Cart</button>
                        <div className="mt-4">
                            <p className="text-sm">
                                Price: <span className="font-bold">$29.00</span>
                            </p>
                            <p className="text-sm">
                                VAT Added: <span className="font-bold">+12%</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <div className="flex justify-center">
                        <img
                            src="/images/product_image2.jpg"
                            alt="Product Image"
                            width={150}
                            height={150}
                        />
                    </div>
                    <div className="flex justify-center">
                        <img
                            src="/images/product_image3.jpg"
                            alt="Product Image"
                            width={150}
                            height={150}
                        />
                    </div>
                    <div className="flex justify-center">
                        <img
                            src="/images/product_image4.jpg"
                            alt="Product Image"
                            width={150}
                            height={150}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;