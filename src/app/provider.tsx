"use client";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ToastContainer />
      <SessionProvider>
        <RecoilRoot>{children}</RecoilRoot>
      </SessionProvider>
    </>
  );
};
