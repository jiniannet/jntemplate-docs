# Custom Tags

JNTemplate makes it easy to define custom tags. This document assumes you have some basic knowledge of IL. A custom tag requires the following four objects:

1. A tag class, which must implement the `ITag` interface.
2. A tag parsing delegate: `Func<TemplateParser, Nodes.TokenCollection, Nodes.ITag>`
3. A tag compiling delegate: `Func<ITag, CompileContext, System.Reflection.MethodInfo>`
4. A tag type inference delegate: `Func<ITag, CompileContext, Type> guessFunc`

Below we implement a custom tag written as `${:text}`. Its job is to output the text after the colon directly. Use this demo to get familiar with the process of defining your own JNTemplate tag.


## Define the tag class

Define a class that implements `ITag`. For convenience we recommend also inheriting from the tag base class `Tag`, and you can define any additional parameters you need.

```csharp
public class TestTag : Tag, ITag
{
    /// <summary>
    /// Defines a property Document that holds the text after the colon
    /// </summary>
    public string Document { get; set; }
}
```

## Define the parsing delegate

This delegate tells the engine how to parse your tag.

```csharp
Func<TemplateParser, Nodes.TokenCollection, Nodes.ITag> action = (p, tc) => {
        //check whether this is our custom TestTag
        if (tc.Count == 2 && tc.First.Text == ":")
        {
            return new TestTag
            {
                Document = tc[1].Text
            };
        }
        //otherwise return NULL
        return null;
}
```

::::tip
If the current collection does not match your custom tag condition, just return `null`.
::::


## Define the compiling delegate
This delegate tells the engine how to compile the tag you defined. This step requires some IL knowledge.

```csharp
Func<ITag, CompileContext, MethodInfo> action1 = (tag, c) => {
    var t = tag as TestTag;
    var mb = c.CreateReutrnMethod<TestTag>(typeof(string));//define a method
    var il = mb.GetILGenerator();//get the IL generator
    il.Emit(OpCodes.Ldstr, t.Document); //push Document onto the stack as a string reference
    il.Emit(OpCodes.Ret);//return the result
    return mb.GetBaseDefinition();//generate the method
}
```
## Define the inference delegate

This delegate tells the engine what type the tag returns.

```csharp
//TestTag returns a string, so no inference is needed
Func<ITag, CompileContext, Type> action2 = (tag, c) => typeof(string);
```

## Register the tag

Once everything above is defined, you can register your tag with the `Engine.Register<ITag>(...)` method.

```csharp
Engine.Register<TestTag>(action,action1,action2);
```

## Output

At this point the custom tag is complete. Run the following code to see it in action:

```csharp
var templateContent = "${:hello}";
var template = Engine.CreateTemplate(templateContent);
var render = template.Render();

Assert.Equal("hello", render);
```

:::: warning
Note: custom tags are an advanced feature of the engine. If you are not familiar enough with the engine, we do not recommend using it — an incorrect implementation can degrade the performance of the whole engine.
::::
