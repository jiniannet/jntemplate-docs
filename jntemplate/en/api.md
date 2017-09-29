---
layout: jnt-en-page
---

# JNTemplate Syntax
[^_^]:full Syntax: ${template} 
[^_^]:Shorthand: $template

## Variables:

>${title} or $title - plain variable. Outputs "title" variable in current context

for example
```
var templateContent = "hello,${title}";
var template = (Template)Engine.CreateTemplate(templateContent);
template.Set("title", "JNTemplate");
var result = template.Render();//outputs "hello,JNTemplate"
```

## Property:
>${model.Name} or $model.Title - object property. Outputs "Name" property in "model"

for example
```
var templateContent = "hello,${model.Name}";
var template = (Template)Engine.CreateTemplate(templateContent);
template.Set("model", new {
                Name="JNTemplate",
                Url="http://www.jiniannet.com",
                License="Apache License 2.0"
            });
var result = template.Render();//outputs "hello,JNTemplate"
```

## Expression:
>${ expressions } -  arithmetic

for example
```
var templateContent = "(3+15)/2 = ${(3+15)/2}";
var template = (Template)Engine.CreateTemplate(templateContent);
var result = template.Render();
//outputs "(3+15)/2 = 9"
```

## Method
>${helper.query(parameter1,parameter2,...)} or $helper.query(parameter1,parameter2,...) - execute method.

for example 1

class code:
```
public class Helper
{
    public string Show(string name, string url,string license)
    {
        return string.Format("product name:{0},url:{1},license:{2}", name, url,license);
    }
}
```

code:
```
var templateContent = "$helper.Show(name,model.Url,\"Apache License 2.0\")";
var template = (Template)Engine.CreateTemplate(templateContent);
template.Set("model", new {
                Url="http://www.jiniannet.com"
            });
template.Set("name", "JNTemplate");
var result = template.Render();

//outputs "product name:JNTemplate,url:http://www.jiniannet.com,license:Apache License 2.0" 
```


for example 2
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

//outputs "your input:parameter1 parameter2"
```
