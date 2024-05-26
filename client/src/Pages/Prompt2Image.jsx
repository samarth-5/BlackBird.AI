import React, {useState} from 'react'
import { toast } from 'react-toastify';

export default function Prompt2Image() {

  const [formData,setFormData]=useState({});
  const [image,setImage]=useState(null);

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()});
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!formData.prompt)
    {
      return toast.error('Enter the prompt!');
    }
    const req={prompt: formData.prompt, aspect_ratio: "1:1"}
    const res=await sendImageRequest(req);
    setImage(res);
  }

  const sendImageRequest = async(req) =>{
    try{
      const res=await fetch('/api/image/new',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(req)
      });
      console.log(res);
      if(res.status===500)
      return toast.error('Credit limit exceeded!');
      if(!res.ok)
      return toast.error('Try some custom input!');
      const data=await res.json();
      console.log(data);
      return newMessage;
    }
    catch(err){
      return toast.error(err);
    }
  }
  
  return (
    <section className='flex flex-col items-center'>
      <div>
        <h3 className='p-5 text-[40px] hover:text-[#00ff31] text-bold mt-2'>MODEL - PREDATOR.ai v-4.2</h3>
      </div>
      <div className='w-2/4 rounded-3xl outline outline-slate-600 hover:outline-[#00ff31] m-3'>
        <form className='flex' onSubmit={handleSubmit}>
          <input placeholder='Enter the prompt...' type="text" className='text-[#00ff31] w-full p-3 rounded-xl outline-none' id='prompt'
                 required onChange={handleChange} onKeyDown={(e)=>{if(e.key==='Enter') handleSubmit();}} />
          <button type='submit' className='w-30 text-[#00ff31] text-lg outline rounded-full px-3 py-1 m-2 hover:text-black hover:bg-[#00ff31]'>Generate</button>
        </form>
      </div>
      <div className='flex justify-center items-center w-[500px] h-[500px] rounded-3xl outline outline-slate-600 hover:outline-[#00ff31] m-3'>
        <div className='w-[200px] h-[200px]'>
          <h3 className='text-xl text-slate-400 text-center'>"Every image starts as an idea. With the right prompt, we can paint the canvas of our imagination."</h3>
        </div>
      </div>
    </section>
  )
}
