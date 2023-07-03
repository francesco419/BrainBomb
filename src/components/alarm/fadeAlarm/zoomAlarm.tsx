import { useEffect, useState, useRef } from 'react';
import { pageEle } from '../../../redux/Slices/pageSlice';
import { useAppSelector } from '../../../redux/hooks';
import './zoomAlarm.scss';

export default function ZoomAlarm() {
  const pageStyle = useAppSelector(pageEle);
  const ref = useRef<HTMLDivElement>(null);
  const [opac, setOpac] = useState<number>(1);
  let scale: number = pageStyle.value.scale;
  let timeout: any;

  useEffect(() => {
    setOpac((opac) => 1);
    timeout = setTimeout(() => {
      setOpac((opac) => 0);
    }, 500);
  }, [pageStyle.value.scale]);

  useEffect(() => {
    setOpac((opac) => 1);
    timeout = setTimeout(() => {
      setOpac((opac) => 0);
    }, 500);
  }, []);

  return (
    <div
      ref={ref}
      className='zoomAlarm'
      style={{ opacity: opac, display: opac <= 0 ? 'none' : 'block' }}
    >
      <p>x{scale}</p>
    </div>
  );
}
