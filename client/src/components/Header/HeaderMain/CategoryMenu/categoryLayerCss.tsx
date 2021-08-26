import { css } from 'styled-components';

export const textUnderline = css`
  ::before {
    display: block;
    position: absolute;
    content: ' ';
    background: ${(props) => props.theme.color.mint2};
    width: calc(100% + 4px);
    height: 9px;
    opacity: 0.4;
    left: -2px;
    bottom: -1px;
  }
`;

const textUnderlineGrey = css`
  ::before {
    display: block;
    position: absolute;
    content: ' ';
    background: ${(props) => props.theme.color.grey3};
    width: calc(100% + 4px);
    height: 9px;
    opacity: 0.4;
    left: -2px;
    bottom: -1px;
  }
`;

export const rootListStyle = css`
  font-size: ${(props) => props.theme.fontSize.normal};
  background-color: ${(props) => props.theme.color.grey5};
  color: ${(props) => props.theme.color.grey2};

  > li {
    background-color: ${(props) => props.theme.color.grey5};
    padding: 14px 22px;
  }
`;

export const childListStyle = css`
  font-size: ${(props) => props.theme.fontSize.small};
  background-color: #fdfdfd;
  color: ${(props) => props.theme.color.black};

  > li {
    background-color: #fdfdfd;
    padding: 12px 20px;

    :hover {
      span {
        ${textUnderlineGrey}
      }
    }
  }
`;
