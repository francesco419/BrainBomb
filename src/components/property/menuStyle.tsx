import { useAppDispatch } from '../../redux/hooks';
import { setMenuType } from '../../redux/Slices/pageSlice';
import { useState } from 'react';
import { ReactComponent as Ver } from '../../assets/svg/menu/vertical.svg';
import { ReactComponent as Hor } from '../../assets/svg/menu/horizontal.svg';
import './menuStyle.scss';

export default function MenuStyle() {
  const dispatch = useAppDispatch();
  const [type, setType] = useState<boolean>(false);

  const menuStyleHandler = () => {
    dispatch(setMenuType());
    setType((type) => !type);
  };

  return (
    <div className='menuStyle'>
      <button onClick={menuStyleHandler}>{type ? <Hor /> : <Ver />}</button>
    </div>
  );
}
