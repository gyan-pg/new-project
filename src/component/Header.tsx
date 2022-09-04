import React from 'react';
import { useSelector } from 'react-redux';
import { isLogin } from '../features/userSlice';
import { MdLogout, MdLogin } from 'react-icons/md';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const login = useSelector(isLogin);
  return (
    <>
      <header className="header">
        <Link to="/">
          <h1 className="headerLogo">header</h1>
        </Link>
        {login ? (
          <button className="headerLogout" onClick={() => signOut(auth)}>
            logout
            <MdLogout className="headerLogoutIcon" />
          </button>
        ) : (
          ''
        )}
      </header>
    </>
  );
};

export default Header;
