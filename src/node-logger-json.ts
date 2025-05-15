// Logger module that allows logging outputs to a standard JSON format.
import fs from 'fs';

interface initOptions {
    outputDir?: string,
    fileName: string,
    prefix?: string,
    job: string
}

enum SEVERITY {
    "CRITICAL",
    "ERROR",
    "WARNING",
    "DEBUG",
    "INFO"
}

interface Log {
    id: number,
    message: string,
    severity: SEVERITY;
    severityDesc: string,
    data?: any;
    datetime: Date | null
};

interface LogOutput {
    job: string,
    datetime: Date
    logs: Log[]
    totalItems: number,
}

export default class JSONLogger {
    outputDir: string;
    fileName: string;
    prefix?: string;
    timestamps?: boolean;
    id: number;
    job: string
    logs: Log[];
    /**
     * @constructor
     * @param {string} outputPath - Output directory used when writing the log files.
     * @param {string} fileName - file name of the output file.
     * @param {string} job -Attribute to group this log run by. 
     * @method log - Captures a log and saves it to the main log memory. Use the write() method to save the log file to an output directory.
     * @returns an instantiated JSONLogger object.
     */
    constructor(options: initOptions) {
        this.logs = []
        this.outputDir = options.outputDir ? options.outputDir : __dirname;
        this.fileName = options.fileName;
        this.job = options.job
        this.id = 0;
        if (options.prefix) this.prefix = options.prefix;
    }
    /**
   * Captures a log and saves it to the main log memory. Use the write() method to save the log file to an output directory.
   * @description Severity [
     0: CRITICAL,
    1: ERROR,
    2: WARNING,
    3: DEBUG,
    4: INFO
    ]
    * @method log
   */
    log(message: string, severity: SEVERITY, data?: any) {
        const log: Log = {
            id: this.id++,
            severity,
            severityDesc: SEVERITY[severity],
            datetime:  new Date() ,
            message,
            data
        }
        this.logs.push(log);
    }
    /**
   * Prints all logs to standard output.
   * @method printAll
   */
    printAll(): void {
        console.log(this.logs);
        console.log("Total items:", this.logs.length);
    }
    /**
   * Sorts the logs by severity. Default is descending.
   * @method sortBySeverity
   */
    sortBySeverity(): void {
        this.logs.sort((a, b) => a.severity - b.severity)
    }
    /**
   * Write the captured logs to a JSON file. File location is determined by outputPath given when initialising the logger. Use the clear() function to remove any logs still in memory.
   * @param {string} fileName - File name may be provided to override the default on initialisation.
   * @method write
   */
    write(fileName?: string): void {
        const fileOutPut = `${this.outputDir}${fileName || this.fileName}`
        const output : LogOutput = {
            datetime: new Date(),
            job: this.job,
            totalItems: this.logs.length,
            logs: this.logs
        }
        fs.writeFile(fileOutPut, JSON.stringify(output), (err) => {
            if (err) console.log("Unable to write log to output directory:", err);
            else {
                console.log(`Log written to ${this.outputDir}.`)
            }
        })
    }
    /**
   * Clears all logs that have been captured in memory. 
   * @method clear
   */
    clear(): void {
        this.logs = [];
    }
    /**
* Returns all logs that have been captured in memory. 
* @method get
*/
    get(): Log[] {
        return this.logs;
    }
    setOutputDir(path: string){
        this.outputDir = path;
        console.log('Updated outputDir to:', path);
    }
}

