import { useEffect, useState, useRef } from 'react';
import { pageEle } from '../../../redux/Slices/pageSlice';
import { useAppSelector } from '../../../redux/hooks';
import './zoomAlarm.scss';

export default function ZoomAlarm() {
  const pageStyle = useAppSelector(pageEle);
  const ref = useRef<HTMLDivElement>(null);
  const [opac, setOpac] = useState<number>(1);
  let scale: number = pageStyle.value.scale;
  let inter: any;

  useEffect(() => {
    setOpac((opac) => 1);

    inter = setInterval(() => {
      if (inter) {
        if (opac > 0.8) {
          setOpac((opac) => opac - 0.01);
        } else {
          setOpac((opac) => opac - 0.02);
        }
      }
    }, 10);
  }, [
    pageStyle.value.scale,
    pageStyle.value.scale === 0.3,
    pageStyle.value.scale === 2
  ]);

  useEffect(() => {
    setOpac((opac) => 1);

    inter = setInterval(() => {
      if (inter) {
        if (opac > 0.8) {
          setOpac((opac) => opac - 0.01);
        } else {
          setOpac((opac) => opac - 0.02);
        }
      }
    }, 10);
  }, []);

  setTimeout(() => {
    clearInterval(inter);
  }, 1000);

  return (
    <div ref={ref} className='zoomAlarm' style={{ opacity: opac }}>
      <p>x{scale}</p>
    </div>
  );
}
