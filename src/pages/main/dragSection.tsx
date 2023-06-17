import { useRef, useState, useEffect } from 'react';
import { MemoElement, Min } from '../../components/elements/element/mapElement';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { selectEle } from '../../redux/Slices/eleSlice';
import Line from '../../components/elements/line';
import { pageEle } from '../../redux/Slices/pageSlice';
import _ from 'lodash';

export default function DragSection() {
  const ele = useAppSelector(selectEle);
  const pageStyle = useAppSelector(pageEle);
  const ref = useRef<HTMLDivElement>(null);
  const speed = 0.1;
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
  }, []);

  return (
    <div
      ref={ref}
      className='section_page'
      style={{ backgroundColor: pageStyle.value.backgroundColor }}
    >
      <div className='section_dragSection'>
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
