import React from 'react';

const Modal = ({ isOpen, toggleModal, handleOutsideClick }) => {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            {isOpen && (
                <div
                    id="modal"
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={handleOutsideClick}
                >
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                        <div className="flex justify-between items-center">
                            <h2 className="text-white text-2xl font-semibold">Followers</h2>
                            <button
                                onClick={toggleModal}
                                className="text-gray-300 hover:text-gray-100">
                                ✕
                            </button>
                        </div>
                        <p className="text-gray-500 mb-4">(13022 members)</p>

                        <input
                            type="text"
                            placeholder="Search contacts"
                            className="input input-bordered w-full mb-4"
                        />

                        <ul className="space-y-4">
                            {[
                                { name: 'Devon Lane', description: 'Amet minim mollit non deserunt ullamco' },
                                { name: 'Courtney Henry', description: 'Amet minim mollit non deserunt ullamco' },
                                { name: 'Ralph Edwards', description: 'Amet minim mollit non deserunt ullamco', isFollowing: true },
                                { name: 'Esther Howard', description: 'Amet minim mollit non deserunt ullamco' },
                                { name: 'Eleanor Pena', description: 'Amet minim mollit non deserunt ullamco' }
                            ].map((follower, idx) => (
                                <li key={idx} className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-white font-semibold">{follower.name}</h3>
                                        <p className="text-gray-400 text-sm">{follower.description}</p>
                                    </div>
                                    <button className={`btn ${follower.isFollowing ? 'bg-yellow-400 text-gray-900' : 'btn-outline'}`}>
                                        {follower.isFollowing ? 'Following' : '+ Follow'}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Modal;
