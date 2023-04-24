import { useRef, useState, useEffect } from 'react';
import _ from 'lodash';
import Min from '../../components/elements/mapElement';
import { pathType } from '../../redux/Slices/pathSlice';

export interface MinType {
  name: string;
  index: number;
  change: any;
  deletit: any;
  id: string;
  refer?: React.RefObject<HTMLDivElement>;
}

export default function Pallet() {
  const boxRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);
  //const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [element, setElement] = useState<string[]>(['HEAD', 'SUB']);
  const [count, setCount] = useState<number>(0);

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

  return (
    <div className='section_part' ref={boxRef}>
      <div className='section_dragSection'>
        {element.map((data, index) => {
          return (
            <Min
              name={data}
              index={index}
              change={changeElement}
              deletit={changeDelete}
              id={`child_${index}`}
            />
          );
        })}
        <div
          className='st_line'
          style={{
            top: '100px',
            left: '100px',
            height: '300px'
          }}
        ></div>
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
