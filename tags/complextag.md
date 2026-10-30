# Complex Tags
A complex tag is usually composed of one or more basic tags.


## Layout tag
Layout Tag, syntax: `${ layout("path") }`
The layout tag is similar to an ASP.NET master page. It must appear on the first line of the page.

**Example — parent page (parent.html):**
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>JNTemplate demo</title>
  </head>
  <body>
      ${body}
  </body>
</html>
```
**Example — child page (index.html):**
```html
$layout("parent.html")
<p>i'm child!</p>
```

**Output:**
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>JNTemplate demo</title>
  </head>
  <body>
      <p>i'm child!</p>
  </body>
</html>
```

:::: warning
Supported since version 1.4+. The layout tag must be declared on the top line of the template.
::::

## IF tag
IF Tag, syntax:

```js
$if(condition1)
..
$elseif(condition2)
..
$else
..
$end
```
Used for logic control. It must end with the End tag. Multiple conditions can be handled with the Elseif tag (also written `elif`). The condition can be a logical expression tag or a single object; when it is a single object it is evaluated by the following rules:

1. Number: `0` is false, otherwise true
2. String: `null` or `""` is false, otherwise true
3. Object: `null` is false, otherwise true


Example
```csharp
var  templateContent = @"
${if(value>5)}
    value is greater than 5
${elif(value<5)}
    value is less than 5
${else}
    value equals 5
${end}
";
var template = Engine.CreateTemplate(templateContent);
template.Set("value", 10);
var result = template.Render();
Assert.AreEqual("value is greater than 5", result);
```


## Elseif tag
Elseif Tag, syntax: `${ elseif("condition") }`

The Elseif tag is a child tag of the IF tag: it can only be used together with IF and cannot stand alone. From v1.4.0 it can also be shortened to `$elif(condition)`. See the `IF` tag for usage.



## Else tag
Else Tag, syntax: `${ else }`

The Else tag is a child tag of the IF tag: it can only be used together with IF and cannot stand alone. See the `IF` tag for usage.


## Iteration tag
Foreach Tag, syntax:

```js
$foreach(childObject in collection)
...
$end
```

The collection must implement the `IEnumerable` interface. Usage is similar to `foreach` in C#.

Note: objects created inside the loop body (that is, between `foreach` and `end`) cannot be accessed after the tag ends, and values set with the SET tag inside the tag body become invalid once execution leaves the tag scope.

From 1.4 on, `foreach . in .` can be shortened to `for . in .`

**Example**
```csharp
var  templateContent = @"
<ul>
$foreach(i in list)
<li>$i</li>
${end}
</ul>
";
var template = Engine.CreateTemplate(templateContent);
template.Set("list", new char[] { 'j', 'n', 't', 'e', 'm', 'p', 'l', 'a', 't', 'e' });
var result = template.Render();
```

**Output:**
```html
<ul>
<li>j</li>
<li>n</li>
<li>t</li>
<li>e</li>
<li>m</li>
<li>p</li>
<li>l</li>
<li>a</li>
<li>t</li>
<li>e</li>
</ul>
```

:::: tip
The object must implement `IEnumerable`. Pay attention to the scope.
::::

## For tag
For Tag, syntax:
```js
$for(initialization; condition; increment)
...
$end
```

The for tag must end with `end`. Note: objects created inside the loop body (that is, between `for` and `end`) cannot be accessed after the tag ends. If the condition is always true, the tag causes an infinite loop, so use it carefully, e.g. `$for(i=0;i<1;i--)`

**Example:**
```csharp
var  templateContent = @"
<ul>
$for(i=1;i<4;i++)
<li>$i</li>
${end}
</ul>
";
var template = Engine.CreateTemplate(templateContent);
var result = template.Render();
```

**Output:**
```html
<ul>
<li>1</li>
<li>2</li>
<li>3</li>
</ul>
```
:::: tip
Make sure the condition will not cause an infinite loop.
::::

## Set tag
Set Tag, syntax: `$set(name=value)`

The set tag defines a variable or changes the value of the specified variable, e.g. `$(set id=10)` or `$(set model=GetData())`

**Example:**
```csharp
var templateContent = "$set(id=10)$id";
var template = Engine.CreateTemplate(templateContent);
var result = template.Render();
Assert.AreEqual("10", result);
```

:::: warning
1. When used inside `for` and `foreach`, pay attention to the scope.

2. Only variables can be assigned; properties and fields cannot.
::::

## Load tag
Load Tag, syntax: `$load(path)`

The load tag loads the specified template page and parses its content.

**Example — template file header.html:**

```html
<p>Hello, $name</p>
```

**Back-end code**
```csharp
var templateContent = "$load(\"header.html\")";
var template = Engine.CreateTemplate(templateContent);
template.Set("name","jntemplate");
var result = template.Render();
```

**Output:**
```html
<p>Hello, jntemplate</p>
```

## Include tag
Include Tag, syntax: `$include(path)`

The include tag includes another template page. It works like the LoadTag, but the content is not parsed.

**Example — template file header.html:**

```html
<p>Hello, $name</p>
```

**Back-end code**
```csharp
var templateContent = "$include(\"include.html\")";
var template = Engine.CreateTemplate(templateContent);
template.Set("name","jntemplate");
var result = template.Render();
```

**Output:**
```html
<p>Hello, $name</p>
```
