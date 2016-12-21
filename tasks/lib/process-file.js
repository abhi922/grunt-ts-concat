"use strict";

var _ = require("lodash/array");

var localModulesMap = {};
var externModulesMap = {};
var processedFiles = [];
var modulePaths = {};
// var foundStatement = [];
var importRegEx = /^\s*import\s+\{(.*)\}\s+from\s+[\"\'](.*)[\"\'];*$/gm;

exports.process = function (src, filepath, dest) {

    var match;
    // var finalSrc = "";
    var finalSrc = src;

    var index = filepath.lastIndexOf("/") + 1;
    var fileName = filepath.substr(index);
    var path = filepath.substr(0, index - 1);

    processedFiles.push(fileName.substr(0, fileName.lastIndexOf(".")).trim());

    console.log("processed files: ", processedFiles);
    console.log("paths of files: ", path);

    // while ((match = regEx.exec(src)) !== null) {

    //     finalSrc2 = finalSrc2.replace(match[0], "");

    //     var finalMatch = match[1].trim();

    //     foundStatement.forEach(function (val) {
    //         finalMatch = finalMatch.split(",")
    //             .map(function (str) {
    //                 return str.trim();
    //             })
    //             .filter(function (str) {
    //                 return val !== str;
    //             })
    //             .reduce(function (final, str) {
    //                 if (final === "") {
    //                     return str;
    //                 }
    //                 return final + ", " + str;
    //             }, "");
    //     });

    //     if (finalMatch !== "") {
    //         finalSrc += "import { " + finalMatch + " }" + match[2] + "\n";
    //         finalMatch.split(",").forEach(function (newVal) {
    //             foundStatement.push(newVal.trim());
    //         });
    //     }
    // }

    // return {
    //     imports: finalSrc,
    //     src: finalSrc2
    // }

    while ((match = importRegEx.exec(src)) !== null) {

        finalSrc = finalSrc.replace(match[0], "");

        var allImports = match[1].split(",").map(function (str) {
            return str.trim();
        });
        console.log("allImports: " + allImports);

        if (match[2].charAt(0) === ".") {

            let module = match[2].substr(match[2].lastIndexOf("/") + 1);
            console.log("module: " + module);
            if (!localModulesMap[module]) {
                localModulesMap[module] = [];
            }

            localModulesMap[module] = _.union(localModulesMap[module], allImports);
            console.log("local modules: ", localModulesMap);

            if (!modulePaths[module]) {

                var modulePath = path;
                match[2].split("/").forEach(function (mark) {
                    if (mark === "..") {
                        modulePath = modulePath.substr(0, modulePath.lastIndexOf("/"));
                    }
                });

                if (modulePath === "") modulePath = ".";

                modulePath += "/" + _.join(match[2].split("/")
                    .filter(function (part) {
                        return part !== "." && part !== "..";
                    }), "/");

                var destPath = dest;
                var backPartsLen = dest.split("/")
                    .filter(function (part) {
                        return part === "..";
                    }).length;

                var partRe = new RegExp("^(\\.\\.\\/){" + backPartsLen + "," + backPartsLen + "}");
                modulePath = modulePath.replace(partRe, "");
                destPath = destPath.replace(partRe, "");

                for(var i = 0; i < destPath.split("/").length - 1; i++) {
                    modulePath = "../" + modulePath;
                }

                if(modulePath[0] !== ".") modulePath = "./" + modulePath;
                
                modulePaths[module] = modulePath;
                console.log("module paths: ", modulePaths);
            }

        } else {

            console.log("match: " + match[2]);
            if (!externModulesMap[match[2]]) {
                externModulesMap[match[2]] = [];
            }

            externModulesMap[match[2]] = _.union(externModulesMap[match[2]], allImports);
            console.log("external modules: ", externModulesMap);

        }
    }

    return finalSrc;
}

exports.removeDuplicates = function () {

    Object.keys(localModulesMap).forEach(function (key) {
        if (processedFiles.indexOf(key) >= 0) {
            delete localModulesMap[key];
        }
    });

    console.log("final local modules: ", localModulesMap);
}

exports.returnImports = function () {

    var finalImports = "";

    for (var module in externModulesMap) {
        finalImports += "import { " + _.join(externModulesMap[module], ", ") + " } from \"" + module + "\";";
    }

    for (var module in localModulesMap) {
        finalImports += "import { " + _.join(localModulesMap[module], ", ") + " } from \"" + modulePaths[module] + "\";";
    }

    return finalImports;
}