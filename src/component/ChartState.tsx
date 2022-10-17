import React from 'react';
import styles from '../cssModules/fluid.module.scss';
type PROP = {
  message: string;
};

const ChartState = (props: PROP) => {
  return (
    <>
      <div className="chartFluidContainer">
        <div className="chartFluid"></div>
        <p className="chartFluidMessage">{props.message}</p>
      </div>
    </>
  );
};

export default ChartState;
