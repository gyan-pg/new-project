import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectErrorMsg, selectSuccessMsg, setErrorMsg, setSuccessMsg } from "../features/messageSlice";

import styles from "../cssModules/flash.module.scss";

const FlashMessage = () => {
  const dispatch = useDispatch();
  const successMsg = useSelector(selectSuccessMsg);
  const errorMsg = useSelector(selectErrorMsg); 
  
  if (successMsg) {
    setTimeout(() => {
      dispatch(setSuccessMsg(""));
    }, 4200);
  };

  if (errorMsg) {
    setTimeout(() => {
      dispatch(setErrorMsg(""));
    }, 4200);
  };


  return (
    <>
      {successMsg ? <p className={styles.success}>{successMsg}</p> : ""}
      {errorMsg ? <p className={styles.error}>{errorMsg}</p> : ""}
    </>
  );
};

export default FlashMessage;