# Changelog
## Version 2.4.4
***
Release date: 2025-11-21
- Minor detail improvements
- Added .NET 10.0 support

## Version 2.4.3
***
Release date: 2025-05-21

- Added file monitoring
- Fixed known bugs
- Added .NET 9.0 support


## Version 2.4.2
***
Release date: 2023-12-25

- Fixed an exception in `decimal` logical operations
- Fixed incorrect formatting in some cases when the output mode is set to Auto
- Added .NET 8.0 support
- Other code optimizations


## Version 2.4.1
***
Release date: 2023-10-22

- Fixed known bugs
- Adjusted the custom tag interfaces
- Improved anonymous object support
- Improved automatic parameter type inference
- Other code optimizations


## Version 2.3.3
***
Release date: 2023-01-29

- Fixed known bugs
- Code optimizations

## Version 2.3.2
***
Release date: 2022-11-04

- Fixed known bugs


## Version 2.3.1
***
Release date: 2022-09-13

- Added automatic conversion to nullable types
- Re-added .NET Framework 2.0 / .NET Framework 3.5 support
- Other known issue fixes


## Version 2.3.0
***
Release date: 2022-05-10

- Added the array tag, allowing simple arrays to be defined in templates
- Fixed an issue where some method calls threw exceptions under .NET 6.0
- Adjusted the methods for switching between the compile engine and the interpretation engine, improved async support
- Other known issue fixes


## Version 2.2.5
***
Release date: 2021-12-08

- `ResourceDirectories` configuration adjustments

## Version 2.2.4
***
Release date: 2021-11-28

- Improved dynamic access in the interpretation engine
- Improved async function support
- Improved template caching; compiled results can now be excluded from the cache while debugging
- Improved `DataTable` support
- Added the `Engine.Parse` entry point
- Added .NET 6.0 support
- Other known issue fixes

## Version 2.2.2
***
Release date: 2021-07-26

- Added anonymous object support
- Configuration adjustments, removed deprecated options
- Feature improvements

## Version 2.2.0
***
Release date: 2021-06-08

- Fixed tag parsing issues in specific cases
- Fixed an issue where `foreach` inferred the wrong type for certain types
- Added the tag output mode (`OutMode`) configuration
- Improved exception messages
- Configuration adjustments, code optimizations

## Version 2.1.2
***
Release date: 2021-05-19

- 1. Fixed comparison of two string constants not matching
- 2. Fixed the `Configure(Action<IConfig, VariableScope>)` configuration method not taking effect
- 3. Improved the parser and related code

## Version 2.1.0
***
Release date: 2021-04-09

- 1. Fixed known bugs
- 2. Feature improvements

## Version 2.0.0
***
Release date: 2021-02-04

- Features
	- 1. Architecture and interface adjustments: refactored from an interpreting template engine into a compiled template engine
	- 2. Pre-compilation is supported; templates that are not pre-compiled are compiled automatically on first execution
	- 3. Added the loader concept: with a custom loader, templates can be loaded from files, FTP, HTTP and many other ways and paths
	- 4. Added the layout tag, similar to layout in Razor or master pages in aspx (block in other template engines)
	- 5. Added index syntax such as `row["name"]`; for backward compatibility, the original `row.name` is still supported in this version
	- 6. Added async method support, allowing templates to call async methods
	- 7. Added static method support, allowing templates to call static methods

- Improvements
	- 1. Structure optimization, performance improvements

- Other
	- Note: from this version on, frameworks below `.net framework 4.0` (.net framework 2.0/3.5) are no longer supported
	- Note: this is a major version upgrade and some interfaces are no longer compatible; please consider the risks before upgrading
	- Supported frameworks are adjusted as follows:
	- 1. `.net framework 4.0` or above, or the corresponding Mono version
	- 2. `.net core 2.1` or above
	- 3. `.netstandard 2.1` or above
	- 4. `.net 5.0`


## Version 1.4.0
***
Release date: 2021-01-17

- Features
	- 1. Added the loader concept: with a custom loader, templates can be loaded from files, FTP, HTTP and many other ways and paths
	- 2. Added the layout tag, similar to layout in Razor or master pages in aspx (block in other template engines)
	- 3. Added index syntax such as `row["name"]`; for backward compatibility, the original `row.name` is still supported in this version
	- 4. Fixed a bug where improper handling of logical operations could throw an exception
	- 5. Added async method support and some .NET Core related features; adjusted the constructors of some classes for easier DI

- Improvements
	- 1. Simplified the syntax of the foreach and elseif tags (the original syntax is still supported)
		- `foreach in` can be shortened to `for in`
		- `elseif` can be shortened to `elif`
	- 2. Adjusted configuration parameters
	- 3. Adjusted the namespace hierarchy for a clearer structure
	- 4. Removed some redundant design

- Other
	- The license changed from `apache 2.0` to the simpler and more permissive `MIT`
	- This is the long-term support release of 1.X; 1.X will only receive bug fixes from now on
	- Supported frameworks are adjusted as follows:
	- 1. .net framework 2.0 or above
	- 2. .net core 2.1 or above
	- 3. .netstandard 2.0 or above

## Version 1.3.3
***
Release date: 2018-04-27
- Fixed a bug in reverse Polish notation expression evaluation


## Version 1.3.2
***
Release date: 2017-09-13

- Added .NET Core support (1.1+)
- Fixed unexpected values when evaluating expressions
- Fixed method tags failing to recognize negative arguments
- Added .NET Standard support

## Version 1.3.1
***
Release date: 2016-12-01

- Fixed a bug
- Optimized IL (provisional)
- Fixed accessing a non-existent property in a template rendering the parent object
- Adjusted the Engine class
  1. Adjusted the `Engine.Configure()` overloads
  2. Everything under `Engine.Runtime` was moved into Engine and `Runtime` was removed (fewer call layers)
  3. Added `Engine.SetEnvironmentVariable` (configure custom variables) and `Engine.GetEnvironmentVariable` (get custom variables)

## Version 1.3.0
***
Release date: 2015-10-16

- To avoid making the engine overly complicated, the following usages are no longer supported (everything is unified under the Engine static class):
  1. Loading a template from a specified file: `Template.FromFile(String, Encoding)` has been removed! Use `Engine.LoadTemplate(String,TemplateContext)` instead.
  2. Global configuration entry: the `JinianNet.JNTemplate.BuildManager` class has been removed! Use `Engine.Configure()` + 2 overloads instead.
  3. Template search directories: the `Resources.Paths`/`TemplateContext.Paths` properties have been removed! Use `Engine.Runtime.ResourceDirectories` instead.

- Feature development:
	- Added the engine configuration entry
	- Support for tag comments
	- Support for custom tag prefix and suffix
	- Added a switch for tag whitespace handling
	- Added a case-sensitivity switch

## Version 1.2.3
***
Release date: 2015-09-16

- Adjusted the scope handling of the set tag inside a foreach loop body
- Fixed a bug where expression evaluation threw an exception in a specific case
- Improved formal parameter handling in method tag parsing, added `params` support
- Fixed a bug in logical operations
- 1.2.x will only receive bug fixes from now on

## Version 1.2.2
***
Release date: 2014-02-23

- 1. Fixed for tag loop errors caused by inaccurate return types in expression evaluation
- 2. Fixed string comparison issues caused by spaces
- 3. Fixed type restriction issues in IF evaluation
- 4. Adjusted a default setting of `for`
- 5. Improved unclear exception messages during parsing


## Version 1.2.1
***
Release date: 2014-08-14

- Bug fixes
- Added exception messages
- Path improvements, Linux compatible
- Version number display adjustments


## Version 1.2.0
***
Release date: 2014-07-28

- Added the `for` tag
- Added `elseif` support
- Added the `Reference` tag
- Restructured and optimized part of the tag analysis code
- Added detailed comments


## Version 1.1.0
***
Release date: 2013-03-18

- Refactored the overall framework structure, performance optimization
- The tag prefix changed from `#{` to `${`
- Added shorthand tag support: for example `${ Site.Title }` can be shortened to `$Site.Title`
- Simplified complex tag syntax: for example `#{#if(3>5)}` can now be written as `${if(3>5)}` or shortened to `$if(3>5)`
- Adjusted SET tag syntax: `#{set n=5}` becomes `${set(n=5)}` (shorthand: `$set(n=5)`)
- Added the Include tag!


## Version 1.0.3
***
Release date: 2011-12-05

- Initial version
