import React from "react";
import styles from "../cssModules/comment.module.scss";
type FLG = {
  animate: boolean;
}

const Comment: React.FC<FLG> = ({animate}) => {

  const st = animate ? "" : styles.active;

  return (
    <div className={`${styles.wrapper} ${st}`}>
      <h3 className={styles.title}>総負荷とは・・・</h3>
      <p className={styles.text}>負荷重量×反復回数×セット数で表される筋肉肥大の指標のことです。</p>
      <p className={styles.text}>反復回数が１０回前後が限界の負荷重量でトレーニングを行うと、筋肥大効果が期待できます。セット数は３回を目安に行うとより良いです。</p>
    </div>
  );
};

export default Comment;
