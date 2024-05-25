import React from 'react'
import eagle from '../Assets/eagle.jpeg';
import c1 from '../Assets/c1.jpg';
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { FaArrowCircleRight } from "react-icons/fa";

export default function Home() {

  const { currentUser } = useSelector((state) => state.user);

  return (
    <section>
      <div className='flex'>
        <h1 className='z-10 m-20 ml-10 pt-10 pl-20 text-[180px] font-extrabold leading-none bg-clip-text text-transparent bg-gradient-to-b dark:from-gray-400 dark:to-[#00ff31]'>RENDER<br />THE<br />REALITY</h1>
        <img src={eagle} alt='bird' className='absolute mt-20 right-20 w-full md:w-auto md:max-w-[60%] lg:max-w-[50%] xl:max-w-[40%] z-0 opacity-80' />
      </div>
      <div className='m-10 text-center flex flex-col justify-center'>
        <h3 className='px-20 pb-10 text-4xl'>Conversing in pixels, crafting in code. Enter a realm<br /> 
                                       where ever exchange births a masterpiece. Unleash your thoughts,<br /> 
                                       shape your visions. Let words guide the canvas,<br /> 
                                       and pixels paint the story. </h3>
        <Link to={currentUser ? '/chatbot' : '/signup'}>
          <button className='text-[#00ff31] mb-14 text-lg outline rounded-full p-2 px-5 pb-1 hover:text-black hover:bg-[#00ff31]'>Try Demo for Free</button>
        </Link>
      </div>
      <div className='flex justify-center w-full gap-14 p-10'>
        <div className='flex flex-col items-center outline w-1/4 rounded-3xl hover:outline-[#00ff31]'>
          <div>
            <img src={c1} alt="img" className='rounded-3xl' />
            <h3 className='cursor-pointer font-bold text-2xl p-3 pb-0 hover:text-[#00ff31] hover:underline'>MODEL - ASTRA v-5.1</h3>
            <p className='p-3 pt-0'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati temporibus neque, odio veritatis odit molestias culpa eius iste nobis, enim molestiae? Repudiandae veniam at, commodi molestias repellat nobis quaerat inventore!
            </p>
          </div>
          <Link to={currentUser ? '/chatbot' : '/signin'}>
            <button className='text-[#00ff31] mb-5 text-lg outline rounded-full p-2 px-5 pb-1 hover:text-black hover:bg-[#00ff31]'>Try it now !</button>
          </Link>
        </div>
        <div className='flex flex-col items-center outline w-1/4 rounded-3xl hover:outline-[#00ff31]'>
          <div>
            <img src={c1} alt="img" className='rounded-3xl' />
            <h3 className='cursor-pointer font-bold text-2xl p-3 pb-0 hover:text-[#00ff31] hover:underline'>MODEL - ASTRA v-5.1</h3>
            <p className='p-3 pt-0'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati temporibus neque, odio veritatis odit molestias culpa eius iste nobis, enim molestiae? Repudiandae veniam at, commodi molestias repellat nobis quaerat inventore!
            </p>
          </div>
          <Link to={currentUser ? '/chatbot' : '/signin'}>
            <button className='text-[#00ff31] mb-5 text-lg outline rounded-full p-2 px-5 pb-1 hover:text-black hover:bg-[#00ff31]'>Try it now !</button>
          </Link>
        </div>
        <div className='flex flex-col items-center outline w-1/4 rounded-3xl hover:outline-[#00ff31]'>
          <img src={c1} alt="img" className='rounded-3xl' />
          <h3 className='text-center cursor-pointer font-bold text-2xl p-5 hover:text-[#00ff31] hover:underline'>More features coming soon...!!<br />
                   Till then explore our new latest models...</h3>      
          <FaArrowCircleRight size={50} className='cursor-pointer' />          
        </div>
      </div>
    </section>
  )
}
