import Rete from "rete";
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import ConnectionPathPlugin from "rete-connection-path-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
import AreaPlugin from "rete-area-plugin";
import data from "./data";
import getTransformAlong from "./helpers/ConnectionMarkerPosition";
import AutoArrange from "./helpers/autoArrangeVertically";

import { MyNode } from "./Node";
import ConditionalComponent from "./components/Conditional";
import ResponseComponent from "./components/Response";

export default async function(container) {
  let components = [new ConditionalComponent(), new ResponseComponent()];
  let editor = new Rete.NodeEditor("demo@0.1.0", container);
  editor.use(ConnectionPlugin);
  editor.use(ContextMenuPlugin);
  editor.use(ReactRenderPlugin, {
    component: MyNode
  });

  editor.use(ConnectionPathPlugin, {
    type: ConnectionPathPlugin.DEFAULT, // DEFAULT or LINEAR transformer
    curve: ConnectionPathPlugin.curveBasis, // curve identifier
    options: { vertical: true, curvature: 0.5 }, // optional
    arrow: { color: "#383838", marker: "M-5,-5 L-5,5 L10,0 z" }
  });

  editor.use(AreaPlugin, {
    background: false,
    snap: false,
    scaleExtent: { min: 0.1, max: 0.8 },
    translateExtent: { width: 6500, height: 3000 }
  });

  let engine = new Rete.Engine("demo@0.1.0");

  components.forEach(c => {
    editor.register(c);
    engine.register(c);
  });

  editor.fromJSON(data);

  editor.view.resize();
  editor.trigger("process");

  // editor.on("nodecreate", node => {
  //   if (!node.data.oldNode) {
  //     const lastNode = editor.nodes[editor.nodes.length - 1];
  //     node.position = [lastNode.position[0], lastNode.position[1] + 150];
  //     node.data.oldNode = true;
  //   }
  // });

  // editor.on("nodecreated", node => {
  //   if (!node.data.oldNode) {
  //     const lastNode = editor.nodes[editor.nodes.length - 2];
  //     const output = Array.from(lastNode.outputs.values())[0];
  //     const input = Array.from(node.inputs.values())[0];
  //     editor.connect(output, input);
  //   }
  // });

  editor.on("renderconnection updateconnection", ({ el }) => {
    const path = el.querySelector("path");
    const marker = el.querySelector(".marker");
    marker.setAttribute("transform", getTransformAlong(path, -10));
  });

  editor.on(
    "process nodecreated noderemoved connectioncreated connectionremoved",
    async () => {
      console.log("process");
      await engine.abort();
      await engine.process(editor.toJSON());
      new AutoArrange(editor).arrange(editor.nodes[0]);
      AreaPlugin.zoomAt(editor, editor.nodes);
      console.log(editor.toJSON());
    }
  );
}
