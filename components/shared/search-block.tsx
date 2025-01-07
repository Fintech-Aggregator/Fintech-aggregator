import styles from "./search-block.module.css";

export default function SearchBar() {
  const data = [
    { name: "Name1", country: "Country1", address: "Address1" },
    { name: "Name2", country: "Country2", address: "Address2" },
    { name: "Name3", country: "Country3", address: "Address3" },
    { name: "Name4", country: "Country4", address: "Address4" },
    { name: "Name5", country: "Country5", address: "Address5" },
  ];

  return (
    <div className={styles.mainSearch}>
      <div className={styles.IconAndInput}>
        <div className={styles.search_bar_block}>
          <input className={styles.searchInput} type="text" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            className={styles.searchIcon}
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </div>

        <div className={styles.filter_block}>
          <button className={styles.filter_button}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className={styles.filterIcon} viewBox="0 0 16 16">
              <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z"/>
            </svg>
            {/* <span>&#x1F5D2;</span> */}
          </button>

          <select className={styles.rows_dropdown}>
            <option value="10">5</option>
            <option value="11">10</option>
            <option value="12">15</option>
          </select>
        </div>
      </div>

      <div className={styles.country_table}>
        <div className={styles.tableContainer}>
          
          <div className={`${styles.row} ${styles.header}`}>
            <div>Name</div>
            <div>Country</div>
            <div>Address</div>
          </div>

          {data.map((row, index) => (
            <div
              key={index}
              className={`${styles.row} ${index % 2 === 0 ? styles.even : styles.odd}`}
            >
              <div>{row.name}</div>
              <div>{row.country}</div>
              <div>{row.address}</div>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
}
