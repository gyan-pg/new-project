import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { IParallax, Parallax, ParallaxLayer } from '@react-spring/parallax';
import trainingGuy from '../images/trainingGuy.jpeg';
import slim from '../images/slim.jpeg';
import sleep from '../images/sleep.jpeg';
import memory from '../images/memory.jpeg';
import young from '../images/young.jpeg';
import stress from '../images/stress.jpeg';
import register from '../images/register.jpeg';
import memo from '../images/memo.jpeg';
import select from '../images/select.jpeg';

// images

const Top: React.FC = () => {
  // const [flip, set] = useState(false);
  // const props = useSpring({
  //   to: {opacity: 1, color: "red"},
  //   from: {opacity: 0, color: "blue"},
  //   reset: true,
  //   reverse: flip,
  //   delay: 200,
  //   onRest: () => set(!flip)
  // });

  const parallax = useRef<IParallax>(null!);
  const section1Offset = 1;
  const section2Offset = section1Offset + 1;
  const section3Offset = section2Offset + 2.5;
  const section4Offset = section3Offset + 3;
  const section5Offset = section4Offset + 1;
  const totalPage = section5Offset + 2.5;
  console.log(totalPage);
  useEffect(() => {
    const container = document.querySelector('.parallaxContainer');
    container?.addEventListener('scroll', () => {
      // 100vh = 1として換算
      let scrollHeight = parallax.current.current / window.innerHeight;

      if (scrollHeight > 4.6) document.querySelector('.js-slide-in')?.classList.add('active');
      if (scrollHeight > 5 || scrollHeight < 4.6) {
        document.querySelector('.js-slide-in')?.classList.remove('active');
      }

      const slide1 = document.querySelectorAll('.js-slide-in1');
      const slide2 = document.querySelectorAll('.js-slide-in2');
      const slide3 = document.querySelectorAll('.js-slide-in3');
      const slide4 = document.querySelectorAll('.js-slide-in4');
      const slide5 = document.querySelectorAll('.js-slide-in5');

      if (scrollHeight > 5) {
        slide1.forEach((elm) => {
          elm.classList.add('active');
        });
      } else {
        slide1.forEach((elm) => {
          elm.classList.remove('active');
        });
      }
      if (scrollHeight > 5.2) {
        slide2.forEach((elm) => {
          elm.classList.add('active');
        });
      } else {
        slide2.forEach((elm) => {
          elm.classList.remove('active');
        });
      }
      if (scrollHeight > 5.4) {
        slide3.forEach((elm) => {
          elm.classList.add('active');
        });
      } else {
        slide3.forEach((elm) => {
          elm.classList.remove('active');
        });
      }
      if (scrollHeight > 5.6) {
        slide4.forEach((elm) => {
          elm.classList.add('active');
        });
      } else {
        slide4.forEach((elm) => {
          elm.classList.remove('active');
        });
      }
      if (scrollHeight > 5.8) {
        slide5.forEach((elm) => {
          elm.classList.add('active');
        });
      } else {
        slide5.forEach((elm) => {
          elm.classList.remove('active');
        });
      }
      if (scrollHeight > 6) {
        document.querySelector('.js-slide-in6')?.classList.add('active');
      } else {
        document.querySelector('.js-slide-in6')?.classList.remove('active');
      }

      const slide7 = document.querySelectorAll('.js-slide-in7');
      if (scrollHeight > 7) {
        slide7.forEach((elm) => {
          elm.classList.add('active');
        });
      } else {
        slide7.forEach((elm) => {
          elm.classList.remove('active');
        });
      }

      if (scrollHeight > 1.5) {
        document.querySelector('.js-fade1')?.classList.add('active');
      } else {
        document.querySelector('.js-fade1')?.classList.remove('active');
      }

      const fade2 = document.querySelectorAll('.js-fade2');
      if (scrollHeight > 1.7) {
        fade2.forEach((elm) => {
          elm.classList.add('active');
        });
      } else {
        fade2.forEach((elm) => {
          elm.classList.remove('active');
        });
      }

      if (scrollHeight > 8.5) {
        document.querySelector('.js-fade3')?.classList.add('active');
      } else {
        document.querySelector('.js-fade3')?.classList.remove('active');
      }

      if (scrollHeight > 8.8) {
        document.querySelector('.js-slide-up1')?.classList.add('active');
      } else {
        document.querySelector('.js-slide-up1')?.classList.remove('active');
      }

      if (scrollHeight > 9.1) {
        document.querySelector('.js-slide-up2')?.classList.add('active');
      } else {
        document.querySelector('.js-slide-up2')?.classList.remove('active');
      }
      if (scrollHeight > 9.4) {
        document.querySelector('.js-slide-up3')?.classList.add('active');
      } else {
        document.querySelector('.js-slide-up3')?.classList.remove('active');
      }
      if (scrollHeight > 9.7) {
        document.querySelector('.js-slide-up4')?.classList.add('active');
      } else {
        document.querySelector('.js-slide-up4')?.classList.remove('active');
      }
    });
  });

  return (
    <>
      {/* <animated.h1 style={props}>hello</animated.h1> */}
      <header className="topHeader">
        <nav className="nav">
          <ul className="navList">
            <Link to="/auth">
              <li className="navItem">login / register</li>
            </Link>
          </ul>
        </nav>
      </header>
      <Parallax ref={parallax} pages={totalPage} className="parallaxContainer">
        <ParallaxLayer factor={1.21}>
          <div className="linearAnimation"></div>
        </ParallaxLayer>
        {/* <section id="top" className="h-screen flex justify-center items-center"> */}
        <div className="eyeCatchContainer">
          <div>
            <p className="headMessage">Strength training won't betray you!!!!</p>
            <p className="headMessageSub">
              筋トレはあなたを裏切らない！！<span className="seekMessage">たぶん</span>
            </p>
          </div>
        </div>
        <ParallaxLayer offset={0.7} sticky={{ start: 1.3, end: 3 }}>
          <h2 className="sectionAlpha">ABOUT</h2>
          <div className="sectionAlphaImgContainer js-fade2">
            <img src={trainingGuy} alt="training" />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={section2Offset} sticky={{ start: 1.5, end: 3 }}>
          <div className="aboutMessageContainer">
            <p className="sectionMessage about js-fade1">今こそ筋トレを始めよう！</p>
            <div className="sectionMessageBody about js-fade2">
              <p>30代になって体力が落ちた、太りやすくなった、なんて感じていませんか？</p>
              <p>
                20代の頃は平気だった無理が今はできない、集中力が落ちている、よく眠れなくなった・・・などなど
              </p>
              <p>その変化はちょっと怖くも感じますが、加齢による衰えで普通のことです</p>
              <p>普通のことだからといって、それを受け入れてしまっても良いのでしょうか？</p>
              <p>答えはもちろん、否です！！</p>
              <p>いつまでも元気で、はつらつとして生きていきたいですよね！</p>
              <p>そう思っているあなたに残された道はひとつしかありません</p>
              <p>筋トレです！！！</p>
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={section1Offset + 0.5} speed={0.5} factor={4}>
          <div className="js-fade midBack" />
        </ParallaxLayer>

        {/* </section> */}
        {/* <section id="benefit" className="h-screen"> */}
        <ParallaxLayer
          offset={section3Offset}
          sticky={{ start: section3Offset, end: section3Offset + 2 }}
          speed={0.5}
        >
          <div className="benefitImg position1 js-slide-in1">
            <img src={slim} />
          </div>
          <div className="benefitImg position2 js-slide-in2">
            <img src={sleep} />
          </div>
          <div className="benefitImg position3 js-slide-in3">
            <img src={memory} />
          </div>
          <div className="benefitImg position4 js-slide-in4">
            <img src={young} />
          </div>
          <div className="benefitImg position5 js-slide-in5">
            <img src={stress} />
          </div>
        </ParallaxLayer>
        <ParallaxLayer
          offset={section3Offset}
          sticky={{ start: section3Offset, end: section3Offset + 2 }}
        >
          <h2 className="sectionAlpha">BENEFIT</h2>
          <div className="benefitMessageContainer">
            <div className="benefitContainer" id="benefitContainer">
              <div className="js-slide-in introduce">素晴らしき筋トレの効果をご紹介します！</div>
              <h3 className="js-slide-in1 benefit offset1">
                <p className="benefitInner">
                  <span className="benefitNo">1</span>痩せやすい体になる！
                </p>
              </h3>
              <h3 className="js-slide-in2 benefit offset2">
                <p className="benefitInner">
                  <span className="benefitNo">2</span>自律神経が整う＝快眠効果！
                </p>
              </h3>

              <h3 className="js-slide-in3 benefit offset3">
                <p className="benefitInner">
                  <span className="benefitNo">3</span>記憶力がアップする！
                </p>
              </h3>
              <h3 className="js-slide-in4 benefit offset4">
                <p className="benefitInner">
                  <span className="benefitNo">4</span>若々しさを保てる！
                </p>
              </h3>
              <h3 className="js-slide-in5 benefit offset5">
                <p className="benefitInner">
                  <span className="benefitNo">5</span>ストレス発散！
                </p>
              </h3>
            </div>
            <p className="js-slide-in6 benefit">など、素晴らしい効能が期待できます！</p>
          </div>
        </ParallaxLayer>
        {/* </section> */}
        {/* <section id="recommend" className="h-screen"> */}
        <ParallaxLayer offset={section4Offset}>
          <h2 className="sectionAlpha">What you need?</h2>
          <div className="doubleColumnContainer">
            <div className="doubleColumnLeft js-slide-in7">
              <h2 className="doubleColumnCenter">筋トレにおいて必要なもの</h2>
            </div>
            <div className="doubleColumnRight">
              <div className="doubleColumnRightContent js-slide-in7">
                <p>
                  ここまで筋トレの良い側面についてお伝えしましたが、なぜ筋トレを日常的に行わない方が多いのでしょうか？
                </p>
                <p>答えは、辛いからです！筋トレをするのには、多少の苦痛が伴います。</p>
                <p>
                  この辛さから逃れる術は残念ながらありません。むしろ辛さを楽しむ心の余裕を持ちましょう。
                </p>
                <p>
                  心の余裕の他に、もう一つ必要なものがあります。それは、日々の筋トレの記録を取ることです。
                </p>
                <p>
                  筋肉を成長させるには、常に今の自分の限界に対し適切な負荷をかける必要があります。
                </p>
                <p>1kgの重りが楽に感じたら、次は1.5kgの重りを使うといった具合です。</p>
                <p>何事もそうですが、楽をしていても成長はしないのです。</p>
                <p>
                  記録をつけていくことで自身の成長を可視化でき、更なる筋トレへのモチベーションへとつながることでしょう。
                </p>
                <p>このアプリでは、筋トレの記録について皆さんのお手伝いが可能です。</p>
              </div>
            </div>
          </div>
        </ParallaxLayer>
        {/* </section> */}
        {/* <section id="conclusion" className="h-screen"> */}
        <ParallaxLayer
          offset={section5Offset}
          sticky={{ start: section5Offset, end: section5Offset + 2 }}
        >
          <h2 className="sectionAlpha">How to use</h2>
          <div className="js-fade3 usageSection">
            <p className="usageMessage">このアプリは簡単３ステップでご利用になれます。</p>
            <div className="usageCardContainer">
              <div className="usageCard js-slide-up1">
                <h3 className="usageCardTitle">1.ユーザー登録をする</h3>
                <div className="usageCardImgContainer">
                  <img className="usageCardImg" src={register} />
                </div>
                <p>まずはユーザー登録をしましょう。</p>
              </div>
              <div className="usageCard js-slide-up2">
                <h3 className="usageCardTitle">2.トレーニング項目を選択する</h3>
                <div className="usageCardImgContainer">
                  <img className="usageCardImg" src={select} />
                </div>
                <p>ログイン後の画面でトレーニングの項目を選択してください。</p>
              </div>
              <div className="usageCard js-slide-up3">
                <h3 className="usageCardTitle">3.記録をつける</h3>
                <div className="usageCardImgContainer">
                  <img className="usageCardImg" src={memo} />
                </div>
                <p>トレーニング項目を選択したら、あとは記録をつけるだけです。</p>
              </div>
            </div>
          </div>
          <p className="usageCardConclusion js-slide-up4">
            トレーニングの記録はグラフとして表示されますので、あなたのこれまでの成長を一目で確認することができます。
          </p>
        </ParallaxLayer>
        {/* </section> */}
      </Parallax>
    </>
  );
};

export default Top;
