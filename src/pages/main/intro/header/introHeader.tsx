import mainIcon from '../../../../assets/image/icon.png';
import './introHeader.scss';

export default function IntroHeader() {
  return (
    <div className='intropage-header'>
      <div className='intropage-header__container'>
        <div className='intropage-header__icon'>
          <img src={mainIcon} />
          <h2>BRAINBOMB</h2>
        </div>
        <div className='intropage-header__to'>
          <button>How to use</button>
          <button>Updates</button>
          <button>Contact</button>
          <button>MindMap</button>
          <button>Start MindMap</button>
        </div>
      </div>
    </div>
  );
}
