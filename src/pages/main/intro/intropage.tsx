import './intro.scss';
import IntroHeader from './header/introHeader';
import IntroFront from './contents/introFront';
import IntroTemp from './contents/introTemp';
import IntroUse from './contents/introUse';
import IntroCenter from './contents/introCenter';
import IntroUpdates from './contents/introUpdates';
import IntroContact from './contents/introContact';

export default function IntroPage() {
  return (
    <div className='intropage'>
      <IntroHeader />
      <div className='intropage__contents'>
        <IntroFront />
        <IntroTemp />
        <hr />
        <IntroUse />
        <hr />
        <IntroCenter />
        <hr />
        <IntroUpdates />
        <hr />
        <IntroContact />
      </div>
    </div>
  );
}
