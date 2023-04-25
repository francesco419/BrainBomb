import Child from '../../components/elements/child';
import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { MinType } from '../../pages/main/pallet';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { selectLocation } from '../../redux/Slices/pathSlice';
import { pathType, setPath } from '../../redux/Slices/pathSlice';

export default function Min({
  name = 'Null',
  index,
  change,
  deletit,
  id,
  refer
}: MinType) {
  const loc = useAppSelector(selectLocation);
  const dispatch = useAppDispatch();
  const eleRef = useRef<HTMLDivElement>(null);
  const [bool, setBool] = useState<boolean>(false);
  const [location, setLocation] = useState<pathType>({ id: id, x: 0, y: 0 });
  const [text, setText] = useState<string>(name);

  const changeBool = () => {
    setBool((bool) => !bool);
  };

  const changeText = () => {
    changeBool();
    if (change) {
      eleRef.current?.focus();
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceOnChange(e.target.value);
  };

  const debounceOnChange = _.debounce((value: string) => {
    console.log(value);
    setText((text) => value);
  }, 500);

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      changeBool();
    }
  };

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const blankCanvas: any = document.createElement('canvas');
    blankCanvas.classList.add('canvas');
    e.dataTransfer?.setDragImage(blankCanvas, 0, 0);
    document.body?.appendChild(blankCanvas); // 투명 캔버스를 생성하여 글로벌 아이콘 제거
    e.dataTransfer.effectAllowed = 'move';
  };

  const dragHandler = (e: React.DragEvent<HTMLDivElement>) => {
    //드래그 마다 새로운 위치 저장
    const pos = { ...location };
    pos['x'] = e.clientX - 45;
    pos['y'] = e.clientY - 20;
    setLocation(pos);
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    dispatch(setPath(location)); //현재 위치를 id와 같이 redux-path에 저장
    console.log(loc);
  };

  return (
    <div
      id={id}
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
        <p>{text}</p>
      )}
      <button onClick={changeBool}></button>
      <div className='section_drag_line' onClick={() => deletit(text)}></div>
    </div>
  );
}
