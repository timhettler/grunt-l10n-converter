(function () {
    'use strict';

    var convert = {},
        root = this;

    //// cross-browser compatiblity functions ////

    var _isArray = Array.isArray || function (obj) {
        return _toString.call(obj) === '[object Array]';
    };

    var _each = function (arr, iterator) {
        if (arr.forEach) {
            return arr.forEach(iterator);
        }
        for (var i = 0; i < arr.length; i += 1) {
            iterator(arr[i], i, arr);
        }
    };

    var _keys = function (obj) {
        if (Object.keys) {
            return Object.keys(obj);
        }
        var keys = [];
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                keys.push(k);
            }
        }
        return keys;
    };

    //// exported async module functions ////

    convert.toJson = function (array) {
        var convertedJson = {},
            is2Col = _keys(array[0]).length === 2;
        _each(array, function (row) {
            var colNum = 0,
                prefix,
                rowKey;
            for (var key in row) {
                // Ignore empty cells
                if (row[key] !== '') {
                    // At beginning of each row, save labeling values
                    if (colNum === 0) {
                        prefix = key;
                        rowKey = row[key];
                    } else {
                        var newKey = (!is2Col) ? [prefix,rowKey,key].join('.') : rowKey,
                            newValue = _convertLineBreaks(row[key]);

                        convertedJson[newKey] = newValue;
                    }
                }
                colNum++;
            }
        });
        return convertedJson;
    }

    var _convertLineBreaks = function (string) {

        if(string.indexOf("\n") !== -1) {
            return ['<p>',string.replace(/(\n\s?)+?/g, '</p><p>'),'</p>'].join('');
        }

        return string;
    }

    // Node.js
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = convert;
    } else {
        root.convert = convert;
    }

}());
