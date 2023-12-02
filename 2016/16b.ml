open Printf;;

(*
This was a learning experience in OCaml computation. I had to:
* Change List.map/append to rev_map/rev_append to avoid stack overflow
* Rewrite take to pattern match rather than checking List.length
*)

let length = 35651584;;
let input = [1;0;0;0;1;1;1;0;0;1;1;1;1;0;0;0;0];;

(* util *)
let join list =
  (String.concat "" (List.map string_of_int list));;

let print_list list =
   printf "%s\n" (join list);;

let take n l =
  let rec _take n l output =
    match l with
    | [] -> List.rev output
    | _ when n=0 -> List.rev output
    | head::tail -> _take (n - 1) tail (head::output)
    in
   _take n l [];;

let invert = function
   | 1 -> 0
   | 0 -> 1
   | _ -> failwith "expected 1 or 0";;

(* TODO functional way to do this *)
let pairs list =
  let arr = Array.of_list list in
  let result = Array.make (List.length list / 2) (0, 0) in
  for i = 0 to (Array.length result) - 1 do
    result.(i) <- ((arr.(2 * i)), (arr.(2 * i + 1)))
  done;
  Array.to_list result

(* task logic *)

(* Call the data you have at this point "a".
 * Make a copy of "a"; call this copy "b".
 * Reverse the order of the characters in "b".
 * In "b", replace all instances of 0 with 1 and al 1s with 0.
 * The resulting data is "a", then a single 0, then "b". *)
let step a =
  let b = List.rev_map invert a in
  List.rev_append (List.rev a) (0::b);;

let rec fill_disk a =
  if List.length a < length then
    fill_disk (step a)
  else
    take length a;;

let checksum_term pair =
  if (fst pair) == (snd pair) then 1 else 0;;

let rec checksum data =
  let this_checksum = List.rev_map checksum_term (pairs data) in
  if List.length this_checksum mod 2 == 0 then
    checksum (List.rev this_checksum)
  else
    List.rev this_checksum;;

(* go *)
let main =
  input
  |> fill_disk
  |> checksum
  |> print_list
