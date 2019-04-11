import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getCountries, deleteCountry } from '../../actions/country-actions';
import Country from './Country';

class CountryList extends Component {

  componentDidMount() {
      this.props.getCountries()
  }

  render() {
    const { countries, loading } = this.props.country;
    let countriesContent;
    if (countries === null || loading) {
        countriesContent = <tr className="text-center"><td colSpan="10">Loading...</td></tr>
    } else {
        if (countries.length === 0) {
            countriesContent = <tr className="text-center"><td colSpan="10">No Products Found.</td></tr>
        } else {
            countriesContent = countries.map( country => (
                <Country key={country.code} country={ country } deleteCountry={this.props.deleteCountry}/>
            ));
        }
    }
    return (
      <div>
        <div className="d-flex flex-wrap flex-md-nowrap pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Countries</h1>
        </div>
        <Link className="btn btn-sm btn-info mb-3" to={`${this.props.match.url}/add`}>Add Country</Link>
        <table className="table table-sm table-bordered table-striped w-auto">
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th colSpan="2">Actions</th>
                </tr>
            </thead>
            <tbody>
                { countriesContent }
            </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    country: state.country
})

export default connect(mapStateToProps, { getCountries, deleteCountry })(CountryList);
