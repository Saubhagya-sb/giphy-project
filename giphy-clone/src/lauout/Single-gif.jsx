import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GifState } from '../context/GifContext'
import Gif from '../components/Gif'
import {HiMiniChevronUp, HiMiniChevronDown, HiMiniHeart } from 'react-icons/hi2'
import {HiOutlineExternalLink} from "react-icons/hi";
import Follow from '../components/Follow'
import { FaPaperPlane } from 'react-icons/fa6'
import Favorites from './Favourites'

const contentType = ["gifs","stickers","text"]
const Singlegif = () => {
  
  const {type,slug} = useParams()
  const [gif,setGif] = useState({})
  const {gf,favourites,addToFavourites} = GifState()
  const [relatedGifs,setRelatedGifs] = useState([])
  const [readMore,setReadMore] = useState(false)
  const shareGif = () => {
  const gifUrl = window.location.href; 

  
  navigator.clipboard.writeText(gifUrl)
    .then(() => {
      alert("Link copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
      alert("Failed to copy the link.");
    });
};

  const FetchGif = async ()=>{
    const gifId = slug.split("-")
    const {data} = await gf.gif(gifId[gifId.length-1])
    const {data:related} = await gf.related(gifId[gifId.length-1],{limit:10})
    setGif(data)
    setRelatedGifs(related)
  }
  
  
  useEffect(()=>{
    if(!contentType.includes(type)){
      throw new Error("Invalid Content Type")
    }
    FetchGif()
  },[])
  return (
    <div className='grid grid-cols-4 my-10 gap-4'>
  {/* Sidebar */}
  <div className='hidden sm:block sm:col-span-1'>
    {gif?.user && (
      <>
        <div className='flex gap-1'>
          <img src={gif?.user?.avatar_url} alt={gif?.user?.display_name} className='h-14' />
          <div className='px-2'>
            <div className='font-bold'>{gif?.user?.display_name}</div>
            <div className='font-bold text-sm text-gray-400'>{gif?.user?.username}</div>
          </div>
        </div>

        {gif?.user?.description && (
          <p className='py-4 whitespace-pre-line text-sm text-gray-400'>
            {readMore
              ? gif?.user?.description
              : gif?.user?.description.slice(0, 100) + "..."}
            {gif?.user?.description.length > 100 && (
              <div
                className='flex items-center font-bold text-sm text-gray-400 cursor-pointer'
                onClick={() => setReadMore(!readMore)}
              >
                {readMore ? (
                  <>Read Less <HiMiniChevronUp size={20} /></>
                ) : (
                  <>Read More <HiMiniChevronDown size={20} /></>
                )}
              </div>
            )}
          </p>
        )}

        <Follow />
        <div className='w-full h-0.5 my-6 bg-gray-800' />
        {gif?.source && (
          <div>
            <span className='font-bold text-sm text-gray-400'>Source</span>
            <div className='flex items-center text-sm font-bold gap-1'>
              <HiOutlineExternalLink size={25}/>
              <a href={gif.source} target='_blank' className='truncate'>{gif.source}</a>
            </div>
          </div>
        )}
      </>
    )}
  </div>

  {/* Main Content */}
  <div className='col-span-4 sm:col-span-3'>
    <div className='flex gap-6'>
      <div className='w-full sm:w-3/4'>
        <div className='font-bold text-sm text-gray-400 truncate mb-2'>
          {gif.title}
        </div>
        <Gif gif={gif} hover={false} />
        {/* mobile UI */}
        <div className='flex sm:hidden gap-1'>
            <img src={gif?.user?.avatar_url} alt={gif?.user?.display_name} className='h-14' />
            <div className='px-2'>
              <div className='font-bold'>{gif?.user?.display_name}</div>
              <div className='font-bold text-sm text-gray-400'>{gif?.user?.username}</div>
            </div>
            <button className='ml-auto' onClick={shareGif}><FaPaperPlane size={25}/></button>
        </div>
      </div>
      {/* Favourites/share/embed goes here */}
      <div className='hidden sm:flex flex-col gap-5 mt-6'>
        <button className='flex gap-5 items-center font-bold text-lg cursor-pointer' onClick={()=> addToFavourites(gif.id)}>
          <HiMiniHeart size={30} className={`${favourites.includes(gif.id)? "text-red-500" : ""}`}/>
          Favourite
        </button>
        <button
              onClick={shareGif} // Assignment
              className="flex gap-6 items-center font-bold text-lg cursor-pointer"
            >
              <FaPaperPlane size={25} />
              Share
            </button>
      </div>
    </div>
    <span className='font-extrabold'>Related GIFs</span>
    <div className='columns-2 md:columns-3 gap-2'>
      {relatedGifs.slice(1).map((gif)=>{
        return <Gif gif={gif} key={gif.id}/>
      })}
    </div>
  </div>
</div>

  )
}

export default Singlegif

