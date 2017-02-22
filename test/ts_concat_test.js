'use strict';

var grunt = require('grunt');

exports.ts_concat = {
    
    setUp: function(done) {
        done();
    },
    
    default: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/first-test/bundle.ts');
        var expected = grunt.file.read('test/expected/first-test/bundle.ts');
        test.equal(actual, expected, "multiple files are bundled into single file correctly.");

        test.done();
    },

    bundles_prop: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/second-test/bundle.ts');
        var expected = grunt.file.read('test/expected/second-test/bundle.ts');
        test.equal(actual, expected, "multiple files are bundled into single file correctly when using bundles option.");

        test.done();
    }
};