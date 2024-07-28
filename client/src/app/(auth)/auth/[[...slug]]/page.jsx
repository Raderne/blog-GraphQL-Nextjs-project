"use client";

import React, { useEffect, useState } from "react";
import { Gloock } from "next/font/google";
import { useGlobalContext } from "@/app/context";
import InputForm from "@/components/InputForm";
import { fetchData } from "@/utils/fetchData";
import { useRouter } from "next/navigation";

const gloock = Gloock({ subsets: ["latin"], weight: "400" });

const AuthPage = () => {
  const router = useRouter();
  const { login, token, setMainColor } = useGlobalContext();
  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (token) {
      router.push("/profile", {
        scroll: true,
      });
    }

    setMainColor("text-purple-1");
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let requestBody = {
      query: `
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            userId
            token
          }
        }
      `,
      variables: {
        email: email,
        password: password,
      },
    };

    if (signUp) {
      if (password !== confirmPassword) return;

      requestBody = {
        query: `
          mutation CreateUser($email: String!, $password: String!) {
            createUser(email: $email, password: $password) {
              _id
              email
            }
          }
        `,
        variables: {
          email: email,
          password: password,
        },
      };
    }

    const resData = await fetchData(requestBody);
    if (resData.errors) return;
    if (!signUp) {
      login(resData.data.login.token, resData.data.login.userId);
      // Redirect to home page
      router.push("/profile", {
        scroll: true,
      });
      setEmail("");
    } else {
      setSignUp(false);
      setEmail(resData.data.createUser.email);
    }

    setPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <h1
        className={
          gloock.className +
          " fit-text leading-[1.1] text-center text-purple-1 select-none -z-10"
        }
      >
        {signUp ? "SIGNUP" : "LOGIN"}
      </h1>

      <div
        className="flex items-center justify-center w-full"
        onSubmit={handleSubmit}
      >
        <form className="flex flex-col min-w-[45rem] mb-20">
          <InputForm
            type={"text"}
            placeholder={"Email"}
            value={email}
            OnChange={(e) => setEmail(e.target.value)}
          />
          <InputForm
            type={"password"}
            placeholder={"Password"}
            value={password}
            OnChange={(e) => setPassword(e.target.value)}
          />
          {signUp && (
            <InputForm
              type={"password"}
              placeholder={"Confirm Password"}
              value={confirmPassword}
              OnChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <div className="flex items-center justify-between gap-6 mt-10">
            <button
              type="submit"
              className="px-24 py-4 my-2 bg-purple-1 text-white-1 font-bold rounded-full hover:bg-white-1 hover:text-purple-1 transition-all duration-300 ease-in-out"
            >
              {signUp ? "SIGNUP" : "LOGIN"}
            </button>

            <p className="text-black-4">-OR-</p>

            <button
              type="button"
              onClick={() => setSignUp(!signUp)}
              className="px-24 py-4 my-2 text-purple-1 bg-white-1 font-bold rounded-full hover:bg-black-1 hover:text-white-1 transition-all duration-300 ease-in-out"
            >
              {signUp ? "LOGIN" : "SIGNUP"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AuthPage;
