import React, { useState, useEffect } from 'react'
import px from '../Assets/px.jpg'
import { BiSend } from "react-icons/bi";
import {useSelector} from 'react-redux';
import { toast } from 'react-toastify';
import ChatItem from '../Components/ChatItem.jsx';

export default function Chatbot() {

  const [formData,setFormData] = useState(null);
  const [chatMessages,setChatMessages] = useState([]);

  const user=useSelector((state)=>state.user);

  const firstLetter=user.currentUser.name.charAt(0).toUpperCase();

  const handleDelete=async()=>{
    try{
      const res=await fetch(`/api/chat/delete/${user.currentUser._id}`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(user)
      });
      if(!res.ok)
      return toast.error('Deleting conversations failed!');
      toast.success('Conversation Deleted!');
      setChatMessages([]);
    }
    catch(err){
      toast.error(err);
    }
  }

  useEffect(()=>{
    const getOldMessages=async()=>{
      try{
        const res=await fetch(`/api/chat/old/${user.currentUser._id}`);
        const data=await res.json();
        setChatMessages(data);
      }
      catch(err){
        return toast.error('Unable to fetch older chats!');
      }
    }
    getOldMessages();
  },[]);

  const handleChange=(e)=>{
    setFormData(e.target.value);
  }

  const handleSubmit = async () => {
    if (!formData || formData === null || formData === '') {
      return toast.error('Type something...');
    }
    const newMessage = { role: 'user', content: formData, id: user.currentUser._id };
    setChatMessages([...chatMessages, newMessage]);
    setFormData(''); // Clear the input field here
  
    const resAi = await sendChatRequest(newMessage);
    setChatMessages([...chatMessages, newMessage, resAi]);
  };
  

  const sendChatRequest = async(message)=>{
    try{
      const res=await fetch('/api/chat/new',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(message)
      });
      if(!res.ok)
      return toast.error('Try some custom input!');
      const data=await res.json();
      const newMessage={role:'ai', content:data, id:user.currentUser._id};
      //console.log(newMessage);
      return newMessage;
    }
    catch(err){
      return toast.error(err);
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
          <button onClick={handleDelete} className='text-[#00ff31] text-lg outline rounded-full p-2 px-5 hover:text-black hover:bg-[#00ff31]'>Delete Conversation</button>
        </div>
        <div className='flex justify-center'>
          <img src={px} alt="bird" width={200} />
        </div>
      </div>
      <div className='w-3/4'>
        <h1 className='text-[40px] hover:text-[#00ff31] text-bold text-center'>MODEL - ASTRA v-5.1</h1>
        <div className='outline rounded-2xl outline-slate-600 m-1 p-1'>
          <div className='h-[512px]'>
          {
            chatMessages && chatMessages.map((chat)=>(
              <div key={chat._id}>
                <ChatItem role={chat.role} content={chat.content} firstLetter={firstLetter} />
              </div>
            ))
          }
          </div>          
          <div className='flex items-center rounded-xl outline outline-slate-600 hover:outline-[#00ff31] m-2'>
            <input placeholder='Type your message...' type="text" className='text-[#00ff31] w-full p-3 rounded-xl outline-none'
                   required onChange={handleChange} onKeyDown={(e)=>{if(e.key==='Enter') handleSubmit();}} />
            <BiSend size={40} className='pr-2 hover:text-green cursor-pointer' onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </section>
  )
}
