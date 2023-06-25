import { useNavigate } from 'react-router-dom';
import './main.scss';
import Pallet from './pallet';
import Property from '../../components/property/property';
import ZoomAlarm from '../../components/alarm/fadeAlarm/zoomAlarm';
import { pageEle } from '../../redux/Slices/pageSlice';
import { useAppSelector } from '../../redux/hooks';

export default function Main() {
  const pageStyle = useAppSelector(pageEle);

  return (
    <>
      <section className='section'>
        <Pallet />
        <Property />
      </section>
      <ZoomAlarm />
    </>
  );
}
