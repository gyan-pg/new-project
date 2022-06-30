import React, { useEffect, useState } from "react";
// redux
import { isLogin,  updateUserProfile } from "../features/userSlice";
// firebase
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase"; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link } from "react-router-dom";

const Auth = () => {

  type ERR = {
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
  }

  const dispatch = useDispatch();
  const AuthCheck = useSelector(isLogin);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [username, setUsername] = useState("");
  const [changeForm, setChangeForm] = useState(true);
  const [errFlg, setErrFlg] = useState(false);
  const [submitFlg, setSubmitFlg] = useState(false);
  const [err, setErr] = useState<ERR>({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  })

  const signIn = async () => {
    await signInWithEmailAndPassword(auth, email, password).catch((err) => alert(err.message));
  };

  const signUp = async () => {
    if (password !== passwordConfirmation) {
      setErrFlg(true);
      const errMsg = {...err};
      errMsg["password_confirmation"] = "パスワードが一致しません";
      setErr(errMsg);
      return ;
    }
    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(user, {
        displayName: username,
        photoURL: ""
      });
    })
    .catch((err) => {
      alert(err.message);
    });
    dispatch(updateUserProfile({
      displayName: username,
      photoUrl: "",
    }));
  };

  const setValue = (setFunc:  React.Dispatch<React.SetStateAction<string>>, value: string, type: keyof ERR) => {
    validRequired(value, type);
    setFunc(value)
  };

  const switchForm = () => {
    setErrFlg(false);
    setChangeForm(!changeForm);
  };

  // validation
  const validRequired = (str: string, type: keyof ERR) => {
    if (!str.length) {
      setErrFlg(true);
      const errMsg = {...err};
      errMsg[type] = "入力必須項目です";
      setErr(errMsg);
    } else {
      const errMsg = {...err};
      errMsg[type] = "";
      setErr(errMsg);
    }

  };

  useEffect(() => {
    if (err.username === "" && err.email === "" && err.password === "" && err.password_confirmation === "") {
      setErrFlg(false);
    }
  },[username, email, password, passwordConfirmation]);

  // submitFlgの監視
  useEffect(() => {
    if (changeForm) { // ログイン画面の時
      if (email.length !== 0 && password.length !== 0 && !errFlg) {
        setSubmitFlg(true);
      } else {
        setSubmitFlg(false);
      }
    } else { // ユーザー登録の時
      if ((username.length !== 0 && email.length !== 0 && password.length !== 0 && passwordConfirmation.length !== 0 && !errFlg)) {
        setSubmitFlg(true);
      } else {
        setSubmitFlg(false);
      }
    }
  },[username, email, password, passwordConfirmation, errFlg]);


  return (
    <section className="mx-auto w-80 pt-20">
      {AuthCheck ? <Link to="/main">main</Link> : ""}
      <h2 className="text-center">{changeForm ? "LOGIN": "REGISTER"}</h2>
      {changeForm ? 
      <>
        <label htmlFor="email">email</label><span className="text-red-400 text-xs ml-4">{errFlg ? err.email : ""}</span>
        <input className="px-2 py-1 border block w-full mb-4" id="email" type="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setValue(setEmail, e.target.value, "email")}} />
        <label htmlFor="password">password</label><span className="text-red-400 text-xs ml-4">{errFlg ? err.password : ""}</span>
        <input className="px-2 py-1 border block w-full mb-4" id="password" type="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setValue(setPassword, e.target.value, "password")}} />
      </>
      :
      <>
        <label htmlFor="username">username</label><span className="text-red-400 text-xs ml-4">{errFlg ? err.username : ""}</span>
        <input className="px-2 py-1 border block w-full mb-4" id="username" type="text" value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setValue(setUsername, e.target.value, "username")}} />
        <label htmlFor="email">email</label><span className="text-red-400 text-xs ml-4">{errFlg ? err.email : ""}</span>
        <input className="px-2 py-1 border block w-full mb-4" id="email" type="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setValue(setEmail, e.target.value, "email")}} />
        <label htmlFor="password">password</label><span className="text-red-400 text-xs ml-4">{errFlg ? err.password : ""}</span>
        <input className="px-2 py-1 border block w-full mb-4" id="password" type="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setValue(setPassword, e.target.value, "password")}} />
        <label htmlFor="password">password confirmation</label><span className="text-red-400 text-xs ml-4">{errFlg ? err.password_confirmation : ""}</span>
        <input className="px-2 py-1 border block w-full mb-4" id="password_confirmation" type="password" value={passwordConfirmation} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setValue(setPasswordConfirmation, e.target.value, "password_confirmation")}} /> 
      </> }
      
      <div className="flex justify-between items-center">
        <button className={`border inline-block w-2/5 bg-blue-200 py-1 ${!submitFlg ? "bg-gray-200" : ""}`} disabled={!submitFlg} onClick={() => {if(changeForm) {signIn()} else {signUp()} }}>{changeForm ? "Login" : "Register"}</button> 
        {/* <button className={`border inline-block w-1/5 bg-blue-200 py-1 ${!submitFlg ? "bg-gray-200" : ""}`} disabled={!submitFlg} onClick={() => signUp() }>Register</button> */}
        <button className="border px-4 py-2 text-sm w-2/5 hover:bg-blue-200 transition duration-300" onClick={() => {switchForm()}}>{changeForm ? "REGISTER?" : "LOGIN?"}</button>
      </div>
    </section>
  );
};

export default Auth;
