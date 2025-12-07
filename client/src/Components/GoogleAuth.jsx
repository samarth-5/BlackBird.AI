import React from 'react'
import { FaGoogle } from "react-icons/fa6";
import { toast } from 'react-toastify';

import {useDispatch} from 'react-redux';
import {signInSuccess} from '../redux/user/userSlice.js';
import {useNavigate} from 'react-router-dom';

import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth';
import {app} from '../firebase.js';

export default function GoogleAuth() {

    const auth=getAuth(app);
    const dispatch=useDispatch();
    const navigate=useNavigate();


    const handleGoogleClick=async()=>{
        const provider=new GoogleAuthProvider();
        provider.setCustomParameters({prompt: 'select_account'})
        try{
            const resultsFromGoogle=await signInWithPopup(auth,provider);
            //console.log(resultsFromGoogle);
            const res=await fetch('/api/user/google',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                }),
            });
            const data=await res.json();
            if(res.ok)
            {
                dispatch(signInSuccess(data));
                navigate('/');
                if(res.status===200)
                toast.success('Signin successfull!');
                if(res.status===201)
                toast.success('Account created successfully!');
            }
        }
        catch(err){
            return toast.error(err);
        }
    }

  return (
    <button onClick={handleGoogleClick} className='flex justify-center items-center gap-2 text-[#00ff31] text-lg outline rounded-full p-2 px-5 hover:text-black hover:bg-[#00ff31]'><FaGoogle className='mb-1 ' />Continue with Google</button> 
  )
}
