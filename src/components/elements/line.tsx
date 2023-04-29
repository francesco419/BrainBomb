import { useRef, useState, useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { ElementObj, selectEle } from '../../redux/Slices/eleSlice';
import { pathType, selectLocation } from '../../redux/Slices/pathSlice';
import _ from 'lodash';

interface xy {
  x: string;
  y: string;
}

interface LineState {
  data: ElementObj;
}

export default function Line({ data }: LineState) {
  const loc = useAppSelector(selectLocation);
  const [from, setFrom] = useState<xy>({ x: '0px', y: '0px' });
  const [to, setTo] = useState<number>(0);
  const [tan, setTan] = useState<number>();
  const elementID = data;
  const myLocation = findLoc();

  useEffect(() => {
    cal(myLocation, elementID.from);
  }, [loc]);

  function findLoc() {
    //호이스팅
    //해당 ele와 같은 loc 찾기 + 리턴
    const num = _.findIndex(loc.path, (data) => {
      return data.id === elementID.id;
    });
    return loc.path[num];
  }

  const cal = (id: pathType, fromID: string | null) => {
    if (fromID === null) {
      return; //fromID가 null일시 return => 오직 HEAD에 적용(예정)
    }

    const at = _.findIndex(loc.path, (data) => {
      return data.id === fromID;
    }); //도착 element 위치 계산위한 ele의 인덱스 찾기 - 찾는곳은 redux의 location에서 직접 검색

    /*
    아래의 조건문에 따라서 선의 시작지점이 바뀐다. => 

    하위element가 시작element일시 시작점 yS가 끝점 yE관계에서 

    yS >= yE 일때 정상작동을 하게되지만 
    yS < yE 일때, 비정상적인 작동을 하게된다. 
    
    이러한 이유는 transform의 rotate의 각도가 -90~90을 넘지않기에 발생되는 현상이다.

    이를 해결하기위해 기존 시작과 대상 element을 서로 바꿔주면서 rotate의 각도가 각 시작지점에 따라 정상작동하도록 설계하였다. 
    */

    if (id.y >= loc.path[at].y) {
      const fromObj: xy = {
        x: loc.path[at].x + 48.5 + 'px',
        y: loc.path[at].y + 20 + 'px'
      }; // 연결선 초기 시작점(상위) element로 부터 시작한다 + 48.5(널이 / 2)와 20(높이 / 2)은 element의 크기에서 정 중앙에서 시작하기 위함

      setFrom(fromObj); //초기위치 설정

      const state = {
        x: loc.path[at].x - id.x,
        y: whichIsBigger(id.y, loc.path[at].y)
      };

      const tempTan = ((Math.atan(state.x / state.y) * 180) / Math.PI).toFixed(
        1
      ); //역탄젠트를 이용한 각도계산
      setTan(parseInt(tempTan));

      const real = Math.sqrt(state.x * state.x + state.y * state.y); //피타고라스를 이용한 대각선 계산
      setTo(real);
    } else {
      const fromObj: xy = {
        x: id.x + 48.5 + 'px',
        y: id.y + 20 + 'px'
      }; // 연결선 초기 시작점(하위) element로 부터 시작한다 + 48.5(널이 / 2)와 20(높이 / 2)은 element의 크기에서 정 중앙에서 시작하기 위함

      setFrom(fromObj); //초기위치 설정

      const state = {
        x: id.x - loc.path[at].x,
        y: whichIsBigger(loc.path[at].y, id.y)
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
      style={{
        top: from.y,
        left: from.x,
        height: to + 'px',
        transform: `rotate(${tan}deg)`,
        transformOrigin: '0 0px'
      }}
    ></div>
  );
}
