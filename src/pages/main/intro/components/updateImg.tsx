import { useState } from 'react';

type IMG = {
  img: string;
};

export default function UpdateImg({ img }: IMG) {
  const [show, setShow] = useState<boolean>(false);
  return (
    <div className='usage__container'>
      {show ? (
        <div style={{ position: 'relative' }}>
          <img src={img} />
          <button
            style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              width: '20px',
              height: '20px',
              backgroundColor: '#2fd883'
            }}
            onClick={() => {
              setShow((show) => false);
            }}
          >
            X
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            setShow((show) => true);
          }}
        >
          <p>View</p>
        </button>
      )}
    </div>
  );
}
