import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import './main.scss';
import Pallet from './pallet';
import Alarm from '../../components/alarm/alarm';

export default function Main() {
  const nav = useNavigate();
  return (
    <>
      <section className='section'>
        <Pallet />
      </section>
      {/*       <Alarm />
      <footer>footer</footer> */}
    </>
  );
}
