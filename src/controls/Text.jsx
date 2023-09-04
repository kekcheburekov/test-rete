import React from "react";
import { Control } from "rete";

export default class TextControl extends Control {
  static component = ({ name, title, onChange }) => (
    <div>
      <h5>{title}</h5>
      <textarea
        value={name}
        placeholder="type here"
        onChange={({ target }) => onChange(target.value)}
      />
    </div>
  );

  constructor(emitter, key, name, title) {
    super(key);
    this.render = "react";
    this.component = TextControl.component;
    this.props = {
      name,
      title,
      onChange: (value) => {
        this.setValue(value);
        emitter.trigger("process");
      }
    };
  }

  setValue(val) {
    this.props.name = val;
    this.putData(this.key, val);
    this.update();
  }
}
