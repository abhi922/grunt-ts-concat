module.exports = function (grunt) {

    grunt.initConfig({

        clean: {
            tests: ["tmp"]
        },

        ts_concat: {
            interfaces: {
                src: [
                    "test/fixtures/lib/**/*.ts"
                ],
                dest: "tmp/lib/validators-bundle.ts",
            },
            default: {
                src: [
                    "test/fixtures/files/**/*.ts"
                ],
                dest: "tmp/first-test/bundle.ts"
            },
            bundles_prop: {
                src: [
                    "test/fixtures/files/**/*.ts"
                ],
                dest: "tmp/second-test/bundle.ts",
                bundles: {
                    "tmp/lib/validators-bundle.ts": [
                        "test/fixtures/lib/**/*.ts"
                    ]
                }
            }
        },

        nodeunit: {
            tests: ['test/*_test.js']
        }
    });

    grunt.loadTasks("tasks");

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    grunt.registerTask('test', ['clean', 'ts_concat', 'nodeunit']);

    grunt.registerTask("default", ["test"]);
}