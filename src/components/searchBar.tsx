type SearchBarProps = {
  setSearch: (search: string) => void;
};

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400">
    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
  </svg>
);

export function SearchBar({ setSearch }: SearchBarProps) {
  return (
    <div className="flex items-center gap-3 w-full min-w-0 h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-blue-400 transition-shadow">
      <SearchIcon />
      <input
        type="search"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a pokemon"
        className="flex-1 min-w-0 h-full bg-transparent border-none outline-none text-gray-900 placeholder:text-gray-400"
      />
    </div>
  );
}