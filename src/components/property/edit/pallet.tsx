import './pallet.scss';
import { useAppDispatch } from '../../../redux/hooks';
import { ColorResult, SketchPicker } from 'react-color';
import { useState } from 'react';
import { LineState, LinePallet } from '../../../functions/interface/interface';

export function ColorPallet({ line, set }: LinePallet) {
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const changeShow = () => {
    setShow((show) => !show);
  };

  const changeLineColor = (color: ColorResult) => {
    set(color.hex);
  };

  return (
    <>
      <li>
        <p>BackGround :&nbsp;</p>
        <button
          className='property-pallet__colorButton'
          style={{
            backgroundColor: line,
            border: '1px solid #fff'
          }}
          onClick={changeShow}
          title={line}
        />
      </li>
      {show && (
        <div style={{ width: 'fit-content', margin: '0 auto 30px' }}>
          <SketchPicker
            color={line}
            onChange={(color) => changeLineColor(color)}
          />
        </div>
      )}
    </>
  );
}
