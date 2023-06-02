import { useRef, useState, useEffect } from 'react';
import { MemoElement } from '../../components/elements/mapElement';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { selectEle } from '../../redux/Slices/eleSlice';
import Line from '../../components/elements/line';
import _ from 'lodash';

export default function DragSection() {
  const ele = useAppSelector(selectEle);
  const ref = useRef<HTMLDivElement>(null);
  const speed = 0.1;
  let scale = 1;

  /*   useEffect(() => {
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

  return (
    <div ref={ref} className='section_page'>
      <div className='section_dragSection'>
        {ele.map((data, index) => {
          if (index === 0) {
            return <MemoElement data={data} number={index} key={data.id} />;
          } else {
            return (
              <div key={`${data.id}_${index}`}>
                <MemoElement data={data} number={index} key={data.id} />
                <Line data={data} key={`${data.id}_line`} />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
