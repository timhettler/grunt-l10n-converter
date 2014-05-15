'use strict';

 module.exports = function(grunt) {
    var convert = require('../lib/l10n-json');

    var async = require('async');
    var csv = require('csv');
    var fs = require('fs');
    var q = require('q');
    var extend = require("xtend");

    grunt.registerMultiTask('l10n-json', 'Convert a CSV localization file to a JSON file', function() {

        var srcDir = this.data.src,
            destDir = this.data.dest,
            filesToConvert = grunt.file.expand({cwd:srcDir}, '*/*.csv'),
            convertedJson = {};

        // Tell grunt this task is asynchronous.
        var done = this.async();

        async.each(filesToConvert, function (file, finish) {
            var subdir = file.split('/')[0],
                abspath = srcDir + file;
            // Perform operation on file here.
            grunt.log.writeln('Processing file ' + abspath);
            doFirstConversion(abspath)
                .then(function (result) {
                    convertedJson[subdir] = extend(convertedJson[subdir], convert.toJson(result));
                    finish();
                });
        },
        function () {
            Object.keys(convertedJson).forEach(function (key) {
                var destPath = destDir + key + '.json';
                grunt.file.write(destPath, JSON.stringify(convertedJson[key], false, 2));
                grunt.log.writeln(destPath + ' created');
            });
            done();
        });
    });

    var doFirstConversion = function (path) {
        var deferred = q.defer();
        csv()
            .from.path(path, {
              columns: true
            })
            .to.array(function (array) {
                deferred.resolve(array);
            });

        return deferred.promise;
    };
 };
