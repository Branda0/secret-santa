// create a graph class
export default class Graph {
  constructor(noOfNodes) {
    this.noOfNodes = noOfNodes;
    this.AdjList = new Map();
  }

  addNode(v) {
    // initialize the adjacent list with a null array
    this.AdjList.set(v, []);
  }

  addEdge(v, w) {
    // add directed link beetween nodes "v" and "w" => add "w" to adjacent list of "v"
    this.AdjList.get(v).push(w);
  }

  printGraph() {
    // get all the nodes
    var get_keys = this.AdjList.keys();

    // iterate over the nodes
    for (var i of get_keys) {
      // great the corresponding adjacency list
      // for the node
      var get_values = this.AdjList.get(i);
      var conc = "";

      // iterate over the adjacency list
      // concatenate the values into a string
      for (var j of get_values) conc += j + " ";

      // print the node and its adjacency list
      console.log(i + " -> " + conc);
    }
  }

  cycleGraph(startNode) {
    //initialize visited path as Map object => add first node to path and index for adjacents node pathing  ie: for node A, adjA =[B , C] index 0 is B
    let visited = new Map();
    visited.set(startNode, 0);

    return this.cycleGraphUtil(startNode, visited);
  }

  cycleGraphUtil(node, visited) {
    if (visited.size === this.noOfNodes) {
      // Last node can join first node => return path as solution
      const firstKey = visited.keys().next().value;
      if (this.AdjList.get(node).includes(firstKey)) return Array.from(visited.keys());

      // Last node has no edge with first node => delete last node from pathing and backtrack with last known node with index+1
      visited.delete(node);
      const lastPathNode = Array.from(visited.keys()).pop();
      visited.set(lastPathNode, visited.get(lastPathNode) + 1);
      return this.cycleGraphUtil(lastPathNode, visited);
    }

    const index = visited.get(node);
    const element = this.AdjList.get(node)[index];

    if (!element) {
      visited.delete(node);
      // if path size = 0, all path were unsuccessful
      if (visited.size === 0) return null;

      const lastPathNode = Array.from(visited.keys()).pop();
      visited.set(lastPathNode, visited.get(lastPathNode) + 1);
      return this.cycleGraphUtil(lastPathNode, visited);
    }
    // If adjacent node [index] has not been visited, call recurse function on it
    if (!visited.has(element)) {
      visited.set(element, 0);
      return this.cycleGraphUtil(element, visited);
    }

    // adjacent index node has already been visited, try with index + 1
    if (this.AdjList.get(node)[index + 1]) {
      visited.set(node, index + 1);
      return this.cycleGraphUtil(node, visited);
    }

    // if no more adjacent nodes available, backtrack strategy, delete actual node from path and call previous node path with different index
    visited.delete(node);

    // if path size = 0, all path were unsuccessful
    if (visited.size === 0) {
      console.log("pas de solution");
      return null;
    }

    const lastPathNode = Array.from(visited.keys()).pop();
    visited.set(lastPathNode, visited.get(lastPathNode) + 1);

    return this.cycleGraphUtil(lastPathNode, visited);
  }
}
