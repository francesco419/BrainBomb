import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import _ from 'lodash';
import { randomID } from '../../functions/randomId';
import { pathType } from './alarmSlice';
import { AddType } from '../../components/elements/element/mapElement';

export interface LineState {
  value: {
    borderWidth: string;
    borderStyle: string;
    borderColor: string;
  };
}

const initialState: LineState = {
  value: {
    borderWidth: '1px',
    borderStyle: 'dashed',
    borderColor: '#000'
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
