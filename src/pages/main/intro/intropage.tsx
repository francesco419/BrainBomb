import './intro.scss';
import mainIcon from '../../../assets/image/icon.png';
import brain from '../../../assets/image/brain.png';
import js from '../../../assets/image/pro/javascript.png';
import react from '../../../assets/image/pro/react.png';
import redux from '../../../assets/image/pro/redux.png';
import ts from '../../../assets/image/pro/typescript.png';
import scss from '../../../assets/image/pro/scss.png';
import firstGIF from '../../../assets/image/useGif/basicGif.gif';
import _ from 'lodash';

const pro = [
  { id: js, name: 'JavaScript' },
  { id: react, name: 'React' },
  { id: redux, name: 'Redux' },
  { id: ts, name: 'TypeScript' },
  { id: scss, name: 'Scss' }
];

export default function IntroPage() {
  console.log(typeof firstGIF);
  return (
    <div className='intropage'>
      <div className='intropage__header'>
        <div className='intropage__header__container'>
          <div className='intropage__header__icon'>
            <img src={mainIcon} />
            <h2>BRAINBOMB</h2>
          </div>
          <div className='intropage__header__to'>
            <button>How to use</button>
            <button>Updates</button>
            <button>Contact</button>
            <button>MindMap</button>
            <button>Start MindMap</button>
          </div>
        </div>
      </div>
      <div className='intropage__contents'>
        <div className='intropage__intro'>
          <div className='intropage__intro__intro'>
            <h1>Feel free to use</h1>
            <h1 style={{ fontSize: '3.5rem' }}>BrainBomb MindMap</h1>
            <p className='intropage__intro__intro'>
              No need to login or register
            </p>
            <p className='intropage__intro__intro'>
              Simple and easy to make mindmap
            </p>
            <div>
              <button>How to use</button>
              <button>List</button>
            </div>
          </div>
          <div className='intropage__intro__img'>
            <img src={brain} />
          </div>
        </div>
        <div className='intropage__temp'>
          {_.map(pro, (o) => {
            return (
              <div className='intropage__temp__project'>
                <img src={o.id} />
                <p>{o.name}</p>
              </div>
            );
          })}
        </div>
        <div className='intropage__use'>
          <div className='intropage__use__container'>
            <h3>How to use</h3>
            <div className='intropage__use__usage'>
              <div className='usage' style={{ borderRight: '1px solid #fff' }}>
                <UsageImg img={firstGIF} />
                <UsageInfo />
                <UsageImg img={firstGIF} />
                <UsageInfo />
              </div>
              <div className='usage' style={{ borderLeft: '1px solid #fff' }}>
                <UsageInfo />
                <UsageImg img={firstGIF} />
                <UsageInfo />
                <UsageImg img={firstGIF} />
              </div>
            </div>
          </div>
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

type IMG = {
  img: string;
};

function UsageImg({ img }: IMG) {
  return (
    <div className='usage__container'>
      <img src={img} />
    </div>
  );
}

function UsageInfo() {
  return (
    <div className='usage__info'>
      <div className='usage__info-container'>
        <p>This is Sample Text introducing about mindmap</p>
      </div>
    </div>
  );
}
