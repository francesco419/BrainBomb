import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { setAlarm, selectAlarm } from '../../../redux/Slices/alarmSlice';
import {
  addEle,
  delEle,
  ElementObj,
  replaceEle,
  selectEle,
  reNameEle
} from '../../../redux/Slices/eleSlice';
import {
  selectMove,
  setMove,
  setMoveLocation
} from '../../../redux/Slices/moveSlice';
import ElementModify from './elementModify';
import ElementName from './elementName';
import { MinType, pathType } from '../../../functions/interface/interface';

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

  const changeBool = () => {
    setBool((bool) => !bool);
  };

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const img = new Image();
    e.dataTransfer.setDragImage(img, 0, 0);
    /* const blankCanvas: any = document.createElement('canvas');
    blankCanvas.classList.add('canvas');
    e.dataTransfer?.setDragImage(blankCanvas, 0, 0);
    document.body?.appendChild(blankCanvas); // 투명 캔버스를 생성하여 글로벌 아이콘 제거
    e.dataTransfer.effectAllowed = 'move'; */
    dispatch(setMove(data));
  };

  const onClickHandler = () => {
    dispatch(setMove(data));
  };

  const getWidth = data.style.width.split('px');
  const getHeight = data.style.height.split('px');

  const dragHandler = (e: React.DragEvent<HTMLDivElement>) => {
    //드래그 마다 새로운 위치 저장
    const pos = { ...location };

    pos['x'] = e.clientX - parseInt(getWidth[0]) / 2;
    pos['y'] = e.clientY - parseInt(getHeight[0]) / 2;
    setLocation(pos);
    dispatch(setMoveLocation(location));
    //현재 위치를 id와 같이 redux-path에 저장
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dragEndHandler = () => {
    dispatch(replaceEle(move)); //현재 위치를 id와 같이 redux-path에 저장
    console.log(ele);
    const doc = document.getElementById(data.id) as HTMLDivElement;
    console.log(doc.style);
    /* const canvases = document.getElementsByClassName('canvas');
    for (let i = 0; i < canvases.length; i++) {
      let canvas = canvases[i];
      canvas.parentNode?.removeChild(canvas);
    }
    document.body.removeAttribute('style'); */
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
      onDragEnd={() => dragEndHandler()}
      onClick={onClickHandler}
      style={Object.assign(
        {
          top: location.y + 'px',
          left: location.x + 'px',
          backgroundColor:
            ele[_.findIndex(ele, { id: data.id })].style.backgroundColor
        },
        data.style
      )}
    >
      {bool ? (
        <ElementName change={changeBool} id={data.id} bool={bool} />
      ) : (
        <p>{ele[_.findIndex(ele, { id: data.id })].name}</p>
      )}
      <ElementModify change={changeBool} id={data.id} />
    </div>
  );
}

export const MemoElement = React.memo(Min, areEqual);

{
  /* <input
  type='text'
  autoFocus
  onChange={(e) => onChangeHandler(e)}
  onKeyPress={(e) => onKeyPressHandler(e)}
  onBlur={changeText}
/> */
}
