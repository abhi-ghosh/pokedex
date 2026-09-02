export default function SearchSuggestions({suggestions, onSuggestionsClick, suggHighlight}) {
  return (
    <ul className="">
      {suggestions.map((suggestion, index) => (
        <li key={index} onClick={() => onSuggestionsClick(suggestion)}
          className={`cursor-pointer rounded-2xl hover:bg-white dark:hover:bg-navy-dark
          transition-colors duration-300 px-4 py-2 ${suggHighlight === index ? "bg-white dark:bg-navy-dark" : ""}`}
        >

          <img src={suggestion.sprite} alt={suggestion.name} className="w-8 h-8 inline-block mr-2 object-fill"/>

          {suggestion.name[0].toUpperCase() + suggestion.name.slice(1)}

        </li>
      ))}
    </ul>
  )
}