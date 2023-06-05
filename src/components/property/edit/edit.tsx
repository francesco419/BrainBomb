import './edit.scss';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setBackground, pageEle } from '../../../redux/Slices/pageSlice';
import { ColorResult, SketchPicker } from 'react-color';
import { useEffect, useState } from 'react';
import {
  selectLine,
  editLine,
  LineState
} from '../../../redux/Slices/lineSlice';
import { ColorPallet } from './pallet';

export default function PropertyEdit() {
  const dispatch = useAppDispatch();
  const pageStyle = useAppSelector(pageEle);
  const line = useAppSelector(selectLine);
  const [back, setBack] = useState<boolean>(false);
  const [color, setColor] = useState<string>(line.value.borderColor);
  const [width, setWidth] = useState<string>('1');
  const [radio, setRadio] = useState<string>('solid');

  const BackgroundHandler = () => {
    setBack((back) => !back);
  };

  const changeState = () => {
    let temp = {
      value: {
        borderColor: color,
        borderWidth: width + 'px',
        borderStyle: radio
      }
    };
    console.log(temp);
    dispatch(editLine(temp));
  };

  const onChangeStyle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setRadio(e.target.value);
    }
  };

  return (
    <div className='property-edit'>
      <ul className='property-edit__page'>
        <li className='property-edit__back'>
          <p>Background : </p>
          <button
            style={{ backgroundColor: pageStyle.value.backgroundColor }}
            onClick={BackgroundHandler}
          ></button>
        </li>
        {back && (
          <li className='property-edit__picker'>
            <SketchPicker
              color={pageStyle.value.backgroundColor}
              onChange={(color) => dispatch(setBackground(color.hex))}
            />
          </li>
        )}
        <li>
          <p> - LINE - </p>
          <ul className='property-edit__line'>
            <ColorPallet line={color} set={setColor} />
            <li>
              <p>Width : </p>
              <input
                type='range'
                min='1'
                max='50'
                value={width}
                onChange={(e) => {
                  setWidth((width) => e.target.value);
                }}
              />
              <label>{width}px</label>
            </li>
            <li>
              <p>Style : </p>
              <input
                type='radio'
                name='lineStyle'
                value='solid'
                onChange={(e) => onChangeStyle(e)}
              />
              <label>Solid</label>
              <input
                type='radio'
                name='lineStyle'
                value='dotted'
                onChange={(e) => onChangeStyle(e)}
              />
              <label>Dotted</label>
              <input
                type='radio'
                name='lineStyle'
                value='dashed'
                onChange={(e) => onChangeStyle(e)}
              />
              <label>Dashed</label>
            </li>
            <li>
              <button
                type='button'
                className='property-edit__save'
                onClick={changeState}
              >
                Save
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
