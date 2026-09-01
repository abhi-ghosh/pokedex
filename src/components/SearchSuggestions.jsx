export default function SearchSuggestions({suggestions, onSuggestionsClick}){
  return (
    <ul className="">
      {suggestions.map((suggestion, index) => (
        <li key={index} onClick={() => onSuggestionsClick(suggestion)}
          className="cursor-pointer rounded-2xl hover:bg-gray-200 dark:hover:bg-navy-dark
          transition-colors duration-300 px-4 py-2">
          {suggestion[0].toUpperCase() + suggestion.slice(1)}
        </li>
      ))}
    </ul>
  )
}