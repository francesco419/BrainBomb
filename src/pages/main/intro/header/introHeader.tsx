import { useEffect, useRef } from 'react';
import mainIcon from '../../../../assets/image/icon.png';
import './introHeader.scss';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';

export default function IntroHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const nav = useNavigate();

  useEffect(() => {
    window.addEventListener('wheel', (e) => headerWheel(e));

    return () => {
      window.removeEventListener('wheel', (e) => headerWheel(e));
    };
  }, []);

  const headerWheel = (e: WheelEvent) => {
    if (ref.current) {
      const current = ref.current;

      current.style.opacity = '0.5';

      if (current.offsetTop < 30) {
        current.style.backgroundColor = '#00000000';
      } else {
        current.style.backgroundColor = '#00000088';
      }

      //current.style.opacity = '1';
      debounceOpacity();
    }
  };

  const debounceOpacity = _.debounce(() => {
    if (ref.current) {
      ref.current.style.opacity = '1';
    }
  }, 300);

  const startMap = () => {
    nav('/');
  };

  const toLocate = (id: string) => {
    const location = document.getElementById(id);
    if (id === 'contact') {
      window.scrollTo({
        left: 0,
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
      return;
    }

    if (location) {
      console.log(location.offsetTop);
      window.scrollTo({
        left: 0,
        top: location.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div ref={ref} className='intropage-header' id='intro-header'>
      <div className='intropage-header__container'>
        <div className='intropage-header__icon'>
          <img src={mainIcon} />
          <h2>BRAINBOMB</h2>
        </div>
        <div className='intropage-header__to'>
          <button onClick={() => toLocate('intro-use')}>How to use</button>
          <button onClick={() => toLocate('intro-center')}>Center</button>
          <button onClick={() => toLocate('intro-update')}>Updates</button>
          <button onClick={() => toLocate('contact')}>Contact</button>
          <button onClick={startMap}>Start MindMap</button>
        </div>
      </div>
    </div>
  );
}
