# Complex Tag
A tag composed of multiple tags.


## Layout
`${ layout(path)}` or `$layout(path)` - like ASP.NET Web Forms Masterpage.

**example (parent.html):**
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
**example(child.html):**
```html
$layout("parent.html")
<p>i'm child!</p>
```

**output:**
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

::: warning
Applies to v1.4.0+
:::

## IF
If statement in jntemplate is used to evaluate a set of statements conditionally based on an expression that evaluates to true or false.

**example**

```csharp
var  templateContent = @"
$if(value>5)
    value is greater than 5.
$elif(value<5)
    value less than 5.
$else
    value equals 5.
$end
";
var template = Engine.CreateTemplate(templateContent);
template.Set("value", 10);
var result = template.Render();
Assert.AreEqual("value is greater than 5.", result);
```

## Foreach
Iteration is achieved by using the foreach binding on the element you wish to iterate.

```js
$foreach(child in list)，
...
$end
```

or

```js
$for(child in list)，
...
$end
```

The list must implement the `IEnumerable` interface. And ends with `$end`.


**example**
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

**output:**
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

::: tip
The list must implement the `IEnumerable` interface.
:::

## For
The for statement executes a statement or a block of statements while a specified Boolean expression evaluates to true.
```js
$for(initializer; condition; iterator)
...
$end
```


**example**
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

**output**
```html
<ul>
<li>1</li>
<li>2</li>
<li>3</li>
</ul>
```


## Set
`$(set key=value)`  - Used to define a variable or change the value of a specified variable. 

**example**
```csharp
var templateContent = "$set(id=10)$id";
var template = Engine.CreateTemplate(templateContent);
var result = template.Render();
Assert.AreEqual("10", render);
```

::: warning
You can only assign values to variables, not attributes or fields. 
:::

## Load
`$load(path)` - The  tag is used to load the specified template and parse the template content. 

**example：header.html：**

```html
<p>hello,$name</p>
```

**code**
```csharp
var templateContent = "$load(\"header.html\")";
var template = Engine.CreateTemplate(templateContent);
template.Set("name","jntemplate");
var result = template.Render();
```

**output:**
```html
<p>hello,jntemplate</p>
```

## Include
`$include(path)` - The tag is used to load the specified template, but does not parse the template content. 

**example：header.html：**

```html
<p>hello,$name</p>
```

**code**
```csharp
var templateContent = "$load(\"include.html\")";
var template = Engine.CreateTemplate(templateContent);
template.Set("name","jntemplate");
var result = template.Render();
```

**output:**
```html
<p>hello,$name</p>
```