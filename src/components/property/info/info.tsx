import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { selectMove } from '../../../redux/Slices/moveSlice';
import {
  ElementObj,
  selectEle,
  reNameEle,
  colorEle
} from '../../../redux/Slices/eleSlice';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { SketchPicker } from 'react-color';
import { ReactComponent as Edit } from '../../../assets/svg/edit.svg';
import './info.scss';
import ElementEdit from './elementEdit';

export default function PropertyInfo() {
  const element = useAppSelector(selectMove);
  const elementArray = useAppSelector(selectEle);
  const [show, setShow] = useState<boolean>(false);
  const [styleEdit, setStyleEdit] = useState<boolean>(false);
  const [color, setColor] = useState<string>(element.style.backgroundColor);
  const [colorPicker, setColorPicker] = useState<boolean>(false);
  let [ele, setEle] = useState<ElementObj[]>([]);
  const dispatch = useAppDispatch();

  let anyText: string;
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
    setColor((color) => element.style.backgroundColor);
  }, [elementArray, element.id, element]);

  useEffect(() => {
    const arr = filterChild();
    setEle((ele) => arr);
    setColor((color) => element.style.backgroundColor);
  }, [element]);

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

  const changeColorHandler = () => {
    if (colorPicker && color) {
      console.log(1);
      dispatch(colorEle({ id: element.id, deep: element.deep, color: color }));
    }
    setColorPicker((colorPicker) => !colorPicker);
  };

  const changeStyleEdit = () => {
    console.log(1);
    setStyleEdit((styleEdit) => !styleEdit);
  };

  return (
    <div className='property-info'>
      {element.id !== 'null' && (
        <div className='property-info__inner'>
          <ul className='property-info__ul'>
            <li>
              <p>{`Id : ${element.id}`}</p>
            </li>
            <li className='property-info__name'>
              <p>Name :&nbsp;</p>
              {show ? (
                <input
                  className='property-info__input'
                  onChange={(e) => onChangeHandler(e)}
                  onKeyPress={(e) => onKeyPressHandler(e)}
                ></input>
              ) : (
                <p>{obj.name}</p>
              )}
              <button
                className='property-info__button'
                type='button'
                onClick={show ? changeNameHandler : changeShow}
              >
                <Edit className='property-info__svg' />
              </button>
            </li>
            <li>
              <p>{`Location : ${element.location.x} / ${element.location.y}`}</p>
            </li>
            <li className='property-info__color'>
              <p>Color :&nbsp;</p>
              <button
                className='property-info__colorButton'
                style={{ backgroundColor: color }}
                onClick={changeColorHandler}
              />
            </li>
            {colorPicker && (
              <li>
                <SketchPicker
                  color={color}
                  onChange={(color: any) => {
                    setColor(color.hex);
                    console.log(color.hex);
                  }}
                />
              </li>
            )}
            <li>
              <p>{`Parent : ${parent}`}</p>
            </li>
            <li>
              <p>{`Child : `}&nbsp;</p>
              <p>({ele.length})</p>
            </li>
            <li>
              <p>Style :&nbsp;</p>
              <button
                className='property-info__button'
                onClick={changeStyleEdit}
              >
                <Edit className='property-info__svg' />
              </button>
            </li>
          </ul>
        </div>
      )}
      {styleEdit && <ElementEdit data={element} shut={changeStyleEdit} />}
    </div>
  );
}

{
  /*               {ele.length > 0
                ? _.map(ele, (obj,index) => {
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
                    해당 엘리먼트에 연결된 자식 엘리먼트 리스트
                  */
}
