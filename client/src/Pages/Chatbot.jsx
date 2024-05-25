import React, { useState } from 'react'
import px from '../Assets/px.jpg'
import { BiSend } from "react-icons/bi";
import {useSelector} from 'react-redux';

export default function Chatbot() {

  const [formData,setFormData] = useState(null);

  const user=useSelector((state)=>state.user);
  //console.log(user);

  const handleChange=(e)=>{
    setFormData(e.target.value);
  }

  const handleSubmit=async()=>{
    if(!formData || formData==null)
    {
      return toast.error('Type something...');
    }
  }

  return (
    <section className='m-10 flex gap-12'>
      <div className='flex flex-col gap-16 w-1/4'>
        <div className='outline rounded-2xl outline-slate-600 p-10 gap-5 flex flex-col'>
          <h3 className='text-2xl font-bold'>You are talking to a CHATBOT !!</h3>
          <p>You can ask questions related to Knowledge, Buisness, Advices,
            Education, etc. <br />
            Avoid sharing personal information !
          </p>
          <button className='text-[#00ff31] text-lg outline rounded-full p-2 px-5 hover:text-black hover:bg-[#00ff31]'>Delete Conversation</button>
        </div>
        <div className='flex justify-center'>
          <img src={px} alt="bird" width={200} />
        </div>
      </div>
      <div className='w-3/4'>
        <h1 className='text-[40px] hover:text-[#00ff31] text-bold text-center'>MODEL - ASTRA v-5.1</h1>
        <div className='outline rounded-2xl outline-slate-600 m-1 h-full'>
          
          <div className='flex items-center rounded-xl outline outline-slate-600 hover:outline-[#00ff31] relative top-[552px] m-2'>
            <input placeholder='Type your message...' type="text" className='text-[#00ff31] w-full p-3 rounded-xl outline-none'
                   required onChange={handleChange} onKeyDown={(e)=>{if(e.key==='Enter') handleSubmit();}} />
            <BiSend size={40} className='pr-2 hover:text-green cursor-pointer' onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </section>
  )
}
