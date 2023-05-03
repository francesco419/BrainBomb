import { ElementObj } from '../../redux/Slices/eleSlice';
import { selectEle } from '../../redux/Slices/eleSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';

export default function PropertyList() {
  const ele = useAppSelector(selectEle);
  const [inOrder, setInOrder] = useState<ElementObj[]>([]);
  let copy = ele;
  let befOrder: ElementObj[] = [];

  useEffect(() => {
    setList(copy);
  }, []);

  const setList = (arr: ElementObj[]) => {
    let temp: ElementObj[] = arr;
    /* _.forEach(arr, (element) => {
      if (element.from === null) {
        temp.push(element);
      }
    }); */

    searchDeep(temp, arr[0]);
    setInOrder((inOrder) => befOrder);
  };

  const findIndexElement = (
    arr: ElementObj[],
    element: string | null,
    unit: number
  ) => {
    let index: number = -1;

    if (unit === 0) {
      index = _.findIndex(arr, (o) => {
        return o.id === element;
      }); //arr에 element가 있는지
    }

    if (unit === 1) {
      index = _.findIndex(arr, (o) => {
        return o.from === element;
      }); //arr에 현재 element의 id를 from으로 가지는 element가 있는지
    }

    return index;
  };

  const searchDeep = (arr: ElementObj[], element: ElementObj) => {
    if (arr.length <= 1) {
      return;
    }
    /* 
    0. 현재 element를 index에 넣기.
    
    1. if 현재id를 from으로 가지고 있는 element 찾기.

    2.찾은 element를 from으로 가지고 있는 element가 
      2.1 없다면 => 새로운 배열에 push, 이전 element로 복귀
      2.2 있다면 => 1번 반복

    3. 
    */

    const isExist = findIndexElement(befOrder, element.id, 0);
    const index = findIndexElement(arr, element.id, 1);

    if (isExist === -1) {
      console.log('add');
      befOrder.push(element);
      //befOrder에 element가 존재하지 않을시
    }

    if (index !== -1) {
      console.log('there is');
      searchDeep(arr, arr[index]);
      // from으로 되는 element가 있을시
    }

    if (index === -1) {
      console.log('nope');
      if (arr.length > 1) {
        console.log('remove');
        _.remove(arr, (o) => {
          return o.id === element.id;
        });
      }
      const before = findIndexElement(arr, element.from, 0);
      // from으로 되는 element가 없을시
      if (before === -1) {
        return;
        // 모든 element정리가 끝났을때
      } else {
        searchDeep(arr, arr[before]);
      }
    }

    //if()
  };

  return (
    <div className='property-list'>
      {_.map(inOrder, (o) => {
        return (
          <div>
            <p>{o.id}</p>
          </div>
        );
      })}
    </div>
  );
}
