import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';

const provideTheme2Test = (...children: JSX.Element[]): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      {children.map((Child, index) => {
        return React.cloneElement(Child, { key: index });
      })}
    </ThemeProvider>
  );
};

export default provideTheme2Test;
