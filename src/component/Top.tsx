import { config } from 'process';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import styles from '../cssModules/top.module.scss';
import { IParallax, Parallax, ParallaxLayer } from '@react-spring/parallax';
import '../css/top.scss';

// images
import trainingWoman from '../images/muscle_girl.jpeg';
import manInFrontOfBoard from '../images/before_training.jpeg';
import humin from '../images/humin.png';
import fat from '../images/fat.png';
import ikigire from '../images/ikigire.png';

const Top = () => {
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
  const section4Offset = section3Offset + 2;
  const section5Offset = section4Offset + 1;
  const totalPage = section5Offset + 1;

  useEffect(() => {
    const container = document.querySelector('.parallaxContainer');
    container?.addEventListener('scroll', () => {
      // 100vh = 1として換算
      let scrollHeight = parallax.current.current / window.innerHeight;

      if (scrollHeight > 4.6) {
        document.querySelector('.js-slide-in1')?.classList.add('active');
      } else {
        document.querySelector('.js-slide-in1')?.classList.remove('active');
      }
      if (scrollHeight > 4.7) {
        document.querySelector('.js-slide-in2')?.classList.add('active');
      } else {
        document.querySelector('.js-slide-in2')?.classList.remove('active');
      }
      if (scrollHeight > 4.8) {
        document.querySelector('.js-slide-in3')?.classList.add('active');
      } else {
        document.querySelector('.js-slide-in3')?.classList.remove('active');
      }
      if (scrollHeight > 4.9) {
        document.querySelector('.js-slide-in4')?.classList.add('active');
      } else {
        document.querySelector('.js-slide-in4')?.classList.remove('active');
      }
      if (scrollHeight > 5) {
        document.querySelector('.js-slide-in5')?.classList.add('active');
      } else {
        document.querySelector('.js-slide-in5')?.classList.remove('active');
      }
      if (scrollHeight > 5.2) {
        document.querySelector('.js-slide-in6')?.classList.add('active');
      } else {
        document.querySelector('.js-slide-in6')?.classList.remove('active');
      }
    });
  });

  return (
    <>
      {/* <animated.h1 style={props}>hello</animated.h1> */}
      <header className="fixed right-0 py-5 mr-20 z-10">
        <nav className="">
          <ul className="text-gray-500 hover:text-gray-300">
            <Link to="/auth">
              <li>login / register</li>
            </Link>
          </ul>
        </nav>
      </header>
      <Parallax ref={parallax} pages={totalPage} className="parallaxContainer">
        <ParallaxLayer factor={4.5}>
          <div className={styles.linearAnimation}></div>
        </ParallaxLayer>
        {/* <section id="top" className="h-screen flex justify-center items-center"> */}
        <div className={`relative font-mono h-screen w-screen flex items-center justify-center`}>
          <div>
            <p className="text-6xl text-center">Strength training won't betray you!!!!</p>
            <p className="mt-5 font-sans text-center">
              筋トレはあなたを裏切らない！！<span className="text-gray-300 text-xs">たぶん</span>
            </p>
          </div>
        </div>
        {/* </section> */}
        {/* <section id="introduction" className="h-screen flex relative justify-center items-center"> */}
        {/* <ParallaxLayer offset={3} speed={0.2}>
          <div className={styles.pictureGirlContainer}>
            <img src={trainingWoman} className={styles.pictureGirl} alt="筋トレしている女性" />
          </div>
        </ParallaxLayer> */}
        {/* <ParallaxLayer offset={2.5} speed={0.5}>
          <div className={styles.pictureBoyContainer}>
            <img src={manInFrontOfBoard} className={styles.pictureBoy} alt="筋トレしたそうな男性" />
          </div>
        </ParallaxLayer> */}
        <ParallaxLayer offset={0.7} sticky={{ start: 1.3, end: 3 }} speed={-0.3}>
          <h2 className={styles.sectionTitle}>なぜ筋トレ？？？</h2>
        </ParallaxLayer>
        <ParallaxLayer
          offset={section2Offset}
          sticky={{ start: 2, end: 3 }}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <div
            style={{
              display: 'inline-block',
              padding: '40px',
              borderRadius: '20px',
              backgroundColor: 'rgba(255, 180, 100, 0.5)',
            }}
          >
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
        </ParallaxLayer>
        <ParallaxLayer offset={section2Offset + 0.9} speed={0.5}>
          <div className={styles.imageContainerLeft}>
            <img src={humin} className={styles.img} />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={section2Offset + 1.2} speed={0.7}>
          <div className={styles.imageContainerLeft}>
            <img src={fat} className={styles.img} />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={section2Offset + 1} speed={0.9}>
          <div className={styles.imageContainerRight}>
            <img src={ikigire} className={styles.img} />
          </div>
        </ParallaxLayer>

        {/* </section> */}
        {/* <section id="benefit" className="h-screen"> */}
        <ParallaxLayer
          offset={section3Offset}
          sticky={{ start: section3Offset, end: section3Offset + 1 }}
        >
          <h2 className={styles.sectionTitle}>筋トレの効能</h2>
          <div className={styles.sectionContent}>
            <div className={styles.sectionInner}>
              <h3 className="js-slide-in1 benefit offset1">痩せやすい体になる！</h3>
              <h3 className="js-slide-in2 benefit offset2">自律神経が整う＝快眠効果！</h3>
              <h3 className="js-slide-in3 benefit offset3">記憶力がアップする！</h3>
              <h3 className="js-slide-in4 benefit offset4">若々しさを保てる！</h3>
              <h3 className="js-slide-in5 benefit offset5">ストレス発散！</h3>
            </div>
            <p className="js-slide-in6 benefit">などなど、たくさんの効能が期待できます！</p>
          </div>
        </ParallaxLayer>
        {/* </section> */}
        {/* <section id="recommend" className="h-screen"> */}
        <ParallaxLayer offset={section4Offset}>
          <h2>筋トレにおいて必要なもの</h2>
          <p>
            ここまで、筋トレの良い側面についてお伝えしましたが、なぜみなさん筋トレを日常的に行わないのでしょうか？
          </p>
          <p>答えは、辛いからです！筋トレをするのには、多少の苦痛が伴います。</p>
          <p>
            この辛さから逃れる術は残念ながらありません。むしろ辛さを楽しむ心の余裕を持ちましょう。
          </p>
          <p>
            心の余裕の他に、もう一つ必要なものがあります。それは、日々の筋トレの記録を取ることです。
          </p>
          <p>筋肉を成長させるには、常に今の自分の限界に対し適切な負荷をかける必要があります。</p>
          <p>1kgの重りが楽に感じたら、次は1.5kgの重りを使うといった具合です。</p>
          <p>何事もそうですが、楽をしていても成長はしないのです。</p>
          <p>
            記録をつけていくことで自身の成長を可視化でき、更なる筋トレへのモチベーションへとつながることでしょう。
          </p>
          <p>このアプリでは、筋トレの記録について皆さんのお手伝いが可能です。</p>
        </ParallaxLayer>
        {/* </section> */}
        {/* <section id="conclusion" className="h-screen"> */}
        <ParallaxLayer offset={section5Offset}>
          <h2>筋トレAPPの使い方</h2>
          <p>このアプリの使い方は簡単３ステップです。</p>
          <h3>1.ユーザー登録をする</h3>
          <p>まずはユーザー登録をしましょう。</p>
          <h3>2.トレーニング項目を選択する</h3>
          <p>ログイン後の画面でトレーニングの項目を選択してください。</p>
          <h3>3.記録をつける</h3>
          <p>トレーニング項目を選択したら、あとは記録をつけるだけです。</p>
          <p>
            トレーニングの記録はグラフとして表示されますので、あなたのこれまでの成長を一目で確認することができます。
          </p>
        </ParallaxLayer>
        {/* </section> */}
      </Parallax>
    </>
  );
};

export default Top;
