import {Heart} from 'lucide-react'
import {motion} from 'motion/react'
export default function Footer (){
  return (
    <motion.div className='flex flex-row gap-1.5 items-center mt-8 text-gray-500 font-outfit text-md'
    initial={{y:100, opacity:0}} animate={{y:0, opacity:1}}>
      Made with
      <Heart className="text-coral font-outfit font-bold"/> by
      <a href='https://github.com/abhi-ghosh' target='_blank' rel='noreferrer'
        className="text-coral font-outfit font-bold
        hover:text-navy-dark dark:hover:text-off-white transition-color duration-200">
          Abhijit Ghosh
      </a>
    </motion.div>
  )
}