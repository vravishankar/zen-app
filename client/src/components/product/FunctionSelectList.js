import React from 'react'
import classnames from 'classnames';

import { connect } from 'react-redux';

import { getFunctions } from '../../actions/function-actions';

class FunctionSelectList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            funcs: [],
            info: this.props.info ? this.props.info : '',
            error: this.props.error ? this.props.error : '',
            value: this.props.value ? this.props.value : ''
        }
    }

    componentDidMount() {
        this.props.getFunctions()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value,
            error: nextProps.error
        })
    }
    

    render() {
        const { info, error, value } = this.state
        const renderOptions = this.props.func.funcs.map(f => <option key={f.id} value={f.id}>{f.name}</option>)
        return(
            <div className="form-group">
            <label htmlFor="functionSelect">Function</label>
            <select 
                id="functionSelect" 
                className={classnames("form-control", {
                    "is-invalid": error
                })} 
                value={value}           
                name="functionId"
                onChange={this.props.onChange}>
                    <option value="">Choose a function</option>
                    {renderOptions}
            </select>
            { info && (<small className="form-text text-muted">{info}</small>) }
            { error && <div className="invalid-feedback">{error}</div> }
        </div>        
        )
    }
}

const mapStateToProps = state => ({
    func: state.func
})

export default connect(mapStateToProps, { getFunctions })(FunctionSelectList);