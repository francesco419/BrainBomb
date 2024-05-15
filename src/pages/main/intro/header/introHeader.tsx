import { useEffect, useRef } from 'react';
import mainIcon from '../../../../assets/image/icon.png';
import './introHeader.scss';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import PointButton from '../../../../components/common/button/pointbutton';
import { toLocate } from '../../../../functions/scrollTo';

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
    nav('/map');
  };

  const headerList = [
    {
      children: 'How to use',
      act: () => toLocate('intro-use')
    },
    {
      children: 'Center',
      act: () => toLocate('intro-use')
    },
    {
      children: 'Updates',
      act: () => toLocate('intro-use')
    },
    {
      children: 'Contact',
      act: () => toLocate('intro-use')
    },
    {
      children: 'Start MindMap',
      act: () => toLocate('intro-use')
    }
  ];

  return (
    <div ref={ref} className='intropage-header' id='intro-header'>
      <div className='intropage-header__container'>
        <div className='intropage-header__icon'>
          <img src={mainIcon} />
          <h2>MINDLAB</h2>
        </div>
        <div className='intropage-header__to'>
          <button
            className='intropage-header__to-button'
            onClick={() => toLocate('intro-use')}
          >
            How to use
          </button>
          <button
            className='intropage-header__to-button'
            onClick={() => toLocate('intro-center')}
          >
            Center
          </button>
          <button
            className='intropage-header__to-button'
            onClick={() => toLocate('intro-update')}
          >
            Updates
          </button>
          <button
            className='intropage-header__to-button'
            onClick={() => toLocate('contact')}
          >
            Contact
          </button>
          <PointButton act={startMap} children='Start MindMap' size='md' />
        </div>
      </div>
    </div>
  );
}
