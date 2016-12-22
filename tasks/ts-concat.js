"use strict";

module.exports = function (grunt) {

    var util = require("./lib/process-file");

    var cleanRegEx = /^\n$/gm;
    var finalImports = "";
    var finalMainSrc = "";

    grunt.registerMultiTask("ts-concat", "Concatenate typescript files gracefully", function () {

        this.files.forEach(function (file) {

            if (grunt.file.exists(file.dest)) {
                grunt.file.delete(file.dest);
            }

            finalImports = "";
            finalMainSrc = "";

            file.src
                .filter(function (filepath) {
                    if (grunt.file.exists(filepath)) {
                        return true;
                    }
                    return false;
                })
                .forEach(function (filepath) {

                    var src = grunt.file.read(filepath);

                    var finalSrc = util.process(src, filepath, this.data.dest);
                    finalMainSrc += finalSrc + "\n";

                }, this);

            util.removeDuplicates();

            finalImports = util.returnImports();

            grunt.file.write(file.dest, (finalImports + finalMainSrc).replace(cleanRegEx, ""));

            util.clean();

        }, this);

    });

}