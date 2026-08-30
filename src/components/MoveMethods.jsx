import {ChevronDown} from "lucide-react"
import {useState} from "react"
import {AnimatePresence, motion} from "framer-motion"
export default function MoveMethods({heading, description, children}){
  //* Open and close button for dropdown explanation
  const [isOpen, setIsOpen] = useState(false);

  return (
    //* MoveMethods div
    <div className="flex flex-col gap-3 items-start">
      <div>
        <button className="flex items-center gap-2 cursor-pointer hover:gap-4 active:gap-2 w-full
          border-b border-gray-500 dark:border-gray-600 pb-1 transform duration-200 ease-in-out"
          onClick={()=>setIsOpen(!isOpen)}
        >
          <p className="leading-none text-2xl font-bold text-md font-outfit text-gray-500 dark:text-gray-400"
          >
            {heading}
          </p>
          <ChevronDown className={`text-gray-500 dark:text-gray-400 ${isOpen ? "rotate-180" : ""}
            transition-transform duration-200`}
          />
        </button>

        {/*//* Dropdown explanation */}
        <AnimatePresence>
          {isOpen && (
            <motion.p className= "text-gray-500 dark:text-gray-400 text-sm leading-4 font-mono overflow-hidden"
              initial={{height: 0}}
              animate={{height: "auto"}}
              exit={{height: 0}}
              transition={{duration: 0.2, ease:"easeInOut"}}
            >
              {description}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/*//* The moves are mapped over here */}
      {children}
    </div>
  )
}