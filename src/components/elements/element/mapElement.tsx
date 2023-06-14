import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { replaceEle, selectEle } from '../../../redux/Slices/eleSlice';
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
  const [bool, setBool] = useState<boolean>(false);
  //const [showButton, setShowButton] = useState<boolean>(false);
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

  const dragHandler = (e: React.DragEvent<HTMLDivElement>) => {
    //드래그 마다 새로운 위치 저장
    const pos = { ...location };
    pos['x'] = e.clientX - 50;
    pos['y'] = e.clientY - 50;
    setLocation(pos);
    dispatch(setMoveLocation(location));
    //현재 위치를 id와 같이 redux-path에 저장
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dragEndHandler = () => {
    dispatch(replaceEle(move)); //현재 위치를 id와 같이 redux-path에 저장
    /* const canvases = document.getElementsByClassName('canvas');
    for (let i = 0; i < canvases.length; i++) {
      let canvas = canvases[i];
      canvas.parentNode?.removeChild(canvas);
    }
    document.body.removeAttribute('style'); 
    //캔버스를 사용하여 고스트 이미지 제거할시
    */
  };

  return (
    <div
      className='drag_outter'
      draggable
      onDragStart={(e) => dragStartHandler(e)}
      onDrag={(e) => dragHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDragEnd={() => dragEndHandler()}
      style={{
        top: location.y + 'px',
        left: location.x + 'px'
      }}
    >
      <div className='drag_inner'>
        <div
          id={data.id}
          className='section_drag'
          onClick={onClickHandler}
          style={Object.assign(
            {
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
      </div>
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
