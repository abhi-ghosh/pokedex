import {statButtons} from "./data";
export default function Stats({button, setButton, children}) {

  return (
    //*Stats section div
    <div className="flex-1 w-full md:max-w-1/2 bg-card
    dark:bg-navy flex flex-col justify-between gap-5 p-10 px-4
      md:p-10 rounded-b-2xl md:rounded-r-2xl transition-colors duration-300"
    >
      {/*//* Stat buttons div */}
      <div className="flex flex-row gap-2 items-center
        justify-evenly p-1 bg-off-white dark:bg-navy-dark font-outfit
        font-bold rounded-full">
        {/*//* Stat buttons mapped over statButtons array */}
        {statButtons.map((stat)=>(
          <button className={`flex-1 py-2 px-6
            rounded-3xl cursor-pointer
              ${button === stat ? "bg-card dark:text-off-white dark:bg-navy" :
                "text-gray-500 hover:bg-gray-500/10 dark:hover:bg-navy/60"
              }`}
            onClick={() => setButton(stat)}
            key={stat}
          >
            {stat}
          </button>
        ))}
      </div>
      {children}
    </div>
  )
}