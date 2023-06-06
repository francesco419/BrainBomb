import { useDispatch } from 'react-redux';
import { reNameEle } from '../../../redux/Slices/eleSlice';

interface nameType {
  change: () => void;
  bool: boolean;
  id: string;
}

export default function ElementName({ change, bool, id }: nameType) {
  const dispatch = useDispatch();
  let text: string;
  const changeText = () => {
    change();
    if (bool) {
      dispatch(
        reNameEle({
          id: id,
          name: text
        })
      );
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    text = e.target.value;
  };

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (bool) {
        dispatch(
          reNameEle({
            id: id,
            name: text
          })
        );
      }
      change();
    }
  };

  return (
    <input
      type='text'
      autoFocus
      onChange={(e) => onChangeHandler(e)}
      onKeyPress={(e) => onKeyPressHandler(e)}
      onBlur={changeText}
    />
  );
}
