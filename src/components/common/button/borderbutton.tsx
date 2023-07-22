import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { ButtonProps, sizeType } from '../../../functions/interface/interface';

const SIZES: sizeType = {
  sm: css`
    height: 30px;
    width: 100px;
    font-size: 0.8rem;
  `,
  md: css`
    height: 70px;
    width: 200px;
    font-size: 1.1rem;
  `,
  lg: css`
    height: 70px;
    width: 200px;
    font-size: 1.1rem;
  `
};

export default function BorderButton({
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
  border: 1px solid #fff;
  background-color: #191a4e;
  color: #fff;

  &:hover {
    filter: brightness(140%);
  }
`;
