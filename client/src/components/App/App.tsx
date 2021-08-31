import React, { Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import GlobalStyle from '../../styles/global';
import { Route, Router, Switch } from '../../lib/router';
import Header from '../Header/Header';
const HomePage = React.lazy(() => import('../../pages/Home'));
const LoginPage = React.lazy(() => import('../../pages/Login'));
const CartPage = React.lazy(() => import('../../pages/Cart'));
const LogoutPage = React.lazy(() => import('../../pages/Logout'));
const ProductPage = React.lazy(() => import('../../pages/Product'));
const ProductsPage = React.lazy(() => import('../../pages/Products'));
const AccountPage = React.lazy(() => import('../../pages/Account'));
const NotfoundPage = React.lazy(() => import('../../pages/Notfound'));
const ErrorPage = React.lazy(() => import('../../pages/Error'));
const OrderPaymentPage = React.lazy(() => import('../../pages/OrderPayment'));
import ToastPortal from '../Portal/ToastPortal';
import ConfirmModalPortal from '../Portal/ConfirmModalPortal';
import Footer from '../Footer/Footer';
import Loading from '../Loading/Loading';

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Header />
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/cart" component={CartPage} />
            <Route exact path="/logout" component={LogoutPage} />
            <Route exact path="/product/:id" component={ProductPage} />
            <Route exact path="/products" component={ProductsPage} />
            <Route path="/account" component={AccountPage} />
            <Route exact path="/order" component={OrderPaymentPage} />
            <Route exact path="/error" component={ErrorPage} />
            <Route path="/" component={NotfoundPage} />
          </Switch>
        </Suspense>
      </Router>
      <ToastPortal />
      <ConfirmModalPortal />
      <Footer />
    </ThemeProvider>
  );
};

export default App;
