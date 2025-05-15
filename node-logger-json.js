"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONLogger = void 0;
// Logger class that allows logging outputs to a standard JSON format.
var fs = require('fs');
var SEVERITY;
(function (SEVERITY) {
    SEVERITY[SEVERITY["WARNING"] = 0] = "WARNING";
    SEVERITY[SEVERITY["DEBUG"] = 1] = "DEBUG";
    SEVERITY[SEVERITY["ERROR"] = 2] = "ERROR";
    SEVERITY[SEVERITY["CRITICAL"] = 3] = "CRITICAL";
    SEVERITY[SEVERITY["INFO"] = 4] = "INFO";
})(SEVERITY || (SEVERITY = {}));
;
var JSONLogger = /** @class */ (function () {
    function JSONLogger(options) {
        this.logs = [];
        this.outputPath = options.outputPath ? options.outputPath : __dirname;
        this.fileNameFormat = options.fileNameFormat;
        this.job = options.job;
        this.id = 0;
        if (options.prefix)
            this.prefix = options.prefix;
    }
    // Main log function
    JSONLogger.prototype.log = function (message, severity) {
        var log = {
            id: this.id++,
            severity: severity,
            job: this.job,
            datetime: new Date(),
            message: message
        };
        this.logs.push(log);
    };
    JSONLogger.prototype.logAll = function () {
        console.log(this.logs);
        console.log("Total items:", this.logs.length);
    };
    JSONLogger.prototype.sortBySeverity = function () {
        this.logs.sort(function (a, b) { return a.severity - b.severity; });
    };
    JSONLogger.prototype.write = function () {
        var _this = this;
        fs.writeFile("test.json", JSON.stringify(this.logs), function (err) {
            if (err)
                console.log("Unable to write log to output directory:", err);
            else {
                console.log("Log written to ".concat(_this.outputPath, "."));
            }
        });
    };
    return JSONLogger;
}());
exports.JSONLogger = JSONLogger;
var logger = new JSONLogger({
    fileNameFormat: "test",
    job: "Some script"
});
logger.log("stuff", SEVERITY.INFO);
logger.log("more stuff", 1);
logger.logAll();
logger.sortBySeverity(ORDER.dsc);
logger.logAll();
logger.write();
