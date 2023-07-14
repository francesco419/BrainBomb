import _ from 'lodash';
import './introTemp.scss';
import js from '../../../../assets/image/pro/javascript.png';
import react from '../../../../assets/image/pro/react.png';
import redux from '../../../../assets/image/pro/redux.png';
import ts from '../../../../assets/image/pro/typescript.png';
import scss from '../../../../assets/image/pro/scss.png';

const pro = [
  { id: js, name: 'JavaScript' },
  { id: react, name: 'React' },
  { id: redux, name: 'Redux' },
  { id: ts, name: 'TypeScript' },
  { id: scss, name: 'Scss' }
];

export default function IntroTemp() {
  return (
    <div className='intropage-temp'>
      {_.map(pro, (o) => {
        return (
          <div className='intropage-temp__project'>
            <img src={o.id} />
            <p>{o.name}</p>
          </div>
        );
      })}
    </div>
  );
}
