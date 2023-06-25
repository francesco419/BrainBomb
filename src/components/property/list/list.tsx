import { ElementObj } from '../../../functions/interface/interface';
import { selectEle } from '../../../redux/Slices/eleSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import './list.scss';
import { elementBackgroundHandler } from '../../../functions/backgroundHandler';
import { setMove } from '../../../redux/Slices/moveSlice';

export default function PropertyList() {
  const ele = useAppSelector(selectEle);
  const dispatch = useAppDispatch();
  const [inOrder, setInOrder] = useState<ElementObj[]>([]);

  useEffect(() => {
    organizeOrder(ele);
  }, [ele]);

  useEffect(() => {
    organizeOrder(ele);
  }, []);

  const organizeOrder = (arr: ElementObj[]) => {
    let temp: ElementObj[] = [];

    arr.forEach((targetElement) => {
      if (targetElement.from !== null) {
        const fromIndex = _.findIndex(temp, (from) => {
          return from.id === targetElement.from;
        });
        temp.splice(fromIndex + 1, 0, targetElement);
      } else {
        temp.push(targetElement);
      }
    });
    setInOrder((inOrder) => temp);
  };

  return (
    <div className='property-list'>
      {_.map(inOrder, (o, index) => {
        return (
          <div
            className='property-list__element'
            style={index === 0 ? {} : { marginLeft: `${10 * o.deep}px` }}
            onClick={() => dispatch(setMove(o))}
            onMouseOver={() => elementBackgroundHandler(o.id, true)}
            onMouseOut={() => elementBackgroundHandler(o.id, false)}
            key={`${o.name}_${index}`}
          >
            {index === 0 ? (
              <p> {o.name}</p>
            ) : (
              <p>
                {`└ ${
                  o.name.length > 15 ? `${o.name.slice(0, 8)}...` : o.name
                }`}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* 
 onMouseOver={() => elementBackgroundHandler(o.id)}
            onMouseLeave={() => elementBackgroundHandler(o.id, false)}
 */
