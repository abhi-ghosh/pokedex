import {Zap} from 'lucide-react'
export default function Header({states, setState, setSearchQuery, children}) {
  return (
    //* Header div
    <div className="flex flex-col items-center justify-center mb-8 relative">
        <div className="flex items-center justify-center gap-1 hover:scale-105
          active:scale-100 transition-all duration-200 cursor-pointer"
          onClick={() => {
            setState(states.IDLE);
            setSearchQuery("");
          }}
          >
          <Zap className="text-coral w-6 h-auto"/>
          <h1 className="text-coral font-outfit font-bold text-xl">POKÉDEX</h1>
        </div>
        <p className="text-gray-500 font-outfit text-md">Powered by PokéAPI</p>
        {/*//* Theme button */}
        {children}
      </div>
  );
}