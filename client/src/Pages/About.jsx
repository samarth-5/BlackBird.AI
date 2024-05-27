import React from 'react';
import Samarth from '../Assets/Samarth.jpg';
import {Link} from 'react-router-dom';
import { FaGithub, FaLinkedin,FaInstagram } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";

export default function About() {
  return (
    <section className='my-20 mx-[200px] full-screen-bg'>
      <div>
        <img src={Samarth} alt="profile" className='h-[200px] w-[200px] rounded-full mb-5' />
      </div>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-bold mb-4'>About <Link to='/'><span className='underline text-[#00ff31]'>BlackBird.AI</span></Link> (Developed by Samarth)</h1>
        <Link target="_blank" to='https://samarth-dev.netlify.app/'><FaGlobe size={30} className='text-[#00ff31] mr-5' /></Link>
      </div>
      <p className='mb-4'>BlackBird.AI is your gateway to innovative AI solutions, offering an intuitive platform that combines advanced chatbot interactions and 
                          image generation capabilities. Powered by the Gemini API, our intelligent chatbot engages users in natural, context-aware conversations, 
                          delivering accurate responses across various domains. Whether you're seeking assistance, information, or a friendly chat, 
                          our chatbot is designed to meet your needs effortlessly.</p>
      <p className='mb-4'>In addition to our conversational AI, BlackBird.AI features a powerful image generation tool using the LimeWire API. Users can transform 
                          text prompts into high-quality, visually stunning images suitable for creative and professional applications. This feature allows for endless 
                          creative possibilities, enabling users to bring their ideas to life with just a few words.</p>
      <p className='mb-4'>Our user-friendly interface ensures a seamless experience, making advanced AI technology accessible to everyone. BlackBird.AI caters to 
                          casual users, creatives, and professionals alike, offering a versatile platform that inspires and assists. Join us at BlackBird.AI and 
                          explore the future of AI-driven interaction and creativity.</p>
      <div className=' px-5 py-3 flex gap-3 outline outline-slate-600 hover:outline-[#00ff31] rounded-3xl w-min'>
        <Link target="_blank" to='https://www.linkedin.com/in/samarth-narayan-4a4998250/' className='hover:scale-150 duration-500'><FaLinkedin size={25} className='hover:text-[#00ff31]' /></Link> 
        <Link target="_blank" to='https://github.com/samarth-5' className='hover:scale-150 duration-500'><FaGithub size={25} className='hover:text-[#00ff31]' /></Link>
        <Link target="_blank" to='https://leetcode.com/u/samarth_123_/' className='hover:scale-150 duration-500'><SiLeetcode size={25} className='hover:text-[#00ff31]' /></Link>
        <Link target="_blank" to='https://www.instagram.com/samarth123_/' className='hover:scale-150 duration-500'><FaInstagram size={25} className='hover:text-[#00ff31]' /></Link>
      </div>
    </section>
  )
};