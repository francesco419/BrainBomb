import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import _ from 'lodash';
import { randomID } from '../../functions/randomId';
import { AddType } from '../../components/elements/mapElement';
import { RenameType } from '../../components/elements/mapElement';
import { StyleProp } from '../../components/property/info/info';
import { StyleIdProp } from '../../components/property/info/elementEdit';

export interface LocationType {
  x: number;
  y: number;
}

export let DEFAULT_STYLE: StyleProp = {
  width: 'fit-content',
  height: 'fit-content',
  fontSize: '12px',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: '#000',
  borderRadius: '15px',
  backgroundColor: '#456788'
};

export interface ElementObj {
  id: string;
  name: string;
  location: LocationType;
  from: string | null;
  deep: number;
  style: StyleProp;
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
      style: DEFAULT_STYLE
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
        style: state.element[index].style
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
        style: action.payload.style
      };
    },

    colorEle: (state, action: PayloadAction<AddType>) => {
      let temp = state.element;
      const index = _.findIndex(state.element, { id: action.payload.id });

      temp[index].style.backgroundColor = action.payload.color;

      state.element = temp;
    },

    styleEle: (state, action: PayloadAction<StyleIdProp>) => {
      const index = _.findIndex(state.element, { id: action.payload.id });
      state.element[index].style = action.payload.style;
    },

    allStyleEle: (state, action: PayloadAction<StyleIdProp>) => {
      DEFAULT_STYLE = action.payload.style;
      state.element.forEach((data) => {
        data.style = action.payload.style;
      });
    }
  }
});

export const {
  addEle,
  delEle,
  replaceEle,
  reNameEle,
  colorEle,
  styleEle,
  allStyleEle
} = elementSlice.actions;

export const selectEle = (state: RootState) => state.element.element;

export default elementSlice.reducer;
