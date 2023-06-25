import './alarm.scss';
import { useRef, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { offAlarm, selectAlarm } from '../../redux/Slices/alarmSlice';
import { StringType } from '../../functions/interface/interface';
import { delAllEle } from '../../redux/Slices/eleSlice';

export default function AlarmCenter({ text }: StringType) {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectAlarm);

  const closeAlarm = () => {
    dispatch(offAlarm());
  };

  const deleteAll = () => {
    dispatch(delAllEle(data.data));
    closeAlarm();
  };

  return (
    <div className='alarmCenter'>
      <p>{text}</p>
      <div className='alarmCenter__buttonBox'>
        <button onClick={deleteAll}>Yes</button>
        <button
          onClick={() => {
            closeAlarm();
          }}
        >
          No
        </button>
      </div>
    </div>
  );
}
