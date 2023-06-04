import './property.scss';
import PropertyList from './list/list';
import PropertyEdit from './edit/edit';
import PropertyInfo from './info';
import { useEffect, useState } from 'react';

interface PropertyType {
  element: JSX.Element;
  propertyName: string;
}

export default function Property() {
  const list: PropertyType = {
    element: <PropertyList />,
    propertyName: 'Element List'
  };

  return (
    <div className='property'>
      <PropertyProp element={<PropertyList />} propertyName='Element List' />
      <PropertyProp element={<PropertyInfo />} propertyName='Element Info' />
      <PropertyProp element={<PropertyEdit />} propertyName='Page Edit' />
    </div>
  );
}

function PropertyProp({ element, propertyName }: PropertyType) {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {}, []);

  const onClickHandler = () => {
    setShow((show) => !show);
  };

  return (
    <div className='property-prop'>
      <div className='property-prop__title'>
        <p>{propertyName}</p>
        <button onClick={onClickHandler}>{show ? '-' : '+'}</button>
      </div>
      {show && (
        <div>
          <hr style={{ margin: '1rem 0 0' }} />
          {element}
        </div>
      )}
    </div>
  );
}
