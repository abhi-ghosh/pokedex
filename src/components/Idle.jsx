import React from 'react';
import pokeball from './assets/pokeball.svg';
export default function Idle() {
  return (
    <div className="bg-white flex flex-col gap-4 items-center justify-center w-full h-100 max-w-lg
        p-3.5 rounded-2xl shadow-md">
        <div className="bg-off-white w-20 h-20 rounded-full flex items-center justify-center">
          <img src={pokeball} alt="Pokeball" className="h-12 w-12 text-gray-400 animate-[spin_3s_linear_infinite]"/>
        </div>

        <p className="text-black font-outfit font-bold text-xl">No Pokémon selected</p>
        <p className="text-gray-500 font-outfit text-md">Search for a Pokémon above to get started.</p>
    </div>
  )
}