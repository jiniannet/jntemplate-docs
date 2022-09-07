# Tags

The jntemplate tag is meant to provide the easiest, simplest, and cleanest way to incorporate dynamic content in a web page. tag uses references to embed dynamic content in a web site, and a variable is one type of reference. Variables are one type of reference that can refer to something defined in the c# code, or it can get its value from a tag statement in the web page itself. 


Tags are indicated by the `${` and `}`(shorthand: start with $).`${user.Name}` is a tag, as is `$user.Name`. 

Since the `$` character  indicates the start of dynamic code, to include it in your plain text, simply escape it using `${"$"}`. 