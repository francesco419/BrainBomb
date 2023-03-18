import './kid.scss';
import { useState, useRef } from 'react';
import _ from 'lodash';

interface Name {
  name?: string;
  location: string[];
}

export default function Kid({ name = 'child', location }: Name) {
  const [childText, setChildText] = useState<string>(name);
  const [change, setChange] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const changeText = () => {
    setChange((change) => !change);
    if (change) {
      inputRef.current?.focus();
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceOnChange(e.target.value);
  };

  const debounceOnChange = _.debounce((value: string) => {
    console.log(value);
    setChildText((childText) => value);
  }, 500);

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setChange((change) => !change);
    }
  };

  let styles = {
    top: location[0] + 'px',
    left: location[1] + 'px'
  };

  return (
    <div className='kid' style={styles}>
      <button
        type='button'
        className='kid_setButton addButton'
        onClick={() => console.log('add')}
      >
        +
      </button>
      <button
        type='button'
        className='kid_setButton deleteButton'
        onClick={() => console.log('delete')}
      >
        -
      </button>
      {change ? (
        <input
          ref={inputRef}
          className='kid_input'
          type='text'
          autoFocus
          onChange={(e) => onChangeHandler(e)}
          onKeyPress={(e) => onKeyPressHandler(e)}
          onBlur={changeText}
        />
      ) : (
        <p onClick={changeText}>{childText}</p>
      )}
    </div>
  );
}
