import './property.scss';
import PropertyList from './list';
import PropertyEdit from './edit';
import PropertyInfo from './info';

export default function Property() {
  return (
    <div className='property'>
      <PropertyList />
      <PropertyEdit />
      <PropertyInfo />
    </div>
  );
}
