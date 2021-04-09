# About tag.

## What is tag.

In Jntemplate, tags specifically refer to the syntax block used to contain template code. It is the basic presentation unit. After the template parsing is completed, the syntax block will be replaced with specific data or content. 


## Classification of tags.

**Tags can be divided into full tags and abbreviated tags according to the writing method **：

- full tags：Use `$ {` as the beginning of the tag and end with `}}`, like `$ {tagName}` 
- Abbreviated tags: start with `$` and end with a blank character, like `$tagName` 

Under normal circumstances, most tags can use abbreviated tags, and the abbreviated tags will look more concise. 

**According to the type, it can be divided into basic tags and compound tags. **

- Base tags ： All codes are contained between the tag start character `${` and the end character `}`, and there is only one tag 
- Compound tags: A combination of one or more basic tags. 


## Relationship

```text
.
└── tags
    ├── Compound tags
    └── Base tags
```

:::tip
The examples in this document are explained with the default options, and will not be explained unless there are special circumstances. 
:::