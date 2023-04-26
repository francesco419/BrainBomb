import { useRef, useState, useEffect } from 'react';
import Min from '../../components/elements/mapElement';
import { useAppSelector } from '../../redux/hooks';
import { selectEle } from '../../redux/Slices/eleSlice';
import { randomID } from '../../functions/randomId';

export default function DragSection() {
  const ele = useAppSelector(selectEle);
  const ran = randomID();
  console.log(ran);
  return (
    <div className='section_dragSection'>
      {ele.map((data, index) => {
        return <Min id={data} number={index} />;
      })}
      <div
        className='st_line'
        style={{
          top: '100px',
          left: '100px',
          height: '300px',
          transform: `rotate(-50deg)`,
          transformOrigin: '0 -50px'
        }}
      ></div>
    </div>
  );
}
