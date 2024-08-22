import { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import axios from "axios";
import MiniCart from "../../Cart/MiniCart";
import uploadIcon from '../../../assets/images/icon/cloud-computing.png'
import successIcon from '../../../assets/images/icon/checked.png'
import ReviewCart from "../../Cart/ReviewCart";
import { AuthContext } from "../../Providers/AuthProvider";
// import Image from "next/image";

const ProductDetails = () => {
    const miniCartRef = useRef();
    const {user}  = useContext(AuthContext)  
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [spinner, setSpinner] = useState(false)
    const [data, setData] = useState([])
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [url, steUrl] = useState('');
    const [stock, setStock] = useState(0)
    const [rating, setRating] = useState(5)
    const [imageUrl, setImageUrl] = useState(null);
    const [comment, setComment] = useState('')
    const [success, setSuccess] = useState(false)
    const [length, setLength] = useState(orders.length)
// console.log(color)

    useEffect(() => {
        const id = localStorage.getItem('prod-cart')
        axios.get(`http://localhost:5000/products/${id}`)
            .then(res => {
                setData(res.data)
                setLoading(false)
            })
            axios.get('http://localhost:5000/orders')
            .then(res => setOrders(res.data))
    }, [])

    if (loading) {
        return <div>loading . . .</div>
    }

    const {
        _id, ProductInformation, prod_description, prod_title, discount_info, prod_tags, prod_img, varients, shippingInfo, supplierInfo, reviews
    } = data;

    const totalStock = varients.reduce((acc, object) => {
        return acc + (+object.stock); // ensure object.stock is a number
    }, 0);


    const handleImageUpload = async (event) => {
        event.preventDefault()
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setSpinner(true)
        try {
            const response = await axios.post(
                'https://api.imgbb.com/1/upload',
                formData,
                {
                    params: {
                        key: 'e8c766fabbf6ef47637ba2c5a063d46e', // Replace with your Imgbb API key
                    },
                }
            );

            const url = response.data.data.url;
            setImageUrl(url);
            setSpinner(false);
        } catch (error) {
            console.error('Error uploading the image:', error);
            setSpinner(false);
        }
    };


    const handleQuantityChange = (event) => {
        setQuantity(parseInt(event.target.value));
    };

    const handleSizeChange = (event) => {
        setSize(event.target.value);
    };

    const handleColorChange = (event) => {
        setColor(event.target.value);
    };

    const handleRating = (value) => {
        setRating(value);
        // You can perform further actions with the selected rating here
        console.log('Selected Rating:', value);
    };
    // console.log(totalStock)
    const handlereview = (id) => {
        const review = { imageUrl, comment, rating }
        axios.patch(`http://localhost:5000/products/${id}`, {
            ...review,
            status: 'review'
        })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    setSuccess(true)
                }
            })
    }

    const handleAddToCart = () => {
        const totalPrice = document.getElementById('total-price').innerText;
        const info = { prod_code:_id ,client: user.displayName, email:user.email, color, size, quantity, price:ProductInformation.prod_price, totalPrice, imageUrl:prod_img[0], prod_name:ProductInformation.prod_name}
        axios.post('http://localhost:5000/orders', info)
        .then(res => {
            if(res.data) {
                alert('item added')
                miniCartRef.current.fetchData();
            } else {
                alert('something wrong')
            }
        })
        .catch(err => {
            alert(err.message)
        })
    }
    const totalPrice = () => {

    }


    return (
        <>
            <Navbar></Navbar>
            <div className="container p-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-row-reverse gap-2">
                        <div className="flex-1">
                            <img
                                src={url ? url : prod_img[0]}
                                alt="Product Image"
                                width={500}
                                height={500}
                            />
                        </div>
                        <div className="space-y-2">
                            {
                                prod_img && prod_img.map((img, idx) => <div type='select' className="border border-gray-400 p-2 rounded-sm">
                                    <img
                                        key={idx + 1}
                                        src={img}
                                        alt="Product Image"
                                        width={80}
                                        height={80}
                                        onClick={() => steUrl(img)}
                                    />
                                </div>)
                            }
                        </div>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{prod_title}</h1>
                        <div className="flex items-center mb-4">
                            <div className="rating rating-lg rating-half">
                                <input type="radio" name="rating-1" className="rating-hidden" />
                                <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" />
                            </div>
                            <span className="ml-2">5 Rating</span>
                            <div className="ml-auto">
                                <span className="badge badge-success text-white">In Stock : {totalStock} </span>
                            </div>
                        </div>
                        <p className="mb-4">
                            {prod_description}
                        </p>
                        <div className="flex justify-between">
                            <div>
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
                                    <div className="flex items-center gap-5">
                                        {
                                            varients &&
                                            [...new Set(varients.map(varient => varient.size))].map((sizeValue, idx) => (
                                                <div
                                                    key={idx}
                                                    className={` p-2 rounded w-10 h-10 flex justify-center items-center border ${size === sizeValue ? "border-2 border-slate-600" : ""}`}
                                                    onClick={() => setSize(sizeValue)}
                                                >
                                                    {sizeValue}
                                                </div>
                                            ))
                                        }

                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="label">
                                        <span className="label-text">Color</span>
                                    </label>
                                    <div className="flex items-center gap-5">
                                        {
                                            varients &&
                                            [...new Set(varients.map(varient => varient.color))].map((colorValue, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`p-1 rounded border ${color === colorValue ? "border-2 border-slate-600" : ""}`}
                                                    onClick={() => setColor(colorValue)}
                                                >
                                                    <div style={{ backgroundColor: `${colorValue}` }} className="rounded w-8 h-8"></div>
                                                </div>
                                            ))


                                        }
                                    </div>
                                </div>
                            </div>
                            <div>
                                <MiniCart ref={miniCartRef}></MiniCart>
                            </div>
                        </div>
                        <button onClick={handleAddToCart} className="btn btn-outline w-full">Add to Cart</button>
                        <label htmlFor="my_modal_7" className="btn btn-outline w-full mt-2">Add a review</label>
                        {/* modal */}
                        <input type="checkbox" id="my_modal_7" className="modal-toggle" />
                        <div className="modal" role="dialog">
                            <div className="modal-box">
                                <div className="w-full py-8 px-4 text-center border-dashed border border-gray-400 hover:border-white focus:border-green-500 rounded-lg">
                                    <div className="relative group h-14 w-14 mx-auto mb-4">
                                        <div className="flex items-center justify-center h-14 w-14 bg-blue-500 group-hover:bg-blue-600 rounded-full">
                                            {
                                                spinner ? <span className="loading loading-spinner text-white"></span> : <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M6.71 5.71002L9 3.41002V13C9 13.2652 9.10536 13.5196 9.29289 13.7071C9.48043 13.8947 9.73478 14 10 14C10.2652 14 10.5196 13.8947 10.7071 13.7071C10.8946 13.5196 11 13.2652 11 13V3.41002L13.29 5.71002C13.383 5.80375 13.4936 5.87814 13.6154 5.92891C13.7373 5.97968 13.868 6.00582 14 6.00582C14.132 6.00582 14.2627 5.97968 14.3846 5.92891C14.5064 5.87814 14.617 5.80375 14.71 5.71002C14.8037 5.61706 14.8781 5.50645 14.9289 5.3846C14.9797 5.26274 15.0058 5.13203 15.0058 5.00002C15.0058 4.86801 14.9797 4.7373 14.9289 4.61544C14.8781 4.49358 14.8037 4.38298 14.71 4.29002L10.71 0.290018C10.6149 0.198978 10.5028 0.127613 10.38 0.0800184C10.1365 -0.0199996 9.86346 -0.0199996 9.62 0.0800184C9.49725 0.127613 9.3851 0.198978 9.29 0.290018L5.29 4.29002C5.19676 4.38326 5.1228 4.49395 5.07234 4.61577C5.02188 4.73759 4.99591 4.86816 4.99591 5.00002C4.99591 5.13188 5.02188 5.26245 5.07234 5.38427C5.1228 5.50609 5.19676 5.61678 5.29 5.71002C5.38324 5.80326 5.49393 5.87722 5.61575 5.92768C5.73757 5.97814 5.86814 6.00411 6 6.00411C6.13186 6.00411 6.26243 5.97814 6.38425 5.92768C6.50607 5.87722 6.61676 5.80326 6.71 5.71002ZM19 10C18.7348 10 18.4804 10.1054 18.2929 10.2929C18.1054 10.4804 18 10.7348 18 11V17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8947 17.2652 18 17 18H3C2.73478 18 2.48043 17.8947 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17V11C2 10.7348 1.89464 10.4804 1.70711 10.2929C1.51957 10.1054 1.26522 10 1 10C0.734784 10 0.48043 10.1054 0.292893 10.2929C0.105357 10.4804 0 10.7348 0 11V17C0 17.7957 0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H17C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7957 20 17V11C20 10.7348 19.8946 10.4804 19.7071 10.2929C19.5196 10.1054 19.2652 10 19 10Z" fill="#E8EDFF"></path>
                                                </svg>
                                            }
                                        </div>
                                        <input
                                            className="absolute top-0 left-0 h-14 w-14 opacity-0"
                                            id="formInput1-4"
                                            type="file"
                                            name="filephoto"
                                            onChange={handleImageUpload}
                                        />
                                    </div>
                                    <p className="font-semibold leading-normal mb-1">
                                        {
                                            imageUrl ?
                                                <span className="text-blue-500">One file uploaded</span>
                                                : <>
                                                    <span className="text-blue-500">Click to upload a file</span>
                                                    <span className="text-gray-300"> or drag and drop</span>
                                                </>
                                        }
                                    </p>
                                    <span className="text-xs text-gray-300 font-semibold">PNG, JPG, GIF or up to 10MB</span>
                                </div>
                                <div className="form-control mt-2">
                                    <textarea
                                        className="textarea textarea-bordered border-dashed h-24"
                                        placeholder="Comment regarding this product"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="flex justify-between mt-5">
                                    <div>
                                        {
                                            success ? <img className="w-5 hover:cursor-pointer" src={successIcon} /> : <img className="w-6 hover:cursor-pointer" src={uploadIcon} onClick={() => handlereview(_id)} />
                                        }
                                    </div>
                                    <div className="rating">
                                        {[1, 2, 3, 4, 5].map((value, idx) => (
                                            <input
                                                key={idx}
                                                type="radio"
                                                name="rating"
                                                className={`mask mask-star-2 bg-yellow-500`}
                                                checked={rating === value}
                                                onChange={() => handleRating(value)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm">
                                Price: <span className="font-bold">${ProductInformation?.prod_price}</span>
                            </p>
                            <p className="text-sm">
                                VAT Added: <span className="font-bold">+8%</span>
                            </p>
                            <p className="text-sm">
                                Total Price: $<span id="total-price" className="font-bold">{(ProductInformation.prod_price*quantity) + (ProductInformation?.prod_price*quantity*(8/100))}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    {
                        reviews && reviews.map((review, idx) => <ReviewCart
                        key={idx}
                        review={review}
                        ></ReviewCart>)
                    }
                </div>
            </div >

        </>
    );
};

export default ProductDetails;