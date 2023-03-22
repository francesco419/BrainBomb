import Child from '../../components/elements/child';
import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';

export default function Pallet() {
  const boxRef = useRef<HTMLDivElement>(null);
  const eleRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const debouceFunc = (func: () => void) => {
    _.debounce(func, 500);
  };

  function Min() {
    const [location, setLocation] = useState({ x: 0, y: 0 });
    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
      const blankCanvas: any = document.createElement('canvas');
      blankCanvas.classList.add('canvas');
      e.dataTransfer?.setDragImage(blankCanvas, 0, 0);
      document.body?.appendChild(blankCanvas); // 투명 캔버스를 생성하여 글로벌 아이콘 제거
      e.dataTransfer.effectAllowed = 'move';
    };

    const dragHandler = (e: React.DragEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement;
      const pos = { ...location };
      pos['x'] = e.clientX - 100;
      pos['y'] = e.clientY - 150;
      setLocation(pos);
    };

    const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    };

    const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
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
        draggable
        className='section_drag'
        ref={eleRef}
        onDragStart={(e) => dragStartHandler(e)}
        onDrag={(e) => dragHandler(e)}
        onDragOver={(e) => dragOverHandler(e)}
        onDragEnd={(e) => dragEndHandler(e)}
        style={{ top: location.y + 'px', left: location.x + 'px' }}
      >
        drag me
      </div>
    );
  }

  return (
    <div className='section_part' ref={boxRef}>
      <Min />
      <Min />
      {/* <div
        className='section_over'
        onDragEnter={() => console.log('drag enter here')}
        onDragOver={() => console.log('drag is here')}
        onDragLeave={() => console.log('drag leave here')}
      ></div> */}
    </div>
  );
}
