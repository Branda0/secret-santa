// create a graph class
class Graph {
  // defining vertex array and
  // adjacent list
  constructor(noOfVertices) {
    this.noOfVertices = noOfVertices;
    this.AdjList = new Map();
  }

  addVertex(v) {
    // initialize the adjacent list with a
    // null array
    this.AdjList.set(v, []);
  }

  addEdge(v, w) {
    // get the list for vertex v and put the
    // vertex w denoting edge between v and w
    this.AdjList.get(v).push(w);
  }

  printGraph() {
    // get all the vertices
    var get_keys = this.AdjList.keys();
    console.log("test", get_keys);

    // iterate over the vertices
    for (var i of get_keys) {
      // great the corresponding adjacency list
      // for the vertex
      var get_values = this.AdjList.get(i);
      var conc = "";

      // iterate over the adjacency list
      // concatenate the values into a string
      for (var j of get_values) conc += j + " ";

      // print the vertex and its adjacency list
      console.log(i + " -> " + conc);
    }
  }

  cycle(startNode) {
    let visited = new Map();
    visited.set(startNode, 0);

    return this.recursivePath(startNode, visited);
  }

  recursivePath(node, visited) {
    if (visited.size === this.noOfVertices) {
      // Last node can join first node => return path as solution
      const firstKey = visited.keys().next().value;
      if (this.AdjList.get(node).includes(firstKey)) return visited;

      visited.delete(node);
      const lastPathNode = Array.from(visited.keys()).pop();
      visited.set(lastPathNode, visited.get(lastPathNode) + 1);

      return this.recursivePath(lastPathNode, visited);
    }

    const index = visited.get(node);
    const element = this.AdjList.get(node)[index];

    if (!element) {
      visited.delete(node);
      const lastPathNode = Array.from(visited.keys()).pop();

      visited.set(lastPathNode, visited.get(lastPathNode) + 1);

      return this.recursivePath(lastPathNode, visited);
    }
    // If adjacent node [index] has not been visited, call recurse function on it
    if (visited.get(element) === undefined) {
      visited.set(element, 0);
      return this.recursivePath(element, visited);
    }

    // adjacent nodes already been visited, try recursive function with index + 1

    if (this.AdjList.get(node)[index + 1]) {
      visited.set(node, index + 1);
      return this.recursivePath(node, visited);
    }

    // if no more adjacent nodes available, backtrack strategy, delete actual node from path and call previous node path with different index
    // do {} while (!visited.get(lastPathNode + 1));

    visited.delete(node);
    if (visited.size === 0) {
      console.log("pas de solution ?");
      return;
    }

    const lastPathNode = Array.from(visited.keys()).pop();
    visited.set(lastPathNode, visited.get(lastPathNode) + 1);

    return this.recursivePath(lastPathNode, visited);
  }
}

// var g = new Graph(8);
// var vertices = ["Gab", "Hor", "Els", "Kel", "Mik", "Hel", "Tan", "Man"];

var g = new Graph(4);
var vertices = ["A", "B", "C", "D"];

// adding vertices
for (var i = 0; i < vertices.length; i++) {
  g.addVertex(vertices[i]);
}

g.addEdge("A", "D");
g.addEdge("A", "C");
g.addEdge("B", "D");
g.addEdge("B", "C");
g.addEdge("C", "B");
g.addEdge("C", "A");
g.addEdge("C", "D");
g.addEdge("D", "A");
g.addEdge("D", "C");
g.addEdge("D", "B");

g.printGraph();
console.log(g.cycle("A"));

// const result = g.cycle("A");
// console.log("final = ", result);

var g1 = new Graph(8);
var vertices = ["Gab", "Els", "Tan", "Hel", "Mik", "Kel", "Hor", "Man"];

// adding vertices
for (var i = 0; i < vertices.length; i++) {
  g1.addVertex(vertices[i]);
}
// adding edges

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

// g1.printGraph();

// g1.cycle("Gab");
