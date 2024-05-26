import React,{useState} from 'react'
import { GiSpikedBall } from "react-icons/gi";
import {Link,useNavigate} from 'react-router-dom';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice.js';
import {useDispatch} from 'react-redux';
import { toast } from 'react-toastify';
import GoogleAuth from '../Components/GoogleAuth.jsx';

export default function SignIn() {

  const [formData,setFormData]=useState({});

  const navigate=useNavigate();
  const dispatch=useDispatch();

  const handleChange=(e)=>{
    //console.log(e.target.value);
    setFormData({...formData,[e.target.id]:e.target.value.trim()});
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password)
    {
      dispatch(signInFailure('Please fill out all fields!'));
      return toast.error('Please fill out all fields!');
    }
    try{
        dispatch(signInStart());
        // setLoading(true);
        // setErrorMessage(null);
        const res=await fetch('/api/user/signin',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData),
      });
      const data=await res.json();      
      //console.log(data);
      if (!res.ok) 
      {
        dispatch(signInFailure(data.message))
        //setLoading(false);
        return toast.error(data);
      }   
      dispatch(signInSuccess(data));
      toast.success("Signin successfull!");
      navigate('/');
    }
    catch(err){
      dispatch(signInFailure(err.message));
      return toast.error(err.message);
    }
  }

  return (
    <section className='flex items-center justify-evenly mt-16'> 
      <div className='m-20'>
        <h2 className='text-4xl font-extrabold mb-8'>TALK WITH A NARRATIVE <br />INTELLIGENCE EXPERT</h2>
        <ul className='flex flex-col gap-2'>
          <li className='flex text-xl gap-2'><GiSpikedBall />View of demo of our Constellation Platform</li>
          <li className='flex text-xl gap-2'><GiSpikedBall />Our application uses advanced NLP to understand and<br /> respond to user inputs in a conversational manner.</li>
          <li className='flex text-xl gap-2'><GiSpikedBall />Handles customer support, provide recommendations, and<br /> even assist with the image designing process.</li>
          <li className='flex text-xl gap-2'><GiSpikedBall />Offering advanced AI tools like a chatbot and an image<br /> designer sets the website apart from competitors &<br/> enhances the overall value proposition.</li>
        </ul>
      </div>
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 m-20 p-10 outline outline-slate-600 rounded-xl'>
          <input size={40} type="name" placeholder='Username' className='border border-slate-600 p-3 rounded-lg' id='username' onChange={handleChange} />
          <input type="email" placeholder='E-mail address' className='border border-slate-600 p-3 rounded-lg' id='email' onChange={handleChange} />
          <input type="password" placeholder='Password' className='border border-slate-600 p-3 rounded-lg' id='password' onChange={handleChange} />
          <button type='submit' className='text-[#00ff31] text-lg outline rounded-full p-2 px-5 hover:text-black hover:bg-[#00ff31]'>Sign In</button>
          <GoogleAuth />
          <div className='flex gap-2 items-center'>
            <p className='text-slate-500 text-sm'>Don't have an account?</p>
            <Link to='/signup'>
              <span className='text-[#00ff31] text-sm'>Sign up</span>
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}
