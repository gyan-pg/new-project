import React from "react";
import styles from "../cssModules/loading.module.scss";

const Loading = () => {

  return (
    <>
      <section className={styles.wrapper}>
        <div className={styles.container}>
          <p className={styles.loadingText}>Loading</p>
          <div className={styles.circle}>
          </div>
        </div>
      </section>
    </>
  );
};

export default Loading;
