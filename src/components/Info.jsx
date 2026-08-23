import InfoPill from "./InfoPill";
import { typeColors, typeMatchup } from "./data";
import { AnimatePresence, motion } from "motion/react"
import ClassTab from "./ClassTab";
import AbilityPill from "./AbilityPill";
export default function Info({pokemonData, pokemonSpecies, shadowColor, darkMode, abilities}) {

  //* Section Style
  const sectionStyle = "leading-none text-xl font-bold text-md font-outfit text-gray-500 dark:text-gray-400";

  //* Gender calculation for Pokémon
  const femaleGender = ((pokemonSpecies.gender_rate/8)*100)
  const maleGender = (100 - femaleGender)
  let gender;
  if (pokemonSpecies.gender_rate === -1) {
    gender = "Genderless"
  } else if (femaleGender === 100) {
    gender = "100% Female"
  } else if (maleGender === 100) {
    gender = "100% Male"
  } else {
    gender = `${Math.round(femaleGender)}% Female | ${Math.round(maleGender)}% Male`
  }

  console.log(abilities)

  //* Pokemon classification data
  const classification = [
      {
        title: "GENERATION",
        info: `Gen ${pokemonSpecies.generation.name.split("-")[1].toUpperCase()}`,
        color: "#f9744b"
      },
      {
        title: "HABITAT",
        info: pokemonSpecies.habitat ? pokemonSpecies.habitat.name[0].toUpperCase() +
        pokemonSpecies.habitat.name.slice(1) : "Unknown",
        color: "#ef4444"
      },
      {
        title:"CATCH RATE",
        info: `${pokemonSpecies.capture_rate}(${Math.round((pokemonSpecies.capture_rate / 255) * 100)}%)`,
        color: "#14b8a6"
      },
      {
        title:"HAPPINESS",
        info: pokemonSpecies.base_happiness,
        color: "#8b5cf6"
      },
      {
        title:"GROWTH RATE",
        info:pokemonSpecies.growth_rate.name[0].toUpperCase() + pokemonSpecies.growth_rate.name.slice(1),
        color: "#0891b2"
      },
      {
        title: "EGG CYCLES",
        info: pokemonSpecies.hatch_counter,
        color: "#f59e0b"
      },
      {
        title:"EGG GROUPS",
        info: pokemonSpecies.egg_groups.map((group) =>
          group.name[0].toUpperCase() + group.name.slice(1)).join(" | "),
        color: "#16a34a"
      },
      {
        title:"GENDER",
        info: gender,
        color: "#ec4899"
      }
      ]

  //* Pokemon quote
  const quote = pokemonSpecies?.flavor_text_entries.find(flavor => flavor.language.name === "en");

  //* Getting the type/types of the pokemon searched for
  const types = pokemonData.types.map((type) => {
    return type.type.name
  });

 //* Getting the type matchups of the type/types of the pokemon searched for
  const typeObjects = types.map((type) => {
    return typeMatchup[type]
  })

  //* Combining the type matchups if the search pokemon has more than one type
  const typeObjectCombined = typeObjects.reduce((acc, type) => {
    return {
      weak: [...acc.weak, ...type.weak],
      resist: [...acc.resist, ...type.resist],
      immune: [...acc.immune, ...type.immune],
    }
  }, {weak: [], resist: [], immune: []});

  //! What if a Pokémon like Scizor has "rock" on both its Weakness and Resistance?
  //! That would equate to a multiplier of 1, because 2*0.5 = 1, but since we are
  //! sending t from a cleaned array {typeObjFinal} the "rock" will never be sent
  //! because it does not exist anymore, they cancel each other out in theory
  //! and we removed it from the arrays in practice in {typeObgFinal}
  //* Getting the multipliers
  const multiplier = (t) => {
    let total = 1;
    typeObjectCombined.weak.forEach((w) => {
       if (w === t) total *= 2;
    })
    typeObjectCombined.resist.forEach((r) => {
       if (r === t) total *= 0.5;
    })
    typeObjectCombined.immune.forEach((i) => {
       if (i === t) total *= 0;
    })
    return total
  }

 //* Removing duplicates from the combined type matchups
  const typeObjectUnique = {
    weak: [...new Set(typeObjectCombined.weak)],
    resist: [...new Set(typeObjectCombined.resist)],
    immune: [...new Set(typeObjectCombined.immune)],
  }

  //* Making sure weak has no same entries as resist and immune
  const newWeak = typeObjectUnique.weak.filter((w=>
      !typeObjectUnique.resist.includes(w) &&
      !typeObjectUnique.immune.includes(w)
  ))

 //* Making sure resist has no same entries as weak and immune
  const newResist = typeObjectUnique.resist.filter((r=>
      !typeObjectUnique.weak.includes(r) &&
      !typeObjectUnique.immune.includes(r)
  ))

  //*Final type object where immune is not altered because
  //*if it's immune it's immune no matter what
  const typeObjFinal = {
    weak: newWeak,
    resist: newResist,
    immune: typeObjectUnique.immune
  }

 //* Text if Matchup doesn't exist
  const NA = <p className="text-gray-500 dark:text-gray-400 leading-none
                font-bold font-mono text-sm">
              WEAK TO
            </p>

  return (
  //* Info Container
    <AnimatePresence>
      <motion.div className="flex flex-col gap-6 overflow-y-auto scrollbar-none"
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        transition={{duration: 0.15, ease:"easeOut"}}
      >
        {/*//* Pokémon quote */}
        <p className="font-outfit dark:text-off-white p-3 rounded-2xl"
          style={
            { backgroundColor: `${shadowColor}20`,
              borderLeft: `5px solid ${shadowColor}`
            }}
        >
          "{quote?.flavor_text.replace("-", " ").replace("POKéMON", "pokémon")}"
        </p>
        {/*//* Type matchups title */}
        <p className= {sectionStyle}
        >
          TYPE MATCHUPS
        </p>
        {/*//* Type matchups div */}
        <div className="flex flex-col font-outfit gap-3">
          {/*//* Weak to */}
          <p className="text-red-600 dark:text-red-400 leading-none font-bold font-mono text-sm">
            WEAK TO
          </p>
          {typeObjFinal.weak.length > 0 ?
          <div className="flex flex-row flex-wrap gap-3">
            {typeObjFinal.weak.map((t) => (
              <InfoPill info={t.toUpperCase()}
                key={t} color={!darkMode ? typeColors[t].color : "var(--color-off-white)"}
                backgroundColor={!darkMode ? typeColors[t].bg : `${typeColors[t].color}30`}
                borderColor={typeColors[t].color}
                small={true} multiplier={multiplier(t)}
              />
            ))}
          </div> : NA}
          {/*//* Resist to */}
          {typeObjFinal.resist.length > 0 &&
          <p className="text-green-600 dark:text-green-400 leading-none font-bold font-mono text-sm">
            RESIST
          </p>}
          <div className="flex flex-row flex-wrap gap-3">
            {typeObjFinal.resist.map((t) => (
              <InfoPill info={t.toUpperCase()}
                key={t} color={!darkMode ? typeColors[t].color : "var(--color-off-white)"}
                backgroundColor={!darkMode ? typeColors[t].bg : `${typeColors[t].color}30`}
                borderColor={typeColors[t].color}
                small={true} multiplier={multiplier(t)}
              />
            ))}
          </div>
          {/*//* Immune to */}
          {typeObjFinal.immune.length > 0 &&
          <p className="text-indigo-600 dark:text-indigo-400 leading-none font-bold font-mono text-sm">
            IMMUNE TO
          </p>}
          <div className="flex flex-row flex-wrap gap-3">
            {typeObjFinal.immune.map((t) => (
              <InfoPill info={t.toUpperCase()}
                key={t} color={!darkMode ? typeColors[t].color : "var(--color-off-white)"}
                backgroundColor={!darkMode ? typeColors[t].bg : `${typeColors[t].color}30`}
                borderColor={typeColors[t].color}
                small={true}
              />
            ))
            }
          </div>
        </div>
        {/*//* Classification title */}
        <p className={sectionStyle}>
          CLASSIFICATION
        </p>
        <div className="grid grid-cols-3 gap-5">
          {classification.map((c) =>
            <ClassTab title={c.title} color={c.color} info={c.info} key={c.title}
              className={c.title === "GENDER"|| c.title === "EGG GROUPS" ? "col-span-3" : ""}
            />
            )
          }
        </div>
        {/*//* Abilities title */}
        <p className={sectionStyle}>
          ABILITIES
        </p>
        {/*//* Abilities div */}
        <div className="flex flex-col gap-3">
          {abilities.map((a,i)=>(
            <AbilityPill
              key={a.name}
              number={i+1}
              name={a.name[0].toUpperCase()+a.name.slice(1)}
              description={a.flavor_text_entries.find((f)=>f.language.name==="en").flavor_text}
              hidden = {pokemonData.abilities[i].is_hidden}
              darkMode={darkMode} backgroundColor={`${shadowColor}20`}
              borderColor={typeColors[pokemonData.types[0].type.name].color}
              color={typeColors[pokemonData.types[0].type.name].color}
            />
          ))
          }
        </div>
      </motion.div>
    </AnimatePresence>
  )
}