# Basic Tags
A basic tag consists of exactly one tag, and all code is contained between the tag prefix `${` and the tag suffix `}`.

## Variable tag (properties, fields)
Variable Tag, syntax: `${ variableName }`
- Renders an object set from the back end, e.g. `$name`
- Renders a property of the specified object, e.g. `$model.UserName`
- Renders a field of the object, e.g. `$data.Version`

A variable tag is a child tag. When the parent object is empty it behaves as an ordinary variable tag; when a parent object exists it refers to a property or field of that object. For example, in `$model.UserId`, `model` is the parent tag of this tag, and `UserId` is a special variable tag that can be either a property or a field (fields are not supported by default in version 1.x).


**Example 1 — render a variable:**

```csharp
var templateContent = "hello $name";
var template = Engine.CreateTemplate(templateContent);
template.Set("name","jntemplate");
var result = template.Render();
Assert.AreEqual("hello jntemplate", result);
```

**Example 2 — access an instance property:**

```csharp
var templateContent = "hello $model.Name";
var template = Engine.CreateTemplate(templateContent);
template.Set("model",new SiteInfo {  Name = "jntemplate" });
var result = template.Render();
Assert.AreEqual("hello jntemplate", result);
```

**Example 3 — access a static property:**
```csharp
var templateContent = "${DateTime.Now.ToString(\"yyyy-MM-dd\")}";
var template = Engine.CreateTemplate(templateContent);
template.SetStaticType("DateTime", typeof(DateTime));
var result = template.Render();
Assert.AreEqual(DateTime.Now.ToString("yyyy-MM-dd"), result);
```
:::: warning
Only compiled versions support fields by default.

Earlier versions did not allow anonymous objects in compile mode.
::::

## Function tag

Function Tag, syntax: `${ functionName(arg1,arg2....) }`.
- Calls a back-end instance method
- Calls a back-end static method (2.0+)
- Calls a back-end delegate method

A function tag is a child tag. When the parent object is empty only delegate methods are allowed, e.g. `$test(1,2,3)`; when the parent object is not empty there is no restriction, e.g. `${date.ToString("yyyy-MM-dd")}`.

**Example 1 — call an instance method:**
```csharp
var templateContent = "$fun.Test(\"your input\")";
var template = Engine.CreateTemplate(templateContent);
template.Set("fun", new TestHelper());
var result = template.Render();
Assert.AreEqual("output：your input", result);
```

**Example 2 — call a delegate method:**
```csharp
var templateContent = "$add(8,-2)";
var template = Engine.CreateTemplate(templateContent);
template.Set<Func<int, int, int>>("add", (x, y) =>
{
    return x + y;
});
var result = template.Render();
Assert.AreEqual("6", result);
```

**Example 3 — call a static method:**
```csharp
var templateContent = "${string.Concat(\"str1\",\"str2\")}";
var template = Engine.CreateTemplate(templateContent);
template.SetStaticType("string", typeof(string));
var result = template.Render();
Assert.AreEqual("str1str2", result);
```

:::: warning
In versions v1.1 - v1.3 a delegate can only be a `FuncHandler`; from 1.4 on it can be any delegate.
::::

## Index tag
IndexValue Tag, syntax `${ parentObject[index]}`
- Accesses arrays, `List` and similar objects
- Accesses dictionaries
- Accesses any other object that implements an indexer

An index tag is a child tag, so the parent object cannot be empty: `$[i]` is invalid, only `$list[i]` works.

**Example 1 — dictionary:**
```csharp
var templateContent = "$dict[\"name\"]";
var template = Engine.CreateTemplate(templateContent);
var dict = new System.Collections.Generic.Dictionary<string, string>();
dict["name"] = "jntemplate";
dict["age"] = "1";
template.Set("dict",dict);
var result = template.Render();
Assert.AreEqual("jntemplate", result);
```

**Example 2 — array:**
```csharp
var templateContent = "$arr[0]";
var template = Engine.CreateTemplate(templateContent);
template.Set("arr",new int[] { 1, 2, 3 });
var result = template.Render();
Assert.AreEqual("1", result);
```

:::: tip
Indexing is supported only in 1.4 and later. In versions before 1.4 you can access the value with a variable tag: `$row["name"]` could be written as `$row.name` or `$row.get_Item("name")` in older versions.
::::

## Logical expression tag

Logic Tag, syntax: `${ logicalExpression }`.
A logical expression tag is a basic tag that supports logical operations and is usually used together with the IF tag (see the IF tag).
The following logical operators are supported: greater than (`>`), less than (`<`), greater than or equal to (`>=`), less than or equal to (`<=`), equal (`==`), not equal (`!=`), or (`||`) and and (`&&`).

**Example**
```csharp
var templateContent = "${3==8}";
var template = Engine.CreateTemplate(templateContent);
var result = template.Render();
Assert.AreEqual("False", result);
```

## Arithmetic expression tag
Arithmetic Tag, syntax: `${ arithmeticExpression }`.
An arithmetic expression tag is a basic tag used for arithmetic operations.
It supports five operators — addition (`+`), subtraction (`-`), multiplication (`*`), division (`/`) and modulo (`%`) — as well as parentheses.

**Example**
```csharp
var templateContent = "${(8+2)*10)}";
var template = Engine.CreateTemplate(templateContent);
var result = template.Render();
Assert.AreEqual("100", result);
```

## Array tag
Array Tag, syntax: `${ {1,2,3,4,5...} }`

An array tag is a group of constants enclosed in braces, with multiple objects separated by English commas, e.g. `{1,2,3,4}`. Array elements currently support only numbers, characters and booleans. The corresponding back-end type is `Object[]`.

**Example:**

```csharp
var templateContent = @"
$set(arr={7,0,2,0,6})
$for(i in arr)
$i
$end
";
var template = Engine.CreateTemplate(templateContent);
var result = template.Render();
Assert.AreEqual("70206", result.Replace("\r\n",""));
```

## Reference tag
Reference Tag, syntax: `${ tag1.tag2 }`

A reference tag is a basic tag. It is usually made up of several tags — field, property, index and method — combined together, but still inside a single tag.

For example, `${ test().Id }` is composed of a function tag (`test()`) and a property (`Id`).

**Example**
```csharp
var templateContent = "$date.Year.ToString().Length";
var template = Engine.CreateTemplate(templateContent);
template.Set("date",DateTime.Now);
var result = template.Render();
Assert.AreEqual("4", result);
```



## Boolean tag
Boolean Tag, syntax: `${ true/false }`
The value can only be one of the following:
- true
- false

A boolean tag is a special tag, usually used together with logical expression tags or the IF tag.

**Example:**
```csharp
var templateContent = "${true}";
var template = Engine.CreateTemplate(templateContent);
var result = template.Render();
Assert.AreEqual("True", result);
```

## End tag
End Tag, syntax: `${ end }`

The end tag is a special tag, usually used to mark the end of a complex tag. It must be used together with other tags and cannot stand alone.

See the `for` tag, the `foreach` tag or the `if` tag for details.


## Placeholder tag
Body Tag, syntax: `${ body }`

The placeholder tag is a special tag used as the placeholder for the Layout tag. It can only be used with the Layout tag: during rendering, the child page content replaces this tag. See the `Layout` tag for usage.


## Null tag
Null Tag, syntax: `${null}`

The null tag is a special tag that represents an empty object. It is usually used with logical expressions or the IF tag, e.g. `$if(model == null)`


## Number tag

Number Tag, syntax: `${number}`

The number tag is a special tag representing a decimal or an integer. By default a decimal is parsed as `double`, and an integer is parsed as `int32`; only when it exceeds the `int32` range is it parsed as `int64`, e.g. `${64.0}`


## Operator tag
Operator Tag, syntax: `${operator}`

The operator tag is a special tag that cannot stand alone and can only be used inside logical or arithmetic expressions. It can be a logical operator or an arithmetic operator; see the logic tag (LogicTag) and the arithmetic tag (ArithmeticTag) for usage.


## Text tag
Text Tag, syntax: none

The text tag is a special tag: anything not enclosed in tag delimiters is a text tag, representing static text that is not a tag. For example, in `<p>${name}</p>`, both `<p>` and `</p>` are TextTags.

A text tag is static content and does not need to be parsed.


## String tag
String Tag, syntax: `${ "string" }`

The string tag is a special tag representing a string enclosed in double quotes, e.g. `${"this is string"}`

**Example:**
```csharp
var templateContent = "${\"this is string\"}";
var template = Engine.CreateTemplate(templateContent);
var result = template.Render();
Assert.AreEqual("this is string", result);
```

::::tip
A string tag can also be used for escaping, e.g. `${"$"}`
::::


## Comment tag
Comment Tag, syntax: `$* comment content *$`

The comment tag is a special tag used for code comments; the commented content is not rendered in the output.

**Example:**
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>demo</title>
  </head>
  <body>
      $* This is a comment and is not rendered *$
  </body>
</html>
```
