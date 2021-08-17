import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    device: {
      desktop: string;
      tablet: string;
      mobile: string;
    };

    color: {
      black: string;

      grey1: string;
      grey2: string;
      grey3: string;
      grey4: string;
      grey5: string;

      white1: string;
      white2: string;

      mint1: string;
      mint2: string;
      mint3: string;

      red: string;
    };

    fontSize: {
      xLarge: string;
      large: string;
      medium: string;
      normal: string;
      small: string;
      tiny: string;
    };
  }
}
