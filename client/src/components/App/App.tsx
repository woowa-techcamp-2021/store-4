import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import GlobalStyle from '../../styles/global';
import { Route, Router, Switch } from '../../lib/router';
import Header from '../Header/Header';
import HomePage from '../../pages/Home';
import LoginPage from '../../pages/Login';
import LogoutPage from '../../pages/Logout';
import ProductPage from '../../pages/Product';
import ProductsPage from '../../pages/Products';
import AccountPage from '../../pages/Account';
import NotfoundPage from '../../pages/Notfound';

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/logout" component={LogoutPage} />
          <Route exact path="/product/:id" component={ProductPage} />
          <Route exact path="/products" component={ProductsPage} />
          <Route exact path="/account" component={AccountPage} />
          <Route path="/" component={NotfoundPage} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
