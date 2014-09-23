You can use this script in 2 modes:

a) print mode
you can use it similarly to `lint` tool - any unused dependencies will be printed on gulp / grunt console
b) update code


Why?

MAINTAINABILITY

Cleaning up your code is always a good idea. Removing unused dependencies when you use
hundreds of components can be tedious task. This script aims to automate the process
for you.

PERFORMANCE

AngularJS dependencies are lazy loaded. This means that any code of service that
you inject into your component won't be run until you inject that service.
Therefore in some situations removing dependencies might induce performance boost.

METADATA

The main motivation to create this script was to improve metadata available for
another project of mine.