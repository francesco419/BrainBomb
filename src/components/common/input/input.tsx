import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { ButtonProps, sizeType } from '../../../functions/interface/interface';

const SIZES: sizeType = {
  sm: css`
    height: 40px;
    font-size: 1.2rem;
    width: 200px;
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

type InputProps = {
  style: any;
  disabled: boolean;
  type: string;
  name: string;
  value: string | number;
  size: string;
  onChange: () => void;
};

export default function Input({
  style,
  disabled = false,
  type,
  name,
  value,
  size,
  onChange
}: InputProps) {
  const sizeStyle = SIZES[size];
  return (
    <StyleInput
      style={style}
      disabled={disabled}
      type={type}
      sizeStyle={sizeStyle}
      onChange={onChange}
      name={name}
      value={value}
    />
  );
}

const StyleInput = styled.input<{ sizeStyle: any }>`
  ${(p) => p.sizeStyle}
  padding: 10px;
  background-color: #2fd883;
  border: none;
  border-radius: 10px;
  color: #fff;
  font-weight: 700;

  &:hover {
    filter: brightness(90%);
  }
`;
