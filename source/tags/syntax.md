# Syntax
## Variables

`${variable}` or `$variable` - plain variable. Outputs `variable` variable in current context

The shorthand notation of a variable consists of a leading "$" character followed by a Identifier. A Identifier must start with an alphabetic character (a .. z or A .. Z). The rest of the characters are limited to the following types of characters:

- alphabetic (a .. z, A .. Z)
- numeric (0 .. 9)
- underscore ("_")

**example：**

```csharp
var templateContent = "hello ${name}";
var template = Engine.CreateTemplate(templateContent);
template.Set("name","jntemplate");
var result = template.Render();
Assert.AreEqual("hello jntemplate", render);
```
**output**
```txt
hello jntemplate
```

## Property & Field

`${object.Name}` or `$object.Name` - object property or field. Outputs `Name` property(field) in `object`

**example 1：**

```csharp
var templateContent = "hello ${model.Name}";
var template = Engine.CreateTemplate(templateContent);
template.Set("model",new SiteInfo {  Name = "jntemplate" });
var result = template.Render();
```
**output**
```txt
hello jntemplate
```

**example 2(static property)：**
```csharp
var templateContent = "${DateTime.Now}";
var template = Engine.CreateTemplate(templateContent);
template.SetStaticType("DateTime", typeof(DateTime));
var result = template.Render();
```

**output**
```txt
2022/9/4 00:00:00
```
::: warning
does not support access to anonymous object properties .
:::


## Function & Method
A method is defined in the c# code and is capable of doing something useful, like running a calculation or arriving at a decision.

### Instance Method

 `${ obj.method(parameter1,parameter2....) }` or `$obj.method(parameter1,parameter2....)` - You can call methods of object
 
---
 
 **example 1：**
```csharp
var templateContent = "${help.Test(\"hello\")}";
var template = Engine.CreateTemplate(templateContent);
template.Set("help", new TestHelper());
var result = template.Render();
```

 **TestHelper.cs**

```csharp
using System;

namespace Example
{
    /// <summary>
    /// 
    /// </summary>
    public class TestHelper
    {
        public string Test(string pre)
        {
            return pre + " jntemplate";
        }
    }
}
```

 **output**
```txt
hello jntemplate
```

### Type Method(Static Method)
 `${ type.method(parameter1,parameter2....) }` or `$type.method(parameter1,parameter2....)` - You can call methods of type(static method):
 
---
 **example 2：**
```csharp
var templateContent = "${string.Concat(\"hello\",\" jntemplate\")}";
var template = Engine.CreateTemplate(templateContent);
template.SetStaticType("string", typeof(string));
var result = template.Render();
```

 **output**
```txt
hello jntemplate
```

### Delegate
 `${ func(parameter1,parameter2....) }` or `$func(parameter1,parameter2....)`  - invoking the delegate. 

---
 **example 3：**
```csharp
var templateContent = "${add(8,-2)}";
var template = Engine.CreateTemplate(templateContent);
template.Set<Func<int, int, int>>("add", (x, y) =>
{
    return x + y;
});
var result = template.Render();
```

 **output**
```txt
6
```


## Indexing
 `${ arr[index] }` or `$arr[index]`  - Indexing use [] syntax and evaluate to a byte in a string, an element in a array, a value in a dictionary

**example 1（dictionary）：**
```csharp
var templateContent = "${dict[\"name\"]}";
var template = Engine.CreateTemplate(templateContent);
var dic = new System.Collections.Generic.Dictionary<string, string>();
dic["name"] = "jntemplate";
dic["age"] = "1";
template.Set("dict",dict);
var result = template.Render();
```

 **output**
```txt
jntemplate
```

**example 2（array）：**
```csharp
var templateContent = "${arr[0]}";
var template = Engine.CreateTemplate(templateContent);
template.Set("arr",new int[] { 1, 2, 3 });
var result = template.Render(); 
```
 **output**
```txt
1
```

## Set
`$set(name=value)` or `${set(name=value)}`  - The set tag allows you to define a variable in the current context, whether it currently exists or not.

```html
$set(userName = "jntemplate")
$set(value=getUser())
$set(id=45)
```

The left hand side of the assignment must be a variable reference . 

**example：**

```csharp
var templateContent = @"
$set(input = ""jntemplate"")
you input: $input
";
var template = Engine.CreateTemplate(templateContent);
var result = template.Render(); 
```

 **output**
```txt
you input: jntemplate
```


## Conditionals
Conditions support the typical `if`, `elseif` OR `elif` and `else` statements.

### if
You can branch inside templates depending on a condition using if:

**example ：**
```csharp
var templateContent = @"
$if(3<5)
3<5:right
$end
";
var template = Engine.CreateTemplate(templateContent);
var result = template.Render(); 
```
 **output**
```txt
3<5:right
```
### if / else
You may provide an else block when using if:

**example ：**
```csharp
var templateContent = @"
$if(3>5)
3>5:right
$else
3>5:error
$end
";
var template = Engine.CreateTemplate(templateContent);
var result = template.Render(); 
```
 **output**
```txt
3>5:error
```

### if / elseif(elif)
You can test for another condition using `elseif` or `elif`:

**example ：**
```csharp
var templateContent = @"
$if(user.Name==\"duthie\")
Hello duthie.
$elif(user.Name==\"biber\")
Hello biber.
$else
Hello everybody.
$end
";
var template = Engine.CreateTemplate(templateContent);
template.Set("user",new User {  Name = "biber" });
var result = template.Render(); 
```

**output**
```txt
Hello duthie.
```

## Includes
`$include(path)` or `${include(path)}`- You can either include other templates but does not parse the template content. 

**example：**
**header.html**
```html
<p>hello,$name</p>
```

**code**
```csharp
var templateContent = "$include(\"include.html\")";
var template = Engine.CreateTemplate(templateContent);
template.Set("name","jntemplate");
var result = template.Render();
```

**output:**
```html
<p>hello,$name</p>
```

## Load
`$load(path)` or `${load(path)}`- You can either include other templates. 

**example：**
**header.html**
```html
<p>hello,$name</p>
```

**code**
```csharp
var templateContent = "$include(\"include.html\")";
var template = Engine.CreateTemplate(templateContent);
template.Set("name","jntemplate");
var result = template.Render();
```

**output:**
```html
<p>hello,jntemplate</p>
```

## Iteration
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

::: warning
The list must implement the `IEnumerable` interface.
:::

## Arithmetic
Basic arithmetic operators are supported: `+`, `-`, `*`, `/`, `%`

**example：**
```csharp
var templateContent = "the result:${3 + 5 * 10}";
var template = Engine.CreateTemplate(templateContent);
var result = template.Render();
```

 **output**
```txt
the result:53
```

**String concatenation**
```
var templateContent = "the result:${3 + 5 * 10}";
var template = Engine.CreateTemplate(templateContent);
var result = template.Render();
```
    
### Logical operators
    
The following operators are supported:

`&&`: and

`||`: or 

`==`: equal

`!=`: not equal

`>`: greater than

`>=`: greater than or equal (= not less than)

`<`: less than

`<=`: less than or equal (= not greater than)
