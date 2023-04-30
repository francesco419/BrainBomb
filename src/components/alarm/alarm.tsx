import './alarm.scss';
import { useRef, useState, useEffect } from 'react';

export default function Alarm() {
  useEffect(() => {
    console.log('alarm');
  }, []);
  return (
    <div className='alarm'>
      <p className='alarm_parah'>Button Clicked</p>
    </div>
  );
}
