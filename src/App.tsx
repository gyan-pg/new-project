import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from "./component/Header";
import Main from './component/Main';
import Detail from './component/Detail';

const App: React.FC = () => {

  return (
    <>
      <article className="mx-auto">
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}/>
            <Route path="/detail/:query" element={<Detail />}/>
          </Routes>
        </BrowserRouter>
      </article>
    </>
  );
}

export default App;
