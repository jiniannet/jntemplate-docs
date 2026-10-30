# Configuration

You can initialize the engine with the `Engine.Configure(...)` method. Configuration should be done before templates are parsed and does not need to be repeated (in ASP.NET MVC you can do it in the `Startup` class; in WebForms in `Application_Start` of `Global.asax`). The method has four overloads — choose the one that suits your scenario.

This step is optional: if you do not configure anything explicitly, the engine initializes itself with the default parameters.

## Configure tag delimiters
Tag delimiters are the tag prefix and suffix. By default they consist of three elements: the prefix `${`, the suffix `}` and the shorthand flag `$`. If you do not need the shorthand mode, disable it with the `DisableeLogogram` option. Incorrect configuration may make templates unparsable.

```csharp
Engine.Configure(c => {
    c.TagPrefix = "${";
    c.TagSuffix = "}";
    c.TagFlag = '$';
});
```

## Configure resource directories
 When creating a template with `Engine.LoadTemplate(...)`, or when using the `$load(...)` and `$include(...)` tags, a relative path causes the engine to search the resource directories in order for the template file.

```csharp
            Engine.Configure(c =>{
                c.ResourceDirectories.AddRange(new string[] {
                    @"c:\wwwroot\theme",
                    @"c:\wwwroot\view"
                });
            });
```

For example, `Engine.LoadTemplate("index.html")` searches for `index.html` in `c:\wwwroot\theme` and then in `c:\wwwroot\view`.

## Configure global data
Global data is data that can be used directly in templates after configuration, without setting it in each template — configure once, use everywhere. Use the `Engine.Configure(Action&lt;IConfig, VariableScope&gt;)` method:

```csharp
Engine.Configure((c, data) =>
{
    data.Set("name", "jntemplate");
    data.Set("id", 1);
    //...other data
});
```

For `v2.2.0` and above, use the following form:

```csharp
Engine.Configure((options) =>
{
    options.Data.Set("name", "jntemplate");
    options.Data.Set("id", 1);
    //...other data
});
```

## Configure the tag output mode
`OutMode` configures how the text around a tag is processed after rendering. The options are:
- None: the default mode, no processing at all
- StripWhiteSpace: whitespace-stripping mode — removes whitespace before and after tags, making the output more compact
- Auto: automatic mode — intelligently handles line breaks around tags so the generated source looks nicer

```csharp
Engine.Configure((c) =>
{
    c.OutMode = OutMode.Auto
});
```

## Switching the compilation mode
Since `V2.0` the engine core has been refactored and template compilation was added, which further improves performance. Depending on your scenario, however, you can switch the parsing mode manually.

**Use the compile engine (default in V2.0)**
```csharp
Engine.UseCompileEngine();
```

**Use the interpretation engine (default in V1.0)**
```csharp
Engine.UseInterpretationEngine();
```

Notes:

- For versions below `v2.3.0`, use `Engine.EnableCompile()` and `Engine.DisableCompile()` to switch.
- `v1.x` only has the interpretation engine.

The differences between the two are:

- Compile engine: the template is compiled on first access, and after compilation performance reaches or approaches that of native code. Suitable for high-frequency scenarios, such as traditional web sites.
- Interpretation engine: mainly uses dynamic techniques (`Reflection` or `Expression`) to access objects. Suitable for scenarios that need flexibility but are accessed less frequently, such as code generators.

The syntax is identical between the two, but usage details differ slightly, so do not mix them in practice. Switch once during initialization only. Do not switch dynamically in the middle of running, or switch frequently, otherwise you may run into performance problems.

## Miscellaneous

For other configuration options, refer to the API.
