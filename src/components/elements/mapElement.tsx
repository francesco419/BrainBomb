import Child from '../../components/elements/child';
import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { selectEle } from '../../redux/Slices/eleSlice';
import { pathType, setAlarm } from '../../redux/Slices/alarmSlice';
import { addEle, delEle, editLocation } from '../../redux/Slices/eleSlice';
import { ElementObj } from '../../redux/Slices/eleSlice';
import { selectAlarm } from '../../redux/Slices/alarmSlice';

export interface MinType {
  data: ElementObj;
  number: number;
}

export interface AddType {
  id: string;
  deep: number;
}

const areEqual = (prevProps: any, nextProps: any) => {
  return prevProps.data.location === nextProps.data.location;
};

export function Min({ data, number }: MinType) {
  const alarm = useAppSelector(selectAlarm);
  const ele = useAppSelector(selectEle);
  const dispatch = useAppDispatch();
  const eleRef = useRef<HTMLDivElement>(null);
  const [bool, setBool] = useState<boolean>(false);
  const [location, setLocation] = useState<pathType>({
    id: data.id,
    x: data.location.x,
    y: data.location.y
  });
  const [text, setText] = useState<string>(`NULL_${number}`);

  /* useEffect(() => {
    //location에 이전 위치가 저장되어있으면 해당 위치로 이동
    const exist = _.findIndex(loc.path, (location) => {
      return location.id === data.id;
    });
    if (exist >= 0) {
      setLocation(loc.path[exist]);
    } else {
      dispatch(setPath(location));
    }
  }, []); */

  const changeBool = () => {
    setBool((bool) => !bool);
  };

  const changeText = () => {
    changeBool();
    if (bool) {
      eleRef.current?.focus();
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceOnChange(e.target.value);
  };

  const debounceOnChange = _.debounce((value: string) => {
    setText((text) => value);
  }, 500);

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      changeBool();
    }
  };

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    /*  const blankCanvas: any = document.createElement('canvas');
    blankCanvas.classList.add('canvas');
    e.dataTransfer?.setDragImage(blankCanvas, 0, 0);
    document.body?.appendChild(blankCanvas); // 투명 캔버스를 생성하여 글로벌 아이콘 제거
    e.dataTransfer.effectAllowed = 'move'; */
  };

  const dragHandler = (e: React.DragEvent<HTMLDivElement>) => {
    //드래그 마다 새로운 위치 저장
    const pos = { ...location };
    pos['x'] = e.clientX - 45;
    pos['y'] = e.clientY - 20;
    setLocation(pos);
    dispatch(editLocation(location));
    //현재 위치를 id와 같이 redux-path에 저장
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    dispatch(editLocation(location)); //현재 위치를 id와 같이 redux-path에 저장
  };

  const deleteElement = (id: string) => {
    //redux eleSlice / pathSlice 에 저장된 해당 element정보 삭제
    dispatch(delEle(id));
  };

  const addElement = (id: string, deep: number) => {
    const data: AddType = {
      id: id,
      deep: deep
    };
    //해당 element와 연결된 또다른 element생성 , redux 저장
    dispatch(addEle(data));
  };

  return (
    <div
      id={data.id}
      draggable
      className='section_drag'
      ref={eleRef}
      onDragStart={(e) => dragStartHandler(e)}
      onDrag={(e) => dragHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDragEnd={(e) => dragEndHandler(e)}
      style={{ top: location.y + 'px', left: location.x + 'px' }}
    >
      {bool ? (
        <input
          type='text'
          autoFocus
          onChange={(e) => onChangeHandler(e)}
          onKeyPress={(e) => onKeyPressHandler(e)}
          onBlur={changeText}
        />
      ) : (
        <p>{data.name}</p>
      )}
      <button onClick={changeBool} />
      {data.id !== 'HEAD' ? (
        <button
          className='section_drag_delete section_drag_button'
          onClick={() => {
            const havIt = _.findIndex(ele, (o) => {
              return o.from === data.id;
            });
            if (havIt >= 0) {
              dispatch(setAlarm('delete'));
            } else {
              deleteElement(data.id);
            }
          }}
        />
      ) : null}
      <button
        className='section_drag_add section_drag_button'
        onClick={() => addElement(data.id, data.deep)}
      />
    </div>
  );
}

export const MemoElement = React.memo(Min, areEqual);
