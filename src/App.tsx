import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom';

import Header from "./component/Header";
import Main from './component/Main';
import Detail from './component/Detail';
import Auth from './component/Auth';
import Footer from './component/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { isLogin, login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';
import Top from './component/Top';
import NotFound from './component/NotFound';
import FlashMessage from './component/FlashMessage';

const App: React.FC = () => {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const AuthCheck = useSelector(isLogin);

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          uid: authUser.uid,
          photoUrl: authUser.photoURL,
          displayName: authUser.displayName
        }));
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unSub();
    };
  },[dispatch]);


  return (
    <>
      <article className="mx-auto">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={AuthCheck ? <Navigate to="/main" /> : <Top />} />
            <Route path="/auth" element={AuthCheck ? <Navigate to="/main" /> : <Auth />}/>
            <Route path="/main" element={AuthCheck ? <Main /> : <Navigate to="/auth" />} />
            <Route path="/detail/:query" element={AuthCheck ? <Detail /> : <Navigate to="/auth" />}/>
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </BrowserRouter>
      </article>
    </>
  );
}

export default App;
