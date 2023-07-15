import secondGIF from '../../../../assets/image/useGif/ListGif.gif';
import { useState } from 'react';
import './introUpdates.scss';
import UpdateImg from '../components/updateImg';
import UpdateInfo from '../components/updateInfo';

export default function IntroUpdates() {
  return (
    <div id='intro-update' className='intropage-update'>
      <h3>Updates</h3>
      <h1>Latest Update Logs</h1>
      <div className='intropage-update__usage'>
        <div className='usage' style={{ borderRight: '1px solid #fff' }}>
          <UpdateInfo />
        </div>
        <div className='usage' style={{ borderLeft: '1px solid #fff' }}>
          <UpdateImg img={secondGIF} />
        </div>
      </div>
    </div>
  );
}
