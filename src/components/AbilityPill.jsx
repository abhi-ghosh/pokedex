export default function AbilityPill({number, name, description, hidden, borderColor, backgroundColor, color}){
  return (
    //* Ability pill div
    <div className="text-off-white flex gap-2 px-2 py-3  border-l-[5px] rounded-2xl"
      style={hidden ? {borderColor:"#ff00a2", backgroundColor: `#ff00a2${10}`} :
        {borderColor:borderColor ,backgroundColor: backgroundColor}}
    >
      {/* //* Ability pill number */}
      <p className="flex justify-center items-center w-min text-black
        leading-none font-mono font-bold text-2xl p-2  dark:text-off-white"
      >
        {number}
      </p>
      {/* //* Name, Hidden & Description div */}
      <div className="flex flex-col flex-1 gap-1"
      >
        {/* //* Name & Hidden div */}
        <div className="flex flex-row justify-between font-mono items-start pr-2">
          {/* //* Name */}
          <p className="font-mono text-lg font-bold text-gray-500 dark:text-gray-400">
            {name}
          </p>
          {/* //* Hidden */}
          <p className="flex justify-center items-center w-min text-sm
            leading-none font-outfit font-bold p-2 border-x-2 rounded-xl"
            style={hidden ? {color: "#ff00a2"} :
              {color: color}}
          >
            {hidden ? "HIDDEN" : "NORMAL"}
          </p>
        </div>
        {/* //* Description */}
        <p className="dark:text-off-white font-outfit text-black">{description}</p>
      </div>
    </div>
  )
}