import { PropertyType } from '../../functions/interface/interface';
import './property.scss';
import { useEffect, useState } from 'react';

export default function Catergories({ element, propertyName }: PropertyType) {
  const [show, setShow] = useState<boolean>(
    propertyName !== 'Element Info' ? false : true
  );

  useEffect(() => {}, []);

  const onClickHandler = () => {
    setShow((show) => !show);
  };

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
}
