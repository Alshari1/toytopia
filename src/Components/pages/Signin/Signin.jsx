import { Link } from 'react-router-dom'
import coverImg from '../../../assets/images/banner/biscuit-recipe_1263326-20886.jpg'
import eyeIcon from '../../../assets/images/icon/cartoon-happy-eyes.png'
import googleIcon from '../../../assets/images/icon/google.png'
import githubIcon from '../../../assets/images/icon/github.png'
import { AuthContext } from '../../Providers/AuthProvider';
import { useContext } from 'react'
import Navbar from '../../Navbar/Navbar'

const Signin = () => {
    const {googleSignUp} = useContext(AuthContext)
    const handleGoogleSignIn = () => {
        googleSignUp()
        .then(result => {
            console.log(result.user)
            // window.location.href = '/'
        })
    }
    return (
        <section className="relative py-20 lg:py-10 overflow-hidden">
            <Navbar></Navbar>
            <div className="container px-4 mx-auto">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap -mx-4 xl:items-center">
                        <div className="w-full lg:w-1/2 xl:w-3/5 px-4 order-last lg:order-first">
                            <div className="relative max-w-xl mx-auto lg:mx-0 lg:max-w-3xl h-full">
                                <img
                                    className="block w-full h-166 lg:h-full object-cover rounded-3xl"
                                    src={coverImg}
                                    alt="Person"
                                />
                                <div className="absolute bottom-0 w-full left-0 p-4 sm:p-6">
                                    <div className="p-6 sm:p-10 backdrop-blur-md bg-black bg-opacity-30 rounded-3xl">
                                        <div className="overflow-hidden">
                                            <div className="flex transition-transform duration-500 ease-in-out -m-5" style={{ transform: 'translateX(-0px)' }}>
                                                <div className="flex-shrink-0 h-full w-full p-5">
                                                    <h5 className="text-3xl text-white font-semibold mb-2">Selina Destin</h5>
                                                    <span className="block text-sm text-white font-semibold mb-6">Web Development Agency</span>
                                                    <p className="max-w-xl text-2xl text-white font-semibold mb-15">"Untitled has become essential in starting every new project, we can't imagine working without it."</p>
                                                </div>
                                                <div className="flex-shrink-0 h-full w-full p-5">
                                                    <h5 className="text-3xl text-white font-semibold mb-2">Kristin Watson</h5>
                                                    <span className="block text-sm text-white font-semibold mb-6">Medical Assistant</span>
                                                    <p className="max-w-xl text-2xl text-white font-semibold mb-15">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna."</p>
                                                </div>
                                                <div className="flex-shrink-0 h-full w-full p-5">
                                                    <h5 className="text-3xl text-white font-semibold mb-2">Darrell Steward</h5>
                                                    <span className="block text-sm text-white font-semibold mb-6">Marketing Coordinator</span>
                                                    <p className="max-w-xl text-2xl text-white font-semibold mb-15">"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-center mt-4">
                                            <button className="bg-blue-900 inline-block mr-2 h-1 w-5 rounded-full cursor-pointer"></button>
                                            <button className="bg-white hover:bg-blue-100 inline-block mr-2 h-1 w-5 rounded-full cursor-pointer"></button>
                                            <button className="bg-white hover:bg-blue-100 inline-block h-1 w-5 rounded-full cursor-pointer"></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 xl:w-2/5 px-4 mb-16 lg:mb-0">
                            <div className="max-w-md lg:py-20 mx-auto lg:mr-0">
                                <h3 className="font-heading text-4xl text-gray-900 font-semibold mb-4">Sign in to your account</h3>
                                <p className="text-lg text-gray-500 mb-10">Greetings on your return! We kindly request you to enter your details.</p>
                                <div className="flex flex-wrap mb-6 items-center -mx-2">
                                    <div className="w-full md:w-1/2 px-2 mb-3 md:mb-0">
                                        <div onClick={handleGoogleSignIn} className="inline-flex w-full py-3 px-4 items-center justify-center rounded-full border border-gray-200 hover:border-gray-400 transition duration-100">
                                            <img className='w-5' src={googleIcon} alt="icon" />
                                            <span className="ml-4 text-sm font-semibold text-gray-500">Login with Google</span>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2 px-2">
                                        <a className="inline-flex w-full py-3 px-4 items-center justify-center rounded-full border border-gray-200 hover:border-gray-400 transition duration-100" href="#">
                                            <img className='w-5' src={githubIcon} alt="icon" />
                                            <span className="ml-4 text-sm font-semibold text-gray-500">Login with Github</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="flex mb-6 items-center">
                                    <div className="w-full h-px bg-gray-300"></div>
                                    <span className="mx-4 text-sm font-semibold text-gray-500">Or</span>
                                    <div className="w-full h-px bg-gray-300"></div>
                                </div>
                                <form>
                                    <div className="mb-6">
                                        <label className="block mb-1.5 text-sm text-gray-900 font-semibold" htmlFor="email">Email</label>
                                        <input className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-none rounded-lg" type="email" placeholder="pat@saturn.dev" id="email" />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-1.5 text-sm text-gray-900 font-semibold" htmlFor="password">Password</label>
                                        <div className="relative">
                                            <input className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-none rounded-lg" type="password" placeholder="min 12 chars" id="password" />
                                            <button className="absolute top-1/2 right-0 mr-3 transform -translate-y-1/2 inline-block hover:scale-110 transition duration-100">
                                                <img className='w-6' src={eyeIcon} alt="Show Password" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex mb-6 items-center">
                                        <input type="checkbox" id="remember" />
                                        <label className="ml-2 text-xs text-gray-800" htmlFor="remember">Remember me</label>
                                    </div>
                                    <button className="relative group block w-full mb-6 py-3 px-5 text-center text-sm font-semibold text-orange-50 bg-orange-900 rounded-full overflow-hidden" type="submit">
                                        <div className="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                                        <span className="relative">Login</span>
                                    </button>
                                    <span className="text-xs font-semibold text-gray-900">
                                        <span>Dont't Have an Account?</span>
                                        <Link to='/signup' className="inline-block ml-1 text-orange-900 hover:text-orange-700">Sign up</Link>
                                    </span>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Signin
