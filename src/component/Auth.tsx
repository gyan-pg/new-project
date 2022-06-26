import React, { useState } from "react";
// redux
import { isLogin,  updateUserProfile } from "../features/userSlice";
// firebase
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase"; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link } from "react-router-dom";

const Auth = () => {
  const dispatch = useDispatch();
  const AuthCheck = useSelector(isLogin);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [username, setUsername] = useState("");
  const [changeForm, setChangeForm] = useState(true);

  const signIn = async () => {
    await signInWithEmailAndPassword(auth, email, password).catch((err) => alert(err.message));
  };

  const signUp = async () => {
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

  return (
    <section className="mx-auto w-80">
      {AuthCheck ? <Link to="/main">main</Link> : ""}
      <h2 className="text-center">{changeForm ? "LOGIN": "REGISTER"}</h2>
      {changeForm ? 
      <>
        <label htmlFor="email">email</label>
        <input className="block border w-full" id="email" type="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setEmail(e.target.value)}} />
        <label htmlFor="password">password</label>
        <input className="block border w-full" id="password" type="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value)}} />
        <button className="border px-4 py-2 text-sm" onClick={() => signIn()}>Login</button> 
      </>
      :
      <>
        <label htmlFor="username">username</label>
        <input className="block border w-full" id="username" type="text" value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setUsername(e.target.value)}} />
        <label htmlFor="email">email</label>
        <input className="block border w-full" id="email" type="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setEmail(e.target.value)}} />
        <label htmlFor="password">password</label>
        <input className="block border w-full" id="password" type="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value)}} />
        <label htmlFor="password">password confirmation</label>
        <input className="block border w-full" id="password_confirmation" type="password" value={passwordConfirmation} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setPasswordConfirmation(e.target.value)}} />
        <button className="border px-4 py-2 text-sm" onClick={() => { signUp() }}>Register</button> 
      </> }
      
      
      <button className="border px-4 py-2 text-sm" onClick={() => {setChangeForm(!changeForm)}}>{changeForm ? "REGISTER?" : "LOGIN?"}</button>
    </section>
  );
};

export default Auth;
