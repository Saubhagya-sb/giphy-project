import React, { useState } from 'react'
import { HiMiniXMark, HiOutlineMagnifyingGlass } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'

const GifSearch = () => {
    const [query,setquery] = useState("")
    const navigate = useNavigate()
    const SearchGifs = async ()=>{
        if(query.trim()===""){
            return ;
        }
        navigate(`/search/${query}`)
    }
    

    return (
    <div className='flex relative'>
        <input 
        type="text"
        value={query}
        onChange={(e)=> setquery(e.target.value)}
        
        placeholder='Search all the GIFs and Stickers'
        className='w-full pl-4 pr-14 py-5 text-xl text-black rounded-tl rounded-bl border border-gray-300 outline-none bg-white' 
        />
        {
            query &&(
                <button
                    onClick={()=> setquery("")}
                    className='absolute bg-gray-300 backdrop-opacity-90 rounded-full right-20 mr-2 top-6 cursor-pointer'
                >
                    <HiMiniXMark size={22}/>
                </button>
                
            )
        }
        
        <button
            onClick={SearchGifs}
            
            className='bg-gradient-to-tr from-pink-600 to-pink-400 text-white px-4 py-2 rounded-tr rounded-br cursor-pointer'    
        >
            <HiOutlineMagnifyingGlass size={35}/>
        </button>
        
    </div>
  )
}

export default GifSearch
