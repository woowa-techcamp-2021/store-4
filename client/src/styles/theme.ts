import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  device: {
    desktop: '1200px',
    tablet: '768px',
    mobile: '375px',
  },

  color: {
    black: '#1E2222',

    grey1: '#EEEEEE', // border
    grey2: '#DDDDDD',
    grey3: '#C1C5C5', // placeholder
    grey4: '#8D9393',
    grey5: '#626666',

    white1: '#FFFFFF',
    white2: '#F5F5F5',

    mint1: '#A0E1E0',
    mint2: '#2AC1BC',
    mint3: '#219A95',

    red: '#F45452',
  },

  fontSize: {
    xLarge: '1.875rem',
    large: '1.625rem',
    medium: '1.125rem',
    normal: '1rem',
    small: '0.875rem',
    tiny: '0.75rem',
  },

  fontFamily: {
    number: '"Montserrat", sans-serif',
  },
};

export default theme;
