import firstGIF from '../../../../assets/image/useGif/basicGif.gif';
import { ReactComponent as Visual } from '../../../../assets/svg/use/visual.svg';
import { ReactComponent as Save } from '../../../../assets/svg/use/save.svg';
import { ReactComponent as Customize } from '../../../../assets/svg/use/customize.svg';
import './introUse.scss';
import HowUse from '../components/howUseBox';

export default function IntroUse() {
  return (
    <div id='intro-use' className='intropage-use'>
      <div className='intropage-use__container'>
        <h3>How to use</h3>
        <h1>How it Works</h1>
        <p>It's compact skillful technology combined with different hooks</p>
        <p>Very easy to use just follow the infomation below</p>
      </div>
      <div className='intropage-use__fwbox'>
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
            visually captivating mind maps. Designed with simplicity in mind,
            BrainBomb empowers you to effortlessly organize your thoughts,
            brainstorm ideas, and unlock your creative potential. With its
            user-friendly interface and powerful features, BrainBomb offers a
            seamless and enjoyable mind mapping experience for users of all
            backgrounds.
          </p>
          <p>
            Whether you're a student, professional, or anyone seeking a clear
            and structured way to express your ideas, BrainBomb is here to
            streamline your thought process and help you achieve greater clarity
            and productivity. Explore the world of mind mapping like never
            before and let your ideas flourish with BrainBomb!
          </p>
          <div className='use1__visual'>
            <button>Basic</button>
            <button>Customize</button>
            <button>Visualize</button>
          </div>
        </div>
      </div>
    </div>
  );
}
