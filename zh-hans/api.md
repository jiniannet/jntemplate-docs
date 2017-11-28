---
layout: zh-page
---

# 语法说明
在介绍极念模板引擎（JNTemplate 下文简称引擎）的语法时，我们会用到标签这个概念，在本文档中，标签指的是用来包含模板代码的语法块，在解析完成后，该语法块将会被替换成具体的数据。 
引擎标签根据写法可分为完整标签与简写标签二种（标签前后缀是可以进行配置修改的，本处仅以默认配置为例）：

- 完整标签：使用${做为标签开头并以}结尾，如：${tagName} 
- 简写标签：以$开头，以空白字符结尾，如：$tagName

在通常情况下，绝大部分标签都可以使用简写标签，简写标签看起来会更加简洁。但是在以下情况下，标签不能简写：

- 算术表达式必须使用完整标签
- 标签结尾处是英文句号，英文或者数字时必须使用完整标签。如${siteUrl}.com 不能简写为$siteUrl.com

根据类型标签又可以分为普通标签与块标签：

- 普通标签：有且仅有一个标签（单标签），主要有变量，属性，方法，包含，赋值等标签。
- 块标签：由多个普通标签组成，通常使用${end}结尾。主要有循环，判断等标签。

在极念模板引擎中，所有对象名，方法名，属性名均尊循以下规则：即只能使用字母，数字与下划线的组合，且必须以字母开头。

该文档适用于1.3以上版本，1.2版本基本相同。

## 变量:

>${title} 或 $title - 简单变量. 输出变量“title”的值。

示例
```c#
var templateContent = "hello,${title}";
var template = (Template)Engine.CreateTemplate(templateContent);
template.Set("title", "JNTemplate");
var result = template.Render();
//输出结果： "hello,JNTemplate"
```

## 属性:
>${model.Name} 或 $model.Title - 对像属性.获取对象“model”的属性“Title”值。

注意：当前版本中引擎默认（包括官方发行版）不支持字段读取。如需支持字段，需要自行构建。

示例
```c#
var templateContent = "hello,${model.Name}";
var template = (Template)Engine.CreateTemplate(templateContent);
template.Set("model", new {
                Name="JNTemplate",
                Url="http://www.jiniannet.com",
                License="Apache License 2.0"
            });
var result = template.Render();
//输出结果： "hello,JNTemplate"
```

## 算术表达式:
>${ expressions } -  支持加减乘除及取余等(+,-,*,/,%)运算符

示例
```c#
var templateContent = "(3+15)/2 = ${(3+15)/2}";
var template = (Template)Engine.CreateTemplate(templateContent);
var result = template.Render();
//输出结果： "(3+15)/2 = 9"
```

## 方法
>${helper.query(parameter1,parameter2,...)} or $helper.query(parameter1,parameter2,...) - 调用方法，支持调用对象实例方法或者FuncHandler委托（引擎内置），但是不支持静态方法。

示例1（调用实例方法）

Helper类代码:
```c#
public class Helper
{
    public string Show(string name, string url,string license)
    {        return string.Format("product name:{0},url:{1},license:{2}", name, url,license);
    }
}

```

后台代码:
```c#
var templateContent = "$helper.Show(name,model.Url,\"Apache License 2.0\")";
var template = (Template)Engine.CreateTemplate(templateContent);
template.Set("helper", new Helper());
template.Set("name", "JNTemplate");
var result = template.Render();

//输出结果： "product name:JNTemplate,url:http://www.jiniannet.com,license:Apache License 2.0" 
```

示例2（调用DateTime的ToString格式化日期）

后台代码:
```c#
var templateContent = "$now.ToString(\"yyyy-MM-dd\")";//当前日期为2017/09/09
var template = (Template)Engine.CreateTemplate(templateContent);
template.Set("now", DateTime.Now);
var result = template.Render();

//输出结果： "2017-09-09" 
```

示例3（委托方法）
```c#
var templateContent = "$input(\"parameter1\",\"parameter2\")";
var template = (Template)Engine.CreateTemplate(templateContent);
template.Set("input", new FuncHandler(args =>
{
    var sb = new  StringBuilder();
    sb.Append("your input:");
    foreach (var node in args)
    {
        sb.Append(node);
        sb.Append(" ");
    }
    return sb.ToString();
}));
var result = template.Render();

//输出结果： "your input:parameter1 parameter2"
```

## 加载文件:
>${load("filename.html")} or $load("filename.html")-  将指定文件“filename.html”进行解析并加载到当前模板中,与当前模板共用模板上下文及数据。该标签支持子目录，路径分隔符为不管是windows还是linux统一使用“/”。

注意：该标签必须为模板上下文指定当前路目录属性“CurrentPath”或者在配置项中指定模板工作目录“ResourceDirectories”才能正常使用。如果使用Engine.LoadTemplate创建的实例 ，则会自动指定当前目录。

示例
public/header.html代码
```html
<nav>
  <ul>
      <li><a href="${model.SiteUrl}">${model.SiteTitle}</a></li>
  </ul>
</nav>
```

index.html代码
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>JNTemplate deomo</title>
  </head>
  <body>
      ${load("public/header.html")}
  </body>
</html>

```

C#代码
```c#
var template = (Template)Engine.LoadTemplate("C:\\wwwwroot\index.html");
template.Set("model", new {
                model.SiteTitle="JNTemplate",
                SiteUrl="http://www.jiniannet.com" 
            });
var result = template.Render
```

输出结果：
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>JNTemplate deomo</title>
  </head>
  <body>
	<nav>
	  <ul>
		  <li><a href="http://www.jiniannet.com">JNTemplate</a></li>
	  </ul>
	</nav>
  </body>
</html>

```

 
 
## 包含文件:
>${include("filename.html")} or include("filename.html")-  用法及注意事项等同load，不同的是该文件内如果存在模板标签不会进行解析，只会简单的将内容包含进来。


## 逻辑判断:
>${ if(expressions1) }...code1..${elseif(expressions1)}...code2..{else}...code3..${end} -  逻辑判断，如果expressions1成立，呈现code1,如果expressions2成立，则呈现code2,都不成立则呈现code3.支持以下运算符：&#124;&#124;(逻辑或);&&(逻辑与);&gt;(大于);&lt;（小于）;&gt;=（大于等于）;&lt;=（小于等于）;!=（不等于）==(等于)

注意：表达式如果不包含逻辑运算符时（如：if(id),if(true),if(150)），遵循规则如下：

- 布尔类型 (true/false)直接取值;
- 数字，0表示false，其它表示true;
- 字符串，空或者为null表示false，其它表示true;
- 对象，null表示false，其它表示true。

如果需要判断对象是否为空，只需要简单$if(obj)即可。
elseif与else没有内容时可以省略。

示例
```c#
var templateContent = 
@"
${if((10%2)==0)} 
	10能被2整除 
${else} 
	10不能2被整除 
${end}";
var template = (Template)Engine.CreateTemplate(templateContent);
var result = template.Render();
//输出结果： "10能被2整除"
```

## 循环:
>${ foreach(itemName in list) }...${end} -  foreach标签用于循环访问集合以获取所需信息，使用方法与要求均与c#中的foreach一致，凡是所有实现了 System.Collections.IEnumerable接口的对象都可以遍历，包括数组，List<T>，DataTable.Rows等。itemName为新创建的变量，命名可自定义。（使用JS的用户需要注意foreach in与js中的for in是不同的）

注意：该标签体内存在内置变量foreachIndex，起始值为1。

示例
```c#
var templateContent = @"
<ul>
${foreach(book in books)}
	${if((foreachIndex%2)==0)}
	<li>${foreachIndex}、 ${book}</li>
	${else}
	<li style=""background-color:#ccc"">${foreachIndex}、 ${book}</li>
	${end}
${end}
</ul>
";
var template = (Template)Engine.CreateTemplate(templateContent);
template.Set("books", new string[]{
                "Tales of the City",
				"The Serial",
				"East of Eden",
				"Island of the Blue Dolphins"
            });
var result = template.Render();
```

输出结果：
```html
<ul>
	<li style="background-color:#ccc">1、 Tales of the City</li>
	<li>2、 The Serial</li>
	<li style="background-color:#ccc">3、 East of Eden</li>
	<li>4、 Island of the Blue Dolphins</li>
</ul>
```

## 赋值:
>${ set(varName=itenValue)} -  改变变量的值，不存在则创建

注意：不支持为属性赋值，如果在循环体内（foreach）使用该标签 ，需要注意作用域，在循环体创建的变量，离开循环后将会回收，如果是在循环体内改变的变量，循环结束后依然有效（即变量在循环前已经存在，改变会保存，如果是在循环中创建的，离开循环会失效）。

示例
```c#
var templateContent = "${set(value=(3+5)))}value的值是${value}";
var template = (Template)Engine.CreateTemplate(templateContent);
var result = template.Render();
//输出结果： "value的值是8"
```

其它更多详细用法，可以参考：JinianNet.JNTemplate.Test。
