open Printf;;

let length = 272;;
let input = [1;1;1;0;1;0;0;0;1;1;0;0;1;0;1;0;0];;

(* util *)
let join list = 
  (String.concat "" (List.map string_of_int list));;

let print_list list =
   printf "%s\n" (join list);;

let take n l =
  let rec aux n l output = 
    if n == 0 || List.length l == 0 then 
      List.rev output 
    else
      aux (n - 1) (List.tl l) ((List.hd l)::output)
   in aux n l [];;

let invert = function
   | 1 -> 0
   | 0 -> 1
   | _ -> failwith "expected 1 or 0";;

(* TODO functional way to do this *)
let pairs list =
  let result = Array.make (List.length list / 2) (0, 0) in
  for i = 0 to (Array.length result) - 1 do
    result.(i) <- ((List.nth list (2 * i)), (List.nth list (2 * i + 1)))
  done;
  Array.to_list result

(* task logic *)

(* Call the data you have at this point "a".
 * Make a copy of "a"; call this copy "b".
 * Reverse the order of the characters in "b".
 * In "b", replace all instances of 0 with 1 and al 1s with 0.
 * The resulting data is "a", then a single 0, then "b". *)
let step a =
  let b = List.map invert (List.rev a) in 
  List.append a (0::b);;

let rec fill_disk a = 
  if List.length a < length then
    fill_disk (step a)
  else
    take length a;;

let checksum_term pair =
  if (fst pair) == (snd pair) then 1 else 0;;
  
let rec checksum data =
  let this_checksum = List.map checksum_term (pairs data) in
  if List.length this_checksum mod 2 == 0 then
    checksum this_checksum
  else
    this_checksum;;

(* go! *)
let main =
  input
  |> fill_disk
  |> checksum
  |> print_list

(*print_list (checksum [1;1;0;0;1;0;1;1;0;1;0;0])*)