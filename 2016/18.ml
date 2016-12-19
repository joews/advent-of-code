open Batteries.Printf;;
open Batteries;;

(* usage: ocaml.sh 18.ml *)

(* constants *)
let s = '.';; (* safe *)
let t = '^';; (* trap *)

(* io *)
let parse s = String.explode s;;

(* util *)
let to_string char_list = String.concat "" (List.map (String.make 1) char_list)

let print char_list =
  printf "%s\n" (to_string char_list)

let print_indicators indicators =
  Printf.printf "%a\n" (Tuple3.print Char.print Char.print Char.print) indicators;;

(* puzzle logic *)

(* return a (char*char*char) of the tiles in the previous row
 * that indicate if the tile at position i in this row is a trap *)
let get_indicators row i tile =
  let row_end = (List.length row - 1)
  and at = List.at row 
  in
  match i with
  | 0 -> (s, (at 0), (at 1))
  | c when (c = row_end) -> ((at (i - 1)), (at (i)), s)
  | _ -> ((at (i - 1)), (at i), (at (i + 1)));;

(* given the indicators from the previous row, return a tile (trap|safe) *)
let get_tile indicators = 
  match indicators with
  | ('^', '^', '.') -> '^'
  | ('.', '^', '^') -> '^'
  | ('^', '.', '.') -> '^'
  | ('.', '.', '^') -> '^'
  | _ -> '.';;

(* given the previous row of tiles, return the next *)
let get_next_row last_row = 
  let row_indicators = get_indicators last_row in
  let indicators = List.mapi row_indicators last_row in
  List.map get_tile indicators

(* return the number of safe tiles in the given row *)
let count_row_safe_tiles row = 
  row
  |> List.filter (fun c -> c = '.')
  |> List.length;;

(* given a puzzle with num_rows rows, starting with row, return
 * the total number of safe stiles *)
let count_safe_tiles num_rows row =
  let rec aux num_rows row count = 
    match num_rows with
    | 0 -> count
    | n -> let next_row = get_next_row row 
          in
          aux (n - 1) next_row (count + (count_row_safe_tiles row))
  in 
  aux num_rows row 0          

(* go *)
let input = "^^.^..^.....^..^..^^...^^.^....^^^.^.^^....^.^^^...^^^^.^^^^.^..^^^^.^^.^.^.^.^.^^...^^..^^^..^.^^^^";;

(* part 1 *)
(*let num_rows = 40;;*)

(* part 2 *)
let num_rows = 400000;;
   
let answer = count_safe_tiles num_rows (parse input);;
print_int answer;;
