import React, { useEffect, useRef, useState } from 'react';
import _, { debounce } from 'lodash';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { replaceEle, selectEle } from '../../../redux/Slices/eleSlice';
import {
  selectMove,
  setMove,
  setMoveLocation,
  setDragOff
} from '../../../redux/Slices/moveSlice';
import ElementModify from './elementModify';
import ElementName from './elementName';
import { MinType, pathType } from '../../../functions/interface/interface';
import { pageEle } from '../../../redux/Slices/pageSlice';

const areEqual = (prevProps: any, nextProps: any) => {
  return prevProps.data.location === nextProps.data.location;
};

export function Min({ data, number }: MinType) {
  const ele = useAppSelector(selectEle);
  const dispatch = useAppDispatch();
  const move = useAppSelector(selectMove);
  const pageStyle = useAppSelector(pageEle);
  const [bool, setBool] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  //const [showButton, setShowButton] = useState<boolean>(false);
  const [location, setLocation] = useState<pathType>({
    id: data.id,
    x: data.location.x,
    y: data.location.y
  });

  let _startX = 0;
  let _startY = 0;
  let _offsetX = 0;
  let _offsetY = 0;

  const changeBool = () => {
    setBool((bool) => !bool);
  };

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const img = new Image();
    e.dataTransfer.setDragImage(img, 0, 0);
    _startX = e.clientX;
    _startY = e.clientY;
    if (ref.current) {
      _offsetX = ref.current.offsetLeft;
      _offsetY = ref.current.offsetTop;
      console.log(_offsetX, _offsetY);
    }
    dispatch(setMove(data));
  };

  const onClickHandler = () => {
    if (ref.current) {
      _offsetX = ref.current.offsetLeft;
      _offsetY = ref.current.offsetTop;
      console.log(_offsetX, _offsetY);
    }
    dispatch(setMove(data));
  };

  const dragHandler = (e: React.DragEvent<HTMLDivElement>) => {
    //드래그 마다 새로운 위치 저장
    e.stopPropagation();
    const pos = { ...location };
    pos['x'] = Math.abs(pageStyle.value.location.x) + e.clientX - 50;
    //_offsetX + event.clientX - _startX
    pos['y'] = Math.abs(pageStyle.value.location.y) + e.clientY - 50;
    setLocation(pos);
    dispatch(setMoveLocation(location));
    //현재 위치를 id와 같이 redux-path에 저장
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const dragEndHandler = () => {
    dispatch(replaceEle(move)); //현재 위치를 id와 같이 redux-path에 저장
    dispatch(setDragOff());
  };

  return (
    <div
      className='drag_outter'
      draggable
      onDragStart={(e) => dragStartHandler(e)}
      onDrag={(e) => dragHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDragEnd={() => dragEndHandler()}
      ref={ref}
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
