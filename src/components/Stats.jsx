import { useState } from "react";
import {statButtons} from "./data";
export default function Stats({pokemonData, darkMode}){
  const [button, setButton] = useState("Stats");
  return (
    <div className="flex-1 w-full md:max-w-1/2 bg-card dark:bg-navy transition-colors
      duration-300 flex flex-col justify-between p-10 rounded-b-2xl md:rounded-r-2xl">
      <div className="flex flex-row gap-2 items-center
        justify-evenly p-2 bg-off-white dark:bg-navy-dark font-outfit font-bold rounded-full">
        {statButtons.map((stat)=>(
          <button className={`flex-1 py-2 px-6,
            dark:text-off-white rounded-3xl cursor-pointer
            ${button === stat ? "bg-card dark:bg-navy" :
              "hover:bg-card/50 dark:hover:bg-navy/60"
            }
              transition-colors duration-300`}
            onClick={() => setButton(stat)}
            key={stat}
          >
            {stat}
          </button>
        ))}
      </div>
    </div>
  )
}