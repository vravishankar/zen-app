import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getFunctions, deleteFunction } from '../../actions/function-actions';
import Func from './Func';

class FuncList extends Component {

  componentDidMount() {
      this.props.getFunctions()
  }

  render() {
    const { funcs, loading } = this.props.func;
    let functionsContent;
    if (functionsContent === null || loading) {
        functionsContent = <tr className="text-center"><td colSpan="10">Loading...</td></tr>
    } else {
        if (funcs.length === 0) {
            functionsContent = <tr className="text-center"><td colSpan="10">No Functions Found.</td></tr>
        } else {
            functionsContent = funcs.map( func => (
                <Func key={func.id} func={ func } deleteFunction={this.props.deleteFunction}/>
            ));
        }
    }
    return (
      <div>
        <div className="d-flex flex-wrap flex-md-nowrap pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Functions</h1>
        </div>
        <Link className="btn btn-sm btn-info mb-3" to={`${this.props.match.url}/add`}>Add Function</Link>
        <table className="table table-sm table-bordered table-striped w-auto">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th colSpan="2">Actions</th>
                </tr>
            </thead>
            <tbody>
                { functionsContent }
            </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    func: state.func
})

export default connect(mapStateToProps, { getFunctions, deleteFunction })(FuncList);
