var path = require('path');
var gutil = require('gulp-util');
var through = require('through');
var _ = require('lodash');

var PLUGIN_NAME = 'gulp-i18n-lint';

module.exports = function (parent) {
    
    parent = parent || null;
    var firstFile = null;

    function validate(file) {
        var parsed;
        var successMsg = "File validated successfully";
        var validationMsg = "";

        if (file.isNull()) {
            return this.queue(file);
        }

        if (file.isStream()) {
            return this.emit('error', new gutil.PluginError(PLUGIN_NAME, PLUGIN_NAME + ': Streaming not supported!'));
        }

        if (!firstFile) {
            firstFile = file;
        }

        try {
            parsed = JSON.parse(file.contents.toString('utf8'));
        } catch (err) {
            err.message = 'Error while parsing ' + file.path + ': ' + err.message;
            return this.emit('error', new gutil.PluginError(PLUGIN_NAME, err));
        }

        for (var sourceFile in parsed) {
            var source = parsed[sourceFile];

            for (var i18nKey in source.content) {

                if (!(i18nKey.indexOf('.') < 1)) {
                    if (parent != null) {
                        if (!(i18nKey.indexOf(parent) === 0)) {

                            var i18nKeyInitValue = i18nKey.substr(0, i18nKey.indexOf('.'));

                            validationMsg += "ERROR: " + i18nKeyInitValue + " was used as a part of the key : " + i18nKey + " in Module : " + parent + '\n';

                        }
                    }
                    else {
                        if (!(i18nKey.indexOf(sourceFile) === 0)) {

                            var i18nKeyInitValue = i18nKey.substr(0, i18nKey.indexOf('.'));

                            validationMsg += "ERROR: " + i18nKeyInitValue + " was used as a part of the key : " + i18nKey + " in SourceFile : " + sourceFile + '\n';

                        }
                    }

                }


            }
        }

        if (validationMsg.length > 0) { console.log(validationMsg); }
        else { console.log(successMsg); }
    }

    return through(validate);
};