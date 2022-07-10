import React from "react";
import styles from "../cssModules/fluid.module.scss";
type PROP = {
  message: string;
}

const ChartState = (props:PROP) => {
  return (
    <>
      <div className="relative flex items-center justify-center text-center h-full">
        <div className={styles.fluid}></div>
          {props.message}
      </div>
    </>
  );
};

export default ChartState;
