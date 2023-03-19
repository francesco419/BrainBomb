import './child.scss';
import { useState, useRef, useContext } from 'react';
import _ from 'lodash';
import Kid from './kid';
import { locationMap } from '../../functions/location';

interface Name {
  name?: string;
}

export default function Child({ name = 'child' }: Name) {
  const [mindNode, setMindNode] = useState<string[]>([]);
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

  const kidLocation = locationMap(mindNode);

  return (
    <div className='child'>
      <button
        type='button'
        className='child_setButton addButton'
        onClick={() => {
          setMindNode((mindNode) => [...mindNode, 'child']);
        }}
      >
        +
      </button>
      <button
        type='button'
        className='child_setButton deleteButton'
        onClick={() =>
          setMindNode((mindNode) => [...mindNode.slice(0, mindNode.length - 1)])
        }
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
      {mindNode.map((data, index) => {
        if (kidLocation) {
          return (
            <>
              <Kid name={data} location={kidLocation[index]} />
              <span className='spanl'></span>
            </>
          );
        }
      })}
    </div>
  );
}
