import { forEachChild } from "typescript";
import Graph from "./graph";
import { shuffleArray } from "./utils";

export const computeGraph = (members: { name: string; subGroup: string }[]): string[] => {
  let shuffledMembers = [...members];
  shuffleArray(shuffledMembers);

  const graph = new Graph(members.length);

  const nodes = members.map((member) => member.name);

  // add nodes to graph
  shuffledMembers.forEach((member) => {
    graph.addNode(member.name);
  });

  // add edges between nodes
  shuffledMembers.forEach((memberNodeA) => {
    shuffledMembers
      .filter((member) => memberNodeA.name !== member.name && memberNodeA.subGroup !== member.subGroup)
      .forEach((filtredMember) => {
        graph.addEdge(memberNodeA.name, filtredMember.name);
      });
  });

  graph.printGraph();

  return graph.cycleGraph(shuffledMembers[0].name);
};
