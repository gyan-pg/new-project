import React from "react";
import { Link } from "react-router-dom";
// picture
import benchPress from "../images/bench_press.jpeg";
import pullDown from "../images/pull_down.jpg";
import legPress from "../images/leg_press.jpeg";


const Main = () => {
  return (
    <main className="container mx-auto">
      <section className="text-center">
        <h1 className="py-10 text-5xl">筋トレの記録用アプリ</h1>
      </section>
      <section className="grid grid-cols-3 gap-4">
        <Link to="/detail/bench_press">
          <div className="bg-green-300 p-10 hover:cursor-pointer"><img src={benchPress} alt="ベンチプレス"/></div>
        </Link>
        <Link to="/detail/pull_down">
          <div className="bg-green-300 p-10 hover:cursor-pointer"><img src={pullDown} alt="ラットプルダウン"/></div>
        </Link>
        <Link to="/detail/leg_press">
          <div className="bg-green-300 p-10 hover:cursor-pointer"><img src={legPress} alt="レッグプレス"/></div>
        </Link>
      </section>
    </main>
  );
};

export default Main;
