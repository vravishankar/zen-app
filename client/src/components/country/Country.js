import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Country extends Component {
    render() {
    const { country } = this.props;
    return (
      <tr>
        <td>{country.code}</td>
        <td>{country.name}</td>
        <td>
            <Link to={`country/${country.code}`} type="button" className="btn btn-primary btn-sm mr-1">Edit</Link>
        </td>
        <td>
            <button type="button" className="btn btn-danger btn-sm" onClick={()=> window.confirm("Are you sure you wish to delete this item?") && this.props.deleteCountry(country.code)}>Delete</button>
        </td>
      </tr>
    )
  }
}

Country.propTypes = {
    country: PropTypes.object.isRequired
};

export default Country;