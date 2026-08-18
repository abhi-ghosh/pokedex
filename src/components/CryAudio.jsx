import { Volume2 } from "lucide-react";
export default function CryAudio({pokemonData}) {
  //* Function to play pokemon cry
  const playCry = () => {
    const audio = new Audio(pokemonData.cries.latest);
    audio.volume = 0.3;
    audio.play();
  }
  return (
    <div className="flex items-center">
      <button
        onClick={playCry}
        className="px-2 py-1 text-black border dark:text-off-white rounded-2xl cursor-pointer
        hover:bg-navy/10 active:bg-navy/20 hover:scale-105 active:scale-95
        dark:hover:bg-off-white/10 dark:active:bg-off-white/20 transition duration-200
        "
        type="button"
        aria-label={`Play ${pokemonData.name} cry`}
      >
      <Volume2 size={18} />
    </button>
    </div>
  )
}