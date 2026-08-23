export default function ClassTab({title, info, className, color}){
  return (
    <div className={`dark:text-off-white font-outfit flex flex-col gap-1.5 ${className}`}>
        <p className="font-bold text-xs leading-none"
          style={{color: color}}
        >
          {title}
        </p>
        <p className="font-mono leading-none">
          {info}
        </p>
    </div>
  )
}