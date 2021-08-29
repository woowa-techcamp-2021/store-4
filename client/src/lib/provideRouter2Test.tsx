import React from 'react';
import { Router } from './router';

const provideRouter2Test = (...children: JSX.Element[]): JSX.Element => {
  return (
    <Router>
      {children.map((Child, index) => {
        return React.cloneElement(Child, { key: index });
      })}
    </Router>
  );
};

export default provideRouter2Test;
