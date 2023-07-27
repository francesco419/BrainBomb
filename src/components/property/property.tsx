import './property.scss';
import PropertyList from './list/list';
import PropertyEdit from './edit/edit';
import PropertyInfo from './info/info';
import Catergories from './categories';
import { useAppSelector } from '../../redux/hooks';
import { pageEle } from '../../redux/Slices/pageSlice';
import MenuStyle from './menuStyle';
import { useState, useRef } from 'react';
import { ReactComponent as Change } from '../../assets/svg/menu/change.svg';

export default function Property() {
  const page = useAppSelector(pageEle);
  const [sidestyle, setSideStyle] = useState<boolean>(false);
  const [listNum, setListNum] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  let refBoolean: boolean = true;

  const listNumHandler = (num: number) => {
    setListNum((listNum) => num);
  };

  return (
    <div className={sidestyle ? 'property' : 'property-next'} ref={ref}>
      <div>
        {!sidestyle && (
          <>
            <div
              style={{
                color: '#fff',
                padding: '30px 15px'
              }}
            >
              <h2 style={{ color: '#fff', margin: '0', width: 'fit-content' }}>
                BRAINBOMB
              </h2>
            </div>
            <hr style={{ margin: '0' }} />
          </>
        )}
        <Catergories
          button={sidestyle}
          element={<PropertyList />}
          propertyName='Element List'
          handler={listNumHandler}
          state={listNum}
          fixedNum={1}
        />
        <Catergories
          button={sidestyle}
          element={<PropertyInfo />}
          propertyName='Element Info'
          handler={listNumHandler}
          state={listNum}
          fixedNum={2}
        />
        <Catergories
          button={sidestyle}
          element={<PropertyEdit />}
          propertyName='Page Theme'
          handler={listNumHandler}
          state={listNum}
          fixedNum={3}
        />
        <hr />
      </div>
      <MenuStyle bool={sidestyle} />
      {/* <button
        className='p-button'
        onClick={() => {
          setSideStyle((sidestyle) => !sidestyle);
        }}
      >
        <Change />
      </button> */}
      {!sidestyle && (
        <div
          className='property-next_hide'
          onClick={() => {
            if (ref.current) {
              if (refBoolean) {
                ref.current.style.right = '-330px';
                refBoolean = false;
              } else {
                ref.current.style.right = '0';
                refBoolean = true;
              }
            }
          }}
        >{`<`}</div>
      )}
    </div>
  );
}
