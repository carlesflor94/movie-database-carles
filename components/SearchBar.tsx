import styles from "./SearchBar.module.css";
import { debounce } from "lodash";
import { useMemo } from "react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
};

export default function SearchBar({
  value,
  onChange,
  onSearch,
}: SearchBarProps) {
  const debouncedSearch = useMemo(() => debounce(onSearch, 500), [onSearch]);
  const handleChange = (value: string) => {
    onChange(value);
    debouncedSearch(value);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Type to search..."
        className={styles.input}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}
