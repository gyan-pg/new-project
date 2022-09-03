import React, { useEffect, useState } from 'react';
// redux
import { isLogin, updateUserProfile } from '../features/userSlice';
// firebase
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import '../css/auth.scss';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import Header from './Header';
import FlashMessage from './FlashMessage';
import Footer from './Footer';

const Auth = () => {
  type ERR = {
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
  };

  const dispatch = useDispatch();
  const AuthCheck = useSelector(isLogin);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [username, setUsername] = useState('');
  const [changeForm, setChangeForm] = useState(true);
  const [errFlg, setErrFlg] = useState(false);
  const [submitFlg, setSubmitFlg] = useState(false);
  const [err, setErr] = useState<ERR>({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [loadingFlg, setLoadingFlg] = useState(false);

  const signIn = async () => {
    setLoadingFlg(true);
    await signInWithEmailAndPassword(auth, email, password).catch((err) => {
      setLoadingFlg(false);
      alert(err.message);
    });
  };

  const signUp = async () => {
    if (password !== passwordConfirmation) {
      setErrFlg(true);
      const errMsg = { ...err };
      errMsg['password_confirmation'] = 'パスワードが一致しません';
      setErr(errMsg);
      return;
    }
    setLoadingFlg(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: username,
          photoURL: '',
        });
      })
      .catch((err) => {
        alert(err.message);
        setLoadingFlg(false);
      });
    dispatch(
      updateUserProfile({
        displayName: username,
        photoUrl: '',
      })
    );
  };

  const setValue = (
    setFunc: React.Dispatch<React.SetStateAction<string>>,
    value: string,
    type: keyof ERR
  ) => {
    validRequired(value, type);
    setFunc(value);
  };

  const switchForm = () => {
    setErrFlg(false);
    setChangeForm(!changeForm);
  };

  // validation
  const validRequired = (str: string, type: keyof ERR) => {
    if (!str.length) {
      setErrFlg(true);
      const errMsg = { ...err };
      errMsg[type] = '入力必須項目です';
      setErr(errMsg);
    } else {
      const errMsg = { ...err };
      errMsg[type] = '';
      setErr(errMsg);
    }
  };

  useEffect(() => {
    if (
      err.username === '' &&
      err.email === '' &&
      err.password === '' &&
      err.password_confirmation === ''
    ) {
      setErrFlg(false);
    }
  }, [username, email, password, passwordConfirmation]);

  // submitFlgの監視
  useEffect(() => {
    if (changeForm) {
      // ログイン画面の時
      if (email.length !== 0 && password.length !== 0 && !errFlg) {
        setSubmitFlg(true);
      } else {
        setSubmitFlg(false);
      }
    } else {
      // ユーザー登録の時
      if (
        username.length !== 0 &&
        email.length !== 0 &&
        password.length !== 0 &&
        passwordConfirmation.length !== 0 &&
        !errFlg
      ) {
        setSubmitFlg(true);
      } else {
        setSubmitFlg(false);
      }
    }
  }, [username, email, password, passwordConfirmation, errFlg]);

  return (
    <>
      <Header />
      <main className="mainContainer">
        <FlashMessage />
        <section className="authContainer">
          {AuthCheck ? <Link to="/main">main</Link> : ''}
          <h2 className="authTitle">{changeForm ? 'LOGIN' : 'REGISTER'}</h2>
          {changeForm ? (
            <>
              <label htmlFor="email">email</label>
              <span className="textErr">{errFlg ? err.email : ''}</span>
              <input
                className="authInput"
                id="email"
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setValue(setEmail, e.target.value, 'email');
                }}
              />
              <label htmlFor="password">password</label>
              <span className="textErr">{errFlg ? err.password : ''}</span>
              <input
                className="authInput"
                id="password"
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setValue(setPassword, e.target.value, 'password');
                }}
              />
            </>
          ) : (
            <>
              <label htmlFor="username">username</label>
              <span className="textErr">{errFlg ? err.username : ''}</span>
              <input
                className="authInput"
                id="username"
                type="text"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setValue(setUsername, e.target.value, 'username');
                }}
              />
              <label htmlFor="email">email</label>
              <span className="textErr">{errFlg ? err.email : ''}</span>
              <input
                className="authInput"
                id="email"
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setValue(setEmail, e.target.value, 'email');
                }}
              />
              <label htmlFor="password">password</label>
              <span className="textErr">{errFlg ? err.password : ''}</span>
              <input
                className="authInput"
                id="password"
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setValue(setPassword, e.target.value, 'password');
                }}
              />
              <label htmlFor="password">password confirmation</label>
              <span className="textErr">{errFlg ? err.password_confirmation : ''}</span>
              <input
                className="authInput"
                id="password_confirmation"
                type="password"
                value={passwordConfirmation}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setValue(setPasswordConfirmation, e.target.value, 'password_confirmation');
                }}
              />
            </>
          )}

          <div className="authBtnContainer">
            <button
              className={`btn ${!submitFlg ? 'notSubmit' : 'submit'}`}
              disabled={!submitFlg}
              onClick={() => {
                if (changeForm) {
                  signIn();
                } else {
                  signUp();
                }
              }}
            >
              {changeForm ? 'Login' : 'Register'}
            </button>
            {/* <button className={`border inline-block w-1/5 bg-blue-200 py-1 ${!submitFlg ? "bg-gray-200" : ""}`} disabled={!submitFlg} onClick={() => signUp() }>Register</button> */}
            <button
              className="btn"
              onClick={() => {
                switchForm();
              }}
            >
              {changeForm ? 'REGISTER?' : 'LOGIN?'}
            </button>
          </div>
          {loadingFlg ? <Loading /> : ''}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Auth;
