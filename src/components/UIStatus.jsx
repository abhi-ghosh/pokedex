import React from 'react';
import States from './States';
import { motion, AnimatePresence } from 'motion/react';
import {LoaderPinwheel, FaceSlightlyFrowning, FaceExpressionless} from 'lucide-react';
import pokeball from './assets/pokeball.svg';
export default function Idle({state, error}) {
  //* Instead of using 3 different components, we are using the same component
  //* with different rendered content based on the state

  //* Title based on state (idle, loading, error)
  let title;
    if (state ===  States.IDLE){
      title = (
        <motion.p
          key="idle-title"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.25 }}
          className="text-navy-dark dark:text-off-white font-outfit font-bold text-xl"
        >
          POKÉDEX
        </motion.p>
    );
    } else if (state === States.LOADING){
      title = (
        <motion.p
          key="loading-title"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.25 }}
          className="text-navy-dark dark:text-off-white font-outfit font-bold text-xl"
        >
          Loading, please wait..
        </motion.p>
      );
    } else if (state === States.ERROR){
      title = (
        <motion.p
          key="error-title"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.25 }}
          className="text-navy-dark dark:text-off-white font-outfit
            clam font-bold text-xl"
        >
          {error.message === "not-found" ?
            "Sorry, this Pokemon does not exist." :
            "Uh oh, please try again."
          }
        </motion.p>
      );
  }
  return (
    //* Idle, Loading & Error Container
    <motion.div className="bg-white dark:bg-navy flex flex-col gap-4 items-center
        justify-center w-full h-100 max-w-2xl
        p-3.5 rounded-2xl shadow-md"
        initial={{scale:0}} animate={{scale:1}}
        >

      {/*//* Idle, Loading & Error Container */}
        <motion.div className="bg-off-white w-20 h-20
        rounded-full flex items-center justify-center"
        >
          {/*//* Idle, Loading & Error Icon */}
          <AnimatePresence mode="wait">
            {/*//* Idle Icon */}
            {state === States.IDLE &&
              <motion.img src={pokeball} key="pokeball"
                alt="Pokeball" className="h-12 w-12 text-gray-400
                animate-[spin_3s_linear_infinite]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              />
            }
            {/*//* Loading Icon */}
            {state === States.LOADING &&
            <motion.div
              initial={{ opacity: 0 }}
              animate={{opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              key="loader"
            >
              <LoaderPinwheel
                className="h-10 w-10
                text-navy-dark
                animate-[spin_3s_linear_infinite]"
              />
            </motion.div>
            }
            {/*//* Error Icons */}
            {state === States.ERROR &&
            <motion.div
              initial={{ opacity: 0 }}
              animate={{opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              key="error"
            >
              {/*//* Error Icon based on error message */}
              {error?.message === "not-found" ?
                <FaceSlightlyFrowning
                  className="h-10 w-10
                  text-navy-dark"
                />
                :
                <FaceExpressionless
                  className="h-10 w-10
                  text-navy-dark"
                />
              }
            </motion.div>
            }
          </AnimatePresence>
        </motion.div>

        {/*//* Title from the if statement & subtitle */}
        <AnimatePresence mode="popLayout">
          {title}
          {/*//* Idle Subtitle */}
          {state === States.IDLE &&
          <motion.p className="text-center text-gray-500 font-outfit text-md"
            key="idle-subtitle"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25 }}
            >
            Search for a Pokémon to get started
          </motion.p>}
        </AnimatePresence>
    </motion.div>
  )
}