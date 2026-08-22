export default function InfoPill({info, color, backgroundColor, borderColor, small=false, multiplier = false}) {
  return (
    <p className={`font-mono font-bold py-1 px-3 rounded-2xl ${small ? "text-[11px]" : "text-sm"}`}
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