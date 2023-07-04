import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import _ from 'lodash';
import {
  PageType,
  PageSizeType,
  LocationType
} from '../../functions/interface/interface';

const initialState: PageType = {
  value: {
    backgroundColor: '#f0f0f0',
    MenuType: false,
    width: 3000,
    height: 2000,
    location: {
      x: 0,
      y: 0
    },
    scale: 1
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
    },
    setPageLocation: (state, action: PayloadAction<LocationType>) => {
      console.log('set');
      state.value.location = action.payload;
    },
    setPageScale: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        if (state.value.scale !== 0.3) {
          state.value.scale = parseFloat((state.value.scale - 0.1).toFixed(1));
        }
      } else {
        if (state.value.scale !== 1.5) {
          state.value.scale = parseFloat((state.value.scale + 0.1).toFixed(1));
        }
      }
    }
  }
});

export const {
  setBackground,
  setMenuType,
  setPageSize,
  setPageLocation,
  setPageScale
} = pageSlice.actions;

export const pageEle = (state: RootState) => state.page;

export default pageSlice.reducer;
