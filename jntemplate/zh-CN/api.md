---
layout: jntemplate-zh-CN
---

# JNTemplate Syntax
JNTemplate的语法可分为完整标签与简写标签，完整标签格式为：${tagName} 简写格式为：$tagName，除了算术表达式必须使用完整标签外，其它大部标签都可以简写。
本模板引擎的所有对象名，方法名，属性名均尊循以下规则：即只能使用字母，数字与“_”的组合，且必须以字母开头。
该文档适用于版本1.3以上，1.2版本基本类同。

## 变量:

>${title} 或 $title - 简单变量. 输出变量“title”的值。

示例
```
var templateContent = "hello,${title}";
var template = (Template)Engine.CreateTemplate(templateContent);
template.Set("title", "JNTemplate");
var result = template.Render();
//输出结果： "hello,JNTemplate"
```

## 属性:
>${model.Name} 或 $model.Title - 对像属性.获取对象“model”的属性“”值

示例
```
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
```
var templateContent = "(3+15)/2 = ${(3+15)/2}";
var template = (Template)Engine.CreateTemplate(templateContent);
var result = template.Render();
//输出结果： "(3+15)/2 = 9"
```

## 方法
>${helper.query(parameter1,parameter2,...)} or $helper.query(parameter1,parameter2,...) - 调用方法，支持调用对象实例方法或者FuncHandler委托（引擎内置），但是支持静态方法，合理使用该标签，可以实现绝大部分功能。

示例1（调用实例方法）

Helper类代码:
```
public class Helper
{
    public string Show(string name, string url,string license)
    {        return string.Format("product name:{0},url:{1},license:{2}", name, url,license);
    }
}

```

后台代码:
```
var templateContent = "$helper.Show(name,model.Url,\"Apache License 2.0\")";
var template = (Template)Engine.CreateTemplate(templateContent);
template.Set("model", new {
                Url="http://www.jiniannet.com"
            });
template.Set("name", "JNTemplate");
var result = template.Render();

//输出结果： "product name:JNTemplate,url:http://www.jiniannet.com,license:Apache License 2.0" 
```

示例2（调用DateTime的ToString格式化日期）

后台代码:
```
var templateContent = "$now.ToString(\"yyyy-MM-dd\")";//当前日期为2017/09/09
var template = (Template)Engine.CreateTemplate(templateContent);
template.Set("$now", DateTime.Now);
var result = template.Render();

//输出结果： "2017-09-09" 
```

示例3（委托方法）
```
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
>${load("filename.html")} or $load("filename.html")-  将指定文件名“filename.html”包含到当前模板中，并与当前模板共用模板上下文及数据，如果文件在存在JNTemplate模板标签，会自动进行解析。该标签支持子目录，路径分隔符为不管是windows还是linuxx统一为“/”。

注意：该标签必须为模板上下文指定当前路目录属性“CurrentPath”或者在配置项中指定模板工作目录“ResourceDirectories”才能正常使用。如果使用Engine.LoadTemplate创建的实例 ，则会自动指定当前目录。

示例
public/header.html代码
```
<nav>
  <ul>
      <li><a href="${model.SiteUrl}">${model.SiteTitle}</a></li>
  </ul>
</nav>
```

index.html代码
```
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
```
var template = (Template)Engine.LoadTemplate("C:\\wwwwroot\index.html");
template.Set("model", new {
                model.SiteTitle="JNTemplate",
                SiteUrl="http://www.jiniannet.com" 
            });
var result = template.Render
```

输出结果：
```
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
>${ if(expressions1) }...code1..${elseif(expressions1)}...code2..{else}...code3..${end} -  逻辑判断，如果expressions1成立，呈现code1,如果expressions2成立，则呈现code2,都不成立则呈现code3.支持以下运算符：||(逻辑或);&&(逻辑与);>(大于);<（小于）;>=（大于等于）;<=（小于等于）;!=（不等于）==(等于)

注意：表达式如果不包含逻辑运算符时（如：if(id),if(true),if(150)），遵循规则如下：如果表达式为布尔类型 (true/false)直接取值；如果为数字，为0时表示false，其它为true；如果为字符串，为空或者为null时为false，其它为true；如果为其它对象，null为false，其它为true。elseif与else没有内容时可以省略。该标签体内存在内置变量foreachIndex，起始值为1（注意，起始值为1，而不是像索引一样从0开始，特别注意）

示例
```
var templateContent = "${if((10%2)==0)} 10能被2整除 ${else} 10不能2被整除 ${end}";
var template = (Template)Engine.CreateTemplate(templateContent);
var result = template.Render();
//输出结果： "10能被2整除"
```

## 循环:
>${ foreach(itemName in list) }...${end} -  foreach标签用于循环访问集合以获取所需信息，使用方法与要求均与c#中的foreach一致，凡是所有实现了 System.Collections.IEnumerable接口的对象都可以遍历，包括数组，List<T>，DataTable.Rows等。itemName为新创建的变量，命名可自定义。（使用JS的用户需要注意foreach in与js中的for in是不同的）

注意：该标签体内存在内置变量foreachIndex，起始值为1。

示例
```
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
```
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
```
var templateContent = "${set(value=(3+5)))}value的值是${value}";
var template = (Template)Engine.CreateTemplate(templateContent);
var result = template.Render();
//输出结果： "value的值是8"
```
