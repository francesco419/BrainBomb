import brain from '../../../../assets/image/brain.png';
import './introFront.scss';
import { useNavigate } from 'react-router-dom';

export default function IntroFront() {
  const nav = useNavigate();

  const toNav = () => {
    nav('/');
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
          <button>How to use</button>
          <button onClick={toNav}>Start Mapping</button>
        </div>
      </div>
      <div className='intropage-front__img'>
        <img src={brain} />
      </div>
    </div>
  );
}

//, No Subscription
