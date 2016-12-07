# I wanted to do this with a shell script but I can't think of a way
# without negating a backreference, which isn't possible. 
# I got this far:
#
# cat 7.txt | ggrep -Pv '\[.*(.)(.)\2\1.*\]' | ggrep -P '(.)(.)\2\1'
#
# Which incorrectly matches aaaa[qwer]tyui - it should fail because
# aaaa is not a valid abba form. I want to do something like
# (.)([^\1])\2\1 - but that isn't valid because the backreference could be
# N chars and a char class matches one. Something like it is possible with lookahead
#  but that doesn't work here because I need to consume and capture the match.
# So a script it is!

my $count = 0;
while (my $line=<>) {
	# print $line
	if ($line !~ /\[[^\[\]]*?(.)(.)\2\1[^\[\]]*?\]/) { 
		while ($line =~ /((.)(.)\3\2)/g) {
			if ($3 ne $2) {
				$count ++;
				last;
			}				
		}
	}
}

print $count