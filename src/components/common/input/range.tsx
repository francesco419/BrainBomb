import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { ButtonProps, sizeType } from '../../../functions/interface/interface';

type RangeProps = {
  id?: string;
  style?: any;
  disabled?: boolean;
  name?: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min: string;
  max: string;
};

export default function Range({
  id,
  style,
  disabled = false,
  name,
  value,
  onChange,
  min,
  max
}: RangeProps) {
  return (
    <StyleInput
      id={id}
      style={style}
      disabled={disabled}
      min={min}
      max={max}
      type='range'
      onChange={onChange}
      name={name}
      value={value}
    />
  );
}

const StyleInput = styled.input`
  text-align: center;
  background: none;
  border: 0;
  color: #fff;
  border-bottom: 1px solid #fff;

  &:focus {
    outline: none;
  }
`;
