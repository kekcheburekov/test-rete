export default {
  id: "demo@0.1.0",
  nodes: {
    "1": {
      id: 1,
      data: { oldNode: true, data: "" },
      inputs: { "1": { connections: [] } },
      outputs: {
        "1": {
          connections: [
            { node: 2, input: "1", data: {} },
            { node: 103, input: "1", data: {} }
          ]
        },
        "2": {
          connections: [
            { node: 101, input: "1", data: {} },
            { node: 105, input: "1", data: {} }
          ]
        }
      },
      position: [-96.24999628380418, -200],
      name: "Conditional"
    },
    "2": {
      id: 2,
      data: { oldNode: true },
      inputs: { "1": { connections: [{ node: 1, output: "1", data: {} }] } },
      outputs: {},
      position: [-443.7500050534374, -3.7499990411426474],
      name: "Response"
    },
    "101": {
      id: 101,
      data: { oldNode: true, console: "" },
      inputs: { "1": { connections: [{ node: 1, output: "2", data: {} }] } },
      outputs: {},
      position: [291.8742215823333, -13.83168797781812],
      name: "Response"
    },
    "103": {
      id: 103,
      data: { oldNode: true },
      inputs: { "1": { connections: [{ node: 1, output: "1", data: {} }] } },
      outputs: {},
      position: [-312.9830724442876, 184.73693133613943],
      name: "Response"
    },
    "104": {
      id: 104,
      data: { oldNode: true, console: "" },
      inputs: { "1": { connections: [{ node: 105, output: "2", data: {} }] } },
      outputs: {},
      position: [375.0431150550023, 464.85878686093594],
      name: "Response"
    },
    "105": {
      id: 105,
      data: { oldNode: true, data: "" },
      inputs: { "1": { connections: [{ node: 1, output: "2", data: {} }] } },
      outputs: {
        "1": { connections: [{ node: 106, input: "1", data: {} }] },
        "2": { connections: [{ node: 104, input: "1", data: {} }] }
      },
      position: [127.52213893185365, 202.86416679744798],
      name: "Conditional"
    },
    "106": {
      id: 106,
      data: { oldNode: true },
      inputs: { "1": { connections: [{ node: 105, output: "1", data: {} }] } },
      outputs: {},
      position: [-79.8781757611513, 474.2137566622159],
      name: "Response"
    }
  }
};
