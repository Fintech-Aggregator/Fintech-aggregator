"use client";

import React from "react";
import styles from "./header.module.css";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/src/lib/utils";
import { usePathname } from "next/navigation";
import { Button } from "../../ui/button";
import { logOut } from "@/src/lib/actions/user.actions";

interface HeaderProps {
  type?: string;
}

export const Header = ({ type }: HeaderProps) => {
  const pathname = usePathname().replace("/", "");
  return (
    <>
      <header className="flex h-20 items-center mx-[clamp(5rem,_10vw,_60rem)] justify-between">
        {type === "auth" ? (
          <>
            <div className={styles.firstBlockHeader}>
              <Link href="/">
                <Image
                  className={styles.logo}
                  src="/images/logo.svg"
                  alt="logo"
                  width={100}
                  height={100}
                  priority
                />
              </Link>
            </div>
            <div className={styles.secondBlockHeader}>
              <Link
                className="border border-black rounded-md font-medium w-44 h-10 flex justify-center items-center "
                href={pathname === "sign-up" ? "/sign-in" : "/sign-up"}
              >
                {pathname === "sign-up" ? "Log in" : "Register"}
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className={styles.firstBlockHeader}>
              <Link href="/">
                <Image
                  className={styles.logo}
                  src="/images/logo.svg"
                  alt="logo"
                  width={100}
                  height={100}
                />
              </Link>
              <Link href="/">
                <span
                  className={cn(
                    "font-semibold",
                    pathname === "" && "text-primary",
                    styles.userName
                  )}
                >
                  Home
                </span>
              </Link>
              <Link href="/hong-kong">
                <span
                  className={cn(
                    "font-semibold",
                    pathname === "hong-kong" && "text-primary",
                    styles.pageName
                  )}
                >
                  Hong Kong
                </span>
              </Link>
              <Link href="/uk">
                <span
                  className={cn(
                    "font-semibold",
                    pathname === "uk" && "text-primary",
                    styles.pageName
                  )}
                >
                  UK
                </span>
              </Link>
              <Link href="/documentation">
                <span className={cn("font-semibold", pathname === "documentation" && "text-primary", styles.pageName)}>
                  Documentation
                </span>
              </Link>
            </div>
            <div className={cn("w-32", styles.secondBlockHeader)}>
              <Link
                href="/sign-up"
                id="launchModalBtn"
                className={styles.iconButton}
              >
                <Image
                  src="/images/user.png"
                  alt="person"
                  width={36}
                  height={36}
                />
              </Link>
              <Button onClick={logOut} variant={"ghost"}>
                <Image src="/images/exit.svg" alt="exit" width={36} height={36} />
              <Button onClick={logOut} variant={"ghost"}>
                <Image
                  src="/images/exit.svg"
                  alt="exit"
                  width={36}
                  height={36}
                />
              </Button>
            </div>
          </>
        )}
      </header>
      <hr className={styles.divider} />
    </>
  );
};
