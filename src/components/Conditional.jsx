import Rete from "rete";
import TextControl from "../controls/Text";
import { stringSocket } from "../sockets";

export default class ConditionalComponent extends Rete.Component {
  constructor() {
    super("Conditional");
  }

  builder(node) {
    const inp = new Rete.Input("1", "String", stringSocket);
    const out = new Rete.Output("1", "String", stringSocket);
    const out2 = new Rete.Output("2", "String", stringSocket);
    const ctrl = new TextControl(this.editor, "data", "", "Conditional");

    return node
      .addInput(inp)
      .addOutput(out)
      .addOutput(out2)
      .addControl(ctrl);
  }

  worker(node, inputs, outputs) {
    const inp = inputs["1"].length ? inputs["1"][0] : node.data["data"];

    if (inp === "email") {
      this.editor.nodes
        .find(n => n.id === node.id)
        .controls.get("data")
        .setValue(inp);

      outputs["1"] = inp;
    } else {
      this.editor.nodes
        .find(n => n.id === node.id)
        .controls.get("data")
        .setValue(inp);

      outputs["2"] = inp;
    }
  }
}
