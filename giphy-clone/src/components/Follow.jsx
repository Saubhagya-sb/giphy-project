import React from 'react'
import {FaInstagram, FaTwitter, FaYoutube} from 'react-icons/fa6'
const Follow = () => {
  return (
    <div className='flex justify-evenly font-bold text-sm text-gray-400 pt-2'>
        <span>Follow on:</span>
        <a href="https://www.youtube.com/@TwinkleThareja" target='_blank'>
            <FaYoutube size={30}/>
        </a>
        <a href="https://www.instagram.com/acoustic_twinkle/" target='_blank'>
            <FaInstagram size={30}/>
        </a>
        <a href="https://www.threads.com/@acoustic_twinkle?hl=en" target='_blank'>
            <FaTwitter size={30}/>
        </a>
    </div>
  )
}

export default Follow
