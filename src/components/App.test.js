import React from "react";
import { mount } from "enzyme";

import App from "./App";

// Tests need to be done in two ways
// 1. make sure the components or rendered
// 2. Test for the behaviour of the component

describe("Tests for App Component", () => {
  let app = mount(<App />);

  it("should render the App title", () => {
    // console.log(app.debug());
    expect(app.find("h1").text()).toEqual("Note to Self");
  });

  it("should render a clear button", () => {
    expect(
      app
        .find(".btn")
        .at(1)
        .text()
    ).toEqual("Clear");
  });

  describe("Tests for Form component", () => {
    it("should render a form", () => {
      expect(app.find("Form").exists()).toBe(true);
    });

    it("should render a form", () => {
      expect(app.find("FormControl").exists()).toBe(true);
    });

    it("should render a submit button", () => {
      expect(
        app
          .find(".btn")
          .at(0)
          .text()
      ).toEqual("Submit");
    });
  });

  // Behaviour testing ( testing events and changes in state caused by those events )

  describe("update state for notes text", () => {
    let note = "Buy vegetables";

    // we are writting the input , so this should update the state 'note'

    beforeEach(() => {
      app.find("FormControl").simulate("change", {
        target: {
          value: note
        }
      });
    });

    // we are checking now whether the above change event has updated the note state

    it("should update the state for note", () => {
      console.log(app.state());
      expect(app.state().note).toEqual(note);
    });

    // we have entered the note , now we need to submit it on clicking the submit button

    describe("submitting the note", () => {
      // we are simulating the click event

      beforeEach(() => {
        app
          .find(".btn")
          .at(0)
          .simulate("click");
      });

      // the click event should have added the note in the list state

      it("should update the list array", () => {
        console.log(app.state());
        expect(app.state().list[0]).toEqual(note);
      });
    });

    // we have added the note in the list , now we need to clear all the notes

    describe("clearing the notes list", () => {
      beforeEach(() => {
        app
          .find(".btn")
          .at(1)
          .simulate("click");
      });

      // once cleared the notes array should be empty we are checking for it

      it("should clear the list array", () => {
        console.log(app.state());
        expect(app.state().list).toEqual([]);
      });
    });
  });
});
