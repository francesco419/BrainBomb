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
  let location: LocationType;

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.addEventListener('wheel', wheelHandler);
    }
    return () => {
      ref.current?.removeEventListener('wheel', wheelHandler);
    };
  }, []);

  const debounceOnChange = _.debounce(() => {
    dispatch(setPageLocation(location));
  }, 500);

  function onMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    _startX = event.clientX;
    _startY = event.clientY;
    if (!move) {
      _dragElement = document.getElementById('dragSection') as HTMLDivElement;
      _offsetX = _dragElement.offsetLeft;
      _offsetY = _dragElement.offsetTop;
    }
  }

  function onMouseMoveHandler(event: React.MouseEvent<HTMLDivElement>) {
    if (_dragElement) {
      location = {
        x: _offsetX + event.clientX - _startX,
        y: _offsetY + event.clientY - _startY
      };
      _dragElement.style.left = location.x + 'px';
      _dragElement.style.top = location.y + 'px';
    }
  }

  function onMouseUp(event: React.MouseEvent<HTMLDivElement>) {
    const fixedY =
      (window.innerHeight - pageStyle.value.height) * pageStyle.value.scale; // note1 : zy
    const fixedX =
      (window.innerWidth - pageStyle.value.width) * pageStyle.value.scale; // note1 : zx

    if (_dragElement && !move && location) {
      const y = _offsetY + event.clientY - _startY * pageStyle.value.scale;
      const x = _offsetX + event.clientX - _startX * pageStyle.value.scale;

      document.onmousemove = null;

      if (y > 0) {
        _dragElement.style.top = 0 + 'px';
        location['y'] = 0;
      }
      if (x > 0) {
        _dragElement.style.left = 0 + 'px';
        location['x'] = 0;
      }

      //상단 범위 내부로 전체 엘리먼트가 들어올시 (0,0)으로 강제 이동.
      if (window.innerHeight < pageStyle.value.height * pageStyle.value.scale) {
        // 뷰포트가 마인드맵보다 작을 때
        if (fixedY > location.y) {
          //y(높이)가 최대치를 벗어났을 때
          _dragElement.style.top = fixedY + 'px';
          location['y'] = fixedY;
        }
      } else {
        // 뷰포트가 마인드맵보다 클 때
        _dragElement.style.top = 0 + 'px';
        location['y'] = 0;
      }

      if (window.innerWidth < pageStyle.value.width * pageStyle.value.scale) {
        // 뷰포트가 마인드맵보다 작을 때
        if (fixedX > location.x) {
          //x(넓이)가 최대치를 벗어났을 때
          _dragElement.style.left = fixedX + 'px';
          location['x'] = fixedX;
        }
      } else {
        // 뷰포트가 마인드맵보다 클 때
        _dragElement.style.left = 0 + 'px';
        location['x'] = 0;
      }
    }
    _dragElement = undefined;
    if (location !== undefined) {
      //해당 부분은 요소 이동시 undefined인 location변수가 redux에 업데이트 되어 오류를 발생시키므로, location !== undefined일 때만 실행
      dispatch(setPageLocation(location));
    }
  }

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
