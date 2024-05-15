import firstGIF from '../../../../assets/image/useGif/basicGif.gif';
import './introCenter.scss';
import PointButton from '../../../../components/common/button/pointbutton';

export default function IntroCenter() {
  const buttonStyle = { backgroundColor: '#191a4e', height: '70px' };
  const text = `MINDLAB, your ultimate online tool for creating intuitive and
  visually captivating mind maps. Designed with simplicity in mind,
  MINDLAB empowers you to effortlessly organize your thoughts,
  brainstorm ideas, and unlock your creative potential. With its
  user-friendly interface and powerful features, MINDLAB offers a
  seamless and enjoyable mind mapping experience for users of all
  backgrounds.`;

  return (
    <div id='intro-center' className='intropage-center'>
      <div className='intropage-center__container'>
        <div>
          <img src={firstGIF} />
        </div>
        <div style={{ margin: ' 0 0 0 50px' }}>
          <h2>Very easy to use just follow the instruction below</h2>
          <p>{text}</p>
          <progress />
          <PointButton
            act={() => {
              console.log('l');
            }}
            style={buttonStyle}
            size='lg'
            children='Congress'
          />
          <PointButton
            act={() => {
              console.log('l');
            }}
            style={buttonStyle}
            size='lg'
            children='Congress'
          />
        </div>
      </div>
    </div>
  );
}
