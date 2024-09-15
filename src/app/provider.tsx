"use client";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ToastContainer />
      <RecoilRoot>{children}</RecoilRoot>
    </>
  );
};
