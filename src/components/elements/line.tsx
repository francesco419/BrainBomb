import { useState, useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { ElementObj, selectEle } from '../../redux/Slices/eleSlice';
import _ from 'lodash';
import React from 'react';
import { selectMove } from '../../redux/Slices/moveSlice';
import { selectLine } from '../../redux/Slices/lineSlice';
import { xy, Element } from '../../functions/interface/interface';

export default function Line({ data }: Element) {
  const ele = useAppSelector(selectEle);
  const move = useAppSelector(selectMove);
  const line = useAppSelector(selectLine);
  const [from, setFrom] = useState<xy>({ x: '0px', y: '0px' });
  const [to, setTo] = useState<number>(0);
  const [tan, setTan] = useState<number>();
  const [define, setDefine] = useState<boolean>(data.id === move.id);
  const elementID = data;

  useEffect(() => {
    if (data.id === move.id) {
      cal(move);
    } else if (data.from === move.id) {
      calFrom(elementID);
    }
  }, [move]);

  useEffect(() => {
    cal(elementID);
  }, []);

  /*   function getIndex(arr: ElementObj[], compare: string | null) {
    if (compare === null) {
      return 0;
    }
    return _.findIndex(arr, (data) => {
      return data.id === compare;
    });
  } */

  const cal = (myElement: ElementObj) => {
    if (myElement.from === null) {
      return; //fromID가 null일시 return => 오직 HEAD에 적용(예정)
    }

    const at = _.findIndex(ele, (data) => {
      return data.id === myElement.from;
    }); //도착 element 위치 계산위한 ele의 인덱스 찾기 - 찾는곳은 redux의 location에서 직접 검색

    /*
    아래의 조건문에 따라서 선의 시작지점이 바뀐다. => 

    하위element가 시작element일시 시작점 yS가 끝점 yE관계에서 

    yS >= yE 일때 정상작동을 하게되지만 
    yS < yE 일때, 비정상적인 작동을 하게된다. 
    
    이러한 이유는 transform의 rotate의 각도가 -90~90을 넘지않기에 발생되는 현상이다.

    이를 해결하기위해 기존 시작과 대상 element을 서로 바꿔주면서 rotate의 각도가 각 시작지점에 따라 정상작동하도록 설계하였다. 
    */

    const location = myElement.location;
    const otherLocation = ele[at].location;

    const getWidth = myElement.style.width.split('px');
    const getHeight = myElement.style.height.split('px');
    const getAtWidth = ele[at].style.width.split('px');
    const getAtHeight = ele[at].style.height.split('px');

    let x = parseInt(getWidth[0]) / 2;
    let y = parseInt(getHeight[0]) / 2;

    let aX = parseInt(getAtWidth[0]) / 2;
    let aY = parseInt(getAtHeight[0]) / 2;

    if (location.y >= otherLocation.y) {
      const fromObj: xy = {
        x: otherLocation.x + aX + 'px',
        y: otherLocation.y + aY + 'px'
      }; // 연결선 초기 시작점(상위) element로 부터 시작한다 + 48.5(널이 / 2)와 20(높이 / 2)은 element의 크기에서 정 중앙에서 시작하기 위함

      setFrom(fromObj); //초기위치 설정

      const state = {
        x: otherLocation.x - location.x,
        y: whichIsBigger(location.y, otherLocation.y)
      };

      const tempTan = ((Math.atan(state.x / state.y) * 180) / Math.PI).toFixed(
        1
      ); //역탄젠트를 이용한 각도계산
      setTan(parseInt(tempTan));

      const real = Math.sqrt(state.x * state.x + state.y * state.y); //피타고라스를 이용한 대각선 계산
      setTo(real);
    } else {
      const fromObj: xy = {
        x: location.x + aX + 'px',
        y: location.y + aY + 'px'
      }; // 연결선 초기 시작점(하위) element로 부터 시작한다 + 48.5(널이 / 2)와 20(높이 / 2)은 element의 크기에서 정 중앙에서 시작하기 위함

      setFrom(fromObj); //초기위치 설정

      const state = {
        x: location.x - otherLocation.x,
        y: whichIsBigger(otherLocation.y, location.y)
      };

      const tempTan = ((Math.atan(state.x / state.y) * 180) / Math.PI).toFixed(
        1
      ); //역탄젠트를 이용한 각도계산
      setTan(parseInt(tempTan));

      const real = Math.sqrt(state.x * state.x + state.y * state.y); //피타고라스를 이용한 대각선 계산
      setTo(real);
    }
  };

  const calFrom = (myElement: ElementObj) => {
    if (myElement.from === null) {
      return; //fromID가 null일시 return => 오직 HEAD에 적용(예정)
    }

    const at = move; //도착 element 위치 계산위한 ele의 인덱스 찾기 - 찾는곳은 redux의 location에서 직접 검색

    /*
    아래의 조건문에 따라서 선의 시작지점이 바뀐다. => 

    하위element가 시작element일시 시작점 yS가 끝점 yE관계에서 

    yS >= yE 일때 정상작동을 하게되지만 
    yS < yE 일때, 비정상적인 작동을 하게된다. 
    
    이러한 이유는 transform의 rotate의 각도가 -90~90을 넘지않기에 발생되는 현상이다.

    이를 해결하기위해 기존 시작과 대상 element을 서로 바꿔주면서 rotate의 각도가 각 시작지점에 따라 정상작동하도록 설계하였다. 
    */

    const location = myElement.location;
    const otherLocation = at.location;
    const getWidth = myElement.style.width.split('px');
    const getHeight = myElement.style.height.split('px');
    const getAtWidth = at.style.width.split('px');
    const getAtHeight = at.style.height.split('px');

    let x = parseInt(getWidth[0]) / 2;
    let y = parseInt(getHeight[0]) / 2;

    let aX = parseInt(getAtWidth[0]) / 2;
    let aY = parseInt(getAtHeight[0]) / 2;

    if (location.y >= otherLocation.y) {
      const fromObj: xy = {
        x: otherLocation.x + aX + 'px',
        y: otherLocation.y + aY + 'px'
      }; // 연결선 초기 시작점(상위) element로 부터 시작한다 + 48.5(널이 / 2)와 20(높이 / 2)은 element의 크기에서 정 중앙에서 시작하기 위함

      setFrom(fromObj); //초기위치 설정

      const state = {
        x: otherLocation.x - location.x,
        y: whichIsBigger(location.y, otherLocation.y)
      };

      const tempTan = ((Math.atan(state.x / state.y) * 180) / Math.PI).toFixed(
        1
      ); //역탄젠트를 이용한 각도계산
      setTan(parseInt(tempTan));

      const real = Math.sqrt(state.x * state.x + state.y * state.y); //피타고라스를 이용한 대각선 계산
      setTo(real);
    } else {
      const fromObj: xy = {
        x: location.x + aX + 'px',
        y: location.y + aY + 'px'
      }; // 연결선 초기 시작점(하위) element로 부터 시작한다 + 48.5(널이 / 2)와 20(높이 / 2)은 element의 크기에서 정 중앙에서 시작하기 위함

      setFrom(fromObj); //초기위치 설정

      const state = {
        x: location.x - otherLocation.x,
        y: whichIsBigger(otherLocation.y, location.y)
      };

      const tempTan = ((Math.atan(state.x / state.y) * 180) / Math.PI).toFixed(
        1
      ); //역탄젠트를 이용한 각도계산
      setTan(parseInt(tempTan));

      const real = Math.sqrt(state.x * state.x + state.y * state.y); //피타고라스를 이용한 대각선 계산
      setTo(real);
    }
  };

  const whichIsBigger = (a: number, b: number): number => {
    let num: number;

    if (a > b) {
      num = a - b;
    } else if (a < b) {
      num = b - a;
    } else {
      num = a - b;
    }

    return num;
  };

  return (
    <div
      className='comp_line'
      style={Object.assign(
        {
          top: from.y,
          left: from.x,
          height: to + 'px',
          transform: `rotate(${tan}deg)`,
          transformOrigin: '0 0px'
        },
        line.value
      )}
    ></div>
  );
}

export const MemoLine = React.memo(Line);
