import Graph from "./graph";

export const computeGraph = () => {
  try {
    const g1 = new Graph(8);

    var nodes = ["Gab", "Els", "Tan", "Hel", "Mik", "Kel", "Hor", "Man"];

    // adding nodes
    for (var i = 0; i < nodes.length; i++) {
      g1.addVertex(nodes[i]);
    }
    g1.addEdge("Gab", "Kel");
    g1.addEdge("Gab", "Hel");
    g1.addEdge("Gab", "Tan");
    g1.addEdge("Gab", "Mik");
    g1.addEdge("Gab", "Man");

    g1.addEdge("Hor", "Kel");
    g1.addEdge("Hor", "Mik");
    g1.addEdge("Hor", "Tan");
    g1.addEdge("Hor", "Hel");
    g1.addEdge("Hor", "Man");

    g1.addEdge("Els", "Kel");
    g1.addEdge("Els", "Mik");
    g1.addEdge("Els", "Hel");
    g1.addEdge("Els", "Tan");
    g1.addEdge("Els", "Man");

    g1.addEdge("Kel", "Gab");
    g1.addEdge("Kel", "Els");
    g1.addEdge("Kel", "Hor");
    g1.addEdge("Kel", "Hel");
    g1.addEdge("Kel", "Tan");
    g1.addEdge("Kel", "Man");

    g1.addEdge("Mik", "Gab");
    g1.addEdge("Mik", "Hor");
    g1.addEdge("Mik", "Els");
    g1.addEdge("Mik", "Hel");
    g1.addEdge("Mik", "Tan");
    g1.addEdge("Mik", "Man");

    g1.addEdge("Hel", "Gab");
    g1.addEdge("Hel", "Els");
    g1.addEdge("Hel", "Hor");
    g1.addEdge("Hel", "Mik");
    g1.addEdge("Hel", "Kel");

    g1.addEdge("Tan", "Gab");
    g1.addEdge("Tan", "Kel");
    g1.addEdge("Tan", "Hor");
    g1.addEdge("Tan", "Els");
    g1.addEdge("Tan", "Mik");

    g1.addEdge("Man", "Gab");
    g1.addEdge("Man", "Hor");
    g1.addEdge("Man", "Mik");
    g1.addEdge("Man", "Els");
    g1.addEdge("Man", "Kel");

    g1.printGraph();

    return g1.cycleGraph("Gab");
  } catch (error) {
    console.log(error);
  }
};

// adding edges
