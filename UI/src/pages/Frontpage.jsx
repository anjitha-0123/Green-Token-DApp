import React from 'react'
import logo from '../assets/images/logo.png'
import Frontnav from '../components/Frontnav'
import filler from '../assets/images/filler.webp'
import Footer from '../components/Footer'

function Frontpage() {
  return (
    <div className='bg-purple-950 w-full p-20 h-[1600px] '>
       <Frontnav></Frontnav>
       <img src={logo} className='fixed'></img>
       <img src={filler} className=' border-2 border-green-900 rounded-lg h-[600px] ml-[500px] mt-22 p-6'/>
       
       <div className=' border-2 border-green-900 rounded-lg h-[600px] w-[1170px] ml-[500px] mt-24 pt-12  '>
       <h1 className='text-white font-bold text-3xl ml-12 mt-8 '>🌱 About Us - Green Token </h1>
       <p className='text-white text-xl ml-12 mt-4'> 
           At GreenToken 🪙, we're on a mission to make e-waste recycling rewarding and impactful! 🌍
           <br></br> </p>
        <p className='text-white text-xl ml-12 mt-4'>
          ♻️  We believe that every individual can contribute to a cleaner planet —
           and should be rewarded for doing so. That's why we built a blockchain-based 
           recycling platform that turns your old electronic devices into digital rewards named GreenTokens.
           </p>
           <br></br>
           <h5 className='text-white text-2xl ml-12 mt-4'>💡 What We Do:</h5>
           <p className='text-white text-xl ml-12 mt-4 '></p>
           <ul className='text-white text-xl ml-12 mt-4 '>
            <li>♻️ Encourage e-waste recycling with transparency and traceability</li>
            <li>🪙 Reward users with tokens for every device they recycle</li>
           </ul>
      
       </div>
       <Footer/>
    </div>
  )
}

export default Frontpage