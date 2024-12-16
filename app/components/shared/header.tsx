"use client";

import React from "react";
import styles from "../styles/header.module.css";
import Link from "next/link";

type HeaderProps = {
  onOpenModal: () => void;
};

const Header = () => {
  return (
    <>
      <header className={styles.mainHeader}>
        <div className={styles.firstBlockHeader}>
          <img
            className={styles.logo}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFz_vC0EXRut6N5GePX35CaTWmQkzqrk1AtQ&s"
            alt="Logo"
          />
          <span className={styles.userName}>Home</span>
          <span className={styles.pageName}>Hong Kong</span>
        </div>
        <div className={styles.secondBlockHeader}>
          <span className={styles.userName}>Name</span>
          <Link href="/login" id="launchModalBtn" className={styles.iconButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="currentColor"
              className="bi bi-person"
              viewBox="0 0 16 16"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
            </svg>
          </Link>
          <a href="/" className={styles.iconButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="currentColor"
              className="bi bi-box-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
              />
              <path
                fillRule="evenodd"
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
              />
            </svg>
          </a>
        </div>
      </header>
      <hr className={styles.divider} />
    </>
  );
};

export default Header;
