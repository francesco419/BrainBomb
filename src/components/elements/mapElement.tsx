import Child from '../../components/elements/child';
import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { selectLocation } from '../../redux/Slices/pathSlice';
import { pathType, setPath, delPath } from '../../redux/Slices/pathSlice';
import { addEle, delEle } from '../../redux/Slices/eleSlice';
import { ElementObj } from '../../redux/Slices/eleSlice';

export interface MinType {
  data: ElementObj;
  number: number;
}

export default function Min({ data, number }: MinType) {
  const loc = useAppSelector(selectLocation);
  const dispatch = useAppDispatch();
  const eleRef = useRef<HTMLDivElement>(null);
  const [bool, setBool] = useState<boolean>(false);
  const [location, setLocation] = useState<pathType>({
    id: data.id,
    x: 0,
    y: 0
  });
  const [text, setText] = useState<string>(`NULL_${number}`);

  useEffect(() => {
    //location에 이전 위치가 저장되어있으면 해당 위치로 이동
    const exist = _.findIndex(loc.path, (location) => {
      return location.id === data.id;
    });
    if (exist >= 0) {
      setLocation(loc.path[exist]);
    } else {
      dispatch(setPath(location));
    }
  }, []);

  useEffect(() => {
    console.log(data);
  }, []);

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
    dispatch(setPath(location)); //현재 위치를 id와 같이 redux-path에 저장
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    dispatch(setPath(location)); //현재 위치를 id와 같이 redux-path에 저장
  };

  const deleteElement = (id: string) => {
    //redux eleSlice / pathSlice 에 저장된 해당 element정보 삭제
    dispatch(delEle(id));
    dispatch(delPath(id));
  };

  const addElement = (id: string) => {
    //해당 element와 연결된 또다른 element생성 , redux 저장
    dispatch(addEle(id));
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
        <p>{text}</p>
      )}
      <button onClick={changeBool} />
      {data.id !== 'HEAD' ? (
        <button
          className='section_drag_delete section_drag_button'
          onClick={() => deleteElement(data.id)}
        />
      ) : null}
      <button
        className='section_drag_add section_drag_button'
        onClick={() => addElement(data.id)}
      />
    </div>
  );
}
