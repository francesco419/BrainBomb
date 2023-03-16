import './child.scss';
import { useState, useRef, useContext } from 'react';
import _ from 'lodash';

export default function Child() {
  const [childText, setChildText] = useState<string>('child');
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

  return (
    <div className='child'>
      <button
        type='button'
        className='child_setButton addButton'
        onClick={() => console.log('add')}
      >
        +
      </button>
      <button
        type='button'
        className='child_setButton deleteButton'
        onClick={() => console.log('delete')}
      >
        -
      </button>
      {change ? (
        <input
          ref={inputRef}
          className='child_input'
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
