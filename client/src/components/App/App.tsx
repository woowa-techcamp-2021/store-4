import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import GlobalStyle from '../../styles/global';
import { Route, Router, Switch } from '../../lib/router';
import Header from '../Header/Header';
import Login from '../login/Login';

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Header />
        <Switch>
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
