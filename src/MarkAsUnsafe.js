import {Component} from "react";
import React from "react";
import { Button, crudUpdateMany } from 'react-admin';
import { connect } from 'react-redux';

export class MarkAsUnsafe extends Component {
  handleClick = () => {
    const { basePath, crudUpdateMany, resource, selectedIds } = this.props;
    crudUpdateMany(resource, selectedIds, { isSafe: false }, basePath);
  };

  render() {
    return <Button label="Mark as not safe" onClick={this.handleClick} />;
  }
}

export default connect(undefined, { crudUpdateMany })(MarkAsUnsafe);