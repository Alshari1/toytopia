import { useContext, useEffect, useRef, useState } from "react";
import CheckoutCart from "../../Cart/CheckoutCart";
import MiniCart from "../../Cart/MiniCart";
import Navbar from "../../Navbar/Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const Checkout = () => {
    const { user } = useContext(AuthContext)

    if (!user) {
        return <div>Loading...</div>
    }



    const invoiceRef = useRef();
    const [orders, setOrders] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:5000/orders/${user?.email}`, {
            withCredentials:true
            // withCredentials: true gap is not allwed or[Object: null prototype] {}
        })
            .then(res => {
                setOrders(res.data);
            });
    }, []);

    useEffect(() => {
        updateTotals(orders);
    }, [orders]);

    const updateTotals = (orders) => {
        const totalQuantity = orders.reduce((acc, order) => acc + order.quantity, 0);
        const total = orders.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setQuantity(totalQuantity);
        setTotalPrice(total);
    };

    const handleQuantityChange = (prod_code, newQuantity) => {
        const updatedOrders = orders.map(order =>
            order.prod_code === prod_code ? { ...order, quantity: newQuantity } : order
        );
        setOrders(updatedOrders);
    };

    const handleInvoice = () => {
        // Handle invoice generation
    };
    const handleNavigate = () => {
        navigate('/payment', { state: { totalPrice } });
    }

    return (
        <div className="h-[100vh] overflow-auto relative">
            <Navbar />
            <div className="flex justify-between">
                <div className="p-6 w-4/5">
                    {orders.map((order) => (
                        <CheckoutCart
                            key={order._id}
                            order={order}
                            onQuantityChange={handleQuantityChange}
                            ref={invoiceRef}
                        />
                    ))}
                </div>
                <div className="w-1/5 flex justify-center">
                    <MiniCart orders={orders} />
                </div>
            </div>
            <div className="lg:flex xl:items-center w-full mx-auto shadow-lg rounded-lg p-4 absolute bottom-3">
                <div className="lg:w-2/12 xl:w-1/12 mb-10 xl:mb-0">
                    <h3 className="text-xl font-heading font-medium">Summary</h3>
                </div>
                <div className="w-full lg:w-10/12 xl:w-11/12">
                    <div className="flex flex-wrap lg:justify-end -mx-3">
                        <div className="w-full sm:w-1/2 lg:w-4/12 xl:w-3/12 px-3 mb-6 xl:mb-0">
                            <div className="relative flex items-center justify-between py-4 px-10 leading-8 bg-white bg-opacity-50 font-medium rounded-3xl">
                                <div className="absolute left-3 flex justify-center items-center w-20 h-20 bg-white rounded-full">
                                    <div className="flex justify-center items-center w-11 h-11 text-xl text-white font-bold bg-blue-500 rounded-full">{quantity}</div>
                                </div>
                                <span className="ml-16">Products</span>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 lg:w-4/12 xl:w-3/12 px-3 mb-3 xl:mb-0">
                            <div className="flex items-center justify-between py-4 px-10 leading-8 bg-white bg-opacity-50 font-heading font-medium rounded-3xl">
                                <span>Shipping</span>
                                <span className="flex items-center">
                                    <span className="mr-3 text-sm">$</span>
                                    <span className="text-xl">10,00</span>
                                </span>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 lg:w-4/12 xl:w-3/12 px-3 mb-10 sm:mb-0">
                            <div className="flex items-center justify-between py-4 px-10 leading-8 bg-white font-heading font-medium rounded-3xl">
                                <span>Total</span>
                                <span className="flex items-center text-blue-500">
                                    <span className="mr-3 text-sm">$</span>
                                    <span className="text-xl">{totalPrice.toFixed(2)}</span>
                                </span>
                            </div>
                        </div>
                        <div onClick={handleInvoice} className="w-full sm:w-1/2 lg:max-w-max lg:ml-auto xl:ml-0 px-3">
                            <button
                                onClick={handleNavigate}
                                className="block p-3 w-full text-xl leading-6 font-medium tracking-tighter font-heading text-center text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                                to='/payment'
                            >
                                Payment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
