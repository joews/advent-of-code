open Batteries.Printf;;
open Batteries;;

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
let get_indicators list i tile =
  let row_end = (List.length list - 1)
  and at = List.at list 
  in
  match i with
  | 0 -> (s, (at 0), (at 1))
  | c when (c = row_end) -> ((at (i - 1)), (at (i)), s)
  | _ -> ((at (i - 1)), (at i), (at (i + 1)));;

let get_tile indicators = 
  match indicators with
  | ('^', '^', '.') -> '^'
  | ('.', '^', '^') -> '^'
  | ('^', '.', '.') -> '^'
  | ('.', '.', '^') -> '^'
  | _ -> '.';;

let get_next_row last_row = 
  let row_indicators = get_indicators last_row in
  let indicators = List.mapi row_indicators last_row in
  let tiles = (List.map get_tile indicators) in
  (print tiles; tiles);;

let count_row_safe_tiles row = 
  row
  |> List.filter (fun c -> c = '.')
  |> List.length;;

let count_safe_tiles num_rows row =
  let rec aux num_rows row count = 
    match num_rows with
    | 0 -> count
    | n -> let next_row = get_next_row row 
          in
          aux (n - 1) next_row (count + (count_row_safe_tiles row))
  in 
  aux num_rows row 0          

  
(*let input = ".^^.^.^^^^";; *)
(*let num_rows = 10;;*)

let input = "^^.^..^.....^..^..^^...^^.^....^^^.^.^^....^.^^^...^^^^.^^^^.^..^^^^.^^.^.^.^.^.^^...^^..^^^..^.^^^^";;
let num_rows = 40;;
   
(* go *)
let answer = count_safe_tiles num_rows (parse input);;
print_int answer;;
