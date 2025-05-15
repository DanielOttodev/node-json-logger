import JSONLogger from './node-logger-json';

const logger = new JSONLogger({
    outputDir: "C:\\Users\\ottod\\Documents\\JobLogs\\",
    fileName: "my.json",
    job:"Some script"
})



logger.log("stuff", 0, {1: "more stuff?"});
logger.log("more stuff", 1);
logger.sortBySeverity()
logger.write("another.json");

