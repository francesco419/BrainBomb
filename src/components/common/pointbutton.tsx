import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { ButtonProps, sizeType } from '../../functions/interface/interface';

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

export default function PointButton({
  disabled = false,
  size,
  children,
  act,
  style = null
}: ButtonProps) {
  const sizeStyle = SIZES[size];
  return (
    <StyleButton
      style={style}
      disabled={disabled}
      onClick={act}
      sizeStyle={sizeStyle}
    >
      {children}
    </StyleButton>
  );
}

const StyleButton = styled.button<{ sizeStyle: any }>`
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
