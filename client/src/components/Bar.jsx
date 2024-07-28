import Image from "next/image";
import Link from "next/link";
import React from "react";

const Bar = ({ text, icon, font, extraStyles, href }) => {
  return (
    <Link
      href={href || "/"}
      className={
        "flex items-center gap-12 w-full border-4 px-10 py-8 rounded-full mt-10 " +
        extraStyles
      }
    >
      <Image
        src={icon}
        alt="icon"
        width={60}
        height={60}
        className="object-cover"
      />
      <p className={"text-black-1 text-7xl font-bold " + font}>{text}</p>
    </Link>
  );
};

export default Bar;
