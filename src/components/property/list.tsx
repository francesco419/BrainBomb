import { ElementObj } from '../../redux/Slices/eleSlice';
import { selectEle } from '../../redux/Slices/eleSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';

export default function PropertyList() {
  const ele = useAppSelector(selectEle);
  let temp: ElementObj[];

  useEffect(() => {
    temp = setList(ele);
    console.log(temp);
  }, []);

  const setList = (arr: ElementObj[]) => {
    let temp: ElementObj[] = [];
    _.forEach(arr, (element) => {
      if (element.from === null) {
        temp.push(element);
      }
    });
    return temp;
  };

  const filterFrom = (arr: ElementObj[], from: string): ElementObj[] => {
    const temp = _.filter(arr, (data) => {
      return data.from === from;
    });
    return temp;
  };

  return (
    <div className='property-list'>
      <ul>
        <ol>
          <li>a</li>
          <ol>
            <li>aa</li>
          </ol>
        </ol>
        <ol>
          <li>b</li>
          <ol>
            <li>ba</li>
          </ol>
        </ol>
      </ul>
    </div>
  );
}
