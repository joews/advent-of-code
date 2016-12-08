# With some help from Reddit I figured out how to do this without
# negative backreferences.

# 1. perl: change aaaa -> aa a to avoid treating it as an abba
# 2. grep: filter out any lines that match abba inside square brackets. There
#    may be more than one set on a line, so enforce open/closing.
# 3. grep: match the remaining abba patterns
cat input/7.txt | perl -pe 's/(.)\1\1/\1 \1/' | ggrep -Pv '\[[^\[\]]*?(.)(.)\2\1[^\[\]]*?\]' | ggrep -P '(.)(.)\2\1' | wc -l
