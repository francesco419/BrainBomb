import './child.scss';
import { useState, useRef } from 'react';
import _ from 'lodash';
import Kid from './kid';
import { locationMap } from '../../functions/location';

interface Name {
  name?: string;
}

export default function Child({ name = 'child' }: Name) {
  const [mindNode, setMindNode] = useState<string[]>([]);
  const [childText, setChildText] = useState<string>(name);
  const [change, setChange] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const childRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null); // 드래그 할 영역 네모 박스 Ref
  const dragComponentRef = useRef<HTMLDivElement>(null); // // 움직일 드래그 박스 Ref
  const [originPos, setOriginPos] = useState({ x: 0, y: 0 }); // 드래그 전 포지션값 (e.target.offset의 상대 위치)
  const [clientPos, setClientPos] = useState({ x: 0, y: 0 }); // 실시간 커서위치인 e.client를 갱신하는값
  const [pos, setPos] = useState({ left: 0, top: 0 }); // 실제 drag할 요소가 위치하는 포지션값

  const changeText = () => {
    setChange((change) => !change);
    if (change) {
      inputRef.current?.focus();
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceOnChange(e.target.value);
  };

  const debounceOnChange = _.debounce((value: string) => {
    console.log(value);
    setChildText((childText) => value);
  }, 500);

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setChange((change) => !change);
    }
  };

  const kidLocation = locationMap(mindNode);

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const blankCanvas: any = document.createElement('canvas');
    blankCanvas.classList.add('canvas');
    e.dataTransfer?.setDragImage(blankCanvas, 0, 0);
    document.body?.appendChild(blankCanvas); // 투명 캔버스를 생성하여 글로벌 아이콘 제거
    e.dataTransfer.effectAllowed = 'move'; // 크롬의그린 +아이콘 제거
    const originPosTemp = { ...originPos };
    originPosTemp['x'] = target.offsetLeft;
    originPosTemp['y'] = target.offsetTop;
    console.log('originPosTemp', originPosTemp);
    setOriginPos(originPosTemp); //드래그 시작할때 드래그 전 위치값을 저장

    const clientPosTemp = { ...clientPos };
    clientPosTemp['x'] = e.clientX;
    clientPosTemp['y'] = e.clientY;
    setClientPos(clientPosTemp);
  };

  const dragHandler = (e: any) => {
    const PosTemp = { ...pos };
    PosTemp['left'] = e.target.offsetLeft + e.clientX - clientPos.x;
    PosTemp['top'] = e.target.offsetTop + e.clientY - clientPos.y;
    setPos(PosTemp);

    const clientPosTemp = { ...clientPos };
    clientPosTemp['x'] = e.clientX;
    clientPosTemp['y'] = e.clientY;
    setClientPos(clientPosTemp);
  };

  const dragOverHandler = (e: any) => {
    e.preventDefault(); // 드래그시에 플라잉백하는 고스트이미지를 제거한다
  };

  const dragEndHandler = (e: any) => {
    /* if (!isInsideDragArea(e)) {
      const posTemp = { ...pos };
      posTemp['left'] = originPos.x;
      posTemp['top'] = originPos.y;
      setPos(posTemp);
    } */
    // 캔버스 제거
    const canvases = document.getElementsByClassName('canvas');
    for (let i = 0; i < canvases.length; i++) {
      let canvas = canvases[i];
      canvas.parentNode?.removeChild(canvas);
    }
    // 캔버스로 인해 발생한 스크롤 방지 어트리뷰트 제거
    document.body.removeAttribute('style');
  };

  return (
    <div
      className='child'
      ref={childRef}
      onDragStart={(e) => dragStartHandler(e)}
      onDrag={(e) => dragHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDragEnd={(e) => dragEndHandler(e)}
      draggable
      style={{ left: pos.left, top: pos.top }}
    >
      <button
        type='button'
        className='child_setButton addButton'
        onClick={() => {
          setMindNode((mindNode) => [...mindNode, 'child']);
        }}
      >
        +
      </button>
      <button
        type='button'
        className='child_setButton deleteButton'
        onClick={() =>
          setMindNode((mindNode) => [...mindNode.slice(0, mindNode.length - 1)])
        }
      >
        -
      </button>
      {change ? (
        <input
          ref={inputRef}
          className='child_input'
          type='text'
          autoFocus
          onChange={(e) => onChangeHandler(e)}
          onKeyPress={(e) => onKeyPressHandler(e)}
          onBlur={changeText}
        />
      ) : (
        <p className='child_text' onClick={changeText}>
          {childText}
        </p>
      )}
      {mindNode.map((data, index) => {
        if (kidLocation) {
          let top = kidLocation[index][0];
          let left = kidLocation[index][1];
          return (
            <>
              <span className='spanl'></span>
              <Kid name={data} location={kidLocation[index]} />
            </>
          );
        }
      })}
    </div>
  );
}
