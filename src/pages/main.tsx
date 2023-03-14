import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header/header';
import './main.scss';

export default function Main() {
  const nav = useNavigate();
  return (
    <div>
      <Header />
      <section className='section'>
        <div
          style={{
            height: '600px',
            backgroundColor: '#c0c0c0'
          }}
        ></div>
      </section>
      <footer>footer</footer>
    </div>
  );
}
