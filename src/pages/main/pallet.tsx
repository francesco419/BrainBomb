import Child from '../../components/elements/child';
import React, { useContext, createContext } from 'react';

export default function Pallet() {
  const LangContext = createContext('en');
  return (
    <div className='section_part'>
      <LangContext.Provider value='what'>
        <Child />
      </LangContext.Provider>
    </div>
  );
}
