import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Providers/AuthProvider'

const Navbar = () => {
    const { user, logout } = useContext(AuthContext)
    const handleLogout = () => {
        logout()
    }

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <Link to='/'>Home</Link>
                        <Link to='/manage'>Manage Product</Link>
                        <Link to='/update'>Update product</Link>
                        <Link to='/details'>Details</Link>
                        <Link to='/checkout'>Checkout</Link>

                    </ul>
                </div>
                <Link>daisyUI</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <Link to='/'>Home</Link>
                    <Link to='/manage'>Manage Product</Link>
                    <Link to='/update'>Update product</Link>
                    <Link to='/details'>Details</Link>
                    <Link to='/checkout'>Checkout</Link>

                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <p onClick={handleLogout}>Logout</p> : <Link to='/signin' >Login</Link>
                }

            </div>
        </div>
    )
}

export default Navbar
