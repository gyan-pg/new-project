import React, { useState } from 'react';
import '../css/modal.scss';

const RegisterTrainingForm: React.FC = () => {
  const [trainingName, setTrainingName] = useState('');
  const [imagePass, setImagePass] = useState('');

  return (
    <>
      <section className="">
        <div className="registerForm">
          <h2>トレーニング登録フォーム</h2>
          <label>トレーニング名</label>
          <input value={trainingName} onChange={(e) => setTrainingName(e.target.value)} />
          <label>イメージ選択</label>
          <div></div>
        </div>
      </section>
    </>
  );
};

export default RegisterTrainingForm;
