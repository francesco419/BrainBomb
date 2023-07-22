import { ChainState, PropertyType } from '../../functions/interface/interface';
import './property.scss';
import { useEffect, useState, useRef } from 'react';
import { ReactComponent as Info } from '../../assets/svg/elementicon/info.svg';
import { ReactComponent as List } from '../../assets/svg/elementicon/list.svg';
import { ReactComponent as Setting } from '../../assets/svg/elementicon/setting.svg';

export default function Catergories({
  element,
  propertyName,
  button,
  handler,
  state,
  fixedNum
}: ChainState) {
  const [show, setShow] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const ICON =
    fixedNum === 1 ? <List /> : fixedNum === 2 ? <Info /> : <Setting />;

  useEffect(() => {
    if (state === fixedNum) {
      setShow((show) => true);
    } else {
      setShow((show) => false);
    }
  }, [state]);

  const onClickHandler = () => {
    if (!show) {
      handler(fixedNum);
    } else {
      handler(0);
    }
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
        <div
          className='property-next-prop__title'
          style={{ backgroundColor: show ? '#191a4e' : '#00002d' }}
        >
          <div className='property-next-prop__res'>
            {ICON}
            <p>{propertyName}</p>
          </div>
          <button onClick={onClickHandler}>{show ? '-' : '+'}</button>
        </div>
        {show && element}
        {show && <hr style={{ margin: '0' }} />}
      </div>
    );
  }
}
