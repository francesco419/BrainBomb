import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface pathType {
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
      let newPath = state.path;
      newPath.push(action.payload);
      state.path = newPath;
    }
  }
});

export const { setPath } = locationSlice.actions;

export const selectLocation = (state: RootState) => state.location;

export default locationSlice.reducer;
