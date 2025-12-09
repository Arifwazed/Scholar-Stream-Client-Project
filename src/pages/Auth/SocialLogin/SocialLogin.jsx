import React from 'react';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router';

const SocialLogin = () => {
    const {signInGoogle} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleGoogleLogin = () => {
        signInGoogle()
        .then(result => {
            console.log("Successful Google login: ",result.user)
            Swal.fire({
            // position: "top-end",
            icon: "success",
            title: "SuccessFully Login",
            showConfirmButton: false,
            timer: 1500
            });
            setTimeout(()=>{
                navigate(location.state || '/')   
            },2000);
        })
        .catch(error => {
            console.log(error.code)
            Swal.fire({
            // position: "top-end",
                icon: "error",
                title: error.code,
                showConfirmButton: false,
                timer: 2000
            });
        })
        
    }

    return (
        <button type='button' onClick={handleGoogleLogin} className="btn bg-gray-800  border-none shadow-none text-white rounded-xl">
            <img width="18" height="18" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo"/>
            Login with Google
        </button>
    );
};

export default SocialLogin;