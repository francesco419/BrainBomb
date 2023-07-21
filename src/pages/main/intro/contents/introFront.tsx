import brain from '../../../../assets/image/brain.png';
import './introFront.scss';
import { useNavigate } from 'react-router-dom';
import PointButton from '../../../../components/common/pointbutton';
import { toLocate } from '../../../../functions/scrollTo';

export default function IntroFront() {
  const nav = useNavigate();

  const toNav = () => {
    nav('/map');
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
      window.scrollTo({
        left: 0,
        top: location.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div id='intro-front' className='intropage-front'>
      <div className='intropage-front__intro'>
        <h1>Feel free to use</h1>
        <h1 style={{ fontSize: '3.5rem' }}>BrainBomb MindMap</h1>
        <p className='intropage-front__intro'>No need to login or register</p>
        <p className='intropage-front__intro'>
          Simple and easy to make mindmap
        </p>
        <div>
          <PointButton
            act={() => toLocate('intro-use')}
            children='How to use'
            size='md'
          />
          <PointButton act={toNav} children='Start Mapping' size='md' />
        </div>
      </div>
      <div className='intropage-front__img'>
        <img src={brain} />
      </div>
    </div>
  );
}

//, No Subscription
