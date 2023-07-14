import mainIcon from '../../../../assets/image/icon.png';
import { ReactComponent as Github } from '../../../../assets/svg/contact/github.svg';
import { ReactComponent as Velog } from '../../../../assets/svg/contact/velog.svg';
import './introContact.scss';

export default function IntroContact() {
  return (
    <div className='intropage-contact'>
      <div className='footer'>
        <div className='footer__icon'>
          <img src={mainIcon} />
        </div>
        <div className='footer__word'>
          <p>Intuitive</p>
          <p>Visual</p>
          <p>Streamlined</p>
          <p>Productive</p>
          <p>Creative</p>
        </div>
        <div className='footer__svg'>
          <Github />
          <Velog />
          <Velog />
        </div>
        <p className='footer__rights'>2023 FrankLee. All rights reserved</p>
      </div>
    </div>
  );
}
