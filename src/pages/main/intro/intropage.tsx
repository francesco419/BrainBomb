import './intro.scss';
import mainIcon from '../../../assets/image/icon.png';
import brain from '../../../assets/image/brain.png';
import js from '../../../assets/image/pro/javascript.png';
import react from '../../../assets/image/pro/react.png';
import redux from '../../../assets/image/pro/redux.png';
import ts from '../../../assets/image/pro/typescript.png';
import scss from '../../../assets/image/pro/scss.png';
import firstGIF from '../../../assets/image/useGif/basicGif.gif';
import secondGIF from '../../../assets/image/useGif/ListGif.gif';
import _ from 'lodash';
import { ReactComponent as Visual } from '../../../assets/svg/use/visual.svg';
import { ReactComponent as Save } from '../../../assets/svg/use/save.svg';
import { ReactComponent as Customize } from '../../../assets/svg/use/customize.svg';

const pro = [
  { id: js, name: 'JavaScript' },
  { id: react, name: 'React' },
  { id: redux, name: 'Redux' },
  { id: ts, name: 'TypeScript' },
  { id: scss, name: 'Scss' }
];

export default function IntroPage() {
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
        <hr />
        <div className='intropage__use'>
          <div className='intropage__use__container'>
            <h3>How to use</h3>
            <h1>How it Works</h1>
            <p>
              It's compact skillful technology combined with different hooks
            </p>
            <p>Very easy to use just follow the infomation below</p>
          </div>
          <div className='intropage__use__fwbox'>
            <HowUse name='Visualize' svg={<Visual />} />
            <HowUse name='Customize' svg={<Customize />} />
            <HowUse name='Save & Load' svg={<Save />} />
          </div>
          <div style={{ display: 'flex' }}>
            <div className='use2'>
              <img src={firstGIF} />
            </div>
            <div className='use1'>
              <h3>Simple and Easy to Know</h3>
              <h1>Simplify Your Thoughts, Unleash Your Creativity</h1>
              <p>
                BrainBomb, your ultimate online tool for creating intuitive and
                visually captivating mind maps. Designed with simplicity in
                mind, BrainBomb empowers you to effortlessly organize your
                thoughts, brainstorm ideas, and unlock your creative potential.
                With its user-friendly interface and powerful features,
                BrainBomb offers a seamless and enjoyable mind mapping
                experience for users of all backgrounds.
              </p>
              <p>
                Whether you're a student, professional, or anyone seeking a
                clear and structured way to express your ideas, BrainBomb is
                here to streamline your thought process and help you achieve
                greater clarity and productivity. Explore the world of mind
                mapping like never before and let your ideas flourish with
                BrainBomb!
              </p>
              <div className='use1__visual'>
                <button>Basic</button>
                <button>Customize</button>
                <button>Visualize</button>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className='intropage__center'>
          <div className='intropage__center__container'>
            <div>
              <img src={firstGIF} />
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

type Temp = {
  name: string;
  svg: any;
};

function HowUse({ name, svg }: Temp) {
  return (
    <div className='intropage__use__box'>
      <div className='circle'>{svg}</div>
      <h3>{name}</h3>
      <p>
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old
      </p>
    </div>
  );
}

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

{
  /* <div className='intropage__use__usage'>
              <div className='usage' style={{ borderRight: '1px solid #fff' }}>
                <UsageImg img={firstGIF} />
                <UsageInfo />
                <UsageImg img={firstGIF} />
                <UsageInfo />
              </div>
              <div className='usage' style={{ borderLeft: '1px solid #fff' }}>
                <UsageInfo />
                <UsageImg img={secondGIF} />
                <UsageInfo />
                <UsageImg img={firstGIF} />
              </div>
            </div> */
}
