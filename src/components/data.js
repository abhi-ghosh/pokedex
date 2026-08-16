// Pokemon type colors
const typeColors = {
  normal:   { color: "#6b7280", bg: "#f3f4f6" },
  fire:     { color: "#ea580c", bg: "#fff7ed" },
  water:    { color: "#2563eb", bg: "#eff6ff" },
  grass:    { color: "#16a34a", bg: "#f0fdf4" },
  electric: { color: "#ca8a04", bg: "#fefce8" },
  psychic:  { color: "#db2777", bg: "#fdf2f8" },
  ice:      { color: "#0891b2", bg: "#ecfeff" },
  dragon:   { color: "#7c3aed", bg: "#f5f3ff" },
  dark:     { color: "#374151", bg: "#f9fafb" },
  fairy:    { color: "#be185d", bg: "#fdf2f8" },
  fighting: { color: "#c2410c", bg: "#fff7ed" },
  poison:   { color: "#7e22ce", bg: "#faf5ff" },
  ground:   { color: "#b45309", bg: "#fffbeb" },
  flying:   { color: "#4f46e5", bg: "#eef2ff" },
  bug:      { color: "#65a30d", bg: "#f7fee7" },
  rock:     { color: "#92400e", bg: "#fffbeb" },
  ghost:    { color: "#6d28d9", bg: "#f5f3ff" },
  steel:    { color: "#475569", bg: "#f8fafc" },
};

// Pokemon stat colors
const statColors = {
  hp:                { label: "HP",    color: "#f9744b" },
  attack:            { label: "ATK",   color: "#ef4444" },
  defense:           { label: "DEF",   color: "#124d54" },
  "special-attack":  { label: "Sp.Atk", color: "#8b5cf6" },
  "special-defense": { label: "Sp.Def", color: "#0891b2" },
  speed:             { label: "Speed",  color: "#16a34a" },
};

//Stat buttons
const statButtons = ["Stats","Moves","Info"];

export { typeColors, statColors, statButtons };