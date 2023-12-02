# Compile and run an OCaml program with batteries as a dependency
if [[ -z "$1" ]]; then
  echo "Usage: $0 <.ml file>"
  exit 1
fi
set -e
script=$1
out=$(echo $script | sed -e s/\.ml/.out/)

# clean
rm -f $out

# compile
cmd="ocamlfind ocamlc -package batteries -linkpkg ${script} -o ${out}"
# echo $cmd
$cmd

# run
./$out
