import { useRef, useState, useEffect } from 'react';
import { MemoElement } from '../../components/elements/mapElement';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { selectEle } from '../../redux/Slices/eleSlice';
import Line from '../../components/elements/line';
import _ from 'lodash';

export default function DragSection() {
  const ele = useAppSelector(selectEle);
  return (
    <div className='section_dragSection'>
      {ele.map((data, index) => {
        if (index === 0) {
          return <MemoElement data={data} number={index} key={data.id} />;
        } else {
          return (
            <>
              <MemoElement data={data} number={index} key={data.id} />
              <Line data={data} key={`${data.id}_line`} />
            </>
          );
        }
      })}
    </div>
  );
}
