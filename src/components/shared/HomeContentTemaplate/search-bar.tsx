"use client";
import Image from "next/image";
import styles from "./search-bar.module.css";

interface SearchBarProps {
  showIcon?: boolean;
  showPlaceholder?: boolean;
  onSearch?: (value: string) => void;
}

export default function SearchBar({
  showIcon = true,
  onSearch,
  showPlaceholder = true,
}: SearchBarProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(event.target.value);
    }
  };
  return (
    <div className={styles.mainSearch}>
      <div className={styles.IconAndInput}>
        <input
          className={`${styles.searchInput}`}
          type="text"
          placeholder={showPlaceholder ? "Search" : ""}
          onChange={handleInputChange}
        />
        {showIcon && (
          <Image
            className={styles.searchIcon}
            src="/images/search.svg"
            alt="Vector"
            width={20}
            height={20}
          />
        )}
      </div>
    </div>
  );
}
