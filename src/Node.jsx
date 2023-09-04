import React from "react";
import { Node, Socket, Control } from "rete-react-render-plugin";

export class MyNode extends Node {
  async addChildNode(editor, output) {
    let component = Array.from(editor.components.values())[0];
    const node = await component.createNode({});
    const input = Array.from(node.inputs.values())[0];
    editor.addNode(node);
    editor.connect(output, input);
  }

  render() {
    const { node, editor, bindSocket, bindControl } = this.props;
    const { outputs, controls, inputs, selected } = this.state;
    return (
      <div className={`node ${selected}`}>
        {/* Inputs */}
        <div className="output-container">
          {inputs.map(input => (
            <div className="input" key={input.key}>
              <Socket
                type="input"
                socket={input.socket}
                io={input}
                innerRef={bindSocket}
              />
              {input.showControl() && (
                <Control
                  className="input-control"
                  control={input.control}
                  innerRef={bindControl}
                />
              )}
            </div>
          ))}
        </div>
        {/* Controls */}
        {controls.map(control => (
          <Control
            className="control"
            key={control.key}
            control={control}
            innerRef={bindControl}
          />
        ))}
        {/* Outputs */}
        <div className="output-container">
          {outputs.map(output => (
            <div className="output" key={output.key}>
              <span onClick={e => this.addChildNode(editor, output)}>+</span>
              <Socket
                type="output"
                socket={output.socket}
                io={output}
                innerRef={bindSocket}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
