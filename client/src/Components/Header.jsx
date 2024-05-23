import React from 'react'
import {Link} from 'react-router-dom';
import phoenix from '/phoenix.png'

export default function Header() {
  return (
    <section className='flex items-center justify-around border-slate-700 border-b py-2'>
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
        <Link to='/signup'>
          <button className='text-[#00ff31] text-lg outline rounded-full p-2 px-5 pb-1 hover:text-black hover:bg-[#00ff31]'>Try Demo for Free</button>
        </Link>
      </ul>
    </section>
  )
}
