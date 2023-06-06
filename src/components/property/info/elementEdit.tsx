import './elementEdit.scss';
import { StyleProp } from './info';
import { useState, useRef, useEffect } from 'react';
import { ReactComponent as Warning } from '../../../assets/svg/warning.svg';
import { ReactComponent as Reset } from '../../../assets/svg/reset.svg';
import { ElementObj, allStyleEle } from '../../../redux/Slices/eleSlice';
import { ColorResult, SketchPicker } from 'react-color';
import { useDispatch } from 'react-redux';
import { styleEle } from '../../../redux/Slices/eleSlice';

type ElementProp = {
  data: ElementObj;
  shut: () => void;
};

export interface StyleIdProp {
  id: string;
  style: StyleProp;
}

export default function ElementEdit({ data, shut }: ElementProp) {
  const [styles, setStyles] = useState<StyleProp>(data.style);
  const [radius, setRadius] = useState<string>('0');
  const [backgroundColor, setBackgroundColor] = useState<string>(
    data.style.backgroundColor
  );
  const [borderColor, setBorderColor] = useState<string>(
    data.style.borderColor
  );
  const [showBorder, setShowBorder] = useState<boolean>(false);
  const [showBackground, setShowBackground] = useState<boolean>(false);
  const [radiusPX, setradiusPX] = useState<boolean>(false);
  let style: StyleProp;
  /**========================================== redux*/
  const dispatch = useDispatch();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    //input(radio)를 사용하여 style의 border-style을 변경
    if (e.target.checked) {
      style = JSON.parse(JSON.stringify(styles));
      style.borderStyle = e.target.value;
      setStyles((styles) => style);
      console.log(styles);
    }
  };

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    //switch를 사용하여 background & borderColor & borderstyle을 제외한 다른 요소를 변경한다
    style = JSON.parse(JSON.stringify(styles));
    const radiusType = radiusPX ? 'px' : '%';
    switch (type) {
      case 'width':
        style.width = e.target.value + 'px';
        setStyles((styles) => style);
        return;
      case 'height':
        style.height = e.target.value + 'px';
        setStyles((styles) => style);
        return;
      case 'font':
        style.fontSize = e.target.value + 'px';
        setStyles((styles) => style);
        return;
      case 'bwidth':
        style.borderWidth = e.target.value + 'px';
        setStyles((styles) => style);
        return;
      case 'bradius':
        style.borderRadius = e.target.value + radiusType;
        setRadius((radius) => e.target.value);
        setStyles((styles) => style);
        return;
      default:
        return;
    }
  };

  const resetColor = () => {
    //변경 이전 상태의 background 색상으로 되돌리기
    setBackgroundColor((backgroundColor) => data.style.backgroundColor);
    style = JSON.parse(JSON.stringify(styles));
    style.borderColor = data.style.backgroundColor;
    setStyles((styles) => style);
  };

  const changeShowBorder = () => {
    setShowBorder((showBorder) => !showBorder);
  };

  const changeShowBackgroundColor = () => {
    setShowBackground((showBackground) => !showBackground);
  };

  const changeBorderColor = (color: ColorResult) => {
    setBorderColor((borderColor) => color.hex);
    style = JSON.parse(JSON.stringify(styles));
    style.borderColor = color.hex;
    setStyles((styles) => style);
  };

  const changeBackgroundColor = (color: ColorResult) => {
    setBackgroundColor((backgroundColor) => color.hex);
    style = JSON.parse(JSON.stringify(styles));
    style.backgroundColor = color.hex;
    setStyles((styles) => style);
  };

  return (
    <div className='element-edit'>
      <ul className='element-edit__ul'>
        <li className='element-edit__flex'>
          <p>Width / Height : &nbsp;</p>
          <div>
            <input
              className='element-edit_inputNum'
              type='number'
              onChange={(e) => inputHandler(e, 'width')}
            />
            <label>px</label>
            &nbsp;&nbsp;/&nbsp;&nbsp;
            <input
              className='element-edit_inputNum'
              type='number'
              onChange={(e) => inputHandler(e, 'height')}
            />
            <label>px</label>
          </div>
        </li>
        <li className='element-edit__flex'>
          <p>FontSize : &nbsp;</p>
          <input
            className='element-edit_inputNum'
            type='number'
            onChange={(e) => inputHandler(e, 'font')}
          />
          <label>px</label>
        </li>
        <li className='element-edit__border'>
          <p>Border : &nbsp;</p>
          <div className='element-edit__border__container'>
            <p>- Width :</p>
            <input
              className='element-edit_inputNum'
              type='number'
              onChange={(e) => inputHandler(e, 'bwidth')}
            />
            <label>px</label>
          </div>
          <div className='element-edit__border__container'>
            <p>- Style :</p>
            <input
              type='radio'
              name='style'
              value='solid'
              onChange={(e) => onChangeHandler(e)}
            />
            <label>Solid</label>
            <input
              type='radio'
              name='style'
              value='dotted'
              onChange={(e) => onChangeHandler(e)}
            />
            <label>Dotted</label>
            <input
              type='radio'
              name='style'
              value='dashed'
              onChange={(e) => onChangeHandler(e)}
            />
            <label>Dashed</label>
          </div>
          <div className='element-edit__border__container'>
            <p>- Color :</p>
            <button
              type='button'
              style={{ backgroundColor: borderColor, border: '1px solid #fff' }}
              onClick={changeShowBorder}
            ></button>
            <button className='element-edit__reset' onClick={resetColor}>
              <Reset />
            </button>
          </div>
          {showBorder && (
            <div style={{ width: 'fit-content', margin: '20px auto' }}>
              <SketchPicker
                color={borderColor}
                onChange={(color) => changeBorderColor(color)}
              />
            </div>
          )}
          <div className='element-edit__border__container'>
            <p>- Radius :</p>
            <input
              type='range'
              min='0'
              max='50'
              value={radius}
              onChange={(e) => inputHandler(e, 'bradius')}
            />
            <label style={{ margin: '0 0 0 10px', width: '25px' }}>
              {radius}
              {radiusPX ? 'px' : '%'}
            </label>
            <input
              type='checkbox'
              onChange={() => setradiusPX((radiusPX) => !radiusPX)}
            />
          </div>
        </li>
        <li className='element-edit__flex'>
          <p>BackGround :&nbsp;</p>
          <button
            className='property-info__colorButton'
            style={{
              backgroundColor: backgroundColor,
              border: '1px solid #fff'
            }}
            onClick={changeShowBackgroundColor}
          />
        </li>
        {showBackground && (
          <div style={{ width: 'fit-content', margin: '0 auto 30px' }}>
            <SketchPicker
              color={backgroundColor}
              onChange={(color) => changeBackgroundColor(color)}
            />
          </div>
        )}
        <li className='element-edit__flex'>
          <p>Apply All :</p>
          <input type='checkbox' id='applyAll' />
          <Warning />
          <div className='element-edit__hidden'>
            <p>
              Apply All의 체크박스에 체크할 시, 저장하는 설정값이 모든 요소에
              저장이 됩니다.
            </p>
          </div>
        </li>
        <li className='element-edit__out'>
          <button
            type='button'
            onClick={() => {
              setStyles((styles) => data.style);
            }}
          >
            RESET
          </button>
          <button
            type='button'
            onClick={() => {
              const doc = document.getElementById(
                'applyAll'
              ) as HTMLInputElement | null;
              if (doc?.checked) {
                dispatch(allStyleEle({ id: data.id, style: styles }));
              } else {
                dispatch(styleEle({ id: data.id, style: styles }));
              }
              shut();
            }}
          >
            SAVE
          </button>
          <button type='button' onClick={shut}>
            CANCEL
          </button>
        </li>
      </ul>
      <div className='element-edit__preview'>
        <div className='element-edit__preview__container' style={styles}>
          <p>{data.name}</p>
          <div className='element-edit__preview__button'></div>
        </div>
      </div>
    </div>
  );
}

/* export const DEFAULT_STYLE: StyleProp = {
    width: 'fit-content',
    height: 'fit-content',
    fontSize: '12px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#000',
    borderRadius: '15px'
  }; */