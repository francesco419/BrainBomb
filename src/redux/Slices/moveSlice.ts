import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import _ from 'lodash';
import { ElementObj, DEFAULT_STYLE } from './eleSlice';
import { Element, pathType } from '../../functions/interface/interface';

const initialState: Element = {
  data: {
    id: 'null',
    location: {
      x: 0,
      y: 0
    },
    from: null,
    deep: 999,
    name: 'null',
    style: DEFAULT_STYLE
  }
};

export const MoveSlice = createSlice({
  name: 'move',
  initialState,
  reducers: {
    setMove: (state, action: PayloadAction<ElementObj>) => {
      state.data = action.payload;
    },
    setMoveLocation: (state, action: PayloadAction<pathType>) => {
      state.data.location = action.payload;
    }
  }
});

export const { setMove, setMoveLocation } = MoveSlice.actions;

export const selectMove = (state: RootState) => state.move.data;

export default MoveSlice.reducer;
