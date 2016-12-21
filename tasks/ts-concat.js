"use strict";

module.exports = function (grunt) {

    var util = require("./lib/process-file");

    var cleanRegEx = /^\n$/gm;
    var finalImports = "";
    var finalMainSrc = "";

    grunt.registerMultiTask("ts-concat", "Concatenate typescript files gracefully", function () {

        console.log(this.filesSrc);

        this.filesSrc.forEach(function (filepath) {

            var src = grunt.file.read(filepath);

            var finalSrc = util.process(src, filepath, this.data.dest);
            finalMainSrc += finalSrc + "\n";
            // finalImports += data.imports + "\n";
            // finalMainSrc += data.src + "\n";

        }, this);

        util.removeDuplicates();
        finalImports = util.returnImports();

        if (grunt.file.exists(this.data.dest)) {
            grunt.file.delete(this.data.dest);
        }
        grunt.file.write(this.data.dest, (finalImports + finalMainSrc).replace(cleanRegEx, ""));
    });

}