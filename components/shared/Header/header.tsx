"use client";

import React from "react";
import styles from "./header.module.css";
import Link from "next/link";
import Image from "next/image";

type HeaderProps = {
  onOpenModal: () => void;
};

const Header = () => {
  return (
    <>
      <header className={styles.mainHeader}>
        <div className={styles.firstBlockHeader}>
          <img className={styles.logo} src="/Logo.svg" alt="Logo" />
          <Link href="/">
            <span className={styles.userName}>Home</span>
          </Link>
          <Link href="/hong-kong">
            <span className={styles.pageName}>Hong Kong</span>
          </Link>
        </div>
        <div className={styles.secondBlockHeader}>
          <Link href="/login" id="launchModalBtn" className={styles.iconButton}>
            <Image src="/person.svg" alt="person" width={36} height={36} />
          </Link>
          <button>
            <Image src="/sun.svg" alt="sun" width={36} height={36} />
          </button>
          <a href="/" className={styles.iconButton}>
            <Image src="/exit.svg" alt="exit" width={36} height={36} />
          </a>
        </div>
      </header>
      <hr className={styles.divider} />
    </>
  );
};

export default Header;
