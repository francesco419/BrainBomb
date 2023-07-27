import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { ButtonProps, sizeType } from '../../../functions/interface/interface';

const SIZES: sizeType = {
  sm: css`
    font-size: 0.8rem;
    width: 50px;
  `,
  md: css`
    font-size: 0.8rem;
    width: 80px;
  `,
  lg: css`
    height: 70px;
    font-size: 1.2rem;
    width: 200px;
  `
};

type InputProps = {
  id?: string;
  style?: any;
  disabled?: boolean;
  type?: string;
  name?: string;
  value?: string | number;
  size: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export default function Input({
  id,
  style,
  disabled = false,
  type,
  name,
  value,
  size,
  onChange,
  placeholder
}: InputProps) {
  const sizeStyle = SIZES[size];
  return (
    <StyleInput
      id={id}
      style={style}
      disabled={disabled}
      type={type}
      sizeStyle={sizeStyle}
      onChange={onChange}
      name={name}
      value={value}
      placeholder={placeholder}
    />
  );
}

const StyleInput = styled.input<{ sizeStyle: any }>`
  ${(p) => p.sizeStyle}
  text-align: center;
  background: none;
  border: 0;
  color: #fff;
  border-bottom: 1px solid #fff;

  &:focus {
    outline: none;
  }
`;
