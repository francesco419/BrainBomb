import React, { useRef, useState, useEffect } from 'react';
import { Min } from '../../components/elements/element/mapElement';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { selectEle } from '../../redux/Slices/eleSlice';
import Line from '../../components/elements/line';
import {
  pageEle,
  setPageLocation,
  setPageScale,
  setPageSize
} from '../../redux/Slices/pageSlice';
import _ from 'lodash';
import { moveDrag } from '../../redux/Slices/moveSlice';
import { LocationType } from '../../functions/interface/interface';

export default function DragSection() {
  const ele = useAppSelector(selectEle);
  const pageStyle = useAppSelector(pageEle);
  const move = useAppSelector(moveDrag);
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  let _startX = 0;
  let _startY = 0;
  let _offsetX = 0;
  let _offsetY = 0;
  let _dragElement: HTMLDivElement | undefined;
  let loaction: LocationType;

  const debounceOnChange = _.debounce(() => {
    dispatch(setPageLocation(loaction));
  }, 500);

  function onMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    _startX = event.clientX;
    _startY = event.clientY;
    _dragElement = document.getElementById('dragSection') as HTMLDivElement;
    _offsetX = _dragElement.offsetLeft;
    _offsetY = _dragElement.offsetTop;
    console.log('page start');
  }

  function onMouseMoveHandler(event: React.MouseEvent<HTMLDivElement>) {
    if (_dragElement) {
      loaction = {
        x: _offsetX + event.clientX - _startX,
        y: _offsetY + event.clientY - _startY
      };
      _dragElement.style.left = loaction.x + 'px';
      _dragElement.style.top = loaction.y + 'px';

      console.log('page drag');
      debounceOnChange();
    }
  }

  function onMouseUp(event: React.MouseEvent<HTMLDivElement>) {
    if (_dragElement) {
      const y = _offsetY + event.clientY - _startY * pageStyle.value.scale;
      const x = _offsetX + event.clientX - _startX * pageStyle.value.scale;
      document.onmousemove = null;
      if (y > 0) {
        _dragElement.style.top = 0 + 'px';
      }
      if (x > 0) {
        _dragElement.style.left = 0 + 'px';
      }
      //상단 범위 내부로 전체 엘리먼트가 들어올시 (0,0)으로 강제 이동.
      if (window.innerHeight > pageStyle.value.height + y) {
        _dragElement.style.top =
          (window.innerHeight - pageStyle.value.height) *
            pageStyle.value.scale +
          'px';
      }

      if (window.innerWidth > pageStyle.value.width + x) {
        _dragElement.style.left =
          (window.innerWidth - pageStyle.value.width) * pageStyle.value.scale +
          'px';
      }
    }
    _dragElement = undefined;
    console.log('page end');
  }

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.addEventListener('wheel', wheelHandler);
    }
    return () => {
      ref.current?.removeEventListener('wheel', wheelHandler);
    };
  }, []);

  const wheelHandler = (e: WheelEvent) => {
    if (ref.current) {
      if (e.deltaY > 0) {
        dispatch(setPageScale(true));
      } else {
        dispatch(setPageScale(false));
      }
    }
  };

  return (
    <div
      className='section_dragSection'
      id='dragSection'
      ref={ref}
      style={{
        backgroundColor: pageStyle.value.backgroundColor,
        width: pageStyle.value.width * pageStyle.value.scale + 'px',
        height: pageStyle.value.height * pageStyle.value.scale + 'px'
      }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={move ? undefined : onMouseMoveHandler}
      //onMouseMove={(e) => {console.log(e.clientX, e.clientY);}}
    >
      {ele.map((data, index) => {
        if (index === 0) {
          return <Min data={data} number={index} key={data.id} />;
        } else {
          return (
            <>
              <Min data={data} number={index} key={data.id} />
              <Line data={data} key={`${data.id}_line`} />
            </>
          );
        }
      })}
    </div>
  );
}
