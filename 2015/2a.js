// Slightly foolish single expression solution

let result = s.split("\n")
  .map(line => line.split("x"))
  .map(([l, w, h]) => 
    (2*l*w + 2*w*h + 2*h*l)
    + [l, w, h].sort((a, b) => a - b)
        .slice(0, 2)
        .reduce((prod, a) => a * prod, 1 )
  )
  .reduce((sum, e) => sum + e, 0)
