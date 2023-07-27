import './alarm.scss';
import { useRef, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { offAlarm, selectAlarm } from '../../redux/Slices/alarmSlice';
import { StringType } from '../../functions/interface/interface';
import { delAllEle } from '../../redux/Slices/eleSlice';
import BorderButton from '../common/button/borderbutton';

export interface AlarmType {
  text?: string;
  image?: string | undefined;
  type: string;
}

export default function AlarmCenter({
  type,
  text,
  image = undefined
}: AlarmType) {
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
      {image && <img />}
      <p>{text}</p>
      <div className='alarmCenter__buttonBox'>
        {type === 'yesno' ? (
          <>
            <BorderButton children='Yes' size='sm' act={deleteAll} />
            <BorderButton
              children='No'
              size='sm'
              act={() => {
                closeAlarm();
              }}
            />
          </>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
