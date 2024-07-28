import { Schibsted_Grotesk } from "next/font/google";
import React from "react";

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  weights: [400, 500, 600, 700, 900],
});

const InputForm = ({ type, placeholder, value, OnChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={
        "border-gray-1 flex items-center w-full border-4 px-10 py-8 rounded-full mt-10 outline-none focus:border-purple-1 transition-all duration-500 ease-in-out text-black-1 " +
        schibstedGrotesk.className
      }
      value={value}
      onChange={OnChange}
    />
  );
};

export default InputForm;
