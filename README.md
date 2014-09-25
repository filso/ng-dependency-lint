

Removing unused dependency injections when you use hundreds of components can be tedious task.
This script aims to automate the process for you.

Why would I remove unused dependencies?

1. Maintanance
---------------
Cleaning up your code is always a good idea. It's easier to see the architecture looking at component definition. 

2. Performance
---------------
AngularJS dependencies are lazy loaded. This means that any code of service that
you inject into your component won't be run until you inject that service.
Therefore in some situations removing unused dependency injections might induce performance boost.

3. Metadata
---------------
AngularJS dependencies contain potential metadata that can be used by 3rd party plugins / software. Cleanining up
dependencies keep this metadata accurate.

HOW
---------------
You can use this script in 2 modes:
1. Print mode
You can use it similarly to `lint` tool - any unused dependencies will be printed on gulp / grunt console,
leaving you to update the code.

To run this, 
```
asfasf
```

2. Update mode
The code can be automatically updated - unused dependencies can be removed from code automatically.

To run this
```
asda
```

FAQ
---------------
1. Does this plugin work with string array dependency syntax?

No, I think it's a bad idea to annotate dependencies manually with array string syntax, so ng-di-lint doesn't support it. 
You can use this DI annotator after your code is processed by ng-di-lint: https://github.com/olov/ng-annotate



This project use portions of code from @bford ngmin project - mostly related to AngularJS passes and signatures.
