import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setMenuType } from '../../redux/Slices/pageSlice';
import { useState } from 'react';
import { ReactComponent as Ver } from '../../assets/svg/menu/vertical.svg';
import { ReactComponent as Hor } from '../../assets/svg/menu/horizontal.svg';
import { ReactComponent as Photo } from '../../assets/svg/menu/photo.svg';
import { ReactComponent as Save } from '../../assets/svg/menu/save.svg';
import './menuStyle.scss';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';
import { ElementObj, PageType } from '../../functions/interface/interface';
import { selectEle } from '../../redux/Slices/eleSlice';
import { pageEle } from '../../redux/Slices/pageSlice';

export default function MenuStyle() {
  const dispatch = useAppDispatch();
  const element = useAppSelector(selectEle);
  const page = useAppSelector(pageEle);
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

  const saveHandler = (
    element: ElementObj[],
    page: PageType,
    filename: string
  ) => {
    const file = JSON.stringify({ page: page, element: element });

    const blob = new Blob([file], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);

    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  };
  /**
function saveAsFile(str, filename) {
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:attachment/text,' + encodeURI(str);
    hiddenElement.target = '_blank';
    hiddenElement.download = filename;
    hiddenElement.click();
}
 
var strdata = "Hello, world!";
saveAsFile(strdata, "output.txt"); 
*/

  return (
    <>
      <div className='menuStyle'>
        <button onClick={menuStyleHandler}>{type ? <Hor /> : <Ver />}</button>
      </div>
      <div className='menuStyle'>
        <button onClick={downloadHandler}>{<Photo />}</button>
      </div>
      <div className='menuStyle'>
        <button onClick={() => saveHandler(element, page, 'brainbomb')}>
          {<Save />}
        </button>
      </div>
    </>
  );
}
