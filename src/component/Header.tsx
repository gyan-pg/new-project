import React from "react";
import { useSelector } from "react-redux";
import { isLogin } from "../features/userSlice";
import { MdLogout, MdLogin } from "react-icons/md";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

const Header = () => {
  const login = useSelector(isLogin);
  return (
    <>
      <header className="bg-yellow-300 flex py-4 justify-between items-center">
        <h1 className="text-3xl font-bold ml-20">header</h1>
        {login ? <button className="mr-20" onClick={() => signOut(auth)}>ログアウト<MdLogout/></button> : ""}
      </header>
    </>
  );
};

export default Header;
