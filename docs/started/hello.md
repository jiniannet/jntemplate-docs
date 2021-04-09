# Hello World

This article teaches you how to create and run a "Hello World!" .NET app.

## Create an application

First, download and install the .NET SDK on your computer.

Next, open a terminal such as PowerShell, Command Prompt, or bash. Enter the following dotnet commands to create and run a C# application:

```bash
dotnet new console --output sample
cd sample
dotnet add package JinianNet.JNTemplate
notepad Program.cs
```

Open Program.cs：

```csharp
using System;
using JinianNet.JNTemplate;

namespace sample
{
    class Program
    {
        static void Main(string[] args)
        {
            var template = Engine.CreateTemplate("Hello $name!");
            template.Set("name","World");
            template.Render(Console.Out);
        }
    }
}

```

Saves and Run:

```bash
dotnet run
```

Output：`Hello World!`

Congratulations! You've created a jntemplate application.


## Next steps

For more usage ，See [Tag & Syntax](tags/tag.md) 。
