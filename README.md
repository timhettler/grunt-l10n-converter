# grunt-l10n-json

> Convert a CSV localization file to a JSON file

* [Overview](#overview)
* [Options](#options)
* [Example](#example)
* [Contributing](#contributing)
* [License and Copyright](#license-and-copyright)


## Overview
This task searches a source folder for CSV files contained within sub-folders. Each CSV files in each sub-folder will be converted to JSON and combined into one file. 

This task was build specifically for converting localization files. Our translation team preferred to work in Excel and manually converting those files into JSON was not only time-consuming, but also prone to error. This task automates a job that no one wanted and results in less time being spent on localization efforts.


## Options
This task currently has no options, but has two required parameters:

###### src
Type: `String`

The source folder that contains the sub-folder(s) of CSV files.

###### dest
Type: `String`

The destination folder where the JSON files will be written to.


## Example
```js
grunt.initConfig({
  convert: {
    dev: {
      src: 'test/csv',
      dest: 'result'
    }
  }
});
```


## Contributing
Find a bug? Have a feature request? Please [create an Issue]([object Object]). If you find this project useful please consider "starring" it to show your support!

In lieu of a formal styleguide, take care to maintain the existing coding style by using [EditorConfig](http://editorconfig.org/) and common sense. Add unit tests for any new or changed functionality.

Pull requests are also encouraged, please re-build the documentation with [verb-cli](https://github.com/assemble/verb-cli) before you submit your pull request! Thanks!


## License and Copyright
Copyright (c) 2014 Tim Hettler, contributors.  
Released under the MIT license
