import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Products from './pages/products';
import Customers from './pages/customer';
import 'react-toastify/dist/ReactToastify.css';
import './app.css';
import Sales from './pages/sales';
import Purchases from './pages/purchases';

export default function App() {
  return (
    <div>
      <Router>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* <Header /> */}
        <Switch>
          <Route path="/" exact={true} component={({ match }) => (
            <Products match={match} />
            )} />
          <Route path="/sales" exact={true} component={({ match }) => (
            <Sales match={match} />
          )} />
          <Route path="/customers" exact={true} component={({ match }) => (
            <Customers match={match} />
          )} />
          <Route path="/purchases" exact={true} component={({ match }) => (
            <Purchases match={match} />
          )} />
          {/* <Products /> */}
        </Switch>
      </Router>
    </div>
  );
}