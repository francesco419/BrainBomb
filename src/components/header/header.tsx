import './header.scss';
import Button from '../elements/button';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/icon/logo.svg';

export default function Header() {
  const nav = useNavigate();
  const toSomeWhere = () => {
    console.log('to menu 1');
    // nav('/somewhere');
  };
  return (
    <div className='header'>
      <div className='header_logoName'>
        <Logo />
        <p>BRAIN</p>
      </div>
      <nav className='header_nav'>
        <Button size='md' children='plan' act={() => nav('plan')} />
        <Button size='md' children='menu2' act={toSomeWhere} />
        <Button size='md' children='menu3' act={toSomeWhere} />
      </nav>
    </div>
  );
}
