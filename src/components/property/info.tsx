import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { selectMove } from '../../redux/Slices/moveSlice';
import { ElementObj, selectEle, reNameEle } from '../../redux/Slices/eleSlice';
import { useEffect, useState } from 'react';
import _ from 'lodash';

export default function PropertyInfo() {
  const element = useAppSelector(selectMove);
  const elementArray = useAppSelector(selectEle);
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  let anyText: string;
  let [ele, setEle] = useState<ElementObj[]>([]);
  let parent: string = element.from
    ? elementArray[_.findIndex(elementArray, { id: element.from })].name
    : '-';
  let obj =
    _.findIndex(elementArray, { id: element.id }) !== -1
      ? elementArray[_.findIndex(elementArray, { id: element.id })]
      : element;
  //요소 삭제시 elementArray에 요소가 포함되지 않으면 오류 발생 하므로 -1(인덱스 존재 x)이면 대체 요소 할당.

  useEffect(() => {
    const arr = filterChild();
    setEle((ele) => arr);
  }, [elementArray, element.id, element]);

  const filterChild = (): ElementObj[] => {
    return _.filter(elementArray, { from: element.id });
  };

  const changeShow = () => {
    setShow((show) => !show);
  };

  const changeNameHandler = () => {
    if (anyText !== '') {
      console.log(1);
      dispatch(reNameEle({ id: element.id, name: anyText }));
    }
    changeShow();
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    anyText = e.target.value;
  };

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (show) {
        dispatch(reNameEle({ id: element.id, name: anyText }));
      }
      changeShow();
    }
  };

  return (
    <div className='property-info'>
      {element.id !== 'null' && (
        <div className='property-info__inner'>
          <ul>
            <li>
              <p>{`id : ${element.id}`}</p>
            </li>
            <li>
              <p>name :&nbsp;</p>
              {show ? (
                <input
                  onChange={(e) => onChangeHandler(e)}
                  onKeyPress={(e) => onKeyPressHandler(e)}
                ></input>
              ) : (
                <p>{obj.name}</p>
              )}
              <button
                type='button'
                onClick={show ? changeNameHandler : changeShow}
              />
            </li>
            <li>
              <p>{`location : ${element.location.x} / ${element.location.x}`}</p>
            </li>
            <li>
              <p>{`parent : ${parent}`}</p>
            </li>
          </ul>
          <div style={{ display: 'flex' }}>
            <p>{`child : `}&nbsp;</p>
            <ul>
              {ele.length > 0
                ? _.map(ele, (obj) => {
                    return (
                      <li>
                        <p>
                          {obj.name.length > 10
                            ? obj.name.slice(0, 9)
                            : obj.name}
                        </p>
                      </li>
                    );
                  })
                : null}
              <li>
                <p>({ele.length})</p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
