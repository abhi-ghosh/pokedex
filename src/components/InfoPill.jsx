export default function InfoPill({info, color, backgroundColor, borderColor}) {
  return (
    <p className="font-mono font-bold text-xs py-1 px-3 rounded-2xl"
      style={{
        color: color,
        backgroundColor: backgroundColor,
        border: `1px solid ${borderColor}`
      }}
    >
        {info}
    </p>
  )
}