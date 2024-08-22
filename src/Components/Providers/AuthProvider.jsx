import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../../../firebase.config';
import { GoogleAuthProvider } from "firebase/auth";
import axios from 'axios';


export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {

    const auth = getAuth(app)
    const provider = new GoogleAuthProvider();
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    // console.log(user)
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const Signin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const googleSignUp = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, currentuser => {
            const userEmail = currentuser?.email || user?.email;
            const loggedUser = { email: userEmail };
            // const userEmail = currentuser?.email

            if (currentuser) {
                axios.post('http://localhost:5000/jwt', loggedUser, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log(res)
                    })
            }
            else {
                axios.post('http://localhost:5000/logout', loggedUser, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log(res.data);
                    })
            }



            setUser(currentuser)
            setLoading(false)


        })
        return () => {
            unsuscribe()
        }
    }, [])
    const authInfo = {
        user,
        loading,
        createUser,
        Signin,
        googleSignUp,
        logout,

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;