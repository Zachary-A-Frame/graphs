class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }
  // The add() method inserts a new element with a specified value in to a Set object, if there isn't an element with the same value already in the Set
  addVertex(vertex) {
    this.nodes.add(vertex);
  }
  // Add array of vertexes to our graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }
  // Connect adjacent vertices.
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }
  // Delete adjacent vertices.
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }
  // Check if adjacent node has vertex, if it does, delete it.
  removeVertex(vertex) {
    for (let node of this.nodes) {
      if (node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex);
      }
    }
    this.nodes.delete(vertex);
  }

  depthFirstSearch(start) {
    // Create new graph (set)
    const visited = new Set();
    // Create empty result array
    const result = [];

    function traverse(vertex) {
      // base case
      // if no vertex, return null
      if (!vertex) {
        return null;
      }
      // visit node
      // If not return null, add the vertex and push the vertex's value to our result
      visited.add(vertex);
      result.push(vertex.value);

      // for adjacent values, if our set does not have the neighbor, then traverse the neighbor. Recursion!
      vertex.adjacent.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          return traverse(neighbor);
        }
      });
    }
    // Start function.
    traverse(start);

    return result;
  }

  depthFirstSearchIterative(start) {
    // Create an empty stack
    const stack = [start];
    const result = [];
    const visited = new Set();
    let currentVertex;

    // visit node
    visited.add(start);

    // while there are still neighbors to visit
    while (stack.length) {
      // Remove last certex in stack
      currentVertex = stack.pop();
      // Push current vertex value to result.
      result.push(currentVertex.value);

      // visit neighbors and push onto stack
      currentVertex.adjacent.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          stack.push(neighbor);
        }
      });
    }
    return result;
  }

  breadthFirstSearch(start) {
    // Create an empty queue
    const queue = [start];
    const result = [];
    const visited = new Set();
    let currentVertex;

    // visit node
    visited.add(start);

    // While there is still remaining vertices in queue
    while (queue.length) {
      // currentVertex becomes first element from queue, which is removed from the queue and returned.
      currentVertex = queue.shift();
      // Append the currentVertex's value to our results
      result.push(currentVertex.value);

      // visit neighbors
      currentVertex.adjacent.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }
    return result;
  }

  shortestPath(start, end) {
    // If our graph's start is equal to its end, we're done! No more traversing. Return starting value.
    if (start === end) {
      return [start.value];
    }
    // Create new queue, set, and instantiate a path variable for us to determine the shortest path.
    let queue = [start];
    let visited = new Set();
    let predecessors = {};
    let path = [];
    // While queue hasn't reached zero
    while (queue.length) {
      // Remove first element and return as currentVertex.
      let currentVertex = queue.shift();
      // If this value is the end, stop is our predecessors end value
      if (currentVertex === end) {
        let stop = predecessors[end.value];
        // while stop is true/exists
        while (stop) {
          // push stop value to path
          path.push(stop);
          stop = predecessors[stop];
        }
        // insert the start value to the front of our path
        path.unshift(start.value);
        // Flip it
        path.reverse();
        // Return it
        return path;
      }
      // Add currentVertex to our visited Set.
      visited.add(currentVertex);
      // check each adjacent vertex of our currentVertex
      for (let vertex of currentVertex.adjacent) {
        // if visited does not have our vertex, predecessors vertex value becomes currentVertex value, and our queue has that vertex appended.
        if (!visited.has(vertex)) {
          predecessors[vertex.value] = currentVertex.value;
          queue.push(vertex);
        }
      }
    }
  }
}

module.exports = {Graph, Node}