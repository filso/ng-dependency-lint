# ng-dependency-lint [![Build Status](https://travis-ci.org/filso/ng-dependency-lint.svg?branch=master)](https://travis-ci.org/filso/ng-dependency-lint)

#### Warning: depracated
I'm abandoning this project for the lack of time, and because now there's something similar, but better:
https://github.com/Gillespie59/eslint-plugin-angular/blob/master/docs/di-unused.md

The only feature that's missing there is automatic removal of injected dependencies, but I guess one could add this feature! 

--------
#### Remove unused dependency injections automatically 

Removing unused dependency injections when you use hundreds of components can be tedious task. This script aims to automate the process for you.

## Why would I remove unused dependencies?

### 1. Maintanance

Cleaning up your code is always a good idea. It's easier to see the architecture looking at component definition. 

### 2. Performance

AngularJS dependencies are lazy loaded. This means that any code of service that
you inject into your component won't be run until you inject that service.
Therefore in some situations removing unused dependency injections might induce performance boost.

### 3. Metadata

AngularJS dependencies contain potential metadata that can be used by 3rd party plugins / software. Cleaning up
injected dependency list keep this metadata accurate.

### How to use ng-dependency-lint


#### Build systems

- [gulp-ng-dependency-lint](https://github.com/filso/gulp-ng-dependency-lint)

#### Standalone

You can also use this ng-dependency-lint as a standalone tool, to do that, install via npm:
```
npm install -g ng-dependency-lint
```

Then you can use this script in 2 modes:
##### 1. Print mode
You can use it similarly to `lint` tool - any unused dependencies will be printed on gulp / grunt console,
leaving you to update the code.

To run this, 
```javascript
ng-dependency-lint somefile.js
```

##### 2. Update mode
The code can be automatically updated - unused dependencies can be removed from code automatically.

To run this
```javascript
ng-dependency-lint -u somefile.js
```

FAQ
---------------
#####1. Does it work with string array dependency syntax?

No, I think it's a bad idea to annotate dependencies manually, so ng-dependency-lint doesn't support it. 
You can use this free awesome DI annotator after your code is processed by ng-dependency-lint: https://github.com/olov/ng-annotate
