# Quick Start

## create template from file

**Example**：

default.html

```html
<p>hello,$name</p>
```

c# code

```csharp
var template = Engine.LoadTemplate("c:\\default.html");
template.Set("name","jntemplate");
var result = template.Render();
```

output:

```html
<p>hello,jntemplate</p>
```

## create template from text

```csharp
var template = Engine.CreateTemplate("<p>hello,$name</p>");
template.Set("name","jntemplate");
var result = template.Render();
```

output:

```html
<p>hello,jntemplate</p>
```
