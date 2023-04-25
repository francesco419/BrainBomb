import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import _ from 'lodash';

export interface pathType {
  id: string;
  x: number;
  y: number;
}

export interface LocationState {
  path: pathType[];
}

const initialState: LocationState = {
  path: []
};

export const locationSlice = createSlice({
  name: 'path',
  initialState,
  reducers: {
    setPath: (state, action: PayloadAction<pathType>) => {
      // element의 location 저장 func.
      let newPath = state.path;
      const index = _.findIndex(newPath, (o) => {
        return o.id === action.payload.id;
      }); //현재 같은 id로 저장된 location이 있는자 index 검색

      if (index === -1) {
        //index 같이 -1 (이미 저장된 값이 없다면)
        newPath.push(action.payload); // push
      } else {
        newPath[index] = action.payload; // index에 데이터 새로 덮어쓰기
      }

      state.path = newPath; //저장
    },
    defaultPath: (state) => {
      state.path = [];
    }
  }
});

export const { setPath, defaultPath } = locationSlice.actions;

export const selectLocation = (state: RootState) => state.location;

export default locationSlice.reducer;
