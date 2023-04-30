import { useRef, useState, useEffect } from 'react';
import _ from 'lodash';
import DragSection from './dragSection';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectEle, addEle } from '../../redux/Slices/eleSlice';
import { selectAlarm } from '../../redux/Slices/alarmSlice';
import AlarmCenter from '../../components/alarm/alarmCenter';

export interface TanType {
  x: number;
  y: number;
  ox: number;
  oy: number;
}

export default function Pallet() {
  const alarm = useAppSelector(selectAlarm);
  const dispatch = useAppDispatch();
  const boxRef = useRef<HTMLDivElement>(null);

  return (
    <div className='section_part' ref={boxRef}>
      <DragSection />
      <div className='section_setting'>
        <button className='section_setButton'>save</button>
      </div>
      {alarm.isON ? <AlarmCenter text={alarm.text} /> : null}
    </div>
  );
}
