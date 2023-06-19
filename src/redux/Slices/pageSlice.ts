import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import _ from 'lodash';
import { PageType, PageSizeType } from '../../functions/interface/interface';

const initialState: PageType = {
  value: {
    backgroundColor: '#f0f0f0',
    MenuType: false,
    width: 3000,
    height: 2000
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
    },
    setPageSize: (state, action: PayloadAction<PageSizeType>) => {
      state.value.width = action.payload.width;
      state.value.height = action.payload.height;
    }
  }
});

export const { setBackground, setMenuType, setPageSize } = pageSlice.actions;

export const pageEle = (state: RootState) => state.page;

export default pageSlice.reducer;
