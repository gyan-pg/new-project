import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modalFlg: false,
    register: false,
    edit: false,
    closeModalFlg: false,
  },

  reducers: {
    setModalFlg: (state, action) => {
      state.modalFlg = action.payload;
    },
    setRegisterFlg: (state, action) => {
      state.register = action.payload;
    },
    setEditFlg: (state, action) => {
      state.edit = action.payload;
    },
    setCloseModalFlg: (state, action) => {
      state.closeModalFlg = action.payload;
    },
    setAllModalHideFlg: (state, action) => {
      state.register = action.payload;
      state.edit = action.payload;
    },
  },
});

// actionsはreducersの中身をexportする。ついでにaction creatorの役割も担っている。
export const { setModalFlg, setRegisterFlg, setEditFlg, setCloseModalFlg, setAllModalHideFlg } =
  modalSlice.actions;

export const selectModalFlg = (state: RootState) => state.modal.modalFlg;
export const selectRegisterFlg = (state: RootState) => state.modal.register;
export const selectEditFlg = (state: RootState) => state.modal.edit;
export const selectCloseModalFlg = (state: RootState) => state.modal.closeModalFlg;

export default modalSlice.reducer;
