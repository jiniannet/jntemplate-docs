# Hello World

This article shows how to create and run a "Hello World!" JNTemplate application.

## Create the application

First, download and install the .NET SDK on your computer.

Then open a terminal, such as PowerShell, Command Prompt or Bash, and enter the following dotnet commands to create and run a C# application:

```bash
dotnet new console --output sample
cd sample
dotnet add package JinianNet.JNTemplate
notepad Program.cs
```

Enter the following code:

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

Close Notepad and save the file, then continue in the same terminal:

```bash
dotnet run
```

The terminal prints the final result: Hello World!

Congratulations — your first JNTemplate application is complete. Have fun!


## Next steps

To learn more, see the [Tags & Syntax](/tags/tag.md) chapter.
