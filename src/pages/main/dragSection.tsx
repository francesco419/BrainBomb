import { useRef, useState, useEffect } from 'react';
import Min from '../../components/elements/mapElement';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { selectEle } from '../../redux/Slices/eleSlice';
import { selectLocation } from '../../redux/Slices/pathSlice';
import Line from '../../components/elements/line';
import _ from 'lodash';

export default function DragSection() {
  const ele = useAppSelector(selectEle);
  const loc = useAppSelector(selectLocation);
  return (
    <div className='section_dragSection'>
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
      {/*       <div
        className='st_line'
        style={{
          top: from.y,
          left: from.x,
          height: to + 'px',
          transform: `rotate(${tan}deg)`,
          transformOrigin: '0 0px'
        }}
      ></div> */}
    </div>
  );
}
