import React from "react";
import styles from "top.module.scss";
import { Link } from "react-router-dom";


const Top = () => {

  return (
    <>
      <main className="relative">
      <section className="w-full">
        <div className="">

        </div>
      <Link to="/auth">ログイン / サインイン</Link>
      <div>top</div>
      </section>
      </main>
    </>
  );
};

export default Top;
