import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Func extends Component {
    render() {
    const { func } = this.props;
    return (
      <tr>
        <td>{func.id}</td>
        <td>{func.name}</td>
        <td>
            <Link to={`function/${func.id}`} type="button" className="btn btn-primary btn-sm mr-1">Edit</Link>
        </td>
        <td>
            <button type="button" className="btn btn-danger btn-sm" onClick={()=> window.confirm("Are you sure you wish to delete this item?") && this.props.deleteFunction(func.id)}>Delete</button>
        </td>
      </tr>
    )
  }
}

Func.propTypes = {
    func: PropTypes.object.isRequired
};

export default Func;