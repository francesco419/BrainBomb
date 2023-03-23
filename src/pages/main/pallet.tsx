import { useRef, useState, useEffect } from 'react';
import _ from 'lodash';
import Min from '../../components/elements/mapElement';
import { pathType } from '../../redux/Slices/pathSlice';

export interface MinType {
  name: string;
  index: number;
  change: any;
  deletit: any;
}

export default function Pallet() {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  //const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [element, setElement] = useState<string[]>(['HEAD']);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    line();
  }, []);

  const changeElement = (index: number, name: string) => {
    let temp = element;
    temp[index] = name;
    setElement([...temp]);
  };

  const changeDelete = (name: string) => {
    let arr = element;
    _.remove(arr, (data) => data === name);
    setElement([...arr]);
  };

  const line = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      if (ctx !== undefined && ctx !== null) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
      }
      ctx.lineTo(100, 20);
      ctx.stroke();
    }
  };

  return (
    <div className='section_part' ref={boxRef}>
      <canvas width={1200} height={700} ref={canvasRef} id='mycanvas'></canvas>
      <div className='section_dragSection'>
        {element.map((data, index) => {
          return (
            <Min
              name={data}
              index={index}
              change={changeElement}
              deletit={changeDelete}
            />
          );
        })}
      </div>
      <div className='section_setting'>
        <button
          className='section_setButton'
          onClick={() => {
            setElement([...element, `null${count}`]);
            setCount((count) => count + 1);
          }}
        >
          add +
        </button>
        <button className='section_setButton'>save</button>
      </div>
    </div>
  );
}
