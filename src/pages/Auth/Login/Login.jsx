import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
    const {register,handleSubmit, formState: {errors}} = useForm();
    const {signInUser} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = (data) => {
        console.log("From login:", data)
        signInUser(data.email,data.password)
        .then(result => {
            console.log('After login:',result.user);
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
        <div>
            <div className="hero min-h-screen bg-gradient-to-r from-[#D5FEFE] to-[#AFE6E5]">
                <div className="card bg-[#87dede] w-full max-w-sm shrink-0 shadow-2xl px-2">
                    <div className="card-body">
                        <h1 className="text-3xl font-bold text-center text-primary-gradient">Welcome Back!</h1>
                        <form onSubmit={handleSubmit(handleLogin)}>
                            <fieldset className="fieldset">
                                {/* Email */}
                                <label className="label text-gray-700">Email</label>
                                <input 
                                    type="email" 
                                    className="input w-full bg-white/50 border-white/20 text-gray-700 rounded-xl" 
                                    placeholder="Enter your email"
                                    {...register('email',{required: true})}
                                />
                                {
                                    errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                                }
                                {/* Password */}
                                <label className="label text-gray-700">Password</label>
                                <input 
                                    type="password" 
                                    className="input w-full bg-white/50 border-white/20 text-gray-700 rounded-xl" 
                                    placeholder="Password" 
                                    {...register('password',{required: true,minLength: 6})}
                                />
                                {
                                    errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                                }
                                {
                                    errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be six character</p>
                                }
                                
                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn btn-register border-none shadow-none bg-[#229D9C] text-white mt-4 rounded-xl">Login</button>
                                <div className='flex justify-center items-center gap-3 text-gray-500 my-2'>
                                    <hr className='w-1/2'/>
                                    <p>OR</p>
                                    <hr className='w-1/2'/>
                                </div>
                                {/* Google */}
                                <SocialLogin></SocialLogin>
                                <p className="text-center my-3 text-xs font-semibold dark:text-black">
                                    Don’t have any account ?{" "}
                                    <Link to="/register" className="text-[#229D9C]">
                                    Register
                                    </Link>{" "}
                                </p>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;