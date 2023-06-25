import { FlattenSimpleInterpolation } from 'styled-components';

export interface StringType {
  text: string;
} //alarmCenter

export interface ModifyType {
  change: () => void;
  id: string;
} //element modify

export interface nameType {
  change: () => void;
  bool: boolean;
  id: string;
} //element name

//modify === name

export interface MinType {
  data: ElementObj;
  number: number;
}

export interface AddType {
  id: string;
  deep: number;
  color: string;
}

export interface RenameType {
  id: string;
  name: string;
}
//map element

export interface ButtonProps {
  disabled?: boolean;
  size: string;
  children: string;
  act: any;
}

export type sizeType = {
  [anyKeyword: string]: FlattenSimpleInterpolation;
  sm: FlattenSimpleInterpolation;
  md: FlattenSimpleInterpolation;
  lg: FlattenSimpleInterpolation;
};

//button

export interface xy {
  x: string;
  y: string;
}

export interface Element {
  data: ElementObj;
}

export interface ElementDrag {
  data: ElementObj;
  drag: boolean;
}

//line

export interface LinePallet {
  line: string;
  set: any;
} //pallet

export interface ElementProp {
  data: ElementObj;
  shut: () => void;
}

export interface StyleIdProp {
  id: string;
  style: StyleProp;
}
//element edit

export interface StyleProp {
  width: number | string;
  height: number | string;
  fontSize: number;
  borderWidth: number;
  borderStyle: string;
  borderColor: string;
  borderRadius: string;
  backgroundColor: string;
} //info

/*-----*/

export interface PropertyType {
  element: JSX.Element;
  propertyName: string;
} //property

export interface pathType {
  id: string;
  x: number;
  y: number;
}

export interface AlarmType {
  isON: boolean;
  text: string;
}
//alarm slice

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
  style: StyleProp;
}

export interface ElementState {
  element: ElementObj[];
}

//eleSlice

export interface LineState {
  value: {
    borderWidth: string;
    borderStyle: string;
    borderColor: string;
  };
} //lineSlice

export interface PageType {
  value: {
    backgroundColor: string;
    MenuType: boolean;
    width: number;
    height: number;
    location: LocationType;
    scale: number;
  };
} //pageSlice

export interface PageSizeType {
  width: number;
  height: number;
}
