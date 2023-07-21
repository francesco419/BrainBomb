import './edit.scss';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  setBackground,
  pageEle,
  setPageSize
} from '../../../redux/Slices/pageSlice';
import { SketchPicker } from 'react-color';
import { useState } from 'react';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';
import _ from 'lodash';
import { PageSizeType } from '../../../functions/interface/interface';

export default function PageEdit() {
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
        {/* <div className='property-edit__pageSet__box'>
            <label>Location : &nbsp;</label>
            <p>{`${pageStyle.value.location.x} / ${pageStyle.value.location.y}`}</p>
          </div> */}
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
