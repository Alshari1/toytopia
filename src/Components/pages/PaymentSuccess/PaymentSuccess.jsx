import React from 'react'
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
      navigate('/');
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
                <p className="text-gray-700 mb-6">
                    Thank you for your payment. Your transaction has been completed successfully.
                </p>
                <button
                    onClick={handleGoBack}
                    className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
}

export default PaymentSuccess
