import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FuncForm from './FuncForm';
import { getFunction, addFunction, updateFunction } from '../../actions/function-actions';

class FuncPage extends Component {

  componentDidMount = () => {
    const { match } = this.props
    if (match.params.id) {
        this.props.getFunction(match.params.id)
    } 
  }

  saveFunction = ({ id, name, mode }) => {
      if (mode === 'edit') {
          return this.props.updateFunction({ id, name },this.props.history)
      } else {
          return this.props.addFunction({ id, name }, this.props.history)
      }
  }

  render() {
    return (
      <div>
        <FuncForm func={this.props.func} saveFunction={this.saveFunction} errors={this.props.errors}/>
      </div>
    )
  }
}

const mapStateToProps = (state,props) => {
    const { match } = props;

    return {
        func: match.params.id ? state.func.func : {},
        errors: state.errors
    }

}

export default connect(mapStateToProps, { getFunction, addFunction, updateFunction })(withRouter(FuncPage));