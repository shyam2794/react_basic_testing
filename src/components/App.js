import React, { Component } from "react";
import {
  Form,
  FormGroup,
  FormControl,
  Button,
  ListGroup,
  Col
} from "react-bootstrap";

import Note from "./Note";

export default class App extends Component {
  state = {
    note: "",
    list: []
  };

  handleChange = e =>
    this.setState({
      note: e.target.value
    });

  componentDidMount = () => {
    if (localStorage.getItem("note")) {
      this.setState({
        list: JSON.parse(localStorage.getItem("note"))
      });
      return;
    }
    let note = [];
    localStorage.setItem("note", JSON.stringify(note));
  };

  onClickSubmit = () => {
    let { list, note } = this.state;
    this.setState({ list: [...list, note] });
    let localStorageNote = JSON.parse(localStorage.getItem("note"));
    let updatedList = [...localStorageNote, note];
    localStorage.setItem("note", JSON.stringify(updatedList));
  };

  onClickClear = () => {
    localStorage.removeItem("note");
    this.setState({
      list: []
    });
  };

  render() {
    return (
      <div>
        <h1>Note to Self</h1>
        <Form horizontal>
          <FormGroup controlId="formBasicText">
            <Col sm={8}>
              <FormControl
                type="text"
                value={this.state.note}
                placeholder="Enter a Note"
                onChange={this.handleChange}
              />
              <FormControl.Feedback />
            </Col>
          </FormGroup>
          <Button onClick={this.onClickSubmit}>Submit</Button>
        </Form>
        {this.state.list && (
          <ListGroup>
            {this.state.list.map((value, key) => {
              return <Note key={key} note={value} />;
            })}
          </ListGroup>
        )}
        <hr />
        <Button onClick={this.onClickClear}>Clear</Button>
      </div>
    );
  }
}
