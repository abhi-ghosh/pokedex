export default function InfoPill({info, color, backgroundColor, borderColor, small=false, multiplier = false}) {
  return (
    //* Infopill <p> which has the info & multiplier if it exists
    <p className={`font-mono font-bold py-1 px-3 rounded-2xl flex items-center justify-center ${small ? "text-[11px]" : "text-sm"}`}
      style={{
        color: color,
        backgroundColor: backgroundColor,
        border: `1px solid ${borderColor}`
      }}
    >
        {info}{multiplier && ` X ${multiplier}`}
    </p>
  )
}