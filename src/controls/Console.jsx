import React from "react";
import { Control } from "rete";

export default class ConsoleControl extends Control {
  static component = ({ name, title }) => (
    <div>
      <h5>{title}</h5>
      <div>{name}</div>
    </div>
  );

  constructor(emitter, key, name, title) {
    super(key);
    this.render = "react";
    this.component = ConsoleControl.component;
    this.props = {
      name,
      title
    };
  }

  setValue(val) {
    this.props.name = val;
    this.putData(this.key, val);
    this.update();
  }
}
