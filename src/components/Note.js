import React, { Component } from "react";

import { ListGroupItem } from "react-bootstrap";

export default class Note extends Component {
  render() {
    return <ListGroupItem>{this.props.note}</ListGroupItem>;
  }
}
