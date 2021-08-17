import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import GlobalStyle from '../../styles/global';
import { Route, Router, Switch } from '../../lib/router';
import Header from '../Header/Header';
import HomePage from '../../pages/Home';
import LoginPage from '../../pages/Login';

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;