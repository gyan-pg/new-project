import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

interface MESSAGE {
  message: string;
}

export const messageSlice = createSlice({
  name: 'message',
  initialState: {
    successMsg: "",
    errorMsg: "",
  },
  reducers: {
    setSuccessMsg: (state, action) => {
      console.log(action);
      state.successMsg = action.payload;
    },
    setErrorMsg: (state, action) => {
      state.errorMsg = action.payload;
    }
  }
});

// actionsはreducersの中身をexportする。ついでにaction creatorの役割も担っている。
export const { setSuccessMsg, setErrorMsg } = messageSlice.actions;

export const selectSuccessMsg = (state: RootState) => state.message.successMsg;
export const selectErrorMsg = (state: RootState) => state.message.errorMsg;

export default messageSlice.reducer;
