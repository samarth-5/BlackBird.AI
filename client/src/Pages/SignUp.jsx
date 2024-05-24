import React, {useState} from 'react'
import { FaGoogle } from "react-icons/fa6";
import { GiSpikedBall } from "react-icons/gi";
import {Link, useNavigate} from 'react-router-dom'

export default function SignUp() {

  const [formData,setFormData]=useState({});
  const [errorMessage,setErrorMessage]=useState(null);
  const [loading,setLoading]=useState(false);

  const navigate=useNavigate();

  const handleChange=(e)=>{
    //console.log(e.target.value);
    setFormData({...formData,[e.target.id]:e.target.value.trim()});
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!formData.name || !formData.username || !formData.email || !formData.password || !formData.pwd)
    {
      return setErrorMessage('Please fill out all fields!');
    }
    if(formData.password !== formData.pwd)
    {
      return setErrorMessage('Password does not match!');
    }
    try{
        setLoading(true);
        setErrorMessage(null);
        const res=await fetch('/api/user/signup',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData),
      });
      const data=await res.json();      
      //console.log(data);
      if (!res.ok) 
      {
        setLoading(false);
        return setErrorMessage(data.message);
      }   
      setLoading(false);
      navigate('/signin');
    }
    catch(err){
      setErrorMessage(err.message);
      setLoading(false);
    }
  }

  return (
    <section className='flex items-center justify-evenly'> 
      <div>
        <h2 className='text-4xl font-extrabold mb-8'>TALK WITH A NARRATIVE <br />INTELLIGENCE EXPERT</h2>
        <ul className='flex flex-col gap-2'>
          <li className='flex text-xl gap-2'><GiSpikedBall />View of demo of our Constellation Platform</li>
          <li className='flex text-xl gap-2'><GiSpikedBall />Our application uses advanced NLP to understand and<br /> respond to user inputs in a conversational manner.</li>
          <li className='flex text-xl gap-2'><GiSpikedBall />Handles customer support, provide recommendations, and<br /> even assist with the image designing process.</li>
          <li className='flex text-xl gap-2'><GiSpikedBall />Offering advanced AI tools like a chatbot and an image<br /> designer sets the website apart from competitors &<br/> enhances the overall value proposition.</li>
        </ul>
      </div>
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 m-16 p-10 outline outline-slate-600 rounded-xl'>
          <input type="text" size={40} placeholder='Full Name' className='border border-slate-600 p-3 rounded-lg' id='name' onChange={handleChange} />
          <input type="email" placeholder='E-mail address' className='border border-slate-600 p-3 rounded-lg' id='email' onChange={handleChange} />
          <input type="name" placeholder='Username' className='border border-slate-600 p-3 rounded-lg' id='username' onChange={handleChange} />
          <input type="password" placeholder='Password' className='border border-slate-600 p-3 rounded-lg' id='password' onChange={handleChange} />
          <input type="password" placeholder='Re-type Password' className='border border-slate-600 p-3 rounded-lg' id='pwd' onChange={handleChange} />
          <div className='flex gap-4 justify-center'>          
            <input type="checkbox" id='privacy' />
            <label className='text-sm'>I would like to receive communications from<br /> Blackbird.AI according to the Privacy Policy.**</label>
          </div>
          <button type='submit' className='text-[#00ff31] text-lg outline rounded-full p-2 px-5 hover:text-black hover:bg-[#00ff31]'>Sign Up</button>
          <button className='flex justify-center items-center gap-2 text-[#00ff31] text-lg outline rounded-full p-2 px-5 hover:text-black hover:bg-[#00ff31]'><FaGoogle className='mb-1 ' />Continue with Google</button> 
          <div className='flex gap-2 items-center'>
            <p className='text-slate-500 text-sm'>Already have an account?</p>
            <Link to='/signin'>
              <span className='text-[#00ff31] text-sm'>Sign in</span>
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}
