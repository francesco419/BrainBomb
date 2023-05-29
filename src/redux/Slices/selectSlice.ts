import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import _ from 'lodash';
import { randomID } from '../../functions/randomId';
import { pathType } from './alarmSlice';
import { AddType } from '../../components/elements/mapElement';

export interface LocationType {
  x: number;
  y: number;
}

export interface ElementObj {
  //name: string;
  id: string;
  location: LocationType;
  from: string | null;
  deep: number;
}

export interface ElementState {
  element: ElementObj[];
}

const initialState: ElementState = {
  element: []
};

export const elementSlice = createSlice({
  name: 'ele',
  initialState,
  reducers: {
    addEle: (state, action: PayloadAction<AddType>) => {
      let temp = state.element;
      const ran = {
        id: randomID(),
        location: { x: 0, y: 0 },
        from: action.payload.id,
        deep: action.payload.deep + 1
      };
      temp.push(ran);
      state.element = temp;
    },

    delEle: (state, action: PayloadAction<string>) => {
      let temp = state.element;
      _.remove(temp, (data) => data.id === action.payload);
      state.element = temp;
    },

    editLocation: (state, action: PayloadAction<pathType>) => {
      const temp = state.element;
      const index = _.findIndex(temp, (data) => {
        return data.id === action.payload.id;
      });
      temp[index].location = { x: action.payload.x, y: action.payload.y };

      state.element = temp;
    }
  }
});

export const { addEle, delEle, editLocation } = elementSlice.actions;

export const selectEle = (state: RootState) => state.element.element;

export default elementSlice.reducer;
