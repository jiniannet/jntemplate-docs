---
layout: en-home
---
### Features:
- Easy to learn
- Easy to use
- Easy to expand
- 100% free

### Quickstart

**Get it on NuGet!**
```
PM> Install-Package JinianNet.JNTemplate

```
or
```
> dotnet add package JinianNet.JNTemplate
```




**Building the source**
```

git clone https://github.com/jiniannet/jntemplate.git
```

Windows:After cloning the repository, run build/build.win.bat

Mono:After cloning the repository, run build/build.mono.sh

  
  
**Configuration**

You can configure JNTemplate with the EngineConfig class.
```c#
var conf = Configuration.EngineConfig.CreateDefault();
// .. configure your instance
Engine.Configure(conf);
```

**Basic Example**

template code(index.html):
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>JNTemplate deomo</title>
  </head>
  <body>
      hello,$name!
  </body>
</html>


```

c# code:

```c#
var template = (Template)Engine.LoadTemplate("C:\\wwwwroot\index.html");
\\(Template)Engine.CreateTemplate("hello,$name!");
template.Set("name", "JNTemplate");
var result = template.Render(); 
```

output:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>JNTemplate deomo</title>
  </head>
  <body>
      hello,JNTemplate!
  </body>
</html>


```

### API
[click here](api.html)
