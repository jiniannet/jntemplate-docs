# Quick Start

1. You can create a template from a file quickly with `Engine.LoadTemplate(...)`, or from the specified template content with `Engine.CreateTemplate(...)`.
2. Assign values to the template with `ITemplate.Set(...)`.
3. Call `ITemplate.Render(...)` to get the rendered result.

**Example**:

Template file default.html:

```html
<p>Hello, $name</p>
```

Back-end code:

```csharp
var template = Engine.LoadTemplate("c:\\default.html");
template.Set("name","jntemplate");
var result = template.Render();
```

Or:

```csharp
var template = Engine.CreateTemplate("<p>Hello, $name</p>");
template.Set("name","jntemplate");
var result = template.Render();
```

output:

```html
<p>Hello, jntemplate</p>
```




**Note**
***

You can get the generated text directly through the extension method `template.Render()`, or write it straight to an output stream with `template.Render(TextWriter:writer)`, for example:

- In a console application

```csharp
var template = Engine.CreateTemplate("<p>Hello, $name</p>");
template.Set("name","jntemplate");
template.Render(Console.Out);
```

- In WebForms

```csharp
var template = Engine.CreateTemplate("<p>Hello, $name</p>");
template.Set("name","jntemplate");
template.Render(Response.Output);
```




**An even more concise way**

Since `v2.2.5`, JNTemplate supports the more concise `Engine.Parse` syntax, which is convenient in .NET Minimal APIs.

The supported object can be a dictionary `IDictionary<string, object>`, for example:

**Sample code**:
```csharp
var result = Engine.Parse($"hello,$name", new Dictionary<string, object>{
    { "name","jntemplate"},
});
```
**Output**:
```bash
hello,jntemplate
```

Or an anonymous object:

**Sample code**:
```csharp
var result = Engine.Parse($"hello,$UserName", new {
    UserName = "jntemplate"
});
```
**Output**:
```bash
hello,jntemplate
```

Or any other custom class. By default a regular class can be accessed by its class name, while generic or other special classes can be accessed through `$Model`:

**Sample code**:
```csharp
var result = Engine.Parse($"hello,$User.UserName", new User { 
    UserName = "jntemplate"
});
```

If you prefer the early style, in which every object is accessed through `$Model`, you can achieve it with the following configuration:


**Configuration code**:
```csharp
// Note: this only needs to be configured once globally; you can also rename it to any name you like
Engine.Configure(o => o.ModelName = "Model"); 
```
