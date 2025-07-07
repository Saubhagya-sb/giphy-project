import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GifState } from '../context/GifContext'
import Gif from '../components/Gif'
import Follow from '../components/Follow'

const Categories = () => {
  const [results, setResults] = useState([])
  const { category } = useParams()
  const { gf, filter } = GifState()

  const FetchSearchResults = async () => {
    const { data } = await gf.gifs(category, category)
    setResults(data)
  }

  useEffect(() => {
    FetchSearchResults()
  }, [category])

  return (
    <div className='flex flex-col sm:flex-row gap-5 my-4'>
      
      {/* Sidebar */}
      <div className='w-full sm:w-72'>
        {results.length > 0 && <Gif gif={results[0]} />}
        <span>Don't tell it to me, GIF it to me!</span>
        <Follow />
      </div>

      {/* Main Content */}
      <div className='flex-1'>
        <div className='w-full h-0.5 my-6 bg-gray-800' />
        <h2 className='text-4xl pb-1 font-extrabold capitalize'>{category.split("-").join(" & ")} GIFs</h2>
        <h2 className='text-lg text-gray-400 pb-3 font-bold hover:text-gray-50 cursor-pointer'>@{category}</h2>
        {results.length > 1 && (
          <div className='columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2'>
            {results.slice(1).map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Categories
