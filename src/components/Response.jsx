import Rete from "rete";
import ConsoleControl from "../controls/Console";
import { stringSocket } from "../sockets";

export default class ResponseComponent extends Rete.Component {
  constructor() {
    super("Response");
  }

  builder(node) {
    const inp = new Rete.Input("1", "String", stringSocket);
    const ctrl = new ConsoleControl(this.editor, "console", "", "Response");

    return node.addInput(inp).addControl(ctrl);
  }

  worker(node, inputs, outputs) {
    const inp = inputs["1"].length ? inputs["1"][0] : "";

    this.editor.nodes
      .find(n => n.id === node.id)
      .controls.get("console")
      .setValue(inp);
  }
}
