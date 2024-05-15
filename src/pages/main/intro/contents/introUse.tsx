import firstGIF from '../../../../assets/image/useGif/basicGif.gif';
import secondGIF from '../../../../assets/image/useGif/customize.gif';
import ListGIF from '../../../../assets/image/useGif/ListGif.gif';
import { ReactComponent as Visual } from '../../../../assets/svg/use/visual.svg';
import { ReactComponent as Save } from '../../../../assets/svg/use/save.svg';
import { ReactComponent as Customize } from '../../../../assets/svg/use/customize.svg';
import './introUse.scss';
import HowUse from '../components/howUseBox';
import { useState } from 'react';
import BorderButton from '../../../../components/common/button/borderbutton';

export default function IntroUse() {
  const [switchGif, setSwitchGif] = useState<string>(firstGIF);

  const switchGifImage = (gif: string) => {
    setSwitchGif((switchGif) => gif);
  };

  const frontText = [
    `MINDLAB, your ultimate online tool for creating intuitive and
  visually captivating mind maps. Designed with simplicity in mind,
  MINDLAB empowers you to effortlessly organize your thoughts,
  brainstorm ideas, and unlock your creative potential. With its
  user-friendly interface and powerful features, MINDLAB offers a
  seamless and enjoyable mind mapping experience for users of all
  backgrounds.`,
    `Whether you're a student, professional, or anyone seeking a clear
  and structured way to express your ideas, MINDLAB is here to
  streamline your thought process and help you achieve greater clarity
  and productivity. Explore the world of mind mapping like never
  before and let your ideas flourish with MINDLAB!`
  ];

  return (
    <div id='intro-use' className='intropage-use'>
      <div className='intropage-use__container'>
        <h3>How to use</h3>
        <h1>How it Works</h1>
        <p>It's compact skillful technology combined with different hooks</p>
        <p>Very easy to use just follow the instruction below</p>
      </div>
      <div className='intropage-use__fwbox'>
        <HowUse
          name='Visualize'
          svg={<Visual />}
          text={
            'Effortlessly transform ideas into captivating mind maps, gaining clarity and understanding with visually organized hierarchies, facilitating effective communication and unlocking new insights.'
          }
        />
        <HowUse
          name='Customize'
          svg={<Customize />}
          text={
            'Personalize mind maps with customizable options, including colors, fonts, and layouts, creating visually stunning representations that align with your unique style and project requirements.'
          }
        />
        <HowUse
          name='Save & Load'
          svg={<Save />}
          text={
            'Securely save and access mind maps anytime, anywhere, ensuring uninterrupted workflow and easy collaboration, with reliable cloud storage for worry-free progress preservation.'
          }
        />
      </div>
      <div style={{ display: 'flex', padding: '30px 0' }}>
        <div className='use2'>
          <img src={switchGif} />
        </div>
        <div className='use1'>
          <h3>Boost Your Productivity</h3>
          <h1>Simplify Your Thoughts, Unleash Your Creativity</h1>
          <p>{frontText[0]}</p>
          <p>{frontText[1]}</p>
          <div className='use1__visual'>
            <BorderButton
              act={() => switchGifImage(firstGIF)}
              children='Basic'
              size='lg'
            />
            <BorderButton
              act={() => switchGifImage(secondGIF)}
              children='Customize'
              size='lg'
            />

            <BorderButton
              act={() => switchGifImage(ListGIF)}
              children='Organize'
              size='lg'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
