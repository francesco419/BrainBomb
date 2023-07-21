import './property.scss';
import PropertyList from './list/list';
import PropertyEdit from './edit/edit';
import PropertyInfo from './info/info';
import Catergories from './categories';
import { useAppSelector } from '../../redux/hooks';
import { pageEle } from '../../redux/Slices/pageSlice';
import MenuStyle from './menuStyle';
import { useState } from 'react';

export default function Property() {
  const page = useAppSelector(pageEle);
  const [sidestyle, setSideStyle] = useState<boolean>(false);

  return (
    <div
      className={sidestyle ? 'property' : 'property-next'}
      style={{ display: page.value.MenuType ? 'flex' : 'block' }}
    >
      <Catergories
        button={sidestyle}
        element={<PropertyList />}
        propertyName='Element List'
      />
      <Catergories
        button={sidestyle}
        element={<PropertyInfo />}
        propertyName='Element Info'
      />
      <Catergories
        button={sidestyle}
        element={<PropertyEdit />}
        propertyName='Page Theme'
      />
      <MenuStyle />
      <button
        onClick={() => {
          setSideStyle((sidestyle) => !sidestyle);
        }}
      ></button>
      {!sidestyle && (
        <div className='property-next_hide' onClick={() => {}}>{`<`}</div>
      )}
    </div>
  );
}
