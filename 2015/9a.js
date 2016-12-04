const input = `Tristram to AlphaCentauri = 34
Tristram to Snowdin = 100
Tristram to Tambi = 63
Tristram to Faerun = 108
Tristram to Norrath = 111
Tristram to Straylight = 89
Tristram to Arbre = 132
AlphaCentauri to Snowdin = 4
AlphaCentauri to Tambi = 79
AlphaCentauri to Faerun = 44
AlphaCentauri to Norrath = 147
AlphaCentauri to Straylight = 133
AlphaCentauri to Arbre = 74
Snowdin to Tambi = 105
Snowdin to Faerun = 95
Snowdin to Norrath = 48
Snowdin to Straylight = 88
Snowdin to Arbre = 7
Tambi to Faerun = 68
Tambi to Norrath = 134
Tambi to Straylight = 107
Tambi to Arbre = 40
Faerun to Norrath = 11
Faerun to Straylight = 66
Faerun to Arbre = 144
Norrath to Straylight = 115
Norrath to Arbre = 135
Straylight to Arbre = 127`.split("\n");

const test = `London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141`.split("\n");

const graph = {};

input.forEach(line => {
  const [src, , dst, , cost] = line.split(" ");
  const node = graph[src] || {};
  node[dst] = +cost;
  graph[src] = node;
  
  const node2 = graph[dst] || {};
  node2[src] = +cost;
  graph[dst] = node2;
})

const nodeCount = Object.keys(graph).length;
let bestCost = Infinity;

function search(rootName) {
  let stack = [rootName];
  let costStack = [0];

  function walk(name) {
    const costSum = costStack.reduce((a, b) => a+ b, 0);
    
    // exit if we get a new best total, or the cost is too great
    //  to be the new best.
    if(costSum >= bestCost) {
      return;
    } else if(stack.length === nodeCount) {
      bestCost = costSum;
      console.log(stack, bestCost);
      return;
    } 
    
    const node = graph[name];
    
    for(const nextName of Object.keys(node)) {
      if(stack.indexOf(nextName) < 0) {
        stack.push(nextName);
        costStack.push(node[nextName]);
        walk(nextName);
        costStack.pop();
        stack.pop();
      }
    }
}
  
  walk(rootName);
}

Object.keys(graph).forEach(root => search(root))
console.log(bestCost);
