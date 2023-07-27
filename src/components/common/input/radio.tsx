import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { ButtonProps, sizeType } from '../../../functions/interface/interface';

const SIZES: sizeType = {
  sm: css`
    font-size: 1.2rem;
    width: 50px;
  `,
  md: css`
    height: 50px;
    font-size: 1.2rem;
    width: 180px;
  `,
  lg: css`
    height: 70px;
    font-size: 1.2rem;
    width: 200px;
  `
};

type RadioProps = {
  id?: string;
  style?: any;
  disabled?: boolean;
  type?: string;
  name?: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Radio({
  id,
  style,
  disabled = false,
  name,
  value,
  onChange
}: RadioProps) {
  return (
    <StyleInput
      id={id}
      style={style}
      disabled={disabled}
      type='radio'
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
