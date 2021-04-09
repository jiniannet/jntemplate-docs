# Configuration

We can use the `Engine.Configure(...)` method to configuration the engine.

This operation is not necessary. If no explicit configuration is performed, the system will automatically initialize the engine with default options.

## Configure tag symbols
```csharp
Engine.Configure(c => {
    c.TagPrefix = "${";
    c.TagSuffix = "}";
    c.TagFlag = '$';
});
```

## Configure Resource Directory
```csharp
Engine.Configure(c => {
    c.ResourceDirectories = new List<string>() {
            @"c:\wwwroot\theme",
            @"c:\wwwroot\view"
    };
});
```

## Configure global data

```csharp
Engine.Configure((c, data) =>
{
    data.Set("name", "jntemplate");
    data.Set("id", 1);
    //...
});
```
## Other

See api.