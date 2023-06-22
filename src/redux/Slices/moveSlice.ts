import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import _ from 'lodash';
import { DEFAULT_STYLE } from './eleSlice';
import {
  Element,
  pathType,
  ElementDrag,
  ElementObj
} from '../../functions/interface/interface';

const initialState: ElementDrag = {
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
  },
  drag: false
};

export const MoveSlice = createSlice({
  name: 'move',
  initialState,
  reducers: {
    setMove: (state, action: PayloadAction<ElementObj>) => {
      console.log('drag click');
      state.data = action.payload;
    },
    setMoveLocation: (state, action: PayloadAction<pathType>) => {
      console.log('drag drag');
      state.data.location = action.payload;
      state.drag = true;
    },
    setDragOff: (state) => {
      console.log('drag end');
      state.drag = false;
    }
  }
});

export const { setMove, setMoveLocation, setDragOff } = MoveSlice.actions;

export const selectMove = (state: RootState) => state.move.data;

export const moveDrag = (state: RootState) => state.move.drag;

export default MoveSlice.reducer;
