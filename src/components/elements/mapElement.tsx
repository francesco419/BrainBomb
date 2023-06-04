import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { pathType, setAlarm, selectAlarm } from '../../redux/Slices/alarmSlice';
import {
  addEle,
  delEle,
  ElementObj,
  replaceEle,
  selectEle,
  reNameEle
} from '../../redux/Slices/eleSlice';
import {
  selectMove,
  setMove,
  setMoveLocation
} from '../../redux/Slices/moveSlice';

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

const areEqual = (prevProps: any, nextProps: any) => {
  return prevProps.data.location === nextProps.data.location;
};

export function Min({ data, number }: MinType) {
  const ele = useAppSelector(selectEle);
  const move = useAppSelector(selectMove);
  const dispatch = useAppDispatch();
  const eleRef = useRef<HTMLDivElement>(null);
  const [bool, setBool] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);
  const [location, setLocation] = useState<pathType>({
    id: data.id,
    x: data.location.x,
    y: data.location.y
  });
  let text: string;

  const changeBool = () => {
    setBool((bool) => !bool);
  };

  const changeText = () => {
    changeBool();
    if (bool) {
      dispatch(
        reNameEle({
          id: data.id,
          name: text
        })
      );
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    text = e.target.value;
  };

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (bool) {
        dispatch(
          reNameEle({
            id: data.id,
            name: text
          })
        );
      }
      changeBool();
    }
  };

  const dragStartHandler = () => {
    /*  const blankCanvas: any = document.createElement('canvas');
    blankCanvas.classList.add('canvas');
    e.dataTransfer?.setDragImage(blankCanvas, 0, 0);
    document.body?.appendChild(blankCanvas); // 투명 캔버스를 생성하여 글로벌 아이콘 제거
    e.dataTransfer.effectAllowed = 'move'; */
    dispatch(setMove(data));
  };

  const dragHandler = (e: React.DragEvent<HTMLDivElement>) => {
    //드래그 마다 새로운 위치 저장
    const pos = { ...location };
    pos['x'] = e.clientX - 45;
    pos['y'] = e.clientY - 20;
    setLocation(pos);
    dispatch(setMoveLocation(location));
    //현재 위치를 id와 같이 redux-path에 저장
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dragEndHandler = () => {
    dispatch(replaceEle(move)); //현재 위치를 id와 같이 redux-path에 저장
  };

  /*   const deleteElement = (id: string) => {
    //redux eleSlice / pathSlice 에 저장된 해당 element정보 삭제
    dispatch(delEle(id));
  }; */

  const addElement = (id: string) => {
    //해당 element와 연결된 또다른 element생성 , redux 저장
    dispatch(addEle(id));
  };

  const deleteElement = (id: string) => {
    const havIt = _.findIndex(ele, (o) => {
      return o.from === id;
    });
    if (havIt >= 0) {
      dispatch(setAlarm('delete'));
    } else {
      dispatch(delEle(id));
    }
  };

  const mouseEventHandler = () => {
    setShowButton((showButton) => !showButton);
  };

  return (
    <div
      id={data.id}
      draggable
      className='section_drag'
      ref={eleRef}
      onDragStart={(e) => dragStartHandler()}
      onDrag={(e) => dragHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDragEnd={() => dragEndHandler()}
      onClick={() => dragStartHandler()}
      onMouseOver={mouseEventHandler}
      onMouseOut={mouseEventHandler}
      style={{
        top: location.y + 'px',
        left: location.x + 'px',
        backgroundColor: ele[_.findIndex(ele, { id: data.id })].color
      }}
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
        <p>{ele[_.findIndex(ele, { id: data.id })].name}</p>
      )}
      <button onClick={changeBool} />
      {showButton && (
        <>
          <button
            disabled={data.id === 'HEAD'}
            className='section_drag_delete section_drag_button'
            onClick={() => deleteElement(data.id)}
          />
          <button
            className='section_drag_add section_drag_button'
            onClick={() => addElement(data.id)}
          />
        </>
      )}
    </div>
  );
}

export const MemoElement = React.memo(Min, areEqual);
