# Tag Reference

## The concept of a tag

In JNTemplate, a tag refers specifically to a syntax block that contains template code. It is the basic rendering unit: once template parsing is complete, that syntax block is replaced by concrete data or content.


## Tag categories

**By the way they are written, tags fall into two kinds: full tags and shorthand tags** (tag prefixes and suffixes are configurable; this document uses the default configuration):

- Full tag: starts with `${` and ends with `}`, for example `${tagName}`
- Shorthand tag: starts with `$` and ends at a whitespace character, for example `$tagName`

Normally, the vast majority of tags can use the shorthand form, which looks cleaner. However, shorthand tags cannot be used in the following cases:

1. Arithmetic expressions and logical expressions must use full tags, e.g. `${3+5}` cannot be shortened to `$3 + 5`.
2. When the tag is followed by a period, a letter or a digit, a full tag must be used. For example `${siteHost}`.com cannot be shortened to `$siteHost.com`.
3. When whitespace or other characters that require a full tag appear after the tag.

**By type, tags fall into basic tags and complex tags.**

- Basic tag: all code is contained between the tag prefix `${` and the tag suffix `}`. Basic tags are further divided into ordinary basic tags, special tags and child tags.
  - Ordinary tag: a plain basic tag.
  - Special tag: generally has a special meaning, equivalent to a system keyword in a programming language.
  - Child tag: a tag that has a parent tag, where the parent is usually another basic tag.
- Complex tag: composed of one or more basic tags.


## Tag relationships

```text
.
└── Tag
    ├── Complex tag
    └── Basic tag
        ├── Ordinary tag
        ├── Special tag
        └── Child tag
```

::::tip
All examples in this document use the default parameters; exceptions are called out explicitly.
::::
