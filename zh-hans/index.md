---
layout: zh-home
---

### 特点:
- 易于学习
- 易于使用
- 易于扩展
- 100%免费

### 快速开始

**您可以从NuGet获取我们的发行版本**
```
PM> Install-Package JinianNet.JNTemplate

```
或者（NET CORE）
```
> dotnet add package JinianNet.JNTemplate
```


**也可以克隆源代码自行构建**
```

git clone https://github.com/jiniannet/jntemplate.git
```

Windows:克隆完成后,运行 build/build.win.bat

Mono:克隆完成后,运行 build/build.mono.sh

  
  
**配置**

您可以使用EngineConfig类来对 JNTemplate进行配置.可配置项包括是否区分大小写，标签符号，模板工作目录等：
```c#
var conf = Configuration.EngineConfig.CreateDefault();
// .. 配置你的具体参数
Engine.Configure(conf);
```

**简单示例**

模板代码(index.html):
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

c# 代码:

```c#
var template = (Template)Engine.LoadTemplate("C:\\wwwwroot\index.html");
\\在配置中配置了模板目录的情况下，可以省略目录，如：Engine.LoadTemplate("index.html");
\\也可以这么写 (Template)Engine.CreateTemplate("hello,$name!");
template.Set("name", "JNTemplate");
var result = template.Render(); 
```

输出结果:
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

### API文档
[点击查看JNTemplate中文文档](api.html)
