# grunt-ts-concat

> Bundle your typescript files with [Grunt](http://gruntjs.com/) into a single file that when compiled with typescript compiler results in a single module that consumers of your library can import from.

## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins.

## The "ts_concat" task

### Overview
In your project's Gruntfile, add a section named `ts_concat` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  ts_concat: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.bundles
Type: `Object`  
Default value: `null`

* If you are bundling a set of typescript files that import from a different set of files that have already been bundled, 
you can specify that using this property.
* This is not required, but sometimes when you may wanna use this to give better modularity to your code.

### Usage Examples

```js
grunt.initConfig({
    ts_concat: {
        default: {
            dest: 'target/bundle.ts',
            src: 'app/**/*.ts'
        }
    }
});
```

## License
MIT