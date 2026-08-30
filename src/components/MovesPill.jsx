import InfoPill from "./InfoPill"
export default function MovesPill ({borderColor, backgroundColor, color, pwr, acc, move, type, lvl}){
  return (
    //* Moves pill div
    <div className="grid grid-cols-[2fr_1.5fr] gap-2 leading-none font-outfit rounded-2xl px-4 py-2
      border-l-6 dark:text-off-white decoration-none"
      style={{borderColor:borderColor, backgroundColor: backgroundColor}}
    >
      {/*//* Level & Moves container */}
      <div className="grid grid-row-[50px_1fr] lg:grid-cols-[50px_1fr] items-center">
        <p className="font-bold text-sky-500 text-xs">{lvl}</p>
        <p className="font-bold text-sm">{move}</p>
      </div>
      {/*//* Infopill for type, power & accuracy container */}
      <div className="grid grid-rows-2 gap-2">
        <InfoPill info={type} color={color} borderColor={borderColor}
          backgroundColor={backgroundColor} small={true}
        />
        {/*//* Power & Accuracy container*/}
        <div className="flex leading-none items-center justify-center gap-4 font-mono text-xs">
          <p className="flex gap-1 flex-col lg:flex-row"><span>Pwr: </span><span>{pwr}</span></p>
          <p className="flex gap-1 flex-col lg:flex-row"><span>Acc: </span><span>{acc}</span></p>
        </div>
      </div>
    </div>
  )
}