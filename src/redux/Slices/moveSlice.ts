import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import _ from 'lodash';
import { pathType } from './alarmSlice';
import { ElementObj, DEFAULT_STYLE } from './eleSlice';

export interface MoveState {
  element: ElementObj;
}

const initialState: MoveState = {
  element: {
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
      state.element = action.payload;
    },
    setMoveLocation: (state, action: PayloadAction<pathType>) => {
      state.element.location = action.payload;
    }
  }
});

export const { setMove, setMoveLocation } = MoveSlice.actions;

export const selectMove = (state: RootState) => state.move.element;

export default MoveSlice.reducer;
