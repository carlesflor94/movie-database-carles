type SearchBarProps = {
  value: string;
};

export default function SearchBar({ value }: SearchBarProps) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Type to search..."
        className="search-input"
        value={value}
      />
    </div>
  );
}
