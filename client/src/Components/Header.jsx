import React from 'react'
import {Link, useNavigate} from 'react-router-dom';
import phoenix from '/phoenix.png'
import {useSelector, useDispatch} from 'react-redux';
import { signOutSuccess } from '../redux/user/userSlice.js';

import { toast } from 'react-toastify';

export default function Header() {

  const dispatch=useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const navigate=useNavigate();

  const handleSignOut=async()=>{
    try{
        const res=await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/signout`, {
            method: 'POST',
        });
        const data=await res.json();
        if(!res.ok)
        {
          return toast.error(data);
        }
        dispatch(signOutSuccess());
        toast.success(data);
        navigate('/signin');
    }
    catch(err){
        return toast.error('Internet not connected!');
    }
  }

  return (
    <section className='flex items-center justify-around border-slate-700 border-b py-2 full-screen-bg'>
      <Link to='/'>
        <div className='flex items-center gap-2'>
          <img src={phoenix} height={60} width={60} alt="logo" />
          <span className='text-xl font-extrabold'>BlackBird.AI</span>
        </div>
      </Link>

      <ul className='flex gap-14 items-center'>
        <Link to='/'>
          <li className='hidden sm:inline hover:text-[#00ff31] text-lg'>Home</li>
        </Link>
        <Link to='/about'>
          <li className='hidden sm:inline hover:text-[#00ff31] text-lg'>About</li>
        </Link>
        {
          currentUser ? (
            <button onClick={handleSignOut} className='text-[#00ff31] text-lg outline rounded-full p-2 px-5 pb-1 hover:text-black hover:bg-[#00ff31]'>Sign out</button>
          ) : (
            <Link to='/signin'>
              <button className='text-[#00ff31] text-lg outline rounded-full p-2 px-5 pb-1 hover:text-black hover:bg-[#00ff31]'>Try Demo for Free</button>
            </Link>
          )
        }
        
      </ul>
    </section>
  )
}
