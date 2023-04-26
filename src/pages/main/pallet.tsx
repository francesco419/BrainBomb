import { useRef, useState, useEffect } from 'react';
import _ from 'lodash';
import DragSection from './dragSection';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectEle, addEle } from '../../redux/Slices/eleSlice';

export interface TanType {
  x: number;
  y: number;
  ox: number;
  oy: number;
}

export default function Pallet() {
  const dispatch = useAppDispatch();
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {}, []);

  const calTan = ({ x, y, ox, oy }: TanType) => {
    //rotate에 사용할 tan(탄젠트)값 계산 함수
    //매개변수의 양수,음수에 따라 계산 방식 달라짐.
    let atan;
    let tan;
    if (x > ox && y > oy) {
      atan = Math.atan(y - oy / x - ox);
      tan = Math.tan(atan);
    }
    console.log(tan);
  };

  return (
    <div className='section_part' ref={boxRef}>
      <DragSection />
      <div className='section_setting'>
        <button
          className='section_setButton'
          onClick={() => {
            dispatch(addEle());
          }}
        >
          add +
        </button>
        <button className='section_setButton'>save</button>
      </div>
    </div>
  );
}
