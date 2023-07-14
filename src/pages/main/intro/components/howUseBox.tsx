import './howUseBox.scss';

type Temp = {
  name: string;
  svg: any;
};

export default function HowUse({ name, svg }: Temp) {
  return (
    <div className='howUse'>
      <div className='howUse__circle'>{svg}</div>
      <h3>{name}</h3>
      <p>
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old
      </p>
    </div>
  );
}
