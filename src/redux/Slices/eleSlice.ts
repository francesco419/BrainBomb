import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import _ from 'lodash';
import { randomID } from '../../functions/randomId';
import { useAppDispatch } from '../hooks';
import { setPath } from './pathSlice';

export interface ElementObj {
  //name: string;
  id: string;
  from: string | null;
}

export interface ElementState {
  element: ElementObj[];
}

const initialState: ElementState = {
  element: [
    {
      //name:'HEAD',
      id: 'HEAD',
      from: null
    }
  ]
};

export const elementSlice = createSlice({
  name: 'ele',
  initialState,
  reducers: {
    addEle: (state, action: PayloadAction<string>) => {
      const dispatch = useAppDispatch();
      let temp = state.element;
      const random = randomID();

      const ran = {
        id: random,
        from: action.payload
      };

      dispatch(setPath({ id: random, x: 0, y: 0 }));
      temp.push(ran);
      state.element = temp;
    },
    delEle: (state, action: PayloadAction<string>) => {
      let temp = state.element;
      _.remove(temp, (data) => data.id === action.payload);
      state.element = temp;
    }
  }
});

export const { addEle, delEle } = elementSlice.actions;

export const selectEle = (state: RootState) => state.element.element;

export default elementSlice.reducer;
