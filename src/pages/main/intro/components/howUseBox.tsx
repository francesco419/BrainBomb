import './howUseBox.scss';

type Temp = {
  name: string;
  text: string;
  svg: any;
};

export default function HowUse({ name, svg, text }: Temp) {
  return (
    <div className='howUse'>
      <div className='howUse__circle'>{svg}</div>
      <h3>{name}</h3>
      <p>{text}</p>
    </div>
  );
}
