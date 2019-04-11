import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CountryForm from './CountryForm';
import { getCountry, addCountry, updateCountry } from '../../actions/country-actions';

class CountryPage extends Component {

  componentDidMount = () => {
    const { match } = this.props
    if (match.params.id) {
        this.props.getCountry(match.params.id)
    } 
  }

  saveCountry = ({ code, name, mode }) => {
      if (mode === 'edit') {
          return this.props.updateCountry({ code, name },this.props.history)
      } else {
          return this.props.addCountry({ code, name }, this.props.history)
      }
  }

  render() {
    return (
      <div>
        <CountryForm country={this.props.country} saveCountry={this.saveCountry} errors={this.props.errors}/>
      </div>
    )
  }
}

const mapStateToProps = (state,props) => {
    const { match } = props;

    return {
        country: match.params.id ? state.country.country : {},
        errors: state.errors
    }

}

export default connect(mapStateToProps, { getCountry, addCountry, updateCountry })(withRouter(CountryPage));