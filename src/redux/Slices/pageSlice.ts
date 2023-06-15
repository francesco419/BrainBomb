import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import _ from 'lodash';
import { PageType } from '../../functions/interface/interface';

const initialState: PageType = {
  value: {
    backgroundColor: '#f0f0f0',
    MenuType: false
  }
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setBackground: (state, action: PayloadAction<string>) => {
      state.value.backgroundColor = action.payload;
    },
    setMenuType: (state) => {
      state.value.MenuType = !state.value.MenuType;
    }
  }
});

export const { setBackground, setMenuType } = pageSlice.actions;

export const pageEle = (state: RootState) => state.page;

export default pageSlice.reducer;
