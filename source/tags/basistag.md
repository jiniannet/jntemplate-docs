# Basis Tags
Single tag, all codes are contained between `${` and `}`.

## Variables
`${variable}` or `$variable` - plain variable. Outputs `variable` variable in current context

**example：**

```csharp
var templateContent = "hello $name";
var template = Engine.CreateTemplate(templateContent);
template.Set("name","jntemplate");
var result = template.Render();
Assert.AreEqual("hello jntemplate", render);
```

## Property & Field
`${object.Property}` or `$object.Property` - object property or field. Outputs `property` property in `object`

**example 1：**

```csharp
var templateContent = "hello $model.Name";
var template = Engine.CreateTemplate(templateContent);
template.Set("model",new SiteInfo {  Name = "jntemplate" });
var result = template.Render();
Assert.AreEqual("hello jntemplate", render);
```

**example 2(static property)：**
```csharp
var templateContent = "${DateTime.Now}";
var template = Engine.CreateTemplate(templateContent);
template.SetStaticType("DateTime", typeof(DateTime));
var result = template.Render();
Assert.AreEqual("str1str2", result);
```

::: warning
does not support access to anonymous object properties .
:::

## Function

 `${ function(parameter1,parameter2....) }` or ``$function(parameter1,parameter2....)``
- execute instance method
- execute static method
- execute delegate

**example 1(instance method)：**
```csharp
var templateContent = "$fun.Test(\"hello\")";
var template = Engine.CreateTemplate(templateContent);
template.Set("fun", new TestHelper());
var result = template.Render();
Assert.AreEqual("input: hello", result);
```

**example 2(static method)：**
```csharp
var templateContent = "${string.Concat(\"str1\",\"str2\")}";
var template = Engine.CreateTemplate(templateContent);
template.SetStaticType("string", typeof(string));
var result = template.Render();
Assert.AreEqual("str1str2", result);
```

**example 3(delegate)：**
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

## Index
`${ array[index]}` or `$array[index]` - Indexers are a syntactic convenience that enable you to create a class, struct, or interface that client applications can access as an array.

**example 1（dict）：**
```csharp
var templateContent = "$dict[\"name\"]";
var template = Engine.CreateTemplate(templateContent);
var dic = new System.Collections.Generic.Dictionary<string, string>();
dic["name"] = "jntemplate";
dic["age"] = "1";
template.Set("dict",dict);
var result = template.Render();
Assert.AreEqual("jntemplate", render);
```

**example 2（array）：**
```csharp
var templateContent = "$arr[0]";
var template = Engine.CreateTemplate(templateContent);
template.Set("arr",new int[] { 1, 2, 3 });
var result = template.Render();
Assert.AreEqual("1", render);
```

::: tip
Applies to

v1.4.0+
:::

## Logic Expression

`${ expression }` - Logical expressions have the value true or false  and are constructed with the seven relational operators `>`, `<`, `>=`, `<=`, `==`, `!=`,`||` and `&&`.

**example**
```csharp
var templateContent = "${3==8}";
var template = Engine.CreateTemplate(templateContent);
var result = template.Render();
Assert.AreEqual("False", result);
```

## Arithmetic Expression
`${ expression }` - An arithmetic expression is a syntactically correct combination of numbers, operators, parenthesis, and variables.

**example**
```csharp
var templateContent = "${(8+2)*10)}";
var template = Engine.CreateTemplate(templateContent);
var result = template.Render();
Assert.AreEqual("100", result);
```

## Boolean
`${ true/false }` - boolean tag have the value `true` or `false`

**example**
```csharp
var templateContent = "${true}";
var template = Engine.CreateTemplate(templateContent);
var result = template.Render();
Assert.AreEqual("True", result);
```

## End
`${ end }` or `$end` - Indicates the end of the tag.

see :`for` ,`foreach` or `if`.

## Null
`${null}` - NULL objects. see :  `if`.


## Number
`${number}` -  There are two kinds of numeric values, integers (whole numbers), and real or floating point numbers (numbers containing a decimal point).

**example**
```csharp
var templateContent = "${65.2}";
var template = Engine.CreateTemplate(templateContent);
var result = template.Render();
Assert.AreEqual("True", result);
```

## String
`${ "string" }`  -  string literals

**example**
```csharp
var templateContent = "${\"this is string\"}";
var template = Engine.CreateTemplate(templateContent);
var result = template.Render();
Assert.AreEqual("this is string", render);
```