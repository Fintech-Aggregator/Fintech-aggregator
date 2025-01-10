"use client";
import Image from "next/image";
import styles from "./search-bar.module.css";

interface SearchBarProps {
  size?: "tiny" | "small" | "medium" | "large";
  showIcon?: boolean;
  showPlaceholder?: boolean;
  onSearch?: (value: string) => void;
}

export default function SearchBar({
  size = "medium",
  showIcon = true,
  onSearch,
  showPlaceholder = true,
}: SearchBarProps) {
  const sizeClass = styles[size];
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(event.target.value);
    }
  };
  return (
    <div className={styles.mainSearch}>
      <div className={styles.IconAndInput}>
        <input
          className={`${styles.searchInput} ${sizeClass}`}
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
