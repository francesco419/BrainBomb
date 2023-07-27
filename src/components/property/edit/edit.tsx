import './edit.scss';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { useState } from 'react';
import { selectLine, editLine } from '../../../redux/Slices/lineSlice';
import { ColorPallet } from './pallet';
import _ from 'lodash';
import PageEdit from './pageEdit';
import BorderButton from '../../common/button/borderbutton';
import Input from '../../common/input/common-Input';
import Range from '../../common/input/range';
import Radio from '../../common/input/radio';

export default function PropertyEdit() {
  const dispatch = useAppDispatch();
  const line = useAppSelector(selectLine);
  const [color, setColor] = useState<string>(line.value.borderRightColor);
  const [width, setWidth] = useState<string>('4');
  const [radio, setRadio] = useState<string>('solid');

  const changeState = () => {
    let temp = {
      value: {
        borderRightColor: color,
        borderRightWidth: width + 'px',
        borderStyle: radio
      }
    };
    console.log(temp);
    dispatch(editLine(temp));
  };

  const onChangeStyle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setRadio(e.target.value);
      console.log(e.target.value);
    }
  };

  return (
    <div className='property-edit'>
      <ul className='property-edit__page'>
        <PageEdit />
        <hr />
        <li>
          <p className='property-edit__category'>Line : </p>
          <ul className='property-edit__line'>
            <ColorPallet line={color} set={setColor} />
            <li>
              <label>Width : </label>
              <Range
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
              <label>Style : </label>
              <Radio
                type='radio'
                name='lineStyle'
                value='solid'
                onChange={(e) => onChangeStyle(e)}
              />
              <label>Solid</label>
              <Radio
                type='radio'
                name='lineStyle'
                value='dotted'
                onChange={(e) => onChangeStyle(e)}
              />
              <label>Dotted</label>
              <Radio
                type='radio'
                name='lineStyle'
                value='dashed'
                onChange={(e) => onChangeStyle(e)}
              />
              <label>Dashed</label>
            </li>
            <li>
              {/*               <button
                type='button'
                className='property-edit__save'
                onClick={changeState}
              >
                Save LineStyle
              </button> */}
              <BorderButton
                size='sm'
                children='Save LineStyle'
                act={changeState}
              />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
