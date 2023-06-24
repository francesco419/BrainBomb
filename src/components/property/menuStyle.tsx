import { useAppDispatch } from '../../redux/hooks';
import { setMenuType } from '../../redux/Slices/pageSlice';
import { useState } from 'react';
import { ReactComponent as Ver } from '../../assets/svg/menu/vertical.svg';
import { ReactComponent as Hor } from '../../assets/svg/menu/horizontal.svg';
import { ReactComponent as Photo } from '../../assets/svg/menu/photo.svg';
import './menuStyle.scss';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';

export default function MenuStyle() {
  const dispatch = useAppDispatch();
  const [type, setType] = useState<boolean>(false);

  const menuStyleHandler = () => {
    dispatch(setMenuType());
    setType((type) => !type);
  };

  const downloadHandler = () => {
    htmlToImage
      .toPng(document.getElementById('dragSection') as HTMLDivElement)
      .then(function (dataUrl) {
        download(dataUrl, 'my-node.png');
      });
  };

  return (
    <>
      <div className='menuStyle'>
        <button onClick={menuStyleHandler}>{type ? <Hor /> : <Ver />}</button>
      </div>
      <div className='menuStyle'>
        <button onClick={downloadHandler}>{<Photo />}</button>
      </div>
    </>
  );
}
