import { useHref } from 'react-router-dom';
import { PropertyType } from '../../functions/interface/interface';
import './property.scss';
import { useEffect, useState, useRef } from 'react';

export default function Catergories({
  element,
  propertyName,
  button
}: PropertyType) {
  const [show, setShow] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const onClickHandler = () => {
    setShow((show) => !show);
  };

  if (button) {
    return (
      <div className='property-prop'>
        <div className='property-prop__title'>
          <p>{propertyName}</p>
          <button onClick={onClickHandler}>{show ? '-' : '+'}</button>
        </div>
        {show && (
          <div>
            <hr style={{ margin: '1rem 0 0' }} />
            {element}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div
        className='property-next-prop'
        style={{ maxHeight: show ? '1000px' : '20px' }}
        ref={ref}
      >
        <div className='property-next-prop__title'>
          <p>{propertyName}</p>
          <button onClick={onClickHandler}>{show ? '-' : '+'}</button>
        </div>
        {show && element}
      </div>
    );
  }
}
