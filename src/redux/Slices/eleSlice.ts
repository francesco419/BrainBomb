import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import _ from 'lodash';
import { randomID } from '../../functions/randomId';
import {
  AddType,
  RenameType,
  StyleIdProp,
  StyleProp,
  LocationType,
  ElementObj
} from '../../functions/interface/interface';

export let DEFAULT_STYLE: StyleProp = {
  width: 100,
  height: 100,
  fontSize: 16,
  borderWidth: 5,
  borderStyle: 'solid',
  borderColor: '#fff',
  borderRadius: '50%',
  backgroundColor: '#2fd883'
};

export interface ElementState {
  element: ElementObj[];
}

const initialState: ElementState = {
  element: [
    {
      id: 'HEAD',
      name: 'HEAD',
      location: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
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
    setElement: (state, action: PayloadAction<ElementObj[]>) => {
      state.element = action.payload;
    },
    addEle: (state, action: PayloadAction<string>) => {
      let temp = state.element;
      const index = _.findIndex(state.element, { id: action.payload });
      const ran = {
        id: randomID(),
        name: 'no name',
        location: {
          x: state.element[index].location.x + 100,
          y: state.element[index].location.y + 100
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

    delAllEle: (state, action: PayloadAction<string>) => {
      let temp = state.element;
      _.remove(temp, (data) => data.id === action.payload);
      _.remove(temp, (data) => data.from === action.payload);
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
  delAllEle,
  replaceEle,
  reNameEle,
  colorEle,
  styleEle,
  allStyleEle,
  setElement
} = elementSlice.actions;

export const selectEle = (state: RootState) => state.element.element;

export default elementSlice.reducer;
