export const initialNodes = [
  {
    id: "1",
    type: "input",
    position: { x: 50, y: 200 },
    data: {
      label: "Webhook Trigger",
    },
  },

  {
    id: "2",
    position: { x: 300, y: 200 },
    data: {
      label: "AI Processing",
    },
  },

  {
    id: "3",
    position: { x: 550, y: 200 },
    data: {
      label: "Store in MongoDB",
    },
  },

  {
    id: "4",
    position: { x: 800, y: 200 },
    data: {
      label: "Send Email",
    },
  },

  {
    id: "5",
    type: "output",
    position: { x: 1050, y: 200 },
    data: {
      label: "Discord Notification",
    },
  },
];

export const initialEdges = [
  {
    id: "e1",
    source: "1",
    target: "2",
    animated: true,
  },
  {
    id: "e2",
    source: "2",
    target: "3",
    animated: true,
  },
  {
    id: "e3",
    source: "3",
    target: "4",
    animated: true,
  },
  {
    id: "e4",
    source: "4",
    target: "5",
    animated: true,
  },
];