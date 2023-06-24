import { useRef, useState, useEffect } from 'react';
import _ from 'lodash';
import DragSection from './dragSection';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectEle, addEle } from '../../redux/Slices/eleSlice';
import { selectAlarm } from '../../redux/Slices/alarmSlice';
import AlarmCenter from '../../components/alarm/alarmCenter';
import Property from '../../components/property/property';

export default function Pallet() {
  const alarm = useAppSelector(selectAlarm);
  const dispatch = useAppDispatch();
  const boxRef = useRef<HTMLDivElement>(null);

  return (
    <div className='section_part' ref={boxRef}>
      <DragSection />
      {alarm.isON ? <AlarmCenter text={alarm.text} /> : null}
    </div>
  );
}
