"use client";

import React from "react";
import { Schibsted_Grotesk } from "next/font/google";
import Link from "next/link";
import { useGlobalContext } from "@/app/context";

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  weights: [400, 500, 600, 700, 900],
});

const Navbar = () => {
  const { token, mainColor } = useGlobalContext();

  return (
    <header className="h-14 bg-transparent absolute w-full top-0 pt-4 pb-10 px-4 z-50">
      <nav
        className={"flex justify-between items-center font-bold " + mainColor}
      >
        <Link href={"/"}>Home</Link>
        <Link href={"/explore"}>Explore</Link>
        <Link href={"/create"}>Create</Link>
        {!token && <Link href={"/auth"}>Login</Link>}
        {token && <Link href={"/profile"}>Profile</Link>}
      </nav>
    </header>
  );
};

export default Navbar;
