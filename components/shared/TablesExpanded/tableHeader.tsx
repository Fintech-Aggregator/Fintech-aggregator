import React from "react";
import styles from "./table.module.css";
import SearchBar from "../HomeContentTemaplate/search-bar";
import SelectField from "../../ui/selectField";

function tableHeader() {
  return (
    <thead className={styles.tableHeader}>
      <tr>
        <th>
          <input type="checkbox" />
        </th>
        <th>
          <div>
            <span>ID</span>
            <input
              className={`${styles.stylesForInput} ${styles.idInput}`}
              type="text"
            />
          </div>
        </th>
        <th>
          <div>
            <div className={styles.addIcon}>
              <p>Name of Licensee </p>
              <svg
                style={{ marginTop: "4px" }}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#05D69E"
                className="bi bi-chevron-expand"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708m0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708"
                />
              </svg>
            </div>
            <div className={styles.addIcon}>
              <input className={styles.stylesForInput} type="text" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#05D69E"
                viewBox="0 0 16 16"
                className={styles.searchIcon}
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </div>
          </div>
        </th>
        <th>
          <div>
            <div className={styles.addIcon}>
              <p>Adress </p>
              <svg
                style={{ marginTop: "4px" }}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#05D69E"
                className="bi bi-chevron-expand"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708m0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708"
                />
              </svg>
            </div>
            <div className={styles.addIcon}>
              <input className={styles.stylesForInput} type="text" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#05D69E"
                viewBox="0 0 16 16"
                className={styles.searchIcon}
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </div>
          </div>
        </th>
        <th>
          <div className={styles.content}>
            <div className={styles.addIcon}>
              <p>Adress type</p>
              <svg
                style={{ marginTop: "4px" }}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#05D69E"
                className="bi bi-chevron-expand"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708m0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708"
                />
              </svg>
            </div>
            <select className={styles.stylesForInput} name="" id=""></select>
          </div>
        </th>
      </tr>
    </thead>
  );
}

export default tableHeader;
