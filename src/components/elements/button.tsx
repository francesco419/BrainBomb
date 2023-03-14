import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

interface ButtonProps {
  disabled?: boolean;
  size: string;
  children: string;
  act: any;
}

type sizeType = {
  [anyKeyword: string]: FlattenSimpleInterpolation;
  sm: FlattenSimpleInterpolation;
  md: FlattenSimpleInterpolation;
  lg: FlattenSimpleInterpolation;
};

const SIZES: sizeType = {
  sm: css`
    font-size: 0.875rem;
    padding: 8px 12px;
    border-radius: 15px;
  `,
  md: css`
    font-size: 1rem;
    padding: 12px 16px;
    border-radius: 8px;
  `,
  lg: css`
    font-size: 1rem;
    padding: 10px 120px;
    border-radius: 20px;
  `
};

export default function Button({
  disabled = false,
  size,
  children,
  act
}: ButtonProps) {
  const sizeStyle = SIZES[size];
  return (
    <StyleButton disabled={disabled} onClick={act} sizeStyle={sizeStyle}>
      {children}
    </StyleButton>
  );
}

const StyleButton = styled.button<{ sizeStyle: any }>`
  ${(p) => p.sizeStyle}
  background-color: black;
  color: white;

  &:hover {
    background-color: skyblue;
    color: blue;
  }
`;
