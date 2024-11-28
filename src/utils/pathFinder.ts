interface Node {
  id: string;
  x: number;
  y: number;
}

interface Edge {
  from: string;
  to: string;
  distance: number;
  cost: number;
}

export const calculateShortestPath = (
  nodes: Node[],
  edges: Edge[],
  start: string,
  end: string
) => {
  // Dijkstra's algorithm implementation
  const distances: { [key: string]: number } = {};
  const previous: { [key: string]: string | null } = {};
  const unvisited = new Set<string>();

  // Initialize distances
  nodes.forEach(node => {
    distances[node.id] = Infinity;
    previous[node.id] = null;
    unvisited.add(node.id);
  });
  distances[start] = 0;

  while (unvisited.size > 0) {
    // Find node with minimum distance
    let current: string | null = null;
    let minDistance = Infinity;
    
    unvisited.forEach(nodeId => {
      if (distances[nodeId] < minDistance) {
        minDistance = distances[nodeId];
        current = nodeId;
      }
    });

    if (current === null) break;
    if (current === end) break;

    unvisited.delete(current);

    // Update distances to neighbors
    edges
      .filter(edge => edge.from === current)
      .forEach(edge => {
        const alt = distances[current!] + edge.distance;
        if (alt < distances[edge.to]) {
          distances[edge.to] = alt;
          previous[edge.to] = current;
        }
      });
  }

  // Reconstruct path
  const path: string[] = [];
  let current = end;
  
  while (current !== null) {
    path.unshift(current);
    current = previous[current] || null;
  }

  return path;
};