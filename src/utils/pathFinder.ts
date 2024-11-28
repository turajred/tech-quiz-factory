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

interface Route {
  name: string;
  distance: string;
  time: string;
  cost: string;
  description: string;
}

const mergeSort = (arr: Route[]): Route[] => {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
};

const merge = (left: Route[], right: Route[]): Route[] => {
  let result: Route[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    const leftDistance = parseInt(left[leftIndex].distance);
    const rightDistance = parseInt(right[rightIndex].distance);

    if (leftDistance < rightDistance) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
};

export { mergeSort };

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
