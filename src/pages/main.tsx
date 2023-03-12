import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Main() {
  const nav = useNavigate();
  return (
    <div>
      <div>
        <button
          onClick={() => {
            nav('plan');
          }}
        >
          plan
        </button>
      </div>
      <h2>this is main</h2>
      <div
        style={{ width: '1200px', height: '600px', backgroundColor: '#c0c0c0' }}
      ></div>
    </div>
  );
}
