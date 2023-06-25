import _ from 'lodash';
import DragSection from './dragSection';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectAlarm } from '../../redux/Slices/alarmSlice';
import AlarmCenter from '../../components/alarm/alarmCenter';

export default function Pallet() {
  const alarm = useAppSelector(selectAlarm);

  return (
    <div className='section_part'>
      <DragSection />
      {alarm.isON ? <AlarmCenter text={alarm.text} /> : null}
    </div>
  );
}
