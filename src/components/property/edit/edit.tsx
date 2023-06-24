import './edit.scss';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  setBackground,
  pageEle,
  setPageSize
} from '../../../redux/Slices/pageSlice';
import { SketchPicker } from 'react-color';
import { useState } from 'react';
import { selectLine, editLine } from '../../../redux/Slices/lineSlice';
import { ColorPallet } from './pallet';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';
import _ from 'lodash';
import { PageSizeType } from '../../../functions/interface/interface';

export default function PropertyEdit() {
  const dispatch = useAppDispatch();
  const line = useAppSelector(selectLine);
  const [color, setColor] = useState<string>(line.value.borderColor);
  const [width, setWidth] = useState<string>('1');
  const [radio, setRadio] = useState<string>('solid');

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
        <PageEdit />
        <hr />
        <li>
          <p className='property-edit__category'>LINE : </p>
          <ul className='property-edit__line'>
            <ColorPallet line={color} set={setColor} />
            <li>
              <label>Width : </label>
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
              <label>Style : </label>
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
                Save LineStyle
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

function PageEdit() {
  const dispatch = useAppDispatch();
  const [back, setBack] = useState<boolean>(false);
  const pageStyle = useAppSelector(pageEle);
  const [size, setSize] = useState<PageSizeType>({
    width: pageStyle.value.width,
    height: pageStyle.value.height
  });

  const BackgroundHandler = () => {
    setBack((back) => !back);
  };

  const downloadHandler = () => {
    htmlToImage
      .toPng(document.getElementById('dragSection') as HTMLDivElement)
      .then(function (dataUrl) {
        download(dataUrl, 'my-node.png');
      });
  };

  const widthChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const temp: PageSizeType = {
      width: parseInt(e.target.value),
      height: size.height
    };
    setSize((size) => temp);
  };

  const heightChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const temp: PageSizeType = {
      width: size.width,
      height: parseInt(e.target.value)
    };
    setSize((size) => temp);
  };

  const onClickHandler = () => {
    console.log(size);
    dispatch(setPageSize(size));
  };

  return (
    <>
      <li className='property-edit__pageSet'>
        <p>Page : </p>
        <div className='property-edit__pageSet__box'>
          <label>Width : </label>
          <input
            type='number'
            onChange={widthChangeHandler}
            placeholder={`${pageStyle.value.width}`}
          />
          px
        </div>
        <div className='property-edit__pageSet__box'>
          <label>Height : </label>
          <input
            type='number'
            onChange={heightChangeHandler}
            placeholder={`${pageStyle.value.height}`}
          />
          px
        </div>
        <div className='property-edit__pageSet__box'>
          <label>Location : &nbsp;</label>
          <p>{`${pageStyle.value.location.x} / ${pageStyle.value.location.y}`}</p>
        </div>
        <div className='property-edit__pageSet__box'>
          <label>Background : </label>
          <button
            style={{ backgroundColor: pageStyle.value.backgroundColor }}
            onClick={BackgroundHandler}
            title={pageStyle.value.backgroundColor}
          ></button>
        </div>
      </li>
      {back && (
        <li className='property-edit__picker'>
          <SketchPicker
            color={pageStyle.value.backgroundColor}
            onChange={(color) => dispatch(setBackground(color.hex))}
          />
        </li>
      )}
      <button className='property-edit__pageSet__save' onClick={onClickHandler}>
        Save Theme
      </button>
    </>
  );
}
