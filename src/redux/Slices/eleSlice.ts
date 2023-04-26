import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import _ from 'lodash';
import { randomID } from '../../functions/randomId';

export interface ElementState {
  element: string[];
}

const initialState: ElementState = {
  element: ['HEAD']
};

export const elementSlice = createSlice({
  name: 'ele',
  initialState,
  reducers: {
    addEle: (state) => {
      let temp = state.element;
      const ran = randomID();
      temp.push(ran);
      state.element = temp;
    },
    delEle: (state, action: PayloadAction<string>) => {
      let temp = state.element;
      _.remove(temp, (data) => data === action.payload);
      state.element = temp;
    }
  }
});

export const { addEle, delEle } = elementSlice.actions;

export const selectEle = (state: RootState) => state.element.element;

export default elementSlice.reducer;
