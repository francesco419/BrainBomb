import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { delEle, addEle, selectEle } from '../../../redux/Slices/eleSlice';
import './elementModify.scss';
import _ from 'lodash';
import { setAlarm } from '../../../redux/Slices/alarmSlice';
import ElementName from './elementName';
import { ModifyType } from '../../../functions/interface/interface';
import { useState } from 'react';

export default function ElementModify({ change, id }: ModifyType) {
  const dispatch = useAppDispatch();
  const ele = useAppSelector(selectEle);

  const deleteElement = (id: string) => {
    const havIt = _.findIndex(ele, (o) => {
      return o.from === id;
    });
    if (havIt >= 0) {
      dispatch(
        setAlarm({
          id: id,
          name: 'Are you sure to delete with all child element ?'
        })
      );
    } else {
      dispatch(delEle(id));
    }
  };

  const addElement = (id: string) => {
    dispatch(addEle(id));
  };

  return (
    <div className='element-modify'>
      <button
        style={{ backgroundColor: `${ele}` }}
        className='element-modify__delete element-modify__button'
        onClick={() => addElement(id)}
      >
        ADD
      </button>
      <button
        disabled={id === 'HEAD'}
        className='element-modify__add element-modify__button'
        onClick={() => deleteElement(id)}
      >
        DELETE
      </button>
      <button
        className='element-modify__name element-modify__button'
        onClick={change}
      >
        RENAME
      </button>
    </div>
  );
}
