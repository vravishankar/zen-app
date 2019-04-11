import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Product extends Component {
    render() {
    const { product } = this.props;
    return (
      <tr>
        <td>{product.id}</td>
        <td>{product.productName}</td>
        <td>{product.subproductName}</td>
        <td>{product.region}</td>
        <td>{product.locationName}</td>
        <td>{product.primarySupportName}</td>
        <td>{product.primaryMobileno}</td>
        <td>{product.primaryDeskno}</td>
        <td>{product.primaryFonenet}</td>
        <td>{product.primaryEmailaddress}</td>
        <td>
            <Link to={`product/${product.id}`} type="button" className="btn btn-primary btn-sm mr-1">Edit</Link>
        </td>
        <td>
            <button type="button" className="btn btn-danger btn-sm" onClick={()=> window.confirm("Are you sure you wish to delete this item?") && this.props.deleteProduct(product.id)}>Delete</button>
        </td>
      </tr>
    )
  }
}

Product.propTypes = {
    product: PropTypes.object.isRequired
};

export default Product;