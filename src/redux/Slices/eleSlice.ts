import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import _ from 'lodash';
import { randomID } from '../../functions/randomId';
import { pathType } from './alarmSlice';
import { AddType } from '../../components/elements/mapElement';
import { RenameType } from '../../components/elements/mapElement';

export interface LocationType {
  x: number;
  y: number;
}

export interface ElementObj {
  id: string;
  name: string;
  location: LocationType;
  from: string | null;
  deep: number;
  color: string;
}

export interface ElementState {
  element: ElementObj[];
}

const initialState: ElementState = {
  element: [
    {
      id: 'HEAD',
      name: 'HEAD',
      location: { x: 0, y: 0 },
      from: null,
      deep: 0,
      color: '#456788'
    }
  ]
};

export const elementSlice = createSlice({
  name: 'ele',
  initialState,
  reducers: {
    addEle: (state, action: PayloadAction<string>) => {
      let temp = state.element;
      const index = _.findIndex(state.element, { id: action.payload });
      const ran = {
        id: randomID(),
        name: 'no name',
        location: {
          x: 100,
          y: 100
        },
        from: state.element[index].id,
        deep: state.element[index].deep + 1,
        color: state.element[index].color
      };
      temp.push(ran);
      state.element = temp;
    },

    delEle: (state, action: PayloadAction<string>) => {
      let temp = state.element;
      _.remove(temp, (data) => data.id === action.payload);
      state.element = temp;
    },

    reNameEle: (state, action: PayloadAction<RenameType>) => {
      /* const temp = state.element;
      const index = _.findIndex(state.element, { id: action.payload.id });
      temp[index].name = action.payload.name;

      state.element = temp; */
      const index = _.findIndex(state.element, { id: action.payload.id });
      if (index !== -1) {
        state.element[index].name = action.payload.name;
      }
    },

    replaceEle: (state, action: PayloadAction<ElementObj>) => {
      const index = _.findIndex(state.element, { id: action.payload.id });

      state.element[index] = {
        id: action.payload.id,
        name: state.element[index].name,
        location: action.payload.location,
        from: action.payload.from,
        deep: action.payload.deep,
        color: action.payload.color
      };
    },

    colorEle: (state, action: PayloadAction<AddType>) => {
      let temp = state.element;
      const index = _.findIndex(state.element, { id: action.payload.id });

      temp[index].color = action.payload.color;

      state.element = temp;
    }
  }
});

export const { addEle, delEle, replaceEle, reNameEle, colorEle } =
  elementSlice.actions;

export const selectEle = (state: RootState) => state.element.element;

export default elementSlice.reducer;
