import React from 'react';
import { GifState } from '../context/GifContext';
import { HiMiniArrowTrendingUp } from 'react-icons/hi2';

const filters = [
  {
    title: "GIFs",
    value: "gifs",
    background: "bg-gradient-to-tr from-purple-500 via-purple-600 to-purple-500"
  },
  {
    title: "Stickers",
    value: "stickers",
    background: "bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-500"
  },
  {
    title: "Text",
    value: "text",
    background: "bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-500"
  }
];

const FilterGif = ({ allignLeft = false, showTrending = false }) => {
  const { filter, setFilter } = GifState();

  return (
    <div className={`flex my-3 gap-3
      ${allignLeft ? "justify-start" : ""}
      ${!allignLeft && !showTrending ? "justify-end" : ""}
      ${showTrending ? "justify-between flex-col sm:flex sm:items-center" : ""}
    `}>
      {showTrending && (
        <span className='flex gap-2 items-center'>
          <HiMiniArrowTrendingUp size={25} className='text-teal-400' />
          <span className='font-semibold text-gray-400'>Trending</span>
        </span>
      )}
      <div className="flex gap-2">
        {filters.map((f) => (
          <span
            key={f.value}
            className={`px-3 py-1 rounded-full text-white cursor-pointer ${f.background} ${filter === f.value ? "ring-2 ring-white" : ""}`}
            onClick={() => setFilter(f.value)}
          >
            {f.title}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FilterGif;
