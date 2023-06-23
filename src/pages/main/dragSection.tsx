import React, { useRef, useState, useEffect } from 'react';
import { MemoElement, Min } from '../../components/elements/element/mapElement';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { selectEle } from '../../redux/Slices/eleSlice';
import Line from '../../components/elements/line';
import { pageEle } from '../../redux/Slices/pageSlice';
import _ from 'lodash';
import { moveDrag } from '../../redux/Slices/moveSlice';

export default function DragSection() {
  const ele = useAppSelector(selectEle);
  const pageStyle = useAppSelector(pageEle);
  const ref = useRef<HTMLDivElement>(null);
  const move = useAppSelector(moveDrag);

  let _startX = 0;
  let _startY = 0;
  let _offsetX = 0;
  let _offsetY = 0;
  let _dragElement: HTMLDivElement | null;

  function onMouseDown(event: any) {
    _startX = event.clientX;
    _startY = event.clientY;
    _dragElement = document.getElementById('dragSection') as HTMLDivElement;
    _offsetX = _dragElement.offsetLeft;
    _offsetY = _dragElement.offsetTop;
    console.log('page start');
  }

  function onMouseMoveHandler(event: any) {
    if (_dragElement !== null) {
      _dragElement.style.left = _offsetX + event.clientX - _startX + 'px';
      _dragElement.style.top = _offsetY + event.clientY - _startY + 'px';
      console.log('page drag');
    }
  }

  function onMouseUp(event: any) {
    if (_dragElement) {
      document.onmousemove = null;
      if (_offsetY + event.clientY - _startY > 0) {
        _dragElement.style.top = 0 + 'px';
      }
      if (_offsetX + event.clientX - _startX > 0) {
        _dragElement.style.left = 0 + 'px';
      }
      //상단 범위 내부로 전체 엘리먼트가 들어올시 (0,0)으로 강제 이동.
      if (
        window.innerHeight >
        pageStyle.value.height + _offsetY + event.clientY - _startY
      ) {
        _dragElement.style.top =
          window.innerHeight - pageStyle.value.height + 'px';
      }

      if (
        window.innerWidth >
        pageStyle.value.width + _offsetX + event.clientX - _startX
      ) {
        _dragElement.style.left =
          window.innerWidth - pageStyle.value.width + 'px';
      }
    }
    _dragElement = null;
    console.log('page end');
  }

  /*  const speed = 0.1;
  let scale = 1;

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.addEventListener('wheel', (e) => {
        if (ref.current) {
          console.log(e.deltaY);
          if (e.deltaY > 0) {
            ref.current.style.transform = `scale(${(scale -= speed)})`;
          } else {
            ref.current.style.transform = `scale(${(scale += speed)})`;
          }
        }
      });
    }
  }, []); */

  const onmouseDownHandler = () => {};

  return (
    <div ref={ref} className='section_page'>
      <div
        className='section_dragSection'
        id='dragSection'
        style={{
          backgroundColor: pageStyle.value.backgroundColor,
          width: pageStyle.value.width + 'px',
          height: pageStyle.value.height + 'px'
        }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={move ? undefined : onMouseMoveHandler}
        //onMouseLeave={() => (document.onmousemove = null)}
      >
        {ele.map((data, index) => {
          if (index === 0) {
            return <Min data={data} number={index} key={data.id} />;
          } else {
            return (
              <div key={`${data.id}_${index}`}>
                <Min data={data} number={index} key={data.id} />
                <Line data={data} key={`${data.id}_line`} />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
