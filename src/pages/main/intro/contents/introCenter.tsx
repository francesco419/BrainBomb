import firstGIF from '../../../../assets/image/useGif/basicGif.gif';
import './introCenter.scss';

export default function IntroCenter() {
  return (
    <div id='intro-center' className='intropage-center'>
      <div className='intropage-center__container'>
        <div>
          <img src={firstGIF} />
        </div>
        <div style={{ margin: ' 0 0 0 50px' }}>
          <h2>Very easy to use just follow the infomation below</h2>
          <p>
            rainBomb, your ultimate online tool for creating intuitive and
            visually captivating mind maps. Designed with simplicity in mind,
            BrainBomb empowers you to effortlessly organize your thoughts,
            brainstorm ideas, and unlock your creative potential. With its
            user-friendly interface and powerful features, BrainBomb offers a
            seamless and enjoyable mind mapping experience for users of all
            backgrounds.
          </p>
          <progress />
          <button className='tocon'>
            <p>Congress</p>
          </button>
          <button className='tocon'>
            <p>Congress</p>
          </button>
        </div>
      </div>
    </div>
  );
}
