"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/src/lib/utils";
import { usePathname } from "next/navigation";
import { Button } from "../../ui/button";
import { logOut } from "@/src/lib/actions/user.actions";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../ui/drawer";

interface HeaderProps {
  type?: string;
}

export const Header = ({ type }: HeaderProps) => {
  const pathname = usePathname().replace("/", "");
  return (
    <>
      <header className="flex flex-col sm:flex-row justify-center sm:justify-between h-16 sm:20 w-full px-4 sm:px-16">
        {type === "auth" ? (
          <div className="flex justify-between w-full">
            <div className="flex items-center">
              <Link href="/">
                <Image
                  className="max-w-16 max-h-16"
                  src="/images/main-logo.webp"
                  alt="logo"
                  width={100}
                  height={100}
                  priority
                />
              </Link>
            </div>
            <div className="flex justify-between items-center">
              <Link
                className="border border-black rounded-md font-medium w-44 h-10 flex justify-center items-center "
                href={pathname === "sign-up" ? "/sign-in" : "/sign-up"}>
                {pathname === "sign-up" ? "Log in" : "Register"}
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden sm:flex gap-12 items-center">
              <Link href="/">
                <Image
                  className="max-w-16 max-h-16"
                  src="/images/main-logo.webp"
                  alt="logo"
                  width={100}
                  height={100}
                />
              </Link>
              <Link href="/">
                <span
                  className={cn(
                    "font-semibold text-md md:text-xl lg:text-2xl",
                    pathname === "" && "text-primary"
                  )}>
                  Home
                </span>
              </Link>
              <Link href="/hong-kong">
                <span
                  className={cn(
                    "font-semibold text-md md:text-xl lg:text-2xl",
                    pathname === "hong-kong" && "text-primary"
                  )}>
                  Hong Kong
                </span>
              </Link>
              <Link href="/uk">
                <span
                  className={cn(
                    "font-semibold text-md md:text-xl lg:text-2xl",
                    pathname === "uk" && "text-primary"
                  )}>
                  UK
                </span>
              </Link>
              <Link href="/lithuania">
                <span
                  className={cn(
                    "font-semibold text-md md:text-xl lg:text-2xl",
                    pathname === "lithuania" && "text-primary"
                  )}>
                  Lithuania
                </span>
              </Link>
              {/* <Link href="/documentation">
                <span
                  className={cn(
                    "font-semibold text-md md:text-xl lg:text-2xl",
                    pathname === "documentation" && "text-primary"
                  )}>
                  Documentation
                </span>
              </Link> */}
            </div>

            {/* Mobile */}
            <div className="flex sm:hidden justify-between items-center">
              <Drawer direction="top">
                <DrawerTrigger asChild>
                  <Button className="p-0" variant={"ghost"}>
                    <Image src="/images/menu.webp" alt="exit" width={36} height={36} />
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                      <DrawerTitle></DrawerTitle>
                      <DrawerDescription></DrawerDescription>
                    </DrawerHeader>
                    <div className="pb-0 flex flex-col ml-4 gap-2">
                      <Link href="/">
                        <span className={cn("font-semibold text-2xl", pathname === "" && "text-primary")}>
                          Home
                        </span>
                      </Link>
                      <Link href="/hong-kong">
                        <span
                          className={cn(
                            "font-semibold text-2xl",
                            pathname === "hong-kong" && "text-primary"
                          )}>
                          Hong Kong
                        </span>
                      </Link>
                      <Link href="/uk">
                        <span className={cn("font-semibold text-2xl", pathname === "uk" && "text-primary")}>
                          UK
                        </span>
                      </Link>
                      <Link href="/lithuania">
                        <span
                          className={cn(
                            "font-semibold text-2xl",
                            pathname === "lithuania" && "text-primary"
                          )}>
                          Lithuania
                        </span>
                      </Link>
                      {/* <Link href="/documentation">
                        <span
                          className={cn(
                            "font-semibold text-2xl",
                            pathname === "documentation" && "text-primary"
                          )}
                        >
                          Documentation
                        </span>
                      </Link> */}
                    </div>
                    <DrawerFooter>
                      <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>
              <Link className={cn("hidden", pathname === "" && "block")} href="/">
                <Image
                  className="max-w-16 max-h-16"
                  src="/images/main-logo.webp"
                  alt="logo"
                  width={100}
                  height={100}
                />
              </Link>
              <Link className={cn("mr-12 min-w-28", pathname === "" && "hidden")} href="/">
                <span className={cn("font-semibold text-2xl", pathname === "" && "hidden")}>
                  {pathname === "hong-kong"
                    ? "Hong Kong"
                    : pathname === "uk"
                    ? "UK"
                    : pathname === "lithuania"
                    ? "Lithuania"
                    : "Documentaion"}
                </span>
              </Link>
              <Link href="/sign-up" id="launchModalBtn" className="flex items-center">
                <Image src="/images/user.webp" alt="person" width={36} height={36} />
              </Link>
            </div>
            <div className={cn("hidden w-24 sm:flex justify-between items-center")}>
              <Link href="/sign-up" id="launchModalBtn" className="flex items-center max-w-12 max-h-12">
                <Image className="w-8 h-8" src="/images/user.webp" alt="person" width={100} height={100} />
              </Link>
              <Button className="p-0 max-w-12 max-h-12" onClick={logOut} variant={"ghost"}>
                <Image className="w-8 h-8" src="/images/exit.svg" alt="exit" width={100} height={100} />
              </Button>
            </div>
          </>
        )}
      </header>
      <hr className="border-none h-[1px] bg-[#333]" />
    </>
  );
};
