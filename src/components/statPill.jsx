import { motion } from "framer-motion"
export default function StatPill({stat,name,color}){
  return (
    <div className="flex flex-row font-mono gap-3 items-center justify-between">
      <p className="font-bold w-15 text-right text-gray-500 dark:text-gray-400">{name}</p>
      <div className="h-3 rounded-full bg-beige dark:bg-navy-dark flex-3 overflow-hidden">
        <motion.div className="h-full"
          style={{background:color}
          }
          initial={{width:0}}
          animate={{width:`${stat}%`}}
          transition={{duration: 1, ease:"easeOut"}}
        >
        </motion.div>
      </div>
      <p className="font-bold text-lg dark:text-off-white">{stat}</p>
    </div>
  )
}