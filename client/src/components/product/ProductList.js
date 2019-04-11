import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { getProducts, deleteProduct } from '../../actions/product-actions';

import Product from './Product';

class ProductList extends Component {

  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const { products, loading } = this.props.product;
    let productsContent;
    if (products === null || loading) {
        productsContent = <tr className="text-center"><td colSpan="10">Loading...</td></tr>
    } else {
        if (products.length === 0) {
            productsContent = <tr className="text-center"><td colSpan="10">No Products Found.</td></tr>
        } else {
            productsContent = products.map( product => (
                <Product key={product.id} {...this.props} product={product} deleteProduct={this.props.deleteProduct}/>
            ));
        }
    }

    return (
      <Fragment>
        <div className="d-flex flex-wrap flex-md-nowrap pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Products</h1>
        </div>
        <Link className="btn btn-sm btn-info mb-3" to={`${this.props.match.url}/add`}>Add Product</Link>
        <div className="text-nowrap">
            <table className="table table-sm table-bordered table-striped table-responsive w-auto">
                <thead>
                    <tr>
                        <th>Product Id</th>
                        <th>Product Name</th>
                        <th>Subproduct Name</th>
                        <th>Region</th>
                        <th>Hub Location</th>
                        <th>Primary Support</th>
                        <th>Primary Mobile #</th>
                        <th>Primary Desk #</th>
                        <th>Primary Fonenet</th>
                        <th>Primary Email Address</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {productsContent}
                </tbody>
            </table>
        </div>
      </Fragment>
    )
  }
}

ProductList.propTypes = {
    getProducts: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    product: state.product
})

export default connect(mapStateToProps, { getProducts, deleteProduct })(ProductList);