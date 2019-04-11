import React, { Component } from "react";
import { Link, Switch } from "react-router-dom";

import PrivateRoute from '../../components/routes/PrivateRoute';

import Main from '../main/Main';
import ProductList from "../product/ProductList";
import CountryList from "../country/CountryList";
import FuncList from "../func/FuncList";
import ProductForm from '../product/ProductForm';
import CountryPage from '../country/CountryPage';
import FuncPage from '../func/FuncPage';

class Home extends Component {

  render() {
    const { match } = this.props
    return (
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link active" to="/home">
                    <span data-feather="home" />
                    Home <span className="sr-only">(current)</span>
                  </Link>
                </li>
              </ul>

              <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Master Data</span>
                <span className="d-flex align-items-center text-muted">
                  <span data-feather="plus-circle" />
                </span>
              </h6>
              <ul className="nav flex-column mb-2">
                <li className="nav-item">
                  <Link className="nav-link" to={`${match.url}/countries`}>
                    <span data-feather="file-text" />
                    Countries
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={`${match.url}/functions`}>
                    <span data-feather="file-text" />
                    Functions
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={`${match.url}/products`}>
                    <span data-feather="file-text" />
                    Products
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">


                <Switch>
                    	<PrivateRoute exact path={match.path} component={ Main } />
                      <PrivateRoute exact path={`${match.path}/product/:id`} component= { ProductForm }/>
                      <PrivateRoute exact path={`${match.path}/products`} component={ ProductList } />
                      <PrivateRoute path={`${match.path}/products/add`} component= { ProductForm }/>
                      <PrivateRoute exact path={`${match.path}/country/:id`} component= { CountryPage } />
                      <PrivateRoute exact path={`${match.path}/countries`} component={ CountryList } />
                      <PrivateRoute path={`${match.path}/countries/add`} component= { CountryPage } />
                      <PrivateRoute exact path={`${match.path}/function/:id`} component= { FuncPage } />
                      <PrivateRoute exact path={`${match.path}/functions`} component={ FuncList } />
                      <PrivateRoute path={`${match.path}/functions/add`} component= { FuncPage } />
                </Switch>

          </main>
        </div>
      </div>
    );
  }
}

export default Home;
