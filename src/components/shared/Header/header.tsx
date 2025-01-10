"use client";

import React from "react";
import styles from "./header.module.css";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/src/lib/utils";
import { usePathname  } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();
  return (
    <>
      <header className={styles.mainHeader}>
        <div className={styles.firstBlockHeader}>
          <Image className={styles.logo} src="/images/logo.svg" alt="logo" width={100} height={100} />
          <Link href="/">
            <span className={cn("font-semibold", pathname === "/" && "text-primary", styles.userName)}>Home</span>
          </Link>
          <Link href="/hong-kong">
            <span className={cn("font-semibold", pathname === "/hong-kong" && "text-primary", styles.pageName)}>Hong Kong</span>
          </Link>
        </div>
        <div className={styles.secondBlockHeader}>
          <Link href="/login" id="launchModalBtn" className={styles.iconButton}>
            <Image src="/images/user.png" alt="person" width={36} height={36} />
          </Link>
          <a href="/" className={styles.iconButton}>
            <Image src="/images/exit.svg" alt="exit" width={36} height={36} />
          </a>
        </div>
      </header>
      <hr className={styles.divider} />
    </>
  );
};
