# Template Compilation

Since `v2.0.0`, jntemplate officially supports template compilation. With the default configuration, the engine compiles a template automatically the first time it is executed.

You can also pre-compile templates manually:

## Compile a template file

Compile the specified template file with `Engine.CompileFile(...)`.

### Parameters

**name**:

The template name. It must be a unique, non-repeating string. If it is `null`, the absolute path of the template file is used as the template name by default.

::: warning
1. `name` is used as the template cache key; duplicates will cause errors.
2. If you specify a custom `name`, you must pass the same `name` when loading the template with the corresponding `Engine.LoadTemplate(...)` method.
:::


**fileName**:

The template path, which can be relative or absolute. For example:
- `/var/wwwroot/index.html` — an absolute path on Linux
- `c:\wwwroot\index.html` — an absolute path on Windows
- `template/index.html` — a relative path. Do not prefix a relative path with other symbols such as `/`

::: tip
If a relative path is used, the engine searches for the template file in `ResourceDirectories` in order. If that option is not configured, or the file does not exist, a resource-not-found exception is thrown.
:::


**action**:

The action that configures compilation variables. Through the action you can specify the type of each variable used in the template. That type must match the actual parameter type.

### Example

The following code demonstrates how to compile a template file `demo.html`:

```csharp
    Engine.CompileFile("demo", @"c:\wwwroot\index.html", (ctx) =>
    {
        ctx.Set("name",typeof(string));
        ctx.Set("id", typeof(int));
        //..other parameters; only the types are needed here, no actual values
        ctx.CurrentPath = @"c:\wwwroot\"; //the current template file directory
    });
```

Here the template name `demo` is specified, so you must pass the same name when using `LoadTemplate`: `Engine.LoadTemplate('demo',@"c:\wwwroot\index.html")`

## Compile template content

If the template does not come from a file but from a string, you can compile the string with `Engine.Compile(...)`.

### Parameters

**name**:

The template name. It must be a unique, non-repeating string. If it is `null`, the HashCode of the template content is used as the name by default.

::: warning
1. `name` is used as the template cache key; duplicates will cause errors.
2. If you specify a custom `name`, you must pass the same `name` when loading the template with the corresponding `Engine.CreateTemplate(...)` method.
:::


**content**:

The template content. It cannot be empty or `null`.



**action**:

The action that configures compilation variables. Through the action you can specify the type of each variable used in the template. That type must match the actual parameter type.

### Example

The following code demonstrates how to compile a template content string:

```csharp
    Engine.Compile("hello", @"hello, $name", (ctx) =>
    {
        ctx.Set("name",typeof(string));
        //..other parameters; only the types are needed here, no actual values
    });
```

Here the template name `hello` is specified, so you must pass the same name when using `CreateTemplate`: `Engine.CreateTemplate('hello',@"hello, $name")`

::: tip
After compiling successfully, the template content can be empty when using `Engine.CreateTemplate`.
:::

## Handling template changes

For performance reasons, the engine does not track changes to template content. If the content of a template changes after it has been compiled, call the corresponding compile method again (see `Compile template content` or `Compile a template file` above) to recompile the template and apply the changes, or clear the compiled objects with `IEngine.Clean()` or `Engine.Current.Clean()`.

Note: `Clean` clears all compiled objects, so avoid using it frequently.


## Other notes

If your templates do not come from files (for example, they are stored in a database), you can implement a custom resource loader (`IResourceLoader`) and register that type in the configuration.
