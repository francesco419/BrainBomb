import './property.scss';
import PropertyList from './list/list';
import PropertyEdit from './edit/edit';
import PropertyInfo from './info/info';
import Catergories from './categories';
import { useAppSelector } from '../../redux/hooks';
import { pageEle } from '../../redux/Slices/pageSlice';
import MenuStyle from './menuStyle';

export default function Property() {
  const page = useAppSelector(pageEle);
  return (
    <div
      className='property'
      style={{ display: page.value.MenuType ? 'flex' : 'block' }}
    >
      <Catergories element={<PropertyList />} propertyName='Element List' />
      <Catergories element={<PropertyInfo />} propertyName='Element Info' />
      <Catergories element={<PropertyEdit />} propertyName='Page Theme' />
      <MenuStyle />
    </div>
  );
}
