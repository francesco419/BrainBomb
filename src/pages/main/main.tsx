import { useNavigate } from 'react-router-dom';
import './main.scss';
import Pallet from './pallet';
import Property from '../../components/property/property';
import ZoomAlarm from '../../components/alarm/fadeAlarm/zoomAlarm';
import { selectAlarm } from '../../redux/Slices/alarmSlice';
import { useAppSelector } from '../../redux/hooks';
import AlarmCenter from '../../components/alarm/alarmCenter';

export default function Main() {
  const alarm = useAppSelector(selectAlarm);

  return (
    <>
      <section className='section'>
        <Pallet />
        <Property />
      </section>
      <ZoomAlarm />
      {alarm.isON ? <AlarmCenter type='yesno' text={alarm.text} /> : null}
    </>
  );
}
