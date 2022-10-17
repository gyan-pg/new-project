import React, { useState } from 'react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import styles from '../cssModules/comment.module.scss';

const TrainingTitle: React.FC<any> = ({ trainingTitle }) => {
  const [showFlg, setShowFlg] = useState(false);
  const [movingFlg, setMovingFlg] = useState(false);
  const [disappear, setDisappear] = useState(true);
  const toggleShow = () => {
    setMovingFlg(true);
    setTimeout(() => {
      setMovingFlg(false);
    }, 500);
    if (showFlg) {
      setTimeout(() => {
        setShowFlg(false);
      }, 500);
    } else {
      setShowFlg(true);
    }
    setDisappear(!disappear);
  };

  return (
    <div className="trainingTitle">
      <div className="inline-block relative">
        <h2 className="text-center">
          {trainingTitle}:総負荷グラフ
          <button disabled={movingFlg} onClick={() => toggleShow()}>
            <AiOutlineQuestionCircle
              className="inline-block hover:cursor-pointer"
              style={{ position: 'relative', top: '-2px' }}
            />
          </button>
        </h2>
        {showFlg ? (
          <div className={disappear ? `${styles.wrapper} ${styles.active}` : `${styles.wrapper}`}>
            <h3 className={styles.title}>総負荷とは・・・</h3>
            <p className={styles.text}>
              負荷重量×反復回数×セット数で表される筋肉肥大の指標のことです。
            </p>
            <p className={styles.text}>
              反復回数が10回前後が限界の負荷重量でトレーニングを行うと、筋肥大効果が期待できます。セット数は2〜3回が良いとされています。
            </p>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default TrainingTitle;
