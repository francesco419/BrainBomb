import './intro.scss';

export default function IntroPage() {
  return (
    <div className='intropage'>
      <div className='intropage__contents'>
        <div className='intropage__header'>
          <div>
            <p>ICON</p>
            <p>BRAINBOMB</p>
          </div>
          <div>
            <button>How to use</button>
            <button>Updates</button>
            <button>Contact</button>
            <button>MindMap</button>
          </div>
        </div>
      </div>
    </div>
  );
}
