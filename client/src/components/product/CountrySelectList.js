import React from 'react'
import classnames from 'classnames';

import { connect } from 'react-redux';

import { getCountries } from '../../actions/country-actions';

class CountrySelectList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            info: this.props.info ? this.props.info : '',
            error: this.props.error ? this.props.error : '',
            value: this.props.value ? this.props.value : ''
        }
    }

    componentDidMount() {
        this.props.getCountries()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value,
            error: nextProps.error
        })
    }
    

    render() {
        const { info, error, value } = this.state
        const renderOptions = this.props.country.countries.map(country => <option key={country.code} value={country.code}>{country.name}</option>)
        return(
            <div className="form-group">
            <label htmlFor="countrySelect">Country</label>
            <select 
                id="countrySelect" 
                className={classnames("form-control", {
                    "is-invalid": error
                })} 
                value={value}           
                name="countryCode"
                onChange={this.props.onChange}>
                    <option value="">Choose a country</option>
                    {renderOptions}
            </select>
            { info && (<small className="form-text text-muted">{info}</small>) }
            { error && <div className="invalid-feedback">{error}</div> }
        </div>        
        )
    }
}

const mapStateToProps = state => ({
    country: state.country
})

export default connect(mapStateToProps, { getCountries })(CountrySelectList);