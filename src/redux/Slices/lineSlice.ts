import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import _ from 'lodash';
import { LineState } from '../../functions/interface/interface';

const initialState: LineState = {
  value: {
    borderRightWidth: '4px',
    borderStyle: 'dotted',
    borderRightColor: '#fff'
  }
};

export const lineSlice = createSlice({
  name: 'line',
  initialState,
  reducers: {
    editLine: (state, action: PayloadAction<LineState>) => {
      state.value = action.payload.value;
    }
  }
});

export const { editLine } = lineSlice.actions;

export const selectLine = (state: RootState) => state.line;

export default lineSlice.reducer;
