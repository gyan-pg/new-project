import React, { useState } from 'react';

const RegisterTrainingForm: React.FC = () => {
  const [trainingName, setTrainingName] = useState('');
  const [imagePass, setImagePass] = useState('');

  const stopEvent = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <>
      <section className="modalComponent" onClick={(e) => stopEvent(e)}>
        <div className="registerForm">
          <h2 className="registerTitle">トレーニング登録フォーム</h2>
          <label className="inputName" htmlFor="trainingName">
            トレーニング名
          </label>
          <input
            id="trainingName"
            className="trainingRegisterInput"
            value={trainingName}
            onChange={(e) => setTrainingName(e.target.value)}
          />
          <label className="inputName">イメージ選択</label>
          <div></div>
        </div>
      </section>
    </>
  );
};

export default RegisterTrainingForm;
