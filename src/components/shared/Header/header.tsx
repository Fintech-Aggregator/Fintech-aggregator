"use client";

import React from "react";
import styles from "./header.module.css";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/src/lib/utils";
import { usePathname } from "next/navigation";

interface HeaderProps {
  type: string;
}

export const Header = ({ type }: HeaderProps) => {
  const pathname = usePathname().replace("/", "");
  return (
    <>
      <header className={styles.mainHeader}>
        {type === "auth" ? (
          <>
            <div className={styles.firstBlockHeader}>
              <Link href="/">
                <Image className={styles.logo} src="/images/logo.svg" alt="logo" width={100} height={100} />
              </Link>
            </div>
            <div className={styles.secondBlockHeader}>
              <div className="flex items-center justify-center w-[180px] h-8 border border-black rounded-md"> 
                <Link href={pathname === "login" ? "/register" : "/login"} >
                  {pathname === 'login' ? "Log in": "Register"}
                </Link>
              </div>
              
            </div>
          </>
        ) : (
          <>
            <div className={styles.firstBlockHeader}>
              <Link href="/">
                <Image className={styles.logo} src="/images/logo.svg" alt="logo" width={100} height={100} />
              </Link>
              <Link href="/">
                <span className={cn("font-semibold", pathname === "" && "text-primary", styles.userName)}>Home</span>
              </Link>
              <Link href="/hong-kong">
                <span className={cn("font-semibold", pathname === "hong-kong" && "text-primary", styles.pageName)}>
                  Hong Kong
                </span>
              </Link>
            </div>
            <div className={styles.secondBlockHeader}>
              <Link href="/login" id="launchModalBtn" className={styles.iconButton}>
                <Image src="/images/user.png" alt="person" width={36} height={36} />
              </Link>
              <Link href="/" className={styles.iconButton}>
                <Image src="/images/exit.svg" alt="exit" width={36} height={36} />
              </Link>
            </div>
          </>
        )}
      </header>
      <hr className={styles.divider} />
    </>
  );
};
