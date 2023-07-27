import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { ButtonProps, sizeType } from '../../../functions/interface/interface';

const SIZES: sizeType = {
  sm: css`
    height: 15px;
    width: 15px;
  `,
  md: css`
    height: 50px;
    width: 180px;
  `,
  lg: css`
    height: 70px;
    width: 200px;
  `
};

export default function SmallButton({
  disabled = false,
  act,
  style = null
}: ButtonProps) {
  return (
    <StyleButton
      type='button'
      style={style}
      disabled={disabled}
      onClick={act}
    ></StyleButton>
  );
}

const StyleButton = styled.button`
  height: 15px;
  width: 15px;
`;
