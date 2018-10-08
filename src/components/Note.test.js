import React from "react";
import { mount } from "enzyme";

import Note from "./Note";

let props = {
  note: "get vegetables"
};

describe("Tests for Note Component", () => {
  let note = mount(<Note {...props} />);

  it("renders the note text", () => {
    expect(note.find("span").text()).toEqual(props.note);
  });
});
