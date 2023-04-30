import './alarm.scss';
import { useRef, useState, useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { offAlarm } from '../../redux/Slices/alarmSlice';

type alarm = {
  text: string;
};

export default function AlarmCenter({ text }: alarm) {
  const dispatch = useAppDispatch();
  const closeAlarm = () => {
    dispatch(offAlarm());
  };
  return (
    <div className='alarmCenter'>
      <p>{text}</p>
      <div className='alarmCenter__buttonBox'>
        <button
          onClick={() => {
            closeAlarm();
          }}
        >
          yes
        </button>
        <button
          onClick={() => {
            closeAlarm();
          }}
        >
          no
        </button>
      </div>
    </div>
  );
}
