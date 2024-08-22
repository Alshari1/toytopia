import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [clinetInfo, setClinetInfo] = useState({})
    const [shippingInfo, setShippingInfo] = useState({})
    // State to track the active section
    const [activeSection, setActiveSection] = useState('section1');
    const location = useLocation();
    const { totalPrice } = location.state || {};


const handleSubmit = (e, nextSectionId) => {
    e.preventDefault()
    const form = e.target;
    const client_name = form.client_name.value;
    const client_email = form.client_email.value;
    const client_phone = form.client_phone.value;
    const client_city = form.client_city.value;
    const client_post_code = form.client_post_code.value;
    const  client_country= form.client_country.value;

    const client_region = form.client_region.value;
    const client = {client_name, client_email, client_phone, client_city, client_post_code, client_country}
    setClinetInfo(client)
    // const clientName = form.client_name.value;



    showNextSection(nextSectionId)

}

    const showNextSection = (nextSectionId) => {
        setActiveSection(nextSectionId);
    };
    const handlePay = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
          return;
        }

        setPaymentProcessing(true);
      
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardElement),
        });
      
        if (error) {
          console.log('[error]', error);
          setError(error)
        } else {
          const response = await fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: totalPrice  }), // amount in cents
          });
          const { clientSecret } = await response.json();
      
          const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
          });
          console.log(paymentIntent)
      
          if (confirmError) {
            console.log('[error]', confirmError);
            setError(error)
            setPaymentProcessing(false);
          } else {
            if (paymentIntent.status === 'succeeded') {
                setError('payment successfull')
            //   window.location.href = 'http://localhost:5173/paymentsuccess'
              setPaymentProcessing(false);
            }
          }
        }
      };



    return (
        <div>
            <h1 className='text-5xl text-center mb-20'>Billing Address</h1>
            <div className='flex'>
                <div className='w-3/4'>
                    <div className="join join-vertical w-full">
                        {/* First Section */}
                        <div className="collapse join-item border-base-300 border">
                            <input
                                type="radio"
                                name="accordion-4"
                                checked={activeSection === 'section1'}
                                readOnly
                                id="section1"
                            />
                            <div className="collapse-title flex items-center justify-between text-xl font-medium">
                                <span>General Information</span>
                                <svg
                                    className="w-6 h-6 mr-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                            </div>
                            <div className="collapse-content">
                                <form className="p-6" onSubmit={(e) => handleSubmit(e, "section2")}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className='col-span-2'>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                                            <input name='client_name' type="text" placeholder="Name" className="input input-bordered w-full" />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
                                            <input name='client_email' type="email" placeholder="Email Address" className="input input-bordered w-full" />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">Phone</label>
                                            <input  name='client_phone' type="text" placeholder="Enter your Phone" className="input input-bordered w-full" />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">City</label>
                                            <input name='client_city' type="text" placeholder="City" className="input input-bordered w-full" />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">Post Code</label>
                                            <input name='client_post_code' type="text" placeholder="Post Code" className="input input-bordered w-full" />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">Country</label>
                                            <input name='client_country' type="text" placeholder="Country" className="input input-bordered w-full" />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">Region/State</label>
                                            <select name='client_region' className="select select-bordered w-full">
                                                <option disabled selected>Option</option>
                                                <option>Option 1</option>
                                                <option>Option 2</option>
                                                <option>Option 3</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <input
                                            type="submit"
                                            className="btn btn-primary w-full md:w-auto"
                                            value='Next Step'
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Second Section */}
                        <div className="collapse join-item border-base-300 border">
                            <input
                                type="radio"
                                name="accordion-4"
                                checked={activeSection === 'section2'}
                                readOnly
                                id="section2"
                            />
                            <div className="collapse-title flex items-center justify-between text-xl font-medium">
                                <span>Shipping Address</span>
                                <svg
                                    className="w-6 h-6 mr-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                            </div>
                            <div className="collapse-content">
                                <form className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className='col-span-2'>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">Address</label>
                                            <input type="text" placeholder="Street Address" className="input input-bordered w-full" />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">Apartment/Suite/Unit</label>
                                            <input type="text" placeholder="Apartment, suite, unit, etc. (optional)" className="input input-bordered w-full" />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">City</label>
                                            <input type="text" placeholder="City" className="input input-bordered w-full" />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">Post Code</label>
                                            <input type="text" placeholder="Post Code" className="input input-bordered w-full" />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">Region/State</label>
                                            <select className="select select-bordered w-full">
                                                <option disabled selected>Option</option>
                                                <option>Option 1</option>
                                                <option>Option 2</option>
                                                <option>Option 3</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            type="button"
                                            onClick={() => showNextSection('section3')}
                                            className="btn btn-primary w-full md:w-auto"
                                        >
                                            Next Step
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => showNextSection('section1')}
                                            className="btn btn-secondary w-full md:w-auto mt-3"
                                        >
                                            Previous Step
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Third Section */}
                        <div className="collapse join-item border-base-300 border">
                            <input
                                type="radio"
                                name="accordion-4"
                                checked={activeSection === 'section3'}
                                readOnly
                                id="section3"
                            />
                            <div className="collapse-content">
                                {/* <div className="collapse-title flex items-center justify-between text-xl font-medium">
                                    <div class="w-full mx-auto border">
                                        <div class="mb-12">
                                            <label class="relative inline-flex mb-5 items-center">
                                                <input class="ml-10 " type="checkbox" />
                                                <span class="ml-2 text-sm text-gray-400">Credit card</span>
                                            </label>
                                            <label class="relative inline-flex mb-5 items-center">
                                                <input class="ml-10" type="checkbox" />
                                                <span class="ml-2 text-sm text-gray-400">Debit card</span>
                                            </label>
                                            <label class="relative inline-flex mb-5 items-center">
                                                <input class="ml-10" type="checkbox" />
                                                <span class="ml-2 text-sm text-gray-400">PayPal</span>
                                            </label>
                                        </div>
                                        <div className=''>

                                            <div class="mb-6 flex flex-wrap items-center">
                                                <label className="block mb-2 text-sm font-medium text-gray-700">Cardholder Name</label>
                                                <input type="text" placeholder="Cardholder Name" className="input input-bordered w-full" />
                                            </div>

                                            <div class="mb-6 flex flex-wrap items-center">
                                                <label className="block mb-2 text-sm font-medium text-gray-700">Cardholder Number</label>
                                                <input type="text" placeholder="Cardholder Number" className="input input-bordered w-full" />
                                            </div>

                                            <div className='grid grid-cols-2 gap-5 items-start'>
                                                <div class="mb-6 flex flex-wrap items-center">
                                                    <label className="block mb-2 text-sm font-medium text-gray-700">Expiration</label>
                                                    <input type="text" placeholder="Expiration" className="input input-bordered w-full" />
                                                </div>

                                                <div class="flex flex-wrap items-center">
                                                    <label className="block mb-2 text-sm font-medium text-gray-700">CVC/CVV</label>
                                                    <input type="text" placeholder="CVC/CVV" className="input input-bordered w-full" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <button
                                        type="button"
                                        onClick={() => showNextSection('section2')}
                                        className="btn btn-secondary w-full md:w-auto"
                                    >
                                        Previous Step
                                    </button>
                                </div> */}
                                <form onSubmit={handlePay} className="max-w-lg mx-auto">
                                    <CardElement
                                        className="bg-white p-4 border border-gray-300 rounded-lg"
                                        options={{
                                            style: {
                                                base: {
                                                    fontSize: '16px',
                                                    color: '#32325d',
                                                    '::placeholder': {
                                                        color: '#aab7c4',
                                                    },
                                                },
                                                invalid: {
                                                    color: '#fa755a',
                                                },
                                            },
                                        }}
                                    />
                                    {error && <div className="text-red-500 mt-2">{error}</div>}
                                    <button
                                        type="submit"
                                        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                                        disabled={!stripe || paymentProcessing}
                                    >
                                        {paymentProcessing ? 'Processing...' : 'Pay Now'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-1/4'>
                    <h2>Progress</h2>
                    {/* Add progress indicator or details here */}
                    <ul className="steps steps-vertical">
                        <li className={`step ${activeSection === 'section1' ? 'step-primary' : ''}`}>
                            General Information
                        </li>
                        <li className={`step ${activeSection === 'section2' ? 'step-primary' : ''}`}>
                            Shipping Address
                        </li>
                        <li className={`step ${activeSection === 'section3' ? 'step-primary' : ''}`}>
                            Payment
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Payment;
