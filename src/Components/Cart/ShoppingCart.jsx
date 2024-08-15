import { Rating } from '@mui/material';
import moment from 'moment';
import useDiscountTimer from '../Hooks/UseDiscountTimer';

const ShoppingCart = ({ data }) => {
    
    const {
        _id,
        ProductInformation,
        prod_description,
        prod_title,
        discount_info,
        prod_tags,
        prod_img,
        varients,
        shippingInfo,
        supplierInfo,
        rating,
    } = data;

    const { isDiscountValid, timeLeft } = useDiscountTimer(discount_info.discount_validUntil);

    const handleDetails = (event) => {
        event.stopPropagation(); // Stop event bubbling
        console.log('clicked from div');
        localStorage.setItem('prod-cart', _id)
    }

    const handleAdd = (event) => {
        event.stopPropagation(); // Stop event bubbling
        console.log('clicked from button');
    }

    return (
        <div
            style={{ width: '18rem' }}
            className="relative flex flex-col space-y-4 border border-gray-300 hover:shadow-lg transition-shadow mx-auto"
            onClick={handleDetails} // No need for an anonymous function here
        >
            <figure className="flex justify-center">
                <img className="h-48 w-full object-cover" src={prod_img} alt={prod_title} />
            </figure>
            <div className="space-y-2 p-4">
                <h2 className="text-lg font-semibold">{prod_title}</h2>
                <div className=''>
                    {isDiscountValid && discount_info?.prod_discount && (
                        <div className='flex flex-row-reverse justify-between'>
                            <div className="flex flex-col items-end">
                                <span className='text-red-500 font-bold '>{discount_info.prod_discount}% off</span>
                                <span className='text-sm text-red-500'>{timeLeft}</span>
                            </div>
                            <div className="relative text-lg text-gray-400">
                                <span className='text-green-600 font-semibold'>$</span>
                                <del className='absolute -right-10 -top-4'>${ProductInformation?.prod_price}</del>
                                <span className='text-xl text-green-600 font-semibold'>
                                    {ProductInformation?.prod_price ?
                                        (ProductInformation.prod_price - ((discount_info?.prod_discount || 0) / 100) * ProductInformation.prod_price).toFixed(0)
                                        : ProductInformation.prod_price
                                    }
                                </span>
                            </div>
                        </div>
                    )}
                    {!isDiscountValid && (
                        <div className="text-lg font-semibold text-green-600">
                            ${ProductInformation?.prod_price}
                        </div>
                    )}
                </div>
                <div className="flex items-center">
                    <span className="text-yellow-400 font-semibold">{rating}</span>
                    <span className="text-gray-600 ml-1">
                        <Rating name="half-rating-read" defaultValue={4.75} precision={0.25} readOnly />/ 5 stars
                    </span>
                </div>
                <button 
                    onClick={handleAdd} 
                    className="w-full btn mt-4 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded transition-colors"
                >
                    Add to Cart
                </button>
            </div>
            {/* {shippingInfo && (
                <div className="text-sm text-gray-500 mt-4">
                    <p>Ships from: {shippingInfo.origin}</p>
                    <p>Delivery: {shippingInfo.estimatedDelivery}</p>
                </div>
            )}
            {supplierInfo && (
                <div className="text-sm text-gray-500 mt-4">
                    <p>Supplier: {supplierInfo.name}</p>
                    <p>Rating: {supplierInfo.rating} / 5</p>
                </div>
            )} */}
        </div>
    );
}

export default ShoppingCart;
