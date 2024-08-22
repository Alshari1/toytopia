import moment from 'moment';
import React, { useState } from 'react'
import Navbar from '../../Navbar/Navbar';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import Swal from 'sweetalert2';

const Manage = ({ value, updatedData, loading }) => {
    if (loading) {
        return <div>Loading ...</div>
    }

    const { ProductInformation, prod_description, prod_title, discount_info, prod_tags, prod_img, varients, shippingInfo, supplierInfo, _id } = updatedData;
    // console.log(supplierInfo.supplier_name)


    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [updatedImg, setUpdatedImg] = useState(prod_img);
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [newVarientColor, setNewVarientColor] = useState('')
    const [newVarientSize, setNewVarientSize] = useState('')
    const [newVarientStock, setNewVarientStock] = useState(0)
    const [newVarientPrice, setNewVarientPrice] = useState(0)
    const [updatedVarients, setupdatedVarients] = useState(varients)
    console.log(updatedVarients)



    const handleUrlAdd = () => {

        if (inputValue.trim()) {
            const imgArr = [...imageUrls, inputValue.trim()]
            const updatedimgArr = [...updatedImg, inputValue.trim()]
            setImageUrls(imgArr);
            setUpdatedImg(updatedimgArr)
            setInputValue('');
        }
    };

    const handleUrlDelete = (index) => {
        const newUrls = imageUrls.filter((_, i) => i !== index);
        const newUpdatedUrls = updatedImg.filter((_, i) => i !== index)
        setImageUrls(newUrls);
        setUpdatedImg(newUpdatedUrls);

    };
    const handleDltVarient = (event, idx) => {

        event.stopPropagation()
        event.preventDefault()
        console.log('deleted')
        const newVarient = updatedVarients.filter((_, i) => i !== idx)
        setupdatedVarients(newVarient);
    }

    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
        },
    }));

    const processTags = (tagsString) => {
        const tagsArray = tagsString.split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);

        const tagsObjects = tagsArray.map(tag => (tag));
    

        return tagsObjects;
    };

    const handleSubmit = (event, id) => {
        event.preventDefault()
        event.stopPropagation()
        // console.log('clicked', value)
        const form = event.target;

        // product information
        const prod_name = form.prod_name.value;
        const prod_sku = form.prod_sku.value;
        const prod_category = form.prod_category.value;
        const prod_price = form.prod_price.value;
        const prod_stock = form.prod_stock.value;
        const prod_brand = form.prod_brand.value;

        const ProductInformation = { prod_name, prod_sku, prod_category, prod_price, prod_stock, prod_brand }
        // description
        const prod_title = form.prod_title.value;
        const prod_description = form.prod_description.value;

        // discount

        const prod_discount = form.pord_discount.value;

        const discount_validUntil = form.discount_validUntil.value;
        const now = moment(); // Current time
        const futureDate = moment(discount_validUntil); // Future date from form input
        const secondsFromNow = futureDate.diff(now, 'seconds'); // Difference in seconds
        const discount_info = { prod_discount, discount_validUntil: secondsFromNow }

        // tags
        const tagsString = form.prod_tags.value;
        const prod_tags = processTags(tagsString);

        // images

        const variant_size = form.variant_size.value;
        const variant_color = form.variant_color.value;
        const variant_price = form.variant_price.value;
        const variant_stock = form.variant_stock.value;

        const varients = [{ size: variant_size, color: variant_color, price: variant_price, stock: variant_stock }]

        // shipping info




        const prod_weight = form.prod_weight.value;
        const prod_dimension = form.prod_dimension.value;
        const prod_ship_cost = form.prod_ship_cost.value;
        const prod_handle_time = form.prod_handle_time.value;

        const shippingInfo = { prod_weight, prod_dimension, prod_ship_cost, prod_handle_time }

        // supplier details
        const supplier_name = form.supplier_name.value;
        const supplier_contact = form.supplier_contact.value;
        const barcode = form.barcode.value;
        const release_date = form.release_date.value;

        const supplierInfo = { supplier_name, supplier_contact, barcode, release_date }


        const submitinDdata = { ProductInformation, prod_description, prod_title, discount_info, prod_tags, prod_img: imageUrls, varients, shippingInfo, supplierInfo }
        const updatingData = { ProductInformation, prod_description, prod_title, discount_info, prod_tags, prod_img: updatedImg, shippingInfo, supplierInfo, varients: updatedVarients }

        // console.log(data)

        if (value === 'update') {
            console.log(`updated data`)
            axios.patch(`http://localhost:5000/products/${id}`, updatingData)
                .then(res => {

                    if (res.data.modifiedCount > 0) {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "bottom-start",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                            }
                        });
                        Toast.fire({
                            icon: "success",
                            title: "Data updated successfully"
                        });
                    } else if (!res.data.modifiedCount || res.data.matchedCount > 0) {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "bottom-start",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                            }
                        });
                        Toast.fire({
                            icon: "warning",
                            title: "Nothing changed"
                        });
                    }
                    else {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                            }
                        });
                        Toast.fire({
                            icon: "error",
                            title: "Something wrong"
                        });
                    }
                })
                .catch(err => {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "warning",
                        title: `${err.message}`
                    });
                })

        } else {
            console.log('submited data', submitinDdata)
            // axios.post('http://localhost:5000/products', data)
            //     .then(res => {
            //         if (res.data.insertedId) {
            //             alert('inserted successfully')
            //         } else {
            //             alert('something wrong')
            //         }
            //     })
            //     .catch(err => console.log(err))
        }
    }

    const handleUpdateVarients = (event) => {
        event.preventDefault()
        console.log('varients ')
    }
    const handleAddVarient = (event) => {
        try {
            event.preventDefault()
            event.stopPropagation()
            const newVarient = { size: newVarientSize, color: newVarientColor, price: newVarientPrice, stock: newVarientStock }
            setupdatedVarients(prevVarients => [...prevVarients, newVarient]);
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "Added"
            });
        } catch (error) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "error",
                title: `${error.message}`
            });
        }
        // console.log('from add varient', newVarient)
    }

    return (
        <>
            <Helmet>
                {value === 'update' ? <title>Toytopia | update</title> : <title>Toytopia | manage</title>}
            </Helmet>
            <Navbar></Navbar>
            <div className="container mx-auto px-4 py-8">
                {value == 'update' ? <h2 className="text-3xl font-bold mb-6">Update a Product</h2> : <h2 className="text-3xl font-bold mb-6">Add New Product</h2>}
                <form className="space-y-8" onSubmit={(event) => handleSubmit(event, _id)}>

                    {/* <!-- Product Information --> */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold mb-4">Product Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* <!-- Product Name --> */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Name</span>
                                </label>
                                <input
                                    name='prod_name'
                                    type="text"
                                    placeholder="Enter product name"
                                    className="input input-bordered w-full"
                                    defaultValue={ProductInformation?.prod_name}
                                />
                            </div>

                            {/* <!-- SKU --> */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">SKU</span>
                                </label>
                                <input
                                    name='prod_sku'
                                    type="text"
                                    placeholder="Enter SKU"
                                    className="input input-bordered w-full"
                                    defaultValue={ProductInformation?.prod_sku}
                                />
                            </div>

                            {/* <!-- Category --> */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Category</span>
                                </label>
                                <input
                                    name='prod_category'
                                    type="text"
                                    placeholder="Enter category"
                                    className="input input-bordered w-full"
                                    defaultValue={ProductInformation?.prod_category}
                                />
                            </div>

                            {/* <!-- Price --> */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>
                                <input
                                    name='prod_price'
                                    type="number"
                                    placeholder="Enter price"
                                    className="input input-bordered w-full"
                                    defaultValue={ProductInformation?.prod_price}
                                />
                            </div>

                            {/* <!-- Stock Quantity --> */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Stock Quantity</span>
                                </label>
                                <input
                                    name='prod_stock'
                                    type="number"
                                    placeholder="Enter stock quantity"
                                    className="input input-bordered w-full"
                                    defaultValue={ProductInformation?.prod_stock}
                                />
                            </div>

                            {/* <!-- Brand --> */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Brand</span>
                                </label>
                                <input
                                    name='prod_brand'
                                    type="text"
                                    placeholder="Enter brand"
                                    className="input input-bordered w-full"
                                    defaultValue={ProductInformation?.prod_brand}
                                />
                            </div>
                        </div>
                    </div>

                    {/* <!-- Product Description --> */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold mb-4">Product Title</h3>
                        <div className="form-control">
                            <textarea
                                name='prod_title'
                                className="textarea textarea-bordered h-12 mb-10"
                                placeholder="Enter product title"
                                defaultValue={prod_title && prod_title}
                            ></textarea>
                        </div>
                        <h3 className="text-2xl font-semibold mb-4">Product Description</h3>
                        <div className="form-control">
                            <textarea
                                name='prod_description'
                                className="textarea textarea-bordered h-24"
                                placeholder="Enter product description"
                                defaultValue={prod_description && prod_description}
                            ></textarea>
                        </div>
                    </div>

                    {/* Discounts */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold mb-4">Product Discounts</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Discount (%)</span>
                                </label>
                                <input
                                    name="pord_discount"
                                    type="text"
                                    placeholder="Enter discount"
                                    className="input input-bordered w-full"
                                    defaultValue={discount_info?.prod_discount}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Valid Until</span>
                                </label>
                                <input
                                    name="discount_validUntil"
                                    type="date"
                                    className="input input-bordered w-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* tags */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold mb-4">Product Tags</h3>
                        <div className="form-control">
                            <input
                                name="prod_tags"
                                type="text"
                                placeholder="Enter tags separated by commas"
                                className="input input-bordered w-full"

                            />
                        </div>
                    </div>

                    {/* <!-- Images --> */}
                    <div className='flex gap-5 bg-white p-6 rounded-lg shadow-md'>
                        {/* URL Input */}
                        <div className="form-control mb-4 w-2/3">
                            <h3 className="text-2xl font-semibold mb-4">Enter Img Url</h3>
                            <div className="flex space-x-2">
                                <button
                                    type="button"
                                    onClick={handleUrlAdd}
                                    className='btn btn-outline px-10 bg-slate-800 text-white'
                                >
                                    Add
                                </button>
                                <input
                                    type="text"
                                    className="input input-bordered  w-full"
                                    placeholder="Enter image URL"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Displaying Added URLs */}
                        <div className="w-1/3 flex items-end">
                            {
                                value !== 'update' ? (
                                    imageUrls && imageUrls.map((url, index) => (
                                        <HtmlTooltip
                                            key={index}
                                            title={
                                                <React.Fragment>
                                                    <Typography color="inherit">{url}</Typography>
                                                </React.Fragment>
                                            }
                                        >
                                            <Button
                                                type="button"
                                                className="btn btn-sm bg-slate-900 text-white hover:text-black mr-3"
                                                onClick={() => handleUrlDelete(index)}
                                            >
                                                Delete
                                            </Button>
                                        </HtmlTooltip>
                                    ))
                                ) : (
                                    updatedImg && updatedImg.map((url, index) => (
                                        <HtmlTooltip
                                            key={index}
                                            title={
                                                <React.Fragment>
                                                    <Typography color="inherit">{url}</Typography>
                                                </React.Fragment>
                                            }
                                        >
                                            <Button
                                                type="button"
                                                className="btn btn-sm bg-slate-900 text-white hover:text-black mr-3"
                                                onClick={() => handleUrlDelete(index)}
                                            >
                                                Delete
                                            </Button>
                                        </HtmlTooltip>
                                    ))
                                )
                            }




                        </div>
                    </div>

                    {/* <!-- Product Variants --> */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold mb-4">Product Variants</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Size</span>
                                </label>
                                <select
                                    content='div'
                                    name='variant_size'
                                    className="select select-bordered w-full"
                                    value={newVarientSize}
                                    onChange={(e) => setNewVarientSize(e.target.value)}
                                >
                                    <option value="">Select Size</option>
                                    <option value="sm">sm</option>
                                    <option value="md">md</option>
                                    <option value="xl">xl</option>
                                    <option value="xxl">xxl</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Color (#)</span>
                                </label>
                                <input
                                    id='variant_color'
                                    name='variant_color'
                                    type="text"
                                    placeholder="color/color-code"
                                    className="input input-bordered w-full"
                                    value={newVarientColor}
                                    onChange={(e) => setNewVarientColor(e.target.value)}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Variant Price</span>
                                </label>
                                <input
                                    name='variant_price'
                                    type="number"
                                    placeholder="Enter price for variant"
                                    className="input input-bordered w-full"
                                    value={newVarientPrice}
                                    onChange={(e) => setNewVarientPrice(e.target.value)}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Variant Stock Quantity</span>
                                </label>
                                <input
                                    name='variant_stock'
                                    type="number"
                                    placeholder="Enter stock quantity for variant"
                                    className="input input-bordered w-full"
                                    value={newVarientStock}
                                    onChange={(e) => setNewVarientStock(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <label htmlFor="my_modal_7" className="">See All -- </label>
                            <button onClick={handleAddVarient}>Add</button>
                        </div>
                        {/* modal */}
                        <input type="checkbox" id="my_modal_7" className="modal-toggle" />
                        <div className="modal" role="dialog">
                            <div className="modal-box w-11/12 max-w-5xl">
                                <div className="">
                                    {/* <div className="">
                                        <label className="label">
                                            <span className="label-text">Size</span>
                                        </label>
                                        <div className="items-center gap-5">
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
                                    </div> */}
                                    <table className="table border border-red-500 w-full">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Color</th>
                                                <th>Size</th>
                                                <th>Stock</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {updatedVarients &&
                                                updatedVarients.map((varient, idx) => (
                                                    <tr className="bg-base-200" key={idx}>
                                                        <th>{idx + 1}</th>
                                                        <td>
                                                            <input
                                                                id='variant_color'
                                                                name='variant_color'
                                                                className='w-16'
                                                                type="color"
                                                                defaultValue={varient?.color}
                                                            />
                                                        </td>
                                                        <td>
                                                            <select
                                                                id='varient_size'
                                                                defaultValue={varient?.size}
                                                                name='variant_size'
                                                                className="select select-bordered w-full"
                                                            >
                                                                <option value='sm'>sm</option>
                                                                <option value='md'>md</option>
                                                                <option value='xl'>xl</option>
                                                                <option value='xxl'>xxl</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <input
                                                                id='varient_stock'
                                                                name='varient_stock'
                                                                type="text"
                                                                className="input w-20"
                                                                defaultValue={varient?.stock}
                                                            />
                                                        </td>
                                                        <td><input
                                                            id='varient_prize'
                                                            name='varient_prize'
                                                            type="text"
                                                            className="input w-28"
                                                            defaultValue={varient?.price}
                                                        /></td>
                                                        <td>
                                                            <button
                                                                onClick={(event) => handleDltVarient(event, idx)}
                                                                className="text-gray-500 hover:text-red-500 mr-4 "
                                                            >
                                                                ✕
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>

                                    {/* <button className={`btn ${follower.isFollowing ? 'bg-yellow-400 text-gray-900' : 'btn-outline'}`}>
                                        {follower.isFollowing ? 'Following' : '+ Follow'}
                                    </button> */}
                                </div>
                            </div>
                            <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
                        </div>
                    </div>

                    {/* <!-- Shipping Information --> */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold mb-4">Shipping Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Weight</span>
                                </label>
                                <input
                                    name='prod_weight'
                                    type="text"
                                    placeholder="Enter weight (e.g., 0.5kg)"
                                    className="input input-bordered w-full"
                                    defaultValue={shippingInfo?.prod_weight}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Dimensions (cm)</span>
                                </label>
                                <input
                                    name='prod_dimension'
                                    type="text"
                                    placeholder="Enter dimensions (e.g., 15x7x1 cm)"
                                    className="input input-bordered w-full"
                                    defaultValue={shippingInfo?.prod_dimension}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Shipping Cost</span>
                                </label>
                                <input
                                    name='prod_ship_cost'
                                    type="text"
                                    placeholder="Enter shipping cost"
                                    className="input input-bordered w-full"
                                    defaultValue={shippingInfo?.prod_ship_cost}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Handling Time</span>
                                </label>
                                <input
                                    name='prod_handle_time'
                                    type="text"
                                    placeholder="Enter handling time (e.g., 2-3 business days)"
                                    className="input input-bordered w-full"
                                    defaultValue={shippingInfo?.prod_handle_time}
                                />
                            </div>
                        </div>
                    </div>

                    {/* <!-- Additional Information --> */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold mb-4">Additional Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* <!-- Supplier Info --> */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Supplier Name</span>
                                </label>
                                <input
                                    name='supplier_name'
                                    type="text"
                                    placeholder="Enter supplier name"
                                    className="input input-bordered w-full"
                                    defaultValue={supplierInfo?.supplier_name}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Supplier Contact</span>
                                </label>
                                <input
                                    name='supplier_contact'
                                    type="text"
                                    placeholder="Enter supplier contact"
                                    className="input input-bordered w-full"
                                    defaultValue={supplierInfo?.supplier_contact}
                                />
                            </div>

                            {/* <!-- Barcode/UPC --> */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Barcode/UPC</span>
                                </label>
                                <input
                                    name='barcode'
                                    type="text"
                                    placeholder="Enter barcode/UPC"
                                    className="input input-bordered w-full"
                                    defaultValue={supplierInfo?.barcode}
                                />
                            </div>

                            {/* <!-- Release Date --> */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Release Date</span>
                                </label>
                                <input
                                    name='release_date'
                                    type="date"
                                    className="input input-bordered w-full"
                                    defaultValue={supplierInfo?.release_date}
                                />
                            </div>
                        </div>
                    </div>
                    {/* <!-- Submit Button --> */}
                    <div className="flex justify-center">
                        {/* <button type="submit" className="btn btn-primary">Add Product</button> */}
                        {value == 'update' ? <input type="submit" value='Update' className='btn btn-outline border w-1/2' /> : <input type="submit" value='A d d' className='btn btn-outline border w-1/2' />}
                    </div>
                </form>
            </div>
        </>

    )
}

export default Manage;
