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
        <div className='intropage__intro'>
          <div>
            <p>----text----</p>
          </div>
          <div>
            <p>img</p>
          </div>
        </div>
        <div className='intropage__use'>
          <p>----How to use----</p>
          <p>IMg</p>
        </div>
        <div className='intropage__update'>
          <p>----Updates----</p>
          <p>update detail</p>
        </div>
        <div className='intropage__contact'>
          <p>----contact----</p>
          <p>contact detail</p>
        </div>
      </div>
    </div>
  );
}
