# 2016

Mostly JavaScript with some Racket, OCaml, Bash, Perl, C.

- ✅ 1-10, 12-15, 17-19 originally done in 2016, re-run in 2023
- 16, 18, 20-22 originally done in 2016
- 11, 23, 24 TODO

## Setup

### JavaScript

Originally Node 6, rerun with Node 20

### Racket

```
brew install racket
```

### OCaml

```
brew install ocaml
brew install ocaml-findlib
brew install opam
opam init
opam install batteries

# Had to do this on macOS 12.7.1
cd /opt/homebrew/lib/ocaml
ln -s threads/threads.cma

# Run script
 eval $(opam env)
./opam.sh 18.ml
```

- Copy the [batteries ocamlinit](https://raw.githubusercontent.com/ocaml-batteries-team/batteries-included/master/ocamlinit) to `~/.ocamlinit` to auto-load batteries in the repl.
