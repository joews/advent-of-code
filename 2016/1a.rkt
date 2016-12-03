#lang racket
; My first Racket program
; this is probably bad racket.

(define (parse step)
  (let ([dir (string-ref step 0)]
        [distance (string->number (substring step 1))])
    (list dir distance)))

(define (get-heading dir last-heading)
  (define raw
    (match dir
      [#\L (+ last-heading 1)]
      [#\R (- last-heading 1)]))
  (modulo raw 4))

(define (get-x heading last-x distance)
  (match heading
    [1 (+ last-x distance)]
    [3 (- last-x distance)]
    [_ last-x]))

(define (get-y heading last-y distance)
  (match heading
    [0 (+ last-y distance)]
    [2 (- last-y distance)]
    [_ last-y]))

(define (walk steps)
  (define-values (x y _)
    (for/fold
        ([x 0] [y 0] [heading 0])
        ([step steps])
      (match-define (list dir distance) step)
      (let* ([next-heading (get-heading dir heading)]
             [next-x (get-x next-heading x distance)]
             [next-y (get-y next-heading y distance)])
        (values next-x next-y next-heading))))
    (+ (abs x) (abs y))
  )

;;;; input
(define input "R3, L5, R1, R2, L5, R2, R3, L2, L5, R5, L4, L3, R5, L1, R3, R4, R1, L3, R3, L2, L5, L2, R4, R5, R5, L4, L3, L3, R4, R4, R5, L5, L3, R2, R2, L3, L4, L5, R1, R3, L3, R2, L3, R5, L194, L2, L5, R2, R1, R1, L1, L5, L4, R4, R2, R2, L4, L1, R2, R53, R3, L5, R72, R2, L5, R3, L4, R187, L4, L5, L2, R1, R3, R5, L4, L4, R2, R5, L5, L4, L3, R5, L2, R1, R1, R4, L1, R2, L3, R5, L4, R2, L3, R1, L4, R4, L1, L2, R3, L1, L1, R4, R3, L4, R2, R5, L2, L3, L3, L1, R3, R5, R2, R3, R1, R2, L1, L4, L5, L2, R4, R5, L2, R4, R4, L3, R2, R1, L4, R3, L3, L4, L3, L1, R3, L2, R2, L4, L4, L5, R3, R5, R3, L2, R5, L2, L1, L5, L1, R2, R4, L5, R2, L4, L5, L4, L5, L2, L5, L4, R5, R3, R2, R2, L3, R3, L2, L5")
(define steps
  (map parse
    (string-split input ", ")))

;;;; run
(walk steps)
